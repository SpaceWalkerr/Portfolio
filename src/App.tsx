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
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  // "?noload" skips the intro loading screen (handy for dev / screenshots)
  const [isLoading, setIsLoading] = useState(
    () => !window.location.search.includes('noload')
  );

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

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
      <Navbar />
      <main id="main-content">
      <Hero introDone={!isLoading} />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
