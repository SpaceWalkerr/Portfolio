import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const CIRCUMFERENCE = 2 * Math.PI * 54;

/** "Now Drafting" — a plotting compass traces the sheet border as real load progress advances. */
const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isLoading) return;
    setProgress(0);
    const duration = 2000;
    let raf = 0;
    // Captured from the first rAF timestamp rather than performance.now()
    // before scheduling it — those two clocks can disagree by a few ms,
    // which otherwise let `elapsed` go briefly negative on the first tick.
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isLoading]);

  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
  const angle = (progress / 100) * 360 - 90;
  const penX = 60 + 54 * Math.cos((angle * Math.PI) / 180);
  const penY = 60 + 54 * Math.sin((angle * Math.PI) / 180);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="draft-grid-deep fixed inset-0 z-[200] flex select-none flex-col items-center justify-center overflow-hidden text-ink"
        >
          <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-brass"
            >
              Now Drafting
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-sans text-2xl font-bold uppercase tracking-tight text-ink sm:text-3xl"
            >
              Suraj Nandan
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 h-[120px] w-[120px]"
            >
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#eaf2ff" strokeOpacity="0.15" strokeWidth="2" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#c9a24a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              {!reduceMotion && (
                <div
                  className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass"
                  style={{ left: penX, top: penY }}
                  aria-hidden="true"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold tabular-nums text-ink">
                {progress}%
              </div>
            </motion.div>

            <div className="mt-6 flex w-full items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <span>Sheet Set 1 of 8</span>
              <span>Scale 1:4</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
