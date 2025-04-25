import { useEffect, useState } from 'react';

/**
 * Custom hook to sequentially reveal items and trigger a callback or flag after all are visible.
 * @param totalItems Number of items to reveal sequentially
 * @param revealDelay Delay (ms) between revealing each item
 * @param afterDelay Delay (ms) after all items are revealed before triggering the next step
 * @returns [visibleCount, afterAllVisible]
 */
export function useSequentialReveal(totalItems: number, revealDelay = 400, afterDelay = 500): [number, boolean] {
  const [visibleCount, setVisibleCount] = useState(0);
  const [afterAllVisible, setAfterAllVisible] = useState(false);

  useEffect(() => {
    if (visibleCount < totalItems) {
      const timer = setTimeout(() => setVisibleCount((v) => v + 1), revealDelay);
      return () => clearTimeout(timer);
    } else {
      const btnTimer = setTimeout(() => setAfterAllVisible(true), afterDelay);
      return () => clearTimeout(btnTimer);
    }
  }, [visibleCount, totalItems, revealDelay, afterDelay]);

  return [visibleCount, afterAllVisible];
}
