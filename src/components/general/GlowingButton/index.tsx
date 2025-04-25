import { motion, MotionProps } from 'motion/react';
import { FC } from 'react';

import './styles.css';
import { useCursorHandlers } from '../../other/CursorProvider/hooks';
import { Button, ButtonProps } from '@/components/ui/button';
import { GlowingEffect } from '@/components/ui/glowing-effect';

// Allow animation props from motion/react
export interface GlowingButtonProps
  extends Omit<
      ButtonProps,
      | 'onDrag'
      | 'onDragEnd'
      | 'onDragStart'
      | 'onDragOver'
      | 'onDragEnter'
      | 'onDragLeave'
      | 'onDrop'
      | 'onAnimationStart'
      | 'onAnimationEnd'
      | 'onAnimationIteration'
      | 'children'
      | 'style'
    >,
    Omit<MotionProps, 'children'> {
  children?: React.ReactNode;
}

export const GlowingButton: FC<GlowingButtonProps> = ({
  children,
  className,
  variant = 'outline',
  size = 'default',
  whileHover,
  whileTap = { scale: 0.95 },
  animate,
  initial,
  transition,
  ...props
}) => {
  const prefix = 'glowing-button';

  const MotionButton = motion.create(Button);

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    variant === 'outline' && classes.push(`${prefix}__outline`);
    return classes.join(' ');
  };
  return (
    <MotionButton
      className={getClasses()}
      whileHover={whileHover}
      whileTap={whileTap}
      animate={animate}
      initial={initial}
      transition={transition}
      variant={variant}
      size={size}
      {...useCursorHandlers('buttonHover', 'cursorEnter')}
      {...props}
    >
      <>
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={variant === 'ghost' ? 1 : 54} />
        <span className="luminosity-text">{children}</span>
      </>
    </MotionButton>
  );
};
