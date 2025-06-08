import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import { ThreeStars } from './components/ThreeStars';

export const StarsBackground: FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        maxHeight: '100vh',
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
