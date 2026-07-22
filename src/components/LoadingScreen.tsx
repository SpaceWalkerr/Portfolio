import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useIdle } from '../hooks/useIdle';

interface LoadingScreenProps {
  isLoading: boolean;
}

// Three.js is a heavy dependency (~130KB gzipped) — code-split AND deferred
// until the browser reports idle time (see useIdle below). React.lazy alone
// triggers its import() on first render, which competes with the critical
// initial paint/script window for main-thread time; waiting for idle keeps
// that window clear at the cost of the 3D scene appearing a beat later.
const TypewriterScene = lazy(() => import('./ui/typewriter-loading-scene'));

/** The typewriter is the centerpiece — scale it to the viewport, not a thumbnail. */
const sceneSize = () => {
  if (typeof window === 'undefined') return { w: 560, h: 336 };
  const w = Math.min(600, Math.round(window.innerWidth * 0.9));
  return { w, h: Math.round(w * 0.6) };
};

/** Same footprint as the 3D scene, so swapping between them causes no layout shift. */
const SceneFallback = ({ progress, w, h }: { progress: number; w: number; h: number }) => (
  <div style={{ width: w, height: h }} className="flex items-center">
    <div className="relative h-[3px] w-full overflow-hidden bg-ink/10">
      <motion.div
        className="absolute inset-y-0 left-0 bg-ink"
        animate={{ width: `${progress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />
    </div>
  </div>
);

/** "Now Printing" — the press startup sequence for The Nandan Review. */
const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [{ w: sceneW, h: sceneH }] = useState(sceneSize);
  // Wait past the masthead's own entrance animation (settles ~0.85s in) so
  // the 3D chunk's fetch/parse/WebGL-init doesn't contend with — and delay —
  // that paint. Confirmed via Lighthouse: without this, the loading screen's
  // own "The Nandan Review" text (its LCP candidate) was the one taking the hit.
  const idle = useIdle(900);
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!isLoading) return;
    setProgress(0);
    const start = performance.now();
    const duration = 2600;
    let raf = 0;

    const tick = (now: number) => {
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex select-none flex-col items-center justify-center overflow-hidden bg-paper text-ink"
        >
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" />

          <div className="flex w-full max-w-2xl flex-col items-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-monopress text-[10px] uppercase tracking-[0.4em] text-oxblood"
            >
              Now Printing
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-4 font-editorial text-3xl italic sm:text-4xl"
            >
              The Nandan Review
            </motion.h1>

            {/* A typewriter, typing — the sheet reveals one more line as real load progress advances */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-7"
            >
              {idle ? (
                <Suspense fallback={<SceneFallback progress={progress} w={sceneW} h={sceneH} />}>
                  <TypewriterScene width={sceneW} height={sceneH} progress={progress} />
                </Suspense>
              ) : (
                <SceneFallback progress={progress} w={sceneW} h={sceneH} />
              )}
            </motion.div>

            <div
              style={{ width: sceneW }}
              className="mt-1 flex items-baseline justify-between font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute"
            >
              <span>Press Run</span>
              <span className="tabular-nums text-ink">{progress}%</span>
            </div>

            {!reducedMotion && (
              <motion.div
                aria-hidden="true"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-6 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-faint"
              >
                Setting Type…
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
