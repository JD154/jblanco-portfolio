import HeaderSection from '@/components/sections/HeaderSection';
import { ThemeProvider } from '@/components/other/ThemeProvider';
import type { Ui } from '@/i18n/ui';

interface HeaderSectionIslandProps {
  t: Ui['header'];
}

export function HeaderSectionIsland({ t }: HeaderSectionIslandProps) {
  return (
    <ThemeProvider>
      <HeaderSection t={t} />
    </ThemeProvider>
  );
}
