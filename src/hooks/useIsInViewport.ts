import { useEffect, useState } from 'react';

export function useIsInViewport(ref: React.RefObject<HTMLElement | null>): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new window.IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), {
      threshold: 0.01,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}
