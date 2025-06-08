import { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsInViewport } from './hooks/useIsInViewport';
import './styles.css';

interface AnimatedHeadingProps {
  text: string;
  fontSize?: string;
  sensitivity?: number;
  className?: string;
  animation?: string;
}

export const AnimatedHeading: FC<AnimatedHeadingProps> = ({
  text = '3D TEXT',
  fontSize = '8rem',
  sensitivity = 0.02,
  className,
  animation,
}) => {
  const prefix = 'animated-heading';

  const getClasses = () => {
    const classes = [prefix];
    className && classes.push(className);
    return classes.join(' ');
  };
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs for each character
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const isInViewport = useIsInViewport(containerRef);

  useEffect(() => {
    if (!isInViewport) {
      charRefs.current.forEach((ref) => {
        if (ref) {
          gsap.to(ref, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
        }
      });
      return;
    }

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

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sensitivity, isInViewport]);

  return (
    <div className={getClasses()} ref={containerRef} data-animate={animation}>
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
    </div>
  );
};
