import { ThemeProvider } from '@/components/other/ThemeProvider';
import { ContactSection } from '@/components/sections/ContactSection';
import type { Ui } from '@/i18n/ui';

interface ContactSectionIslandProps {
  t: Ui['contact'];
}

export function ContactSectionIsland({ t }: ContactSectionIslandProps) {
  return (
    <ThemeProvider>
      <ContactSection t={t} />
    </ThemeProvider>
  );
}
