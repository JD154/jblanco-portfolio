import { createElement, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { gsap } from 'gsap';
import { useIsInViewport } from '../../../hooks/useIsInViewport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import './styles.css';

interface AnimatedHeadingProps {
  text: string;
  fontSize?: string;
  sensitivity?: number;
  className?: string;
  animation?: string;
  as?: 'div' | 'h1' | 'h2' | 'h3';
}

export const AnimatedHeading: FC<AnimatedHeadingProps> = ({
  text = '3D TEXT',
  fontSize = '8rem',
  sensitivity = 0.02,
  className,
  animation,
  as: Heading = 'div',
}) => {
  const prefix = 'animated-heading';

  const getClasses = () => {
    const classes = [prefix];
    if (className) classes.push(className);
    return classes.join(' ');
  };
  const containerRef = useRef<HTMLElement>(null);
  // Refs for each character
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const isInViewport = useIsInViewport(containerRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !isInViewport) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) * sensitivity;
      const y = (e.clientY - centerY) * -sensitivity;

      charRefs.current.forEach((ref) => {
        if (ref) {
          gsap.to(ref, {
            rotateX: y,
            rotateY: x,
            scale: 1.1,
            transformPerspective: 1000,
            duration: 0.5,
            ease: 'power3.out',
          });
        }
      });
    };

    const handleMouseLeave = () => {
      charRefs.current.forEach((ref) => {
        if (ref) {
          gsap.to(ref, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
        }
      });
    };

    const container = containerRef.current;

    window.addEventListener('mousemove', handleMouseMove);
    container?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sensitivity, isInViewport, prefersReducedMotion]);

  return createElement(
    Heading,
    { className: getClasses(), ref: containerRef, 'data-animate': animation },
    <>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className={`${prefix}__space`} style={{ fontSize }}>
              {char}
            </span>
          );
        }
        return (
          <span
            className={`${prefix}__char`}
            data-text={char}
            key={index}
            ref={(el) => {
              charRefs.current[index] = el;
            }}
            style={{
              display: 'inline-block',
              fontSize,
              // transformPerspective is not a valid style property in React, so we use perspective on the parent or via GSAP
              willChange: 'transform',
            }}
          >
            {char}
          </span>
        );
      })}
    </>,
  );
};
