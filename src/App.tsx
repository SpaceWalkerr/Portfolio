import { useState, useEffect } from 'react';
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

export type Theme = 'day' | 'night' | 'sepia';

function App() {
  // "?noload" skips the intro loading screen (handy for dev / screenshots)
  const [isLoading, setIsLoading] = useState(
    () => !window.location.search.includes('noload')
  );

  const [theme, setTheme] = useState<Theme>(() => {
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
  }, [isLoading]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'day') return 'night';
      if (prev === 'night') return 'sepia';
      return 'day';
    });
  };

  return (
    <div className="min-h-screen bg-paper">
      <MagneticCursor />
      <LoadingScreen isLoading={isLoading} />
      {/* Skip to main content link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-ink focus:text-paper focus:font-monopress focus:uppercase focus:tracking-[0.16em] focus:text-xs focus:outline-none"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">
      <Hero introDone={!isLoading} />
      <About />
      <GitHubStats />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
