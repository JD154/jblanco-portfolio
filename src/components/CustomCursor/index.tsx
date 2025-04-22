import { motion, useMotionValue } from 'motion/react';
import { useEffect } from 'react';
import { useCursorContext } from '../CursorProvider';
import './styles.css';

export const CustomCursor = () => {
  const context = useCursorContext();
  if (!context) {
    throw new Error('CursorContext must be used within a CursorContextProvider');
  }
  const { initialCursorVariant, animateCursorVariant, animateCursor } = context;
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const variants = {
    cursorEnter: {
      border: '1px solid #ffffff',
      boxShadow: '0 0 1px 0px #ffffff inset, 0 0 1px 0px #ffffff',
      scale: 2,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      transition: {
        duration: 0.2,
      },
    },
    cursorLeave: {
      scale: 0,
      border: 0,
      backgroundColor: 'transparent',
      transition: {
        duration: 0.2,
      },
    },
    buttonHover: {
      scale: 1,
      backgroundColor: '#ffffff',
      borderRadius: '50%',
    },
  };

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      const mouseMoveHandler = (e: MouseEvent) => {
        cursorX.set(e.clientX - 12);
        cursorY.set(e.clientY - 12);
      };
      const mouseEnterHandler = () => animateCursor('cursorEnter');
      const mouseLeaveHandler = () => animateCursor('cursorLeave');

      window.addEventListener('mousemove', mouseMoveHandler);
      root.addEventListener('mouseenter', mouseEnterHandler);
      root.addEventListener('mouseleave', mouseLeaveHandler);

      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
        root.removeEventListener('mouseenter', mouseEnterHandler);
        root.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    }
  }, [animateCursor, cursorX, cursorY]);

  return (
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
  );
};
