import { useTheme } from '@/components/other/ThemeProvider';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FC, useRef, useState, memo, useEffect } from 'react';
import { useStarsZoom } from '../hooks/useStarsZoom';
import * as random from 'maath/random';
import * as THREE from 'three';

const ThreeStarsComponent: FC = () => {
  const ref = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  // Store original and clustered positions
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 2.5 }) as Float32Array);
  const positionsRef = useRef<Float32Array>(sphere.slice());
  const [opacity, setOpacity] = useState(1);
  const pointsRef = useRef<any>(null);
  // For About Me cluster effect
  const [clusterMode, setClusterMode] = useState(false);

  // Helper: get About Me and Projects section visibility
  useEffect(() => {
    function onScroll() {
      const about = document.getElementById('about-me-section');
      const projects = document.getElementById('projects-section');
      if (!about) return;
      const aboutRect = about.getBoundingClientRect();
      const projectsRect = projects ? projects.getBoundingClientRect() : null;
      // About Me is in viewport and Projects is not
      const aboutInView = aboutRect.top < window.innerHeight && aboutRect.bottom > 0;
      const projectsInView = projectsRect && projectsRect.top < window.innerHeight && projectsRect.bottom > 0;
      setClusterMode(!!aboutInView && !projectsInView);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate rotation
  useFrame((_state, delta) => {
    if (ref.current && ref.current.rotation) {
      ref.current.rotation.x -= delta / 90;
      ref.current.rotation.y -= delta / 55;
    }
  });

  // Zoom or cluster effect
  useStarsZoom(
    ref,
    clusterMode
      ? {
          mode: 'cluster',
          triggerId: 'about-me-section',
          start: 'top bottom',
          end: 'bottom top',
          onClusterUpdate: (progress) => {
            // Cluster: move all points toward center, reduce spread and opacity
            const arr = positionsRef.current;
            for (let i = 0; i < sphere.length; i += 3) {
              arr[i] = sphere[i] * (1 - progress);
              arr[i + 1] = sphere[i + 1] * (1 - progress);
              arr[i + 2] = sphere[i + 2] * (1 - progress);
            }
            // Update buffer directly for performance
            if (pointsRef.current && pointsRef.current.geometry) {
              pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(arr, 3));
              pointsRef.current.geometry.attributes.position.needsUpdate = true;
            }
            setOpacity(1 - 0.6 * progress); // fade out a bit as they cluster
          },
        }
      : {
          mode: 'zoom',
          min: 1,
          max: 2.2,
          triggerId: 'header-section-wrapper',
          start: 'top top',
          end: '+=400',
        },
  );

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
