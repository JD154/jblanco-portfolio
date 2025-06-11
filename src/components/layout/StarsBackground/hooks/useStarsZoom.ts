import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface ZoomTriggerConfig {
  triggerId: string;
  start?: string;
  end?: string;
  min?: number;
  max?: number;
}

/**
 * Hook to zoom a Three.js object (group or mesh) on scroll with multiple triggers
 * @param ref - React ref to the Three.js object
 * @param triggers - Array of trigger configurations
 */
export function useStarsZoom(ref: React.RefObject<any>, triggers: ZoomTriggerConfig[]) {
  useEffect(() => {
    if (!ref.current) return;
    const obj = ref.current;
    const tweens: gsap.core.Tween[] = [];

    triggers.forEach(({ triggerId, start = 'top top', end = 'bottom top', min = 1, max = 2.2 }) => {
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
          // Apply scale without clamping to allow smooth transitions
        },
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [ref, ...triggers.map((t) => t.triggerId + t.start + t.end + t.min + t.max)]);
}
