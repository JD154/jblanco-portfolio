import { useTheme } from '@/components/other/ThemeProvider';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FC, useRef, useState, memo } from 'react';
import { useStarsZoom } from './useStarsZoom';
import * as random from 'maath/random';
import * as THREE from 'three';

const ThreeStarsComponent: FC = () => {
  const ref = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 2.5 }) as Float32Array);
  useFrame((_state, delta) => {
    if (ref.current && ref.current.rotation) {
      ref.current.rotation.x -= delta / 90;
      ref.current.rotation.y -= delta / 55;
    }
  });
  // Zoom effect on scroll
  useStarsZoom(ref, {
    min: 1,
    max: 2.2,
    triggerId: 'header-section-wrapper',
    start: 'top top',
    end: '+=400', // Adjust for desired zoom range
  });
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Points positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={theme === 'light' ? '#333333' : '#ffa0e0'}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={true}
        />
      </Points>
    </group>
  );
};

export const ThreeStars = memo(ThreeStarsComponent);
