import { StarsBackground } from '@/components/layout/StarsBackground';
import { ThemeProvider } from '@/components/other/ThemeProvider';

export function StarsBackgroundIsland() {
  return (
    <ThemeProvider>
      <StarsBackground />
    </ThemeProvider>
  );
}
