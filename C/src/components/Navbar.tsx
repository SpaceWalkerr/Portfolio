import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeModal } from './ResumeModal';

const navLinks = [
  { href: '#home', label: 'Cover' },
  { href: '#about', label: 'Disclosure' },
  { href: '#skills', label: 'Spec' },
  { href: '#experience', label: 'Log' },
  { href: '#education', label: 'Credentials' },
  { href: '#projects', label: 'Schematics' },
  { href: '#certifications', label: 'Exhibits' },
  { href: '#contact', label: 'Correspondence' },
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
          isScrolled ? 'border-b border-ink/25 bg-blueprint/95 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-pale"
            >
              SN-2026
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    activeSection === link.href ? 'text-brass' : 'text-ink hover:text-brass'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-brass"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              <button
                onClick={() => setResumeModalOpen(true)}
                className="ml-3 flex items-center gap-1.5 border border-ink/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-brass hover:text-brass"
              >
                <FileText size={13} /> Résumé
              </button>
            </div>

            <button
              className="border border-ink/40 p-2 text-ink transition-colors hover:border-brass hover:text-brass lg:hidden"
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
              className="fixed inset-0 z-40 bg-blueprint-shadow/70 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="draft-grid-deep fixed bottom-0 right-0 top-0 z-50 w-[280px] overflow-y-auto border-l-2 border-ink/60 shadow-2xl lg:hidden"
            >
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between border-b-2 border-ink/50 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-pale">Index</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border border-ink/40 p-2 text-ink transition-colors hover:border-brass hover:text-brass"
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
                      className={`flex items-center justify-between border-b border-ink/15 px-1 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                        activeSection === link.href ? 'text-brass' : 'text-ink hover:text-brass'
                      }`}
                    >
                      <span>{link.label}</span>
                      {activeSection === link.href && <motion.span layoutId="activeMobileSection" className="h-1.5 w-1.5 bg-brass" />}
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 bg-ink px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-blueprint-deep transition-colors hover:bg-brass"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                >
                  <FileText size={15} /> Résumé Exhibit
                </button>

                <div className="mt-8 border-t border-ink/20 pt-6">
                  <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    Sheet Filed 2026
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
