import { useTheme } from '@/components/other/ThemeProvider';
import { motion, useMotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useCursorContext } from '../../other/CursorProvider/hooks';
import './styles.css';

export const CustomCursor = () => {
  const { theme } = useTheme();
  const context = useCursorContext();
  if (!context) {
    throw new Error('CursorContext must be used within a CursorContextProvider');
  }
  const { initialCursorVariant, animateCursorVariant, animateCursor } = context;
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([]);
  const rippleKey = useRef(0);
  const lastTouchTime = useRef(0);
  const colorVariant = theme === 'dark' ? '#ffffff' : '#333333';

  const variants = {
    cursorEnter: {
      border: `1px solid ${colorVariant}`,
      boxShadow: `0 0 1px 0px ${colorVariant} inset, 0 0 1px 0px ${colorVariant}`,
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
      backgroundColor: `${colorVariant}`,
      borderRadius: '50%',
    },
    cursorClick: {
      scale: 0.7,
      backgroundColor: `${colorVariant}`,
      borderRadius: '50%',
      transition: {
        duration: 0.1,
        type: 'spring',
      },
    },
  };

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      const mouseMoveHandler = (e: MouseEvent) => {
        cursorX.set(e.pageX - 12);
        cursorY.set(e.pageY - 12);
      };
      const mouseEnterHandler = () => animateCursor('cursorEnter');
      const mouseLeaveHandler = () => animateCursor('cursorLeave');
      /*       const mouseDownHandler = () => {
        // Prevent mouse click animation if a touch event was recently used
        if (Date.now() - lastTouchTime.current < 500) return;
        animateCursor('cursorClick');
        setTimeout(() => animateCursor('cursorEnter'), 120);
      }; */
      // Touch support: show a ripple at the touch position
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
      {/* Touch ripple effect */}
      {ripples.map(({ x, y, key }) => (
        <span
          key={key}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'ripple-fade 0.4s linear',
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-fade {
          0% { opacity: 1; transform: scale(0.7); }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>
    </>
  );
};
