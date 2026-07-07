import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface UseCountUpOptions {
  target: number;
  durationMs?: number;
  active?: boolean;
}

/** Ticks a telemetry readout up from 0 to its target value once active. */
export function useCountUp({ target, durationMs = 1400, active = true }: UseCountUpOptions) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    let raf = 0;
    // Captured from the first rAF timestamp rather than performance.now()
    // before scheduling it — those two clocks can disagree by a few ms,
    // which otherwise let `elapsed` go briefly negative on the first tick.
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const progress = Math.max(0, Math.min(elapsed / durationMs, 1));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduceMotion, target, durationMs]);

  return value;
}
