import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to zoom a Three.js object (group or mesh) on scroll.
 * @param ref - React ref to the Three.js object
 * @param options - { start, end, min, max, triggerId }
 */
export function useStarsZoom(
  ref: React.RefObject<any>,
  {
    start = 'top top',
    end = 'bottom top',
    min = 1,
    max = 2.2,
    triggerId = 'header-section-wrapper',
  }: {
    start?: string;
    end?: string;
    min?: number;
    max?: number;
    triggerId?: string;
  } = {},
) {
  useEffect(() => {
    if (!ref.current) return;
    const obj = ref.current;
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;
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
  }, [ref, start, end, min, max, triggerId]);
}
