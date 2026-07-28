import { afterEach, beforeEach, expect, test } from 'bun:test';
import { ThemeProvider } from '@/components/other/ThemeProvider';
import { ui } from '@/i18n/ui';
import { Window } from 'happy-dom';
import { readFile } from 'node:fs/promises';
import { act } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';

let root: Root | undefined;
let testWindow: Window;
const globalKeys = [
  'CustomEvent',
  'DOMRect',
  'Element',
  'Event',
  'HTMLElement',
  'IS_REACT_ACT_ENVIRONMENT',
  'KeyboardEvent',
  'MouseEvent',
  'MutationObserver',
  'Node',
  'NodeFilter',
  'PointerEvent',
  'ResizeObserver',
  'document',
  'getComputedStyle',
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
  testWindow = new Window({ url: 'https://jblanco.dev/' });
  Object.assign(globalThis, {
    CustomEvent: testWindow.CustomEvent,
    DOMRect: testWindow.DOMRect,
    Element: testWindow.Element,
    Event: testWindow.Event,
    HTMLElement: testWindow.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
    KeyboardEvent: testWindow.KeyboardEvent,
    MouseEvent: testWindow.MouseEvent,
    MutationObserver: testWindow.MutationObserver,
    Node: testWindow.Node,
    NodeFilter: testWindow.NodeFilter,
    PointerEvent: testWindow.PointerEvent,
    ResizeObserver: testWindow.ResizeObserver,
    document: testWindow.document,
    getComputedStyle: testWindow.getComputedStyle.bind(testWindow),
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

const render = (component: ReactNode) => {
  const container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  act(() => root?.render(component));
  return container;
};

const openDropdown = async (trigger: HTMLButtonElement) => {
  await act(async () => {
    trigger.dispatchEvent(
      new MouseEvent('pointerdown', { bubbles: true, button: 0, ctrlKey: false }),
    );
    await Promise.resolve();
  });
  await testWindow.happyDOM.whenAsyncComplete();
};

test('renders localized navigation labels and controls', async () => {
  const { NavigationBar } = await import('./index');
  const container = render(
    <ThemeProvider>
      <NavigationBar t={ui.es.nav} lang="es" alternateUrl="/" />
    </ThemeProvider>,
  );

  const badge = container.querySelector('[aria-label="Ponte en contacto - ir a la sección de contacto"]');
  const language = container.querySelector('[aria-label="Seleccionar idioma"]');
  const theme = container.querySelector('[aria-label="Cambiar tema"]');
  const rightSlot = language?.parentElement;

  expect(badge?.textContent).toContain('Disponible para nuevos proyectos');
  expect(badge?.textContent).toContain('Ponte en contacto');
  expect(language?.textContent).toContain('es');
  expect(theme).not.toBeNull();
  expect(rightSlot?.classList.contains('flex')).toBe(true);
  expect(rightSlot?.classList.contains('items-center')).toBe(true);
  expect(rightSlot?.classList.contains('gap-1')).toBe(true);
});

test('shows localized theme options', async () => {
  const { NavigationBar } = await import('./index');
  const container = render(
    <ThemeProvider>
      <NavigationBar t={ui.es.nav} lang="es" alternateUrl="/" />
    </ThemeProvider>,
  );
  const trigger = container.querySelector('[aria-label="Cambiar tema"]') as HTMLButtonElement;

  await openDropdown(trigger);

  expect(document.body.textContent).toContain('Claro');
  expect(document.body.textContent).toContain('Oscuro');
  expect(
    document.querySelector('[role="menuitemcheckbox"][aria-checked="true"]')?.textContent,
  ).toBe('Oscuro');
});

test('provides a visible focus indicator for the availability badge', async () => {
  const styles = await readFile(new URL('../AvailabilityBadge/styles.css', import.meta.url), 'utf8');

  expect(styles).toContain('outline: 2px solid var(--color-ring);');
  expect(styles).toContain('outline-offset: 2px;');
});

test('shows the current and alternative language and navigates to the alternate URL', async () => {
  const { NavigationBar } = await import('./index');
  const container = render(
    <ThemeProvider>
      <NavigationBar t={ui.en.nav} lang="en" alternateUrl="/es/" />
    </ThemeProvider>,
  );
  const trigger = container.querySelector('[aria-label="Select language"]') as HTMLButtonElement;

  expect(trigger?.textContent).toContain('en');
  expect(trigger).not.toBeNull();
  await openDropdown(trigger);

  expect(document.body.textContent).toContain('English');
  const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
  expect(menuItems.find((item) => item.textContent === 'English')).toBeUndefined();
  const alternative = menuItems.find(
    (item) => item.textContent === 'Español',
  ) as HTMLElement;
  expect(alternative).not.toBeUndefined();
  expect(alternative.getAttribute('href')).toBe('/es/');

  act(() => alternative.click());

  expect(window.location.pathname).toBe('/es/');
});
