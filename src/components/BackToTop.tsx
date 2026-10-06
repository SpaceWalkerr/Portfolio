import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Mascot } from 'page-mascot';
import { withBase } from '../lib/utils';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-50"
        >
          {/* The penguin perches on the button and lifts with it. Its sprite fades out
              at the bottom, so it tucks ~27% behind the button's top edge. */}
          <div className="flex flex-col items-center transition-transform hover:-translate-y-1">
            <span className="-mb-[17px]">
              <Mascot
                directions={withBase('/mascots/penguin-directions.webp')}
                reactions={withBase('/mascots/penguin-reactions.webp')}
                size={64}
                label="penguin"
              />
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="relative border-2 border-ink bg-paper p-3 text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-colors hover:bg-ink hover:text-paper"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
