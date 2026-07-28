import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Ui } from '@/i18n/ui';

interface MinimalQuoteProps {
  t: Ui['about']['quote'];
}

export const MinimalQuote: React.FC<MinimalQuoteProps> = ({ t }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const blockquoteRef = useRef<HTMLQuoteElement>(null);
  const isInViewport = useIsInViewport(cardRef);
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersReducedMotionRef = useRef(prefersReducedMotion);
  prefersReducedMotionRef.current = prefersReducedMotion;

  useGSAP(() => {
    if (prefersReducedMotion || !isInViewport) return;
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;
      // Map cursor position to rotation angles
      const rotateX = gsap.utils.mapRange(-window.innerHeight / 2, window.innerHeight / 2, 15, -15, y);
      const rotateY = gsap.utils.mapRange(-window.innerWidth / 2, window.innerWidth / 2, -20, 20, x);
      if (blockquoteRef.current) {
        gsap.to(blockquoteRef.current, {
          rotateX,
          rotateY,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (!prefersReducedMotionRef.current && blockquoteRef.current) {
        gsap.to(blockquoteRef.current, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
      }
    };
  }, [isInViewport, prefersReducedMotion]);

  return (
    <div
      ref={cardRef}
      style={{
        perspective: 1000,
        display: 'inline-block',
        width: '100%',
      }}
    >
      <blockquote
        ref={blockquoteRef}
        style={{
          fontStyle: 'italic',
          fontSize: '1.125rem',
          textAlign: 'center',
          margin: 0,
          padding: '2rem',
          lineHeight: 1.6,
          color: 'var(--color-foreground)',
          background: 'transparent',
          border: 'none',
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s ease',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            opacity: 0.1,
            position: 'absolute',
            top: '0.5rem',
            left: '1rem',
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          "
        </div>

        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: 'var(--color-foreground)',
          }}
        >
          {t.title}
        </div>

        <div
          style={{
            fontSize: '0.875rem',
            opacity: 0.6,
            fontStyle: 'normal',
            color: 'var(--color-muted-foreground)',
          }}
        >
          {t.attributionPre}<strong>Dreary Moon</strong>{t.attributionMid}<strong>Big Black Delta</strong>
        </div>

        <div
          style={{
            fontSize: '3rem',
            opacity: 0.1,
            position: 'absolute',
            bottom: '0.5rem',
            right: '1rem',
            fontFamily: 'serif',
            lineHeight: 1,
            transform: 'rotate(180deg)',
          }}
        >
          "
        </div>
      </blockquote>
    </div>
  );
};
