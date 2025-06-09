import { FC } from 'react';
import { Logo } from '../Logo';
import { ThemeToggle } from '@/components/general/ThemeToggle';
import { GlowingEffect } from '@/components/general/GlowingEffect/glowing-effect';

export const NavigationBar: FC = () => {
  return (
    <header className="px-4 lg:px-0 pt-6 mb-16 absolute w-full top-0 z-20">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-6 py-2 border shadow rounded-full backdrop-blur-xs bg-blend-luminosity bg-secondary-background">
        <Logo />
        <ThemeToggle />
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
      </div>
    </header>
  );
};
