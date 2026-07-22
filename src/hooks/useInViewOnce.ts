import { useEffect, useRef, useState } from 'react';

/**
 * Flips to true the first time the referenced element scrolls near the
 * viewport, then stays true. Used to gate heavy lazy imports (e.g. the
 * Three.js wax-seal chunk) so they aren't fetched until actually needed —
 * `React.lazy` alone triggers its import on first render, which is too
 * early for content that's unconditionally mounted on a single-page site.
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
