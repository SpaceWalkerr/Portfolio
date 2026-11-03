import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll, type MotionValue } from 'framer-motion';

/** Viewport-heights of scroll given to each chapter. */
export const SCREENS_PER_CHAPTER = 4;
const AUTOPLAY_PX_PER_SEC = 140;

/**
 * Scroll-driven master progress (0–1) for the film, plus the chapter helpers the
 * rail, keyboard controls and auto-play share.
 */
export function useJourneyProgress(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const update = (v: number) => setActive(Math.min(count - 1, Math.floor(v * count)));
    update(scrollYProgress.get());
    return scrollYProgress.on('change', update);
  }, [scrollYProgress, count]);

  const trackTop = () => (trackRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
  const chapterHeight = () => window.innerHeight * SCREENS_PER_CHAPTER;

  const goTo = useCallback(
    (index: number) => {
      const i = Math.max(0, Math.min(count - 1, index));
      // +1px keeps the target inside chapter i rather than on the boundary with i-1
      window.scrollTo({ top: trackTop() + i * chapterHeight() + 1, behavior: 'smooth' });
    },
    [count]
  );

  // Auto-play: nudge the scroll position each frame; any manual input stops it.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const stop = () => setPlaying(false);
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const end = trackTop() + chapterHeight() * count - window.innerHeight;
      if (window.scrollY >= end - 2) {
        setPlaying(false);
        return;
      }
      window.scrollBy(0, AUTOPLAY_PX_PER_SEC * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
    };
  }, [playing, count]);

  return {
    trackRef,
    progress: scrollYProgress as MotionValue<number>,
    active,
    goTo,
    playing,
    setPlaying,
  };
}
