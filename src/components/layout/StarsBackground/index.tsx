import { Canvas } from '@react-three/fiber';
import { ThreeStars } from './components/ThreeStars';
import { FC } from 'react';

export const StarsBackground: FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh', // Use 100dvh for mobile, fallback to 100vh if unsupported
        minHeight: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ThreeStars />
      </Canvas>
    </div>
  );
};
