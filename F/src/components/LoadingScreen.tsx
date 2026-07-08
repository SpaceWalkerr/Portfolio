import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

/** "Pressing Specimen" — the name blooms into focus as real load progress advances. */
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
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex select-none flex-col items-center justify-center overflow-hidden bg-paper text-ink"
        >
          <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-multiply" />

          <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="font-serif text-sm italic uppercase tracking-[0.3em] text-forest">
              Pressing Specimen
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-3xl italic text-ink"
            >
              Suraj Nandan
            </motion.h1>

            <div className="mt-8 h-px w-full max-w-[280px] bg-ink/20">
              <motion.div className="h-px bg-forest" animate={{ width: `${progress}%` }} transition={{ ease: 'linear', duration: 0.1 }} />
            </div>

            <div className="mt-2 flex w-full max-w-[280px] items-baseline justify-between font-serif text-[11px] uppercase tracking-[0.1em] text-ink-mute">
              <span>cataloguing</span>
              <span className="tabular-nums text-ink">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
