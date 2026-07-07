import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 100);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return <motion.div className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-forest" style={{ scaleX: scrollYProgress }} />;
};

export default ScrollProgress;
