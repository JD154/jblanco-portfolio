import { FC, useEffect, useState } from 'react';
import './styles.css';

export const BackgroundTexture: FC = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <svg
      id="texture"
      width={size.width}
      height={size.height}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="4" stitchTiles="stitch"></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  );
};
