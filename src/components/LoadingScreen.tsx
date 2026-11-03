import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  /** Called when the visitor clicks or presses a key to skip the intro */
  onSkip?: () => void;
}

const ROLES = ['Developer', 'Coder', 'Writer', 'Creator'];
/** Two laps through the roles, each frame shorter than the last — it accelerates. */
const HOLDS = [480, 400, 340, 290, 230, 200, 175, 160];
const SEQUENCE = HOLDS.map((ms, i) => ({ word: ROLES[i % ROLES.length], ms }));
/** Black screen + the line drawing, before the window opens */
const LINE_MS = 550;
export const INTRO_TOTAL_MS = LINE_MS + HOLDS.reduce((a, b) => a + b, 0);

const EASE = [0.76, 0, 0.24, 1] as const;

/** The whole scene. It is rendered twice (top half / bottom half) so the exit can split it open. */
const Stage = ({ step }: { step: number }) => {
  const inLine = step < 0;
  const dark = !inLine && step % 2 === 1;
  const pct = inLine ? 0 : Math.round(((step + 1) / SEQUENCE.length) * 100);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* 1. a single line draws across the black */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: LINE_MS / 1000 - 0.05, ease: EASE }}
        className="absolute left-0 right-0 top-1/2 h-px origin-left bg-oxblood"
      />

      {/* 2. the line opens into a window — the roles strobe inside it */}
      <motion.div
        initial={{ clipPath: 'inset(50% 0% 50% 0%)' }}
        animate={{ clipPath: inLine ? 'inset(50% 0% 50% 0%)' : 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 0.55, ease: EASE }}
        className={`absolute inset-0 flex items-center justify-center ${
          dark ? 'bg-ink text-paper' : 'bg-paper text-ink'
        }`}
      >
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" />

        {!inLine && (
          <div className="px-4 text-[clamp(2.5rem,11.5vw,11rem)] leading-none">
            <span className="font-display font-black uppercase tracking-tighter">
              {SEQUENCE[step].word}
              <span className={dark ? 'text-paper' : 'text-oxblood'}>.</span>
            </span>
          </div>
        )}

        <div
          className={`absolute inset-x-6 top-6 flex items-center justify-between font-monopress text-[10px] uppercase tracking-[0.3em] opacity-70 sm:inset-x-10`}
        >
          <span>The Nandan Review</span>
          <span className="tabular-nums">{String(pct).padStart(3, '0')}</span>
        </div>
      </motion.div>
    </div>
  );
};

/** Black line → opening window → role strobe → screen splits apart to the page. */
const LoadingScreen = ({ isLoading, onSkip }: LoadingScreenProps) => {
  // -1 = the line, 0..SEQUENCE.length-1 = role frames
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!isLoading) return;
    setStep(-1);
    let t = LINE_MS;
    const timers = [setTimeout(() => setStep(0), t)];
    SEQUENCE.forEach(({ ms }, i) => {
      t += ms;
      if (i < SEQUENCE.length - 1) timers.push(setTimeout(() => setStep(i + 1), t));
    });
    return () => timers.forEach(clearTimeout);
  }, [isLoading]);

  // Any key skips the intro — nobody should have to sit through it
  useEffect(() => {
    if (!isLoading || !onSkip) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      onSkip();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLoading, onSkip]);

  const half = { duration: 0.95, ease: EASE };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial="in"
          animate="in"
          exit="out"
          onClick={onSkip}
          role="status"
          aria-label="Loading — Suraj Nandan, developer, coder, writer, creator"
          className="fixed inset-0 z-[200] cursor-pointer select-none overflow-hidden"
        >
          {/* the same scene twice: each copy clipped to one half, then pulled apart on exit */}
          <motion.div
            aria-hidden="true"
            variants={{ in: { y: 0 }, out: { y: '-50%' } }}
            transition={half}
            style={{ clipPath: 'inset(0 0 50% 0)' }}
            className="absolute inset-0"
          >
            <Stage step={step} />
          </motion.div>
          <motion.div
            aria-hidden="true"
            variants={{ in: { y: 0 }, out: { y: '50%' } }}
            transition={half}
            style={{ clipPath: 'inset(50% 0 0 0)' }}
            className="absolute inset-0"
          >
            <Stage step={step} />
          </motion.div>

          {onSkip && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSkip();
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute transition-colors hover:text-ink"
            >
              Skip intro <span className="hidden sm:inline">— or press any key</span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
