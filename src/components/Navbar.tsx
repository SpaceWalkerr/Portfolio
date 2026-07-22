import { useState, useEffect } from 'react';
import { Menu, X, Eye, Sun, Moon, Lamp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeModal } from './ResumeModal';
import type { Theme } from '../App';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const themeIcons: Record<Theme, typeof Sun> = {
  day: Sun,
  night: Moon,
  sepia: Lamp,
};

const themeLabels: Record<Theme, string> = {
  day: 'Day Edition',
  night: 'Night Edition',
  sepia: 'Sepia Edition',
};

const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const ThemeIcon = themeIcons[theme];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['#home', '#about', '#skills', '#experience', '#education', '#projects', '#blog', '#certifications', '#contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#blog', label: 'Blog' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveSection(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-paper/95 backdrop-blur-md border-b border-ink' : 'bg-transparent'
        }`}
        style={{ position: 'fixed', top: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-2 font-monopress text-xs uppercase tracking-[0.14em] transition-all duration-200 group hover:-translate-y-0.5 ${
                    activeSection === link.href ? 'text-oxblood' : 'text-ink hover:text-oxblood'
                  }`}
                >
                  {link.label}

                  {/* Active indicator underline */}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-oxblood"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover underline */}
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-px bg-ink/40 transition-all duration-200 group-hover:w-full"></span>
                </motion.a>
              ))}

              {/* Theme toggle — Desktop */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length }}
                onClick={onToggleTheme}
                aria-label={`Switch to next theme (current: ${themeLabels[theme]})`}
                className="ml-3 flex items-center gap-2 border border-ink/30 px-3 py-2 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-mute transition-colors hover:border-ink hover:text-ink"
              >
                <ThemeIcon size={14} />
                <span className="hidden xl:inline">{themeLabels[theme]}</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:hidden absolute right-4 p-2.5 border border-ink/40 bg-paper-bright/70 text-ink hover:text-oxblood hover:border-oxblood transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-ink/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-paper border-l-2 border-ink shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8 border-b-4 border-double border-ink pb-4">
                  <span className="font-editorial text-lg italic text-ink">The Index</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 border border-ink/40 text-ink hover:text-oxblood hover:border-oxblood transition-all duration-300"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-1 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`flex items-center justify-between border-b border-ink/15 px-1 py-3.5 font-monopress text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                        activeSection === link.href
                          ? 'text-oxblood'
                          : 'text-ink hover:text-oxblood'
                      }`}
                    >
                      <span>{link.label}</span>
                      {activeSection === link.href && (
                        <motion.span
                          layoutId="activeMobileSection"
                          className="h-1.5 w-1.5 bg-oxblood"
                        />
                      )}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Theme Toggle */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => {
                    onToggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full border border-ink/40 px-5 py-3.5 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink-mute transition-colors duration-300 hover:border-ink hover:text-ink mb-3"
                >
                  <ThemeIcon size={16} />
                  <span>{themeLabels[theme]}</span>
                </motion.button>

                {/* Mobile Resume Button */}
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 w-full bg-ink px-5 py-3.5 font-monopress text-[11px] uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:bg-oxblood"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                >
                  <span>The Résumé</span>
                  <Eye className="w-4 h-4" />
                </motion.button>

                {/* Mobile Footer */}
                <div className="mt-8 border-t border-ink/20 pt-6">
                  <p className="text-center font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    © 2026 The Nandan Review
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </>
  );
};

export default Navbar;
