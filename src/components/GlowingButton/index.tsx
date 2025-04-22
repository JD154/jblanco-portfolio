import { motion, TargetAndTransition, Transition, VariantLabels } from 'motion/react';
import { FC } from 'react';
import { useCursorContext } from '../CursorProvider';
import { Button, ButtonProps } from '../ui/button';
import './styles.css';
import { GlowingEffect } from '../ui/glowing-effect';

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
  whileHover?: VariantLabels | TargetAndTransition;
  whileTap?: VariantLabels | TargetAndTransition;
  animate?: VariantLabels | TargetAndTransition;
  initial?: VariantLabels | TargetAndTransition;
  transition?: Transition;
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
  const prefix = 'glowing-button';

  const MotionButton = motion.create(Button);

  const cursorContext = useCursorContext();

  const mouseEnterHandler = () => {
    cursorContext?.animateCursor?.('buttonHover');
  };
  const mouseLeaveHandler = () => {
    cursorContext?.animateCursor?.('cursorEnter');
  };

  const getClasses = () => {
    const classes = [];
    className && classes.push(className);
    variant === 'default' && classes.push(`${prefix}__default`);
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
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      variant={variant}
      size={size}
      {...props}
    >
      <>
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={variant === 'ghost' ? 1 : 54} />
        <span className="luminosity-text capitalize">{children}</span>
      </>
    </MotionButton>
  );
};
