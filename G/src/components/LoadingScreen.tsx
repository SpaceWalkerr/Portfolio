import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

/** "Systems Check" — a pre-flight diagnostic bar as real load progress advances. */
const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    setProgress(0);
    const duration = 1700;
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

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex select-none flex-col items-center justify-center overflow-hidden bg-void text-ink"
        >
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />

          <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
            <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber">
              Systems Check
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-display text-xl uppercase tracking-wide text-ink sm:text-2xl"
            >
              Suraj Nandan
            </motion.h1>

            <div className="mt-8 h-[3px] w-full max-w-[280px] bg-white/10">
              <motion.div className="h-full bg-amber shadow-[0_0_10px_rgba(255,176,32,0.6)]" animate={{ width: `${progress}%` }} transition={{ ease: 'linear', duration: 0.1 }} />
            </div>

            <div className="mt-2 flex w-full max-w-[280px] items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              <span>initializing telemetry</span>
              <span className="tabular-nums text-ink">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
