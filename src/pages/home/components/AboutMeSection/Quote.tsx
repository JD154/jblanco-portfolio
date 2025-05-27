import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useIsInViewport } from '../../../../components/general/AnimatedHeading/useIsInViewport';

export const MinimalQuote: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isInViewport = useIsInViewport(cardRef);

  // Map cursor position to rotation angles
  const rotateX = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [15, -15]);
  const rotateY = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-20, 20]);

  useEffect(() => {
    if (!isInViewport) {
      x.set(0);
      y.set(0);
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      // Get cursor position relative to viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y, isInViewport]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: 800,
        display: 'inline-block',
      }}
    >
      <motion.blockquote
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
          rotateX,
          rotateY,
          transition: 'box-shadow 0.2s',
        }}
      >
        "An Evolution, the only way"
        <br />
        <span style={{ fontSize: '0.85em', opacity: 0.5 }}>
          is a Lyric extract from <b>Dreary Moon</b> of <b>Big Black Delta</b>
        </span>
      </motion.blockquote>
    </motion.div>
  );
};
