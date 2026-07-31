import React from 'react';
import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import { GlowingEffect } from '@/components/other/GlowingEffect/glowing-effect';
import './styles.css';

// Allow animation props from motion/react
export interface GlowingButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ children, className, variant = 'outline', size = 'default', asChild = false, ...props }, ref) => {
    const prefix = 'glowing-button';

    const getClasses = () => {
      const classes = [prefix, 'relative', 'z-10'];
      if (className) classes.push(className);
      if (variant === 'outline') classes.push(`${prefix}__outline`);
      return classes.join(' ');
    };

    const glow = <GlowingEffect spread={40} glow={true} disabled={false} proximity={variant === 'ghost' ? 1 : 54} />;

    if (asChild) {
      // The child (e.g. an <a>) becomes the button element via Radix Slot. Its own
      // children go inside the luminosity span — never the child element itself, or
      // it would re-nest the anchor inside its own clone (invalid nested <a>).
      const child = React.Children.only(children) as React.ReactElement<{ children?: React.ReactNode }>;

      return (
        <Button asChild ref={ref} className={getClasses()} variant={variant} size={size} {...props}>
          {React.cloneElement(
            child,
            undefined,
            <>
              {glow}
              <span className="luminosity-text">{child.props.children}</span>
            </>,
          )}
        </Button>
      );
    }

    return (
      <Button ref={ref} className={getClasses()} variant={variant} size={size} {...props}>
        {glow}
        <span className="luminosity-text">{children}</span>
      </Button>
    );
  },
);
