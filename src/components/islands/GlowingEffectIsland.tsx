import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import { ThemeProvider } from '@/components/other/ThemeProvider';
import type { ComponentProps } from 'react';

type GlowingEffectIslandProps = ComponentProps<typeof GlowingEffect>;

export function GlowingEffectIsland(props: GlowingEffectIslandProps) {
  return (
    <ThemeProvider>
      <GlowingEffect {...props} />
    </ThemeProvider>
  );
}
