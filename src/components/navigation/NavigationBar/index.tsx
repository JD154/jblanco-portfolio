import { FC } from 'react';
import { Logo } from '../Logo';
import { AvailabilityBadge } from '../AvailabilityBadge';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';

export const NavigationBar: FC = () => {
  return (
    <header className="px-4 lg:px-0 pt-6 mb-16 absolute w-full top-0 z-20">
      <div className="relative grid grid-cols-3 items-center max-w-2xl mx-auto px-6 py-2 border shadow rounded-full backdrop-blur-xs bg-blend-luminosity bg-secondary-background">
        <div className="justify-self-start">
          <Logo />
        </div>
        <div className="justify-self-center">
          <AvailabilityBadge />
        </div>
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
      </div>
    </header>
  );
};
