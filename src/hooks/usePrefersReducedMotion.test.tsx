import { afterEach, beforeEach, expect, spyOn, test } from 'bun:test';
import { Window } from 'happy-dom';
import { act, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

let root: Root | undefined;
let testWindow: Window;
let mouseMoveListeners = 0;
let restoreGsapTo: ReturnType<typeof spyOn> | undefined;
const globalKeys = ['document', 'IS_REACT_ACT_ENVIRONMENT', 'window'] as const;
type GlobalKey = (typeof globalKeys)[number];
let previousGlobalDescriptors: Map<GlobalKey, PropertyDescriptor | undefined>;

beforeEach(() => {
  previousGlobalDescriptors = new Map(
    globalKeys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]),
  );
  testWindow = new Window({ url: 'https://example.com' });
  const addEventListener = testWindow.addEventListener;

  Object.assign(testWindow, {
    matchMedia: () => ({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    IntersectionObserver: class {
      observe() {}
      disconnect() {}
    },
  });
  testWindow.addEventListener = ((...args: unknown[]) => {
    if (args[0] === 'mousemove') mouseMoveListeners += 1;
    Reflect.apply(addEventListener, testWindow, args);
  }) as unknown as Window['addEventListener'];
  Object.assign(globalThis, {
    document: testWindow.document,
    IS_REACT_ACT_ENVIRONMENT: true,
    window: testWindow,
  });
  mouseMoveListeners = 0;
  restoreGsapTo = spyOn(gsap, 'to');
});

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  restoreGsapTo?.mockRestore();

  for (const key of globalKeys) {
    const descriptor = previousGlobalDescriptors.get(key);
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }
  testWindow.close();
});

test('starts reduced and prevents pointer-driven motion setup', () => {
  let initialPreference: boolean | undefined;
  // Mirrors the guarded-motion pattern used across the site: read the hook, and
  // only wire up a pointer-driven GSAP tween when motion is allowed. Under
  // reduced-motion the effect must bail before adding a mousemove listener or
  // touching gsap.
  const PreferenceProbe = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    useEffect(() => {
      initialPreference ??= prefersReducedMotion;
      if (prefersReducedMotion) return;
      const handleMouseMove = () => gsap.to({}, { duration: 0.4 });
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [prefersReducedMotion]);
    return null;
  };
  const container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);

  act(() => root?.render(<PreferenceProbe />));

  expect(initialPreference).toBe(true);
  expect(mouseMoveListeners).toBe(0);
  expect(restoreGsapTo).not.toHaveBeenCalled();
});
