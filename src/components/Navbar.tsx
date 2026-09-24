import { useState, useEffect, useRef } from 'react';
import { Menu, X, Eye, Sun, Moon, Lamp, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ResumeModal } from './ResumeModal';
import { openCommandPalette } from '../lib/commandPalette';
import { sections } from '../data/site';
import { useSectionNav } from '../hooks/useSectionNav';
import { useActiveSection } from '../hooks/useActiveSection';
import { useDialog } from '../hooks/useDialog';
import type { Theme } from '../App';

interface NavbarProps {
  theme: Theme;
  onSetTheme: (theme: Theme) => void;
}

const themeOptions: { key: Theme; label: string; Icon: typeof Sun }[] = [
  { key: 'day', label: 'Day Edition', Icon: Sun },
  { key: 'night', label: 'Night Edition', Icon: Moon },
  { key: 'sepia', label: 'Sepia Edition', Icon: Lamp },
];

const sectionIds = sections.map((s) => s.id);
// The masthead name doubles as "Home", so the link row starts at About
const navLinks = sections.filter((s) => s.id !== 'home');

const Navbar = ({ theme, onSetTheme }: NavbarProps) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const goToSection = useSectionNav();
  const activeSection = useActiveSection(sectionIds, isHome);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const drawerRef = useDialog(isMobileMenuOpen, () => setIsMobileMenuOpen(false));
  const current = themeOptions.find((o) => o.key === theme) ?? themeOptions[0];

  // Close the theme dropdown on outside click or Escape
  useEffect(() => {
    if (!themeDropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setThemeDropdownOpen(false);
    };
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [themeDropdownOpen]);

  // Only the "has scrolled" flag lives on scroll; section tracking is an IntersectionObserver
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    goToSection(id);
  };

  const isActive = (id: string) => isHome && activeSection === id;
  const solid = isScrolled || !isHome;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        aria-label="Primary"
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${
          solid ? 'border-b border-ink bg-paper/95 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8 lg:px-12">
          {/* Masthead name — home link. Hidden over the hero, which prints its own masthead. */}
          <a
            href="/"
            onClick={(e) => handleNav(e, 'home')}
            aria-hidden={!solid}
            tabIndex={solid ? undefined : -1}
            className={`shrink-0 font-editorial text-lg italic leading-none text-ink transition-all duration-500 hover:text-oxblood ${
              solid ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
            }`}
          >
            The Nandan Review
          </a>

          {/* Desktop section links — same order as the page */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleNav(e, link.id)}
                aria-current={isActive(link.id) ? 'true' : undefined}
                className={`group relative px-2.5 py-2 font-monopress text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                  isActive(link.id) ? 'text-oxblood' : 'text-ink hover:text-oxblood'
                }`}
              >
                {link.label}
                {isActive(link.id) ? (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute -bottom-0.5 left-2.5 right-2.5 h-0.5 bg-oxblood"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-ink/40 transition-all duration-200 group-hover:w-[calc(100%-1.25rem)]" />
                )}
              </a>
            ))}
          </div>

          {/* Desktop tools */}
          <div className="hidden items-center gap-2 xl:flex">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="flex items-center gap-1.5 border border-ink/30 px-3 py-2 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-mute transition-colors hover:border-ink hover:text-ink"
            >
              <Search size={13} />
              <kbd className="font-monopress">⌘K</kbd>
            </button>

            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                aria-label={`Theme: ${current.label}`}
                aria-haspopup="menu"
                aria-expanded={themeDropdownOpen}
                className="flex items-center gap-1.5 border border-ink/30 px-3 py-2 text-ink-mute transition-colors hover:border-ink hover:text-ink"
              >
                <current.Icon size={14} />
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-1 w-44 border border-ink bg-paper shadow-lg"
                  >
                    {themeOptions.map(({ key, label, Icon }) => (
                      <button
                        key={key}
                        type="button"
                        role="menuitemradio"
                        aria-checked={theme === key}
                        onClick={() => {
                          onSetTheme(key);
                          setThemeDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-3 font-monopress text-[10px] uppercase tracking-[0.14em] transition-colors ${
                          theme === key ? 'bg-ink text-paper' : 'text-ink-mute hover:bg-ink/10 hover:text-ink'
                        }`}
                      >
                        <Icon size={14} />
                        <span>{label}</span>
                        {theme === key && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-current" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="bg-ink px-4 py-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-oxblood"
            >
              Résumé
            </button>
          </div>

          {/* Mobile / tablet menu button */}
          <button
            type="button"
            className="border border-ink/40 bg-paper-bright/70 p-2.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood xl:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/50 xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site index"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-[300px] max-w-[85vw] overflow-y-auto border-l-2 border-ink bg-paper shadow-2xl xl:hidden"
            >
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between border-b-4 border-double border-ink pb-4">
                  <span className="font-editorial text-lg italic text-ink">The Index</span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border border-ink/40 p-2 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mb-6 space-y-1">
                  {sections.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={`/#${link.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index }}
                      onClick={(e) => handleNav(e, link.id)}
                      aria-current={isActive(link.id) ? 'true' : undefined}
                      className={`flex items-center justify-between border-b border-ink/15 px-1 py-3.5 font-monopress text-xs uppercase tracking-[0.16em] transition-colors ${
                        isActive(link.id) ? 'text-oxblood' : 'text-ink hover:text-oxblood'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.id) && <span className="h-1.5 w-1.5 bg-oxblood" />}
                    </motion.a>
                  ))}
                </div>

                {/* Edition */}
                <div className="mb-3 space-y-1">
                  <span className="mb-2 block px-1 font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    Edition
                  </span>
                  {themeOptions.map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={theme === key}
                      onClick={() => {
                        onSetTheme(key);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-3 py-3 font-monopress text-[11px] uppercase tracking-[0.14em] transition-colors ${
                        theme === key
                          ? 'bg-ink text-paper'
                          : 'border border-ink/20 text-ink-mute hover:border-ink hover:text-ink'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                      {theme === key && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-current" />}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="mb-2 flex w-full items-center justify-center gap-2 border border-ink/30 px-5 py-3 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink-mute transition-colors hover:border-ink hover:text-ink"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCommandPalette();
                  }}
                >
                  <Search className="h-4 w-4" />
                  <span>Search the Paper</span>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 bg-ink px-5 py-3.5 font-monopress text-[11px] uppercase tracking-[0.16em] text-paper transition-colors duration-300 hover:bg-oxblood"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                >
                  <span>The Résumé</span>
                  <Eye className="h-4 w-4" />
                </button>

                <div className="mt-8 border-t border-ink/20 pt-6">
                  <p className="text-center font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    © {new Date().getFullYear()} The Nandan Review
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
