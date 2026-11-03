import { useState } from 'react';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';

/** Maps a motion value's [from, to] window onto an integer 0…max — for typing, counters and step reveals. */
export function useScrubbedCount(mv: MotionValue<number>, from: number, to: number, max: number) {
  const calc = (v: number) => Math.round(Math.min(1, Math.max(0, (v - from) / (to - from))) * max);
  const [n, setN] = useState(() => calc(mv.get()));
  useMotionValueEvent(mv, 'change', (v) => {
    const next = calc(v);
    setN((prev) => (prev === next ? prev : next));
  });
  return n;
}
