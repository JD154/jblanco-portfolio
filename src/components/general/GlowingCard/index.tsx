import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import './styles.css';
import { FC, PropsWithChildren } from 'react';

export interface GlowingCardProps extends PropsWithChildren {
  redirectTo?: string;
  className?: string;
}

export const GlowingCard: FC<GlowingCardProps> = ({ redirectTo, className = '', children }) => {
  return (
    <div
      tabIndex={redirectTo ? 0 : undefined}
      onClick={() => (redirectTo ? window.open(redirectTo, '_blank') : null)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && redirectTo) {
          window.open(redirectTo, '_blank');
        }
      }}
      className={`glowing-card relative h-full rounded-2xl border md:rounded-3xl p-0 ${className}`}
      role={redirectTo ? 'button' : undefined}
      style={{ cursor: redirectTo ? 'pointer' : undefined }}
    >
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} variant="white" />
      {children}
    </div>
  );
};
