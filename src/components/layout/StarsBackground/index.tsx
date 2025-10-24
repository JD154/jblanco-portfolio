import { Canvas } from '@react-three/fiber';
import { ThreeStars } from './components/ThreeStars';
import { FC } from 'react';

export const StarsBackground: FC = () => {
  return (
    <div className="fixed z-0 top-0 left-0 w-full h-screen overflow-hidden pointer-events-none min-h-screen">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ThreeStars />
      </Canvas>
    </div>
  );
};
