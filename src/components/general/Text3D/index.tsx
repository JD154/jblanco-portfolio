import { motion, useSpring } from 'motion/react';
import { FC, useEffect, useRef } from 'react';
import './styles.css'; // Plain CSS file

interface Text3DProps {
  text: string;
  fontSize?: string;
  sensitivity?: number;
}

export const Text3D: FC<Text3DProps> = ({ text = '3D TEXT', fontSize = '8vw', sensitivity = 0.02 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 30 });
  const scale = useSpring(1, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) * sensitivity;
      const y = (e.clientY - centerY) * -sensitivity;

      rotateX.set(y);
      rotateY.set(x);
      scale.set(1.1);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rotateX, rotateY, scale, sensitivity]);

  return (
    <div className="text-container" ref={containerRef}>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className="space" style={{ fontSize }}>
              {char}
            </span>
          );
        }
        return (
          <motion.span
            className="char"
            data-text={char}
            key={index}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000,
              fontSize,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};
