import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import './styles.css';

// Allow animation props from motion/react
export interface GlowingButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ children, className, variant = 'outline', size = 'default', ...props }, ref) => {
    const prefix = 'glowing-button';

    const getClasses = () => {
      const classes = [prefix, 'relative', 'z-10'];
      className && classes.push(className);
      variant === 'outline' && classes.push(`${prefix}__outline`);
      return classes.join(' ');
    };

    return (
      <Button ref={ref} className={getClasses()} variant={variant} size={size} {...props}>
        <>
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={variant === 'ghost' ? 1 : 54} />
          <span className="luminosity-text">{children}</span>
        </>
      </Button>
    );
  },
);
