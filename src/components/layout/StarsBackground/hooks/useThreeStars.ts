import { useRef, useState, useEffect } from 'react';
import { useStarsZoom } from '../hooks/useStarsZoom';
import * as random from 'maath/random';
import * as THREE from 'three';

// Custom hook to determine if cluster mode should be active
function useClusterMode(): boolean {
  const [clusterMode, setClusterMode] = useState(false);
  useEffect(() => {
    function isSectionInView(id: string) {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }
    function onScroll() {
      const aboutInView = isSectionInView('about-me-section');
      const projectsInView = isSectionInView('projects-section');
      setClusterMode(aboutInView && !projectsInView);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return clusterMode;
}

// Cluster update logic
function updateCluster(
  arr: Float32Array,
  sphere: Float32Array,
  progress: number,
  pointsRef: React.RefObject<any>,
  setOpacity: (o: number) => void,
) {
  for (let i = 0; i < sphere.length; i += 3) {
    arr[i] = sphere[i] * (1 - progress);
    arr[i + 1] = sphere[i + 1] * (1 - progress);
    arr[i + 2] = sphere[i + 2] * (1 - progress);
  }
  if (pointsRef.current && pointsRef.current.geometry) {
    pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  }
  setOpacity(1 - 0.6 * progress);
}

export function useThreeStars(ref: React.RefObject<THREE.Group | null>, pointsRef: React.RefObject<any>) {
  const [sphere] = useState(() => random.inSphere(new Float32Array(3500), { radius: 2.5 }) as Float32Array);
  const positionsRef = useRef<Float32Array>(sphere.slice());
  const [opacity, setOpacity] = useState(1);
  const clusterMode = useClusterMode();

  // Zoom or cluster effect
  useStarsZoom(
    ref,
    clusterMode
      ? {
          mode: 'cluster',
          triggerId: 'about-me-section',
          start: 'top bottom',
          end: 'bottom top',
          onClusterUpdate: (progress: number) =>
            updateCluster(positionsRef.current, sphere, progress, pointsRef, setOpacity),
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

  return { positionsRef, opacity, setOpacity, sphere };
}
