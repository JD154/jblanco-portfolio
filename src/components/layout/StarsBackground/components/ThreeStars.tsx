import { useTheme } from '@/components/other/ThemeProvider';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FC, useRef, useState } from 'react';
import * as random from 'maath/random';
import * as THREE from 'three';

export const ThreeStars: FC = () => {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array);
  useFrame((_state, delta) => {
    if (ref.current && ref.current.rotation) {
      ref.current.rotation.x -= delta / 90;
      ref.current.rotation.y -= delta / 55;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
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
