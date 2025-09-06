import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useIsInViewport } from '../../../../../hooks/useIsInViewport';

export const MinimalQuote: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const blockquoteRef = useRef<HTMLQuoteElement>(null);
  const isInViewport = useIsInViewport(cardRef);

  useGSAP(() => {
    if (!isInViewport) return;
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
      if (blockquoteRef.current) {
        gsap.to(blockquoteRef.current, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
      }
    };
  }, [isInViewport]);

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
            background: 'linear-gradient(135deg, var(--color-foreground) 0%, rgba(99, 102, 241, 0.8) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          An Evolution, the only way
        </div>

        <div
          style={{
            fontSize: '0.875rem',
            opacity: 0.6,
            fontStyle: 'normal',
            color: 'var(--color-muted-foreground)',
          }}
        >
          Lyric extract from <strong>Dreary Moon</strong> by <strong>Big Black Delta</strong>
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
