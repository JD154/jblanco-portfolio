import { useState, useEffect } from 'react';

export function useRevealLines(total: number, delay = 600) {
  const [visibleLines, setVisibleLines] = useState(1);
  // Reveal lines one by one
  useEffect(() => {
    if (visibleLines < total) {
      const timeout = setTimeout(() => setVisibleLines(visibleLines + 1), delay);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, total, delay]);
  return visibleLines;
}
