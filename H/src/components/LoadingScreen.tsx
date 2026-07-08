import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const BLOCKS = 16;

/** "Loading..." — a chunky block meter fills as real load progress advances. */
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

  const filled = Math.round((progress / 100) * BLOCKS);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex select-none flex-col items-center justify-center overflow-hidden bg-void text-ink"
        >
          <div className="pixel-grid pointer-events-none absolute inset-0 opacity-40" />

          <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="font-display text-[10px] uppercase text-cyan">
              Now Loading
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mt-5 font-display text-base uppercase text-gold" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
              Suraj Nandan
            </motion.h1>

            <div className="mt-8 flex gap-[3px]">
              {Array.from({ length: BLOCKS }).map((_, i) => (
                <span key={i} className={`h-4 w-4 border border-void-deep ${i < filled ? 'bg-gold' : 'bg-white/10'}`} />
              ))}
            </div>

            <div className="mt-3 flex w-full max-w-[280px] items-baseline justify-between font-mono text-base uppercase text-ink-mute">
              <span>loading</span>
              <span className="tabular-nums text-ink">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
