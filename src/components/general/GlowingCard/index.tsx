import { GlowingEffect } from '@/components/ui/glowing-effect';
import { motion } from 'motion/react';

import { FC, PropsWithChildren } from 'react';

export interface GlowingCardProps extends PropsWithChildren {
  delay?: number;
  animate?: any;
  initial?: any;
  variants?: any;
  redirectTo?: string;
  className?: string;
  transition?: any;
}

export const GlowingCard: FC<GlowingCardProps> = ({
  redirectTo,
  delay = 0,
  animate,
  initial,
  variants,
  className = '',
  transition,
  children,
}) => {
  return (
    <motion.div
      onClick={() => (redirectTo ? window.open(redirectTo, '_blank') : null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || (e.key === ' ' && redirectTo)) {
          window.open(redirectTo, '_blank');
        }
      }}
      className={`relative h-full rounded-2xl border md:rounded-3xl p-0 ${className}`}
      whileTap={{ scale: redirectTo ? 0.99 : 1 }}
      animate={animate}
      initial={initial}
      variants={variants}
      transition={transition ?? { duration: 0.1, delay, ease: 'easeIn' }}
    >
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} variant="white" />
      {children}
    </motion.div>
  );
};
