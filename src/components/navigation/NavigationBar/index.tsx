import type { FC } from 'react';
import { Logo } from '../Logo';
import { LanguageToggle } from '../LanguageToggle';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import type { Lang, Ui } from '@/i18n/ui';

interface NavigationBarProps {
  t: Ui['nav'];
  lang: Lang;
  alternateUrl: string;
}

export const NavigationBar: FC<NavigationBarProps> = ({ t, lang, alternateUrl }) => {
  return (
    <header className="px-4 lg:px-0 pt-6 mb-16 absolute w-full top-0 z-20">
      <div className="relative flex items-center justify-between max-w-2xl mx-auto px-6 py-2 border shadow rounded-full backdrop-blur-xs bg-blend-luminosity bg-secondary-background">
        <Logo />
        <div className="flex items-center gap-1">
          <a
            href="#contact-section"
            className="rounded-md px-3 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t.contact}
          </a>
          <LanguageToggle lang={lang} alternateUrl={alternateUrl} ariaLabel={t.language.aria} />
          <ThemeToggle labels={t.theme} />
        </div>
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
      </div>
    </header>
  );
};
