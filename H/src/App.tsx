import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  // "?noload" skips the intro loading screen (handy for dev / screenshots)
  const [isLoading, setIsLoading] = useState(() => !window.location.search.includes('noload'));

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 1900);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-void">
      <LoadingScreen isLoading={isLoading} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-gold focus:px-6 focus:py-3 focus:font-display focus:text-[10px] focus:uppercase focus:text-void-deep focus:outline-none"
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
