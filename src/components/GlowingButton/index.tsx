import { FC } from 'react';
import { ButtonProps, buttonVariants } from '../ui/button';
import { GlowingEffect } from '../ui/glowing-effect';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import './styles.css';
import { useCursorContext } from '../CursorProvider';

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
  > {
  whileHover?: any;
  whileTap?: any;
  animate?: any;
  initial?: any;
  transition?: any;
}

export const GlowingButton: FC<GlowingButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  whileHover,
  whileTap = { scale: 0.95 },
  animate,
  initial,
  transition,
  ...props
}) => {
  const cursorContext = useCursorContext();

  const mouseEnterHandler = () => {
    cursorContext?.animateCursor?.('buttonHover');
  };
  const mouseLeaveHandler = () => {
    cursorContext?.animateCursor?.('cursorEnter');
  };

  const getClasses = () => {
    const prefix = 'glowing-button';
    const classes = [prefix, buttonVariants({ variant, size }), className];
    return cn(classes);
  };
  return (
    <motion.button
      className={getClasses()}
      whileHover={whileHover}
      whileTap={whileTap}
      animate={animate}
      initial={initial}
      transition={transition}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      {...props}
    >
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={50} />
      <span className="luminosity-text">{children}</span>
    </motion.button>
  );
};
