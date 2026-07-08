import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeModal } from './ResumeModal';

const navLinks = [
  { href: '#home', label: 'boot' },
  { href: '#about', label: 'whoami' },
  { href: '#skills', label: 'stack' },
  { href: '#experience', label: 'log' },
  { href: '#education', label: 'credentials' },
  { href: '#projects', label: 'ls_projects' },
  { href: '#certifications', label: 'achievements' },
  { href: '#contact', label: 'connect' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const element = document.querySelector(link.href);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.href);
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
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'border-b border-neon-cyan/20 bg-void/95 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="font-mono text-xs uppercase tracking-[0.24em] text-neon-cyan-bright"
            >
              ~/suraj
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3 py-2 font-mono text-[11px] lowercase tracking-[0.08em] transition-colors ${
                    activeSection === link.href ? 'text-neon-pink' : 'text-ink hover:text-neon-cyan-bright'
                  }`}
                >
                  ./{link.label}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-neon-pink shadow-[0_0_8px_rgba(255,94,168,0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              <button
                onClick={() => setResumeModalOpen(true)}
                className="ml-3 flex items-center gap-1.5 border border-neon-cyan/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink transition-colors hover:border-neon-pink hover:text-neon-pink"
              >
                <FileText size={13} /> resume
              </button>
            </div>

            <button
              className="border border-neon-cyan/30 p-2 text-ink transition-colors hover:border-neon-pink hover:text-neon-pink lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-void/80 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-[280px] overflow-y-auto border-l border-neon-cyan/25 bg-void-deep shadow-2xl lg:hidden"
            >
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between border-b border-neon-cyan/20 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-neon-cyan-bright">menu.sh</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border border-neon-cyan/30 p-2 text-ink transition-colors hover:border-neon-pink hover:text-neon-pink"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mb-6 space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`flex items-center justify-between border-b border-white/5 px-1 py-3.5 font-mono text-xs lowercase tracking-[0.08em] transition-colors ${
                        activeSection === link.href ? 'text-neon-pink' : 'text-ink hover:text-neon-cyan-bright'
                      }`}
                    >
                      <span>./{link.label}</span>
                      {activeSection === link.href && <motion.span layoutId="activeMobileSection" className="h-1.5 w-1.5 bg-neon-pink" />}
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 bg-neon-pink/90 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-void shadow-[0_0_18px_rgba(255,94,168,0.4)] transition-colors hover:bg-neon-pink"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                >
                  <FileText size={15} /> resume.pdf
                </button>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    session active — 2026
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
