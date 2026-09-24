import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../hooks/useDialog';

/**
 * Hidden extras:
 *  - ↑ ↑ ↓ ↓ ← → ← → B A  spins in an "Extra! Extra!" front page (the old film trope)
 *  - a note in the DevTools console for anyone curious enough to open it
 */

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

let greeted = false;
const greetConsole = () => {
  if (greeted) return;
  greeted = true;
  console.log(
    '%cThe Nandan Review%c\nHello, fellow reader of source code.\nBuilt with React, Vite, Tailwind, Framer Motion and a little Three.js.\nTry ↑ ↑ ↓ ↓ ← → ← → B A on the front page — or say hello: surajnandan78@gmail.com',
    'font: italic 20px Georgia, serif; color: #8a2a2a;',
    'font: 12px ui-monospace, monospace; line-height: 1.6;'
  );
};

const EasterEggs = () => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const panelRef = useDialog(open, () => setOpen(false));

  useEffect(() => {
    greetConsole();
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Extra edition"
            initial={reduceMotion ? { opacity: 0 } : { rotate: -1080, scale: 0.05 }}
            animate={reduceMotion ? { opacity: 1 } : { rotate: -2, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { rotate: 20, scale: 0.6, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border-2 border-ink bg-paper p-6 text-center text-ink shadow-2xl sm:p-8"
          >
            <div className="border-b-4 border-double border-ink pb-2 font-editorial text-xl italic">The Nandan Review</div>
            <div className="flex justify-between border-b border-ink py-1.5 font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
              <span>Extra Edition</span>
              <span>Price: one cheat code</span>
            </div>
            <p className="mt-5 font-monopress text-[11px] uppercase tracking-[0.4em] text-oxblood">Extra! Extra!</p>
            <h2 className="mt-2 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-5xl">
              Reader Cracks the Code
            </h2>
            <p className="mt-4 font-editorial text-[15.5px] italic leading-relaxed text-ink-mute">
              Local visitor enters ↑ ↑ ↓ ↓ ← → ← → B A; the Editor, impressed, stops the presses. Readers this curious
              are exactly who this paper is printed for.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate('/puzzle');
                }}
                className="bg-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-oxblood"
              >
                Claim your prize: the crossword
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border border-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Back to the paper
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEggs;
