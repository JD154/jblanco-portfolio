import { afterEach, beforeEach, expect, spyOn, test } from 'bun:test';
import { Window } from 'happy-dom';
import { act, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { gsap } from 'gsap';
import { ui } from '@/i18n/ui';
import { MinimalQuote } from '@/components/sections/AboutMeSection/components/Quote';
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

test('starts reduced and prevents Quote mouse tilt setup', () => {
  let initialPreference: boolean | undefined;
  const PreferenceProbe = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    useEffect(() => {
      initialPreference ??= prefersReducedMotion;
    }, [prefersReducedMotion]);
    return <MinimalQuote t={ui.en.about.quote} />;
  };
  const container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);

  act(() => root?.render(<PreferenceProbe />));

  expect(initialPreference).toBe(true);
  expect(mouseMoveListeners).toBe(0);
  expect(restoreGsapTo).not.toHaveBeenCalled();
});
