export type GradientVariant = 'default' | 'white';

/**
 * The glow halo is driven by the `--glow-gradient` CSS variable (defined per
 * theme in src/styles/index.css), so the inline style is identical on the
 * server and the client — no hydration mismatch from reading the theme in JS.
 * The `variant` is kept for API compatibility (GlowingEffect still uses it for
 * border styling) but no longer selects a JS gradient.
 */
export function useGradient(_variant: GradientVariant = 'white') {
  return 'var(--glow-gradient)';
}
