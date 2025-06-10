import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to zoom a Three.js object (group or mesh) on scroll.
 * @param ref - React ref to the Three.js object
 * @param options - { start, end, min, max, triggerId, mode, onClusterUpdate }
 */

type UseStarsZoomOptions = {
  start?: string;
  end?: string;
  min?: number;
  max?: number;
  triggerId?: string;
  mode?: 'zoom' | 'cluster';
  onClusterUpdate?: (progress: number) => void;
};

export function useStarsZoom(
  ref: React.RefObject<any>,
  {
    start = 'top top',
    end = 'bottom top',
    min = 1,
    max = 2.2,
    triggerId = 'header-section-wrapper',
    mode = 'zoom',
    onClusterUpdate,
  }: UseStarsZoomOptions = {},
) {
  useEffect(() => {
    if (!ref.current) return;
    const obj = ref.current;
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    if (mode === 'zoom') {
      const tween = gsap.to(obj.scale, {
        x: max,
        y: max,
        z: max,
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: true,
        },
        onUpdate: () => {
          // Clamp scale
          obj.scale.x = Math.max(min, Math.min(max, obj.scale.x));
          obj.scale.y = Math.max(min, Math.min(max, obj.scale.y));
          obj.scale.z = Math.max(min, Math.min(max, obj.scale.z));
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    } else if (mode === 'cluster' && typeof onClusterUpdate === 'function') {
      // Animate clustering progress from 0 to 1 as user scrolls through trigger
      const objForGsap = { progress: 0 };
      const tween = gsap.to(objForGsap, {
        progress: 1,
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: true,
        },
        onUpdate: () => {
          onClusterUpdate(objForGsap.progress);
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
  }, [ref, start, end, min, max, triggerId, mode, onClusterUpdate]);
}
