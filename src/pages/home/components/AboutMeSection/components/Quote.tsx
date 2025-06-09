import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useIsInViewport } from '../../../../../components/general/AnimatedHeading/hooks/useIsInViewport';

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
        perspective: 800,
        display: 'inline-block',
      }}
    >
      <blockquote
        ref={blockquoteRef}
        style={{
          fontStyle: 'italic',
          opacity: 0.7,
          fontSize: '1rem',
          textAlign: 'center',
          borderLeft: '2px solid var(--color-border)',
          paddingLeft: '1rem',
          margin: 0,
          lineHeight: 1.5,
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.2s',
        }}
      >
        "An Evolution, the only way"
        <br />
        <span style={{ fontSize: '0.85em', opacity: 0.5 }}>
          is a Lyric extract from <b>Dreary Moon</b> of <b>Big Black Delta</b>
        </span>
      </blockquote>
    </div>
  );
};
