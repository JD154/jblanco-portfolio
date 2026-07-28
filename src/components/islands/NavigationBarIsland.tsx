import { NavigationBar } from '@/components/navigation/NavigationBar';
import { ThemeProvider } from '@/components/other/ThemeProvider';
import type { Lang, Ui } from '@/i18n/ui';

interface NavigationBarIslandProps {
  alternateUrl: string;
  lang: Lang;
  t: Ui['nav'];
}

export function NavigationBarIsland({ alternateUrl, lang, t }: NavigationBarIslandProps) {
  return (
    <ThemeProvider>
      <NavigationBar alternateUrl={alternateUrl} lang={lang} t={t} />
    </ThemeProvider>
  );
}
