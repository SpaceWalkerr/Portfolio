import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

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
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 group"
        >
          <div className="relative p-3.5 rounded-xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-cyan-500/20">
            <ArrowUp size={20} />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"></div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
