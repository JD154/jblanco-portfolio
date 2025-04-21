import { FC } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { GlowingEffect } from '../ui/glowing-effect';
import './styles.css';

export const GlowingButton: FC<ButtonProps> = ({ children, className, ...props }) => {
  const getClasses = () => {
    const prefix = 'glowing-button';
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(' ');
  };
  return (
    <Button {...props} className={getClasses()}>
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={14} />
      <span className="luminosity-text">{children}</span>
    </Button>
  );
};
