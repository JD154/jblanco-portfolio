import { useTheme } from '@/components/other/ThemeProvider';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FC, useRef, useState, memo } from 'react';
import { useStarsZoom } from '../hooks/useStarsZoom';
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

  // Zoom effects on scroll for different sections
  useStarsZoom(ref, [
    // Header section zoom-in
    {
      triggerId: 'header-section-wrapper',
      start: 'top top',
      end: '+=400',
      min: 1,
      max: 2.2,
    },
    // About Me section zoom-out to create clustered sphere effect
    {
      triggerId: 'about-me-section',
      start: 'top bottom', // Start when top of section reaches bottom of viewport
      end: 'bottom center', // End when bottom of section reaches center of viewport
      min: 0.5, // Minimum zoom level
      max: 2.2, // Start zooming from current scale (could be up to 2.2)
    },
  ]);

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
