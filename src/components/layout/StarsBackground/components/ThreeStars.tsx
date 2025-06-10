import { useTheme } from '@/components/other/ThemeProvider';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FC, useRef, memo } from 'react';
import * as THREE from 'three';
import { useThreeStars } from '../hooks/useThreeStars';

const ThreeStarsComponent: FC = () => {
  const ref = useRef<THREE.Group>(null);
  const pointsRef = useRef<any>(null);
  const { theme } = useTheme();
  const { positionsRef, opacity } = useThreeStars(ref, pointsRef);

  // Animate rotation
  useFrame((_state, delta) => {
    if (ref.current && ref.current.rotation) {
      ref.current.rotation.x -= delta / 90;
      ref.current.rotation.y -= delta / 55;
    }
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positionsRef.current} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={theme === 'light' ? '#333333' : '#ffa0e0'}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={true}
          opacity={opacity}
        />
      </Points>
    </group>
  );
};

export const ThreeStars = memo(ThreeStarsComponent);
