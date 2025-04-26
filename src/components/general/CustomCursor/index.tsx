import { useTheme } from '@/components/other/ThemeProvider';
import { motion, useMotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useCursorContext } from '../../other/CursorProvider/hooks';
import './styles.css';
import { useGetCursorVariants } from './hooks';
import { MobileRippleEffect } from './components/MobileRippleEffect';

export const CustomCursor = () => {
  const context = useCursorContext();

  if (!context) {
    throw new Error('CursorContext must be used within a CursorContextProvider');
  }

  const { initialCursorVariant, animateCursorVariant, animateCursor } = context;
  const { theme } = useTheme();

  const variants = useGetCursorVariants(theme);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([]);
  const rippleKey = useRef(0);
  const lastTouchTime = useRef(0);

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      const mouseMoveHandler = (e: MouseEvent) => {
        cursorX.set(e.pageX - 12);
        cursorY.set(e.pageY - 12);
      };
      const mouseEnterHandler = () => animateCursor('cursorEnter');
      const mouseLeaveHandler = () => animateCursor('cursorLeave');

      const touchStartHandler = (e: TouchEvent) => {
        lastTouchTime.current = Date.now();
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          setRipples((prev) => [...prev, { x: touch.pageX - 24, y: touch.pageY - 24, key: rippleKey.current++ }]);
          setTimeout(() => {
            setRipples((prev) => prev.slice(1));
          }, 400);
        }
      };

      window.addEventListener('mousemove', mouseMoveHandler);
      root.addEventListener('mouseenter', mouseEnterHandler);
      root.addEventListener('mouseleave', mouseLeaveHandler);
      window.addEventListener('touchstart', touchStartHandler);

      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
        root.removeEventListener('mouseenter', mouseEnterHandler);
        root.removeEventListener('mouseleave', mouseLeaveHandler);
        window.removeEventListener('touchstart', touchStartHandler);
      };
    }
  }, [animateCursor, cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        initial={initialCursorVariant}
        animate={animateCursorVariant}
        style={{
          translateX: cursorX,
          translateY: cursorY,
          transformOrigin: 'center',
        }}
      />
      <MobileRippleEffect ripples={ripples} />
    </>
  );
};
