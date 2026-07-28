import { useTheme } from '@/components/other/ThemeProvider/context';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, memo } from 'react';
import type { FC } from 'react';
import { useStarsZoom } from '../hooks/useStarsZoom';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import * as random from 'maath/random';
import * as THREE from 'three';

const ThreeStarsComponent: FC = () => {
  const ref = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasRenderedFrame = useRef(false);
  const readyFrame = useRef<number | null>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 2.5 }) as Float32Array);

  useEffect(() => {
    return () => {
      if (readyFrame.current !== null) cancelAnimationFrame(readyFrame.current);
    };
  }, []);

  useFrame((_state, delta) => {
    if (!hasRenderedFrame.current) {
      hasRenderedFrame.current = true;
      readyFrame.current = requestAnimationFrame(() => {
        document.documentElement.classList.add('webgl-stars-ready');
      });
    }

    if (prefersReducedMotion) return;
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
