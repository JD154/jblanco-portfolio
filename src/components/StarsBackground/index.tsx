import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import { ThreeStars } from './components/ThreeStars';

export const StarsBackground: FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ThreeStars />
      </Canvas>
    </div>
  );
};
