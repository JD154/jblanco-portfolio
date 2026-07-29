import { DEFAULT_GRADIENT } from '../utils';

export type GradientVariant = 'default' | 'white';

/**
 * The theme-contrasting 'white' halo is driven by the CSS variable
 * `--glow-gradient`, defined per theme in global CSS. Returning a `var()`
 * reference instead of reading the theme in JS keeps the inline style identical
 * on the server and the client, which avoids a hydration mismatch on every glow
 * when the stored theme differs from the SSR default.
 */
export function useGradient(variant: GradientVariant = 'default') {
  return variant === 'white' ? 'var(--glow-gradient)' : DEFAULT_GRADIENT;
}
