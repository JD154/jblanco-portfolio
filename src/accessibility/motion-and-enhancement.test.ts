import { expect, test } from 'bun:test';

const readSource = (path: string) => Bun.file(new URL(path, import.meta.url)).text();

test('loads the WebGL star island only on desktop while keeping the CSS fallback', async () => {
  const [englishPage, spanishPage, layout] = await Promise.all([
    readSource('../pages/index.astro'),
    readSource('../pages/es/index.astro'),
    readSource('../layouts/BaseLayout.astro'),
  ]);

  for (const page of [englishPage, spanishPage]) {
    expect(page).toContain('<StarsBackgroundIsland client:media="(min-width: 768px)" />');
  }

  expect(layout).toContain('<div class="stars-background-fallback" aria-hidden="true"></div>');
});

test('guards automatic motion with the shared reduced-motion preference', async () => {
  const sources = await Promise.all([
    readSource('../hooks/useParallaxTransitionForSections.ts'),
    readSource('../components/sections/AboutMeSection/index.tsx'),
    readSource('../components/sections/ContactSection/index.tsx'),
    readSource('../components/sections/ProjectsSection/index.tsx'),
    readSource('../components/sections/ProjectsSection/components/ProjectsCarousel.tsx'),
    readSource('../components/layout/StarsBackground/components/ThreeStars.tsx'),
    readSource('../components/layout/StarsBackground/hooks/useStarsZoom.ts'),
    readSource('../components/general/AnimatedHeading/index.tsx'),
  ]);

  for (const source of sources) {
    expect(source).toContain('usePrefersReducedMotion');
  }
});

test('disables section and availability badge CSS motion when requested', async () => {
  const styles = await readSource('../styles/index.css');

  expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  for (const selector of [
    '.header-section *',
    '.about-me-section *',
    '.projects-section *',
    '.contact-section *',
    '.nav-badge *',
  ]) {
    expect(styles).toContain(selector);
  }
  expect(styles).toContain('animation: none !important');
  expect(styles).toContain('transition: none !important');
});

test('guards pointer-driven glow and cursor effects with the shared preference', async () => {
  const [glowingEffect, customCursor] = await Promise.all([
    readSource('../components/other/GlowingEffect/glowing-effect.tsx'),
    readSource('../components/other/CustomCursor/index.tsx'),
  ]);

  for (const source of [glowingEffect, customCursor]) {
    expect(source).toContain('usePrefersReducedMotion');
  }
  expect(glowingEffect).toContain('if (disabled || prefersReducedMotion) return');
  expect(customCursor).toContain('if (prefersReducedMotion) return');
  expect(customCursor).toContain('{!prefersReducedMotion && <MobileRippleEffect ripples={ripples} />}');
});

test('guards the quote tilt effect with the shared preference', async () => {
  const quote = await readSource('../components/sections/AboutMeSection/components/Quote.tsx');

  expect(quote).toContain('usePrefersReducedMotion');
  expect(quote).toContain('if (prefersReducedMotion || !isInViewport) return');
});

test('does not rewind server-rendered header content during hydration', async () => {
  const header = await readSource('../components/sections/HeaderSection/index.tsx');

  expect(header).not.toContain("gsap.set(titleChars, { opacity: 0");
  expect(header).not.toContain("'#header-actions',");
  expect(header).not.toContain('SplitText.create');
});

test('crossfades the static stars only after WebGL is ready', async () => {
  const [stars, styles] = await Promise.all([
    readSource('../components/layout/StarsBackground/index.tsx'),
    readSource('../styles/index.css'),
  ]);

  expect(stars).toContain('onCreated={handleCreated}');
  expect(stars).toContain("classList.add('webgl-stars-ready')");
  expect(styles).toContain('.webgl-stars-ready .stars-background-fallback');
  expect(styles).toContain('opacity: 0;');
});

test('does not include CSS background blobs in any section', async () => {
  const sources = await Promise.all([
    readSource('../components/sections/HeaderSection/index.tsx'),
    readSource('../components/sections/HeaderSection/styles.css'),
    readSource('../components/sections/AboutMeSection/styles.css'),
    readSource('../components/sections/ProjectsSection/index.tsx'),
    readSource('../components/sections/ProjectsSection/styles.css'),
  ]);

  for (const source of sources) {
    expect(source).not.toMatch(/decorative-(element|circle|shape)/);
  }
});
