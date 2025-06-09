import { useTheme } from '@/components/other/ThemeProvider';
import { useMemo } from 'react';
import { DARK_GRADIENT, DEFAULT_GRADIENT, LIGHT_GRADIENT } from '../utils';

export type GradientVariant = 'default' | 'white';

export function useGradient(variant: GradientVariant = 'default') {
  const { theme } = useTheme();

  const gradients = useMemo(() => {
    return {
      light: LIGHT_GRADIENT,
      dark: DARK_GRADIENT,
      default: DEFAULT_GRADIENT,
    };
  }, []);

  if (variant === 'white') {
    return theme === 'dark' ? gradients.dark : gradients.light;
  }
  return gradients.default;
}
