import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import MagneticCursor from './components/ui/magnetic-cursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Experience from './components/Experience';
import GitHubStats from './components/GitHubStats';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CommandPalette from './components/CommandPalette';
import ProjectPage from './pages/ProjectPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFound from './pages/NotFound';

export type Theme = 'day' | 'night' | 'sepia';

const Home = ({ introDone }: { introDone: boolean }) => {
  const { hash } = useLocation();

  // Deep links like /#projects (e.g. arriving from a project page) scroll to the section.
  // Wait for the intro to clear (it locks scroll), then re-align a few times as
  // below-the-fold sections keep growing while data/images load.
  useEffect(() => {
    if (!hash || !introDone) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const timers = [0, 150, 400, 800, 1400].map((d) =>
      setTimeout(() => el.scrollIntoView({ behavior: d === 0 ? 'auto' : 'smooth' }), d)
    );
    return () => timers.forEach(clearTimeout);
  }, [hash, introDone]);

  return (
    <>
      <Hero introDone={introDone} />
      <About />
      <GitHubStats />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
    </>
  );
};

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // "?noload" skips the intro loading screen (handy for dev / screenshots)
  const [isLoading, setIsLoading] = useState(
    () => isHome && !window.location.search.includes('noload')
  );

  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('press-theme');
    if (stored === 'night' || stored === 'sepia') return stored;
    return 'day';
  });

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('press-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [isLoading, setIsLoading]);

  const setTheme = (next: Theme) => setThemeState(next);

  return (
    <div className="min-h-screen bg-paper">
      <MagneticCursor />
      {isHome && <LoadingScreen isLoading={isLoading} />}
      {/* Skip to main content link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-ink focus:text-paper focus:font-monopress focus:uppercase focus:tracking-[0.16em] focus:text-xs focus:outline-none"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar theme={theme} onSetTheme={setTheme} />
      <CommandPalette theme={theme} onSetTheme={setTheme} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home introDone={!isLoading} />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
