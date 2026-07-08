import { useState } from "react";
import { DescentProvider } from "./lib/DescentContext";
import { ScrollTrigger } from "./lib/gsap";
import IntroTrailer from "./components/IntroTrailer";
import CursorTrail from "./components/CursorTrail";
import DepthGauge from "./components/DepthGauge";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Versions from "./sections/Versions";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

/**
 * "The Descent" — a scroll through the water column. The signature system
 * (design tokens, depth gauge, cursor trail) is wired once here; each section
 * just consumes the active accent via var(--accent). Order matches the depth
 * table in lib/sections.ts so the gauge and IntersectionObserver stay in sync.
 */
export default function App() {
  // Plays on every fresh load / refresh (no session gate — by request).
  const [introDone, setIntroDone] = useState(false);

  const handleIntroDone = () => {
    setIntroDone(true);
    // Recompute every ScrollTrigger now that the overlay released and the real
    // scroll layout is settled (fonts + posters in).
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <DescentProvider>
      {!introDone && <IntroTrailer onDone={handleIntroDone} />}
      <CursorTrail />
      <DepthGauge />
      <Nav />

      <main className="relative">
        <Hero />
        <Versions />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
        
      </main>

      <Footer />
    </DescentProvider>
  );
}
