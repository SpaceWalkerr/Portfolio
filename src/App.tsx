import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import MagneticCursor from './components/ui/magnetic-cursor';
import Hero from './components/Hero';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CommandPaletteLauncher from './components/CommandPaletteLauncher';
import { useIdle } from './hooks/useIdle';

// Everything below the hero is code-split: the first paint only needs the
// masthead, and the long-form copy (experience reports, articles, the
// certificate archive) streams in right behind it.
const About = lazy(() => import('./components/About'));
const Scoreboard = lazy(() => import('./components/Scoreboard'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Certifications = lazy(() => import('./components/Certifications'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ChangelogPage = lazy(() => import('./pages/ChangelogPage'));
const PuzzlePage = lazy(() => import('./pages/PuzzlePage'));
const EasterEggs = lazy(() => import('./components/EasterEggs'));
const AskEditor = lazy(() => import('./components/AskEditor'));

const INTRO_SEEN_KEY = 'press-intro-seen';

/** Placeholder that holds roughly a section's height while its chunk loads. */
const SectionFallback = () => <div className="min-h-screen bg-paper" aria-hidden="true" />;
const PageFallback = () => <div className="min-h-screen bg-paper" aria-hidden="true" />;

export type Theme = 'day' | 'night' | 'sepia';

const Home = ({ introDone }: { introDone: boolean }) => {
  const { hash } = useLocation();

  // Deep links like /#projects (e.g. arriving from a project page) scroll to the section.
  // Wait for the intro to clear (it locks scroll), then re-align a few times as
  // below-the-fold sections keep growing while data/images load.
  // Sections are lazy, so the target may not exist on the first tick — look it up each time.
  useEffect(() => {
    if (!hash || !introDone) return;
    const timers = [0, 150, 400, 800, 1400, 2200].map((d, i) =>
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: i === 0 ? 'auto' : 'smooth' });
      }, d)
    );
    return () => timers.forEach(clearTimeout);
  }, [hash, introDone]);

  return (
    <>
      <Hero introDone={introDone} />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Scoreboard />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Blog />
        <Contact />
      </Suspense>
    </>
  );
};

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // The intro plays once per browser session, only when arriving on the home
  // page. "?noload" skips it (handy for dev / screenshots).
  const [isLoading, setIsLoading] = useState(() => {
    if (!isHome || window.location.search.includes('noload')) return false;
    try {
      return sessionStorage.getItem(INTRO_SEEN_KEY) !== '1';
    } catch {
      return true;
    }
  });

  const finishIntro = useCallback(() => {
    setIsLoading(false);
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      /* storage unavailable — the intro simply plays again next time */
    }
  }, []);

  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('press-theme');
      if (stored === 'night' || stored === 'sepia') return stored;
    } catch {
      /* storage unavailable */
    }
    return 'day';
  });

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('press-theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(finishIntro, 3000);
    return () => clearTimeout(timer);
  }, [isLoading, finishIntro]);

  const setTheme = (next: Theme) => setThemeState(next);
  // The Letters Desk isn't needed for first paint — load it once the page settles
  const idle = useIdle(2500);

  return (
    <div className="min-h-screen bg-paper">
      <MagneticCursor />
      {isHome && <LoadingScreen isLoading={isLoading} onSkip={finishIntro} />}
      {/* Skip to main content link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-ink focus:text-paper focus:font-monopress focus:uppercase focus:tracking-[0.16em] focus:text-xs focus:outline-none"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar theme={theme} onSetTheme={setTheme} />
      <CommandPaletteLauncher theme={theme} onSetTheme={setTheme} />
      <main id="main-content">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home introDone={!isLoading} />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/puzzle" element={<PuzzlePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      {/* Vercel Web Analytics — cookieless page views; route changes are tracked automatically */}
      <Analytics />
      {idle && !isLoading && (
        <Suspense fallback={null}>
          <AskEditor />
          <EasterEggs />
        </Suspense>
      )}
    </div>
  );
}

export default App;
