import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface UseTypewriterOptions {
  lines: string[];
  typeMs?: number;
  linePauseMs?: number;
  startDelayMs?: number;
  /** Gate the start (e.g. only once a section has scrolled into view) */
  active?: boolean;
}

/**
 * Types out a block of lines one character at a time, like a case report
 * being filed live. Respects `prefers-reduced-motion` by rendering the
 * full text immediately instead of a slower animation.
 */
export function useTypewriter({
  lines,
  typeMs = 24,
  linePauseMs = 380,
  startDelayMs = 0,
  active = true,
}: UseTypewriterOptions) {
  const reduceMotion = useReducedMotion();
  const full = lines.join('\n');
  const [count, setCount] = useState(reduceMotion ? full.length : 0);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setCount(full.length);
      return;
    }
    setCount(0);
    let cancelled = false;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      i++;
      setCount(i);
      if (i >= full.length) return;
      const justTyped = full[i - 1];
      const delay = justTyped === '\n' ? linePauseMs : typeMs;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, startDelayMs);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active, reduceMotion, full, typeMs, linePauseMs, startDelayMs]);

  const displayed = full.slice(0, count);
  return { lines: displayed.split('\n'), done: count >= full.length };
}
