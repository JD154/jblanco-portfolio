import { afterEach, beforeEach, expect, test } from 'bun:test';
import { Window } from 'happy-dom';
import { act } from 'react';
import type { FC } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import type { AvailableThemes } from '@/typings';
import { ThemeProvider } from './index';
import { THEME_CHANGE_EVENT, useTheme } from './context';

const ThemeConsumer: FC = () => {
  const { setTheme, theme } = useTheme();

  return <button onClick={() => setTheme('light')}>{theme}</button>;
};

let root: Root | undefined;
let testWindow: Window;
const globalKeys = [
  'CustomEvent',
  'Event',
  'IS_REACT_ACT_ENVIRONMENT',
  'document',
  'localStorage',
  'navigator',
  'window',
] as const;
type GlobalKey = (typeof globalKeys)[number];
let previousGlobalDescriptors: Map<GlobalKey, PropertyDescriptor | undefined>;

beforeEach(() => {
  previousGlobalDescriptors = new Map(
    globalKeys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]),
  );
  testWindow = new Window({ url: 'https://example.com' });
  Object.assign(globalThis, {
    CustomEvent: testWindow.CustomEvent,
    Event: testWindow.Event,
    IS_REACT_ACT_ENVIRONMENT: true,
    document: testWindow.document,
    localStorage: testWindow.localStorage,
    navigator: testWindow.navigator,
    window: testWindow,
  });
});

afterEach(() => {
  if (root) act(() => root?.unmount());
  root = undefined;

  for (const key of globalKeys) {
    const descriptor = previousGlobalDescriptors.get(key);

    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }

  testWindow.close();
});

const renderThemeProvider = () => {
  const container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);

  act(() => root?.render(<ThemeProvider><ThemeConsumer /></ThemeProvider>));

  return container.querySelector('button') as HTMLButtonElement;
};

test('falls back to dark when theme storage is empty', () => {
  const consumer = renderThemeProvider();

  expect(localStorage.getItem('vite-ui-theme')).toBeNull();
  expect(consumer.textContent).toBe('dark');
});

test('renders on the server without browser storage', () => {
  const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');

  Reflect.deleteProperty(globalThis, 'window');
  Reflect.deleteProperty(globalThis, 'localStorage');

  expect(() => renderToString(<ThemeProvider><span>theme</span></ThemeProvider>)).not.toThrow();

  if (windowDescriptor) Object.defineProperty(globalThis, 'window', windowDescriptor);
  if (storageDescriptor) Object.defineProperty(globalThis, 'localStorage', storageDescriptor);
});

test('throws when useTheme is used outside ThemeProvider', () => {
  expect(() => renderToString(<ThemeConsumer />)).toThrow(
    'useTheme must be used within a ThemeProvider',
  );
});

test('setTheme writes storage and dispatches one exact theme event', () => {
  const events: WindowEventMap[typeof THEME_CHANGE_EVENT][] = [];
  window.addEventListener(THEME_CHANGE_EVENT, (event) => events.push(event));
  const consumer = renderThemeProvider();

  act(() => consumer.click());

  expect(localStorage.getItem('vite-ui-theme')).toBe('light');
  expect(events).toHaveLength(1);
  expect(events[0]?.type).toBe(THEME_CHANGE_EVENT);
  expect(events[0]?.detail).toBe('light');
});

test('an external valid event updates the consumer without emitting another event', () => {
  const events: WindowEventMap[typeof THEME_CHANGE_EVENT][] = [];
  window.addEventListener(THEME_CHANGE_EVENT, (event) => events.push(event));
  const consumer = renderThemeProvider();

  act(() => {
    window.dispatchEvent(new CustomEvent<AvailableThemes>(THEME_CHANGE_EVENT, { detail: 'light' }));
  });

  expect(consumer.textContent).toBe('light');
  expect(events).toHaveLength(1);
});

test('ignores an external event with an invalid theme detail', () => {
  const consumer = renderThemeProvider();

  act(() => {
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: 'sepia' }));
  });

  expect(consumer.textContent).toBe('dark');
});

test('updates root theme classes', () => {
  const consumer = renderThemeProvider();

  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(document.documentElement.classList.contains('light')).toBe(false);

  act(() => consumer.click());

  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(document.documentElement.classList.contains('light')).toBe(true);
});
