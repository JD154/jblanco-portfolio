import { useEffect, useLayoutEffect, useRef } from 'react';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Scroll-reveal that never holds content hostage to animation.
 *
 * The resting DOM has no classes, so content is fully visible with no JS, on a
 * hydration error, or under reduced-motion. Only when JS runs and motion is
 * allowed does the element get "armed" (children hidden) before first paint,
 * then revealed on scroll via CSS transitions — which are compositor-driven and
 * always reach their end state even when rAF is throttled. A safety timeout
 * force-reveals if the observer never fires.
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') return; // stays visible

    // Arm before paint (sections are below the fold, so no flash of hidden content).
    el.classList.add('reveal-armed');

    const reveal = () => el.classList.add('reveal-in');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);

    // Safety net: never let content stay hidden if the observer misbehaves.
    const failSafe = window.setTimeout(reveal, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);

  return ref;
}
