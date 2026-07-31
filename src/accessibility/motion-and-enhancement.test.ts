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
    readSource('../components/sections/AboutMeSection/index.tsx'),
    readSource('../components/sections/ContactSection/index.tsx'),
    readSource('../components/sections/ProjectsSection/index.tsx'),
    readSource('../components/sections/ProjectsSection/components/ProjectsCarousel.tsx'),
    readSource('../components/layout/StarsBackground/components/ThreeStars.tsx'),
    readSource('../components/layout/StarsBackground/hooks/useStarsZoom.ts'),
    readSource('../components/general/AnimatedHeading/index.tsx'),
  ]);

  for (const source of sources) {
    // Motion is guarded either directly via usePrefersReducedMotion, or through
    // useRevealOnScroll, which reads the same preference and never arms an
    // entrance (content stays visible) when reduced motion is requested.
    const guardsMotion = source.includes('usePrefersReducedMotion') || source.includes('useRevealOnScroll');
    expect(guardsMotion).toBe(true);
  }
});

test('disables section CSS motion when requested', async () => {
  const styles = await readSource('../styles/index.css');

  expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  for (const selector of [
    '.header-section *',
    '.about-me-section *',
    '.projects-section *',
    '.contact-section *',
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

test('keeps the Hero static and hydrates only its visual effects', async () => {
  const [englishPage, spanishPage, header] = await Promise.all([
    readSource('../pages/index.astro'),
    readSource('../pages/es/index.astro'),
    readSource('../components/sections/HeaderSection/index.astro'),
  ]);

  for (const page of [englishPage, spanishPage]) {
    expect(page).toContain('<HeaderSection t={t.header} />');
    expect(page).not.toContain('HeaderSectionIsland');
  }

  expect(header).toMatch(/<AnimatedHeading\s+client:load/);
  expect(header).toMatch(/<GlowingEffectIsland\s+client:load/);
  expect(header).not.toContain("import { GlowingEffect }");
  expect(header).toContain('<a');
});

test('crossfades the static stars only after WebGL is ready', async () => {
  const [stars, threeStars, styles] = await Promise.all([
    readSource('../components/layout/StarsBackground/index.tsx'),
    readSource('../components/layout/StarsBackground/components/ThreeStars.tsx'),
    readSource('../styles/index.css'),
  ]);

  expect(stars).not.toContain('onCreated={handleCreated}');
  expect(threeStars).toContain("classList.add('webgl-stars-ready')");
  expect(threeStars).toContain('requestAnimationFrame');
  expect(styles).toContain('.webgl-stars-ready .stars-background-fallback');
  expect(styles).toContain('opacity: 0;');
});

test('does not include CSS background blobs in any section', async () => {
  const sources = await Promise.all([
    readSource('../components/sections/HeaderSection/index.astro'),
    readSource('../components/sections/HeaderSection/styles.css'),
    readSource('../components/sections/AboutMeSection/styles.css'),
    readSource('../components/sections/ProjectsSection/index.tsx'),
    readSource('../components/sections/ProjectsSection/styles.css'),
  ]);

  for (const source of sources) {
    expect(source).not.toMatch(/decorative-(element|circle|shape)/);
  }
});
