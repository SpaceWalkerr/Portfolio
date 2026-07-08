import { useEffect, useRef, useState } from 'react';

/**
 * Flips to true the first time the referenced element scrolls near the
 * viewport, then stays true. Used to gate the ink-bloom reveal so it
 * fires when a section actually arrives on screen, not on mount.
 */
export function useInViewOnce<T extends HTMLElement>(margin = '200px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, margin]);

  return { ref, inView };
}
