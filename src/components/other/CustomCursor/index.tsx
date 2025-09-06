import { useTheme } from '@/components/other/ThemeProvider';
import gsap from 'gsap';
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

  const { animateCursorVariant, animateCursor } = context;
  const { theme } = useTheme();

  const variants = useGetCursorVariants(theme);
  type CursorVariantKey = keyof typeof variants;

  const cursorRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([]);
  const rippleKey = useRef(0);
  const lastTouchTime = useRef(0);
  // For performance: store latest mouse position and animation frame
  const mousePos = useRef({ x: 0, y: 0 });
  const clientPos = useRef({ x: 0, y: 0 }); // Store client coordinates for scroll handling
  const rafId = useRef<number | null>(null);

  // GSAP cursor movement and click effect (optimized with requestAnimationFrame)
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root || !cursorRef.current) return;

    let isAnimating = false;

    const updateCursor = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: mousePos.current.x - 12,
          y: mousePos.current.y - 12,
          duration: 0.2,
          overwrite: 'auto',
        });
      }
      isAnimating = false;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      // Store both page coordinates and client coordinates
      mousePos.current.x = e.pageX;
      mousePos.current.y = e.pageY;
      clientPos.current.x = e.clientX;
      clientPos.current.y = e.clientY;
      if (!isAnimating) {
        isAnimating = true;
        rafId.current = requestAnimationFrame(updateCursor);
      }
    };

    const scrollHandler = () => {
      // Update cursor position based on client coordinates + scroll offset
      // This ensures the cursor moves with the page when scrolling
      if (clientPos.current.x !== 0 || clientPos.current.y !== 0) {
        mousePos.current.x = clientPos.current.x + window.scrollX;
        mousePos.current.y = clientPos.current.y + window.scrollY;
        if (!isAnimating) {
          isAnimating = true;
          rafId.current = requestAnimationFrame(updateCursor);
        }
      }
    };

    const mouseEnterHandler = () => animateCursor('cursorEnter');
    const mouseLeaveHandler = () => animateCursor('cursorLeave');
    const mouseDownHandler = () => animateCursor('cursorClick');
    const mouseUpHandler = () => animateCursor('cursorEnter');

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
    window.addEventListener('scroll', scrollHandler, { passive: true });
    root.addEventListener('mouseenter', mouseEnterHandler);
    root.addEventListener('mouseleave', mouseLeaveHandler);
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('touchstart', touchStartHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('scroll', scrollHandler);
      root.removeEventListener('mouseenter', mouseEnterHandler);
      root.removeEventListener('mouseleave', mouseLeaveHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [animateCursor]);

  // GSAP cursor variant animation
  useEffect(() => {
    if (!cursorRef.current) return;
    const key = animateCursorVariant as CursorVariantKey;
    const variant = variants[key] || {};
    // Defensive extraction for variant properties
    const scale = (variant as any).scale ?? 1;
    const border = (variant as any).border ?? 'none';
    const boxShadow = (variant as any).boxShadow ?? 'none';
    const borderRadius = (variant as any).borderRadius ?? '50%';
    const backgroundColor = (variant as any).backgroundColor ?? 'transparent';
    const duration = (variant as any).transition?.duration ?? 0.2;
    gsap.to(cursorRef.current, {
      scale,
      border,
      boxShadow,
      borderRadius,
      backgroundColor,
      duration,
      overwrite: 'auto',
    });
  }, [animateCursorVariant, variants]);

  return (
    <>
      <div ref={cursorRef} className="cursor" style={{ transformOrigin: 'center' }} />
      <MobileRippleEffect ripples={ripples} />
    </>
  );
};
