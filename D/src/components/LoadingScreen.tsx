import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const BAR_WIDTH = 24;

/** "INITIALIZING SURAJ.SYS" — a BIOS-style boot bar, real load progress underneath. */
const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    setProgress(0);
    const duration = 1800;
    let raf = 0;
    // Captured from the first rAF timestamp, not performance.now() before
    // scheduling it — the two clocks can disagree by a few ms (the rAF
    // timestamp reflects when the frame started, which can be earlier than
    // a performance.now() call made during commit), which made `elapsed`
    // go negative on the first tick and briefly drove progress below 0.
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

  const filled = Math.max(0, Math.min(BAR_WIDTH, Math.round((progress / 100) * BAR_WIDTH)));
  const bar = '█'.repeat(filled) + '░'.repeat(BAR_WIDTH - filled);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex select-none flex-col items-center justify-center overflow-hidden bg-void text-ink"
        >
          <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-40" />

          <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-pink"
            >
              initializing
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="neon-text-glow mt-4 font-display text-2xl font-black uppercase tracking-wide text-ink sm:text-3xl"
            >
              SURAJ.SYS
            </motion.h1>

            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 font-mono text-[13px] text-neon-cyan-bright sm:text-sm"
            >
              [{bar}]
            </motion.pre>

            <div className="mt-2 flex w-full max-w-[280px] items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <span>loading modules</span>
              <span className="tabular-nums text-ink">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
