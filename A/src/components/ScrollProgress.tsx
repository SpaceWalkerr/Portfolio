import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #9333ea)',
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 h-[6px] blur-sm bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-60"></div>
    </motion.div>
  );
};

export default ScrollProgress;
