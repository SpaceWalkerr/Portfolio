import { useState, useEffect, useCallback, useRef } from 'react';
import SpaceScene from '../components/SpaceScene';
import Cockpit from '../components/Cockpit';
import HUD from '../components/HUD';
import EarthSection from '../sections/EarthSection';
import MarsSection from '../sections/MarsSection';
import VenusSection from '../sections/VenusSection';
import SaturnSection from '../sections/SaturnSection';
import ContactSection from '../sections/ContactSection';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

// Section thresholds based on scroll progress
const sectionThresholds = {
  earth: { start: 0.08, end: 0.22 },
  mars: { start: 0.26, end: 0.40 },
  venus: { start: 0.44, end: 0.58 },
  saturn: { start: 0.62, end: 0.76 },
  station: { start: 0.80, end: 0.95 },
};

const Index = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [warpSpeed, setWarpSpeed] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Determine current section based on scroll progress
  useEffect(() => {
    for (const [section, { start, end }] of Object.entries(sectionThresholds)) {
      if (scrollProgress >= start && scrollProgress <= end) {
        const sectionNames: Record<string, string> = {
          earth: 'Education',
          mars: 'Certifications',
          venus: 'Projects',
          saturn: 'About Me',
          station: 'Contact',
        };
        setCurrentSection(sectionNames[section] || '');
        return;
      }
    }
    setCurrentSection('');
  }, [scrollProgress]);

  // Handle scroll
  useEffect(() => {
    if (!isLaunched) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / scrollHeight, 0), 1);
      
      // Calculate scroll velocity for warp effect
      const velocity = Math.abs(currentScroll - lastScrollY.current);
      lastScrollY.current = currentScroll;
      
      setScrollProgress(progress);
      setWarpSpeed(Math.min(velocity * 0.1, 5));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLaunched]);

  // Decay warp speed
  useEffect(() => {
    if (warpSpeed > 0) {
      const timer = setTimeout(() => {
        setWarpSpeed(prev => Math.max(prev - 0.1, 0));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [warpSpeed]);

  // Handle launch
  const handleLaunch = useCallback(() => {
    // Launch animation
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setIsLaunched(true);
        // Scroll to trigger content appearance
        window.scrollTo(0, 0);
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 1,
        });
      },
    });
  }, []);

  // Navigate to section
  const handleNavigate = useCallback((sectionId: string) => {
    const thresholds = sectionThresholds[sectionId as keyof typeof sectionThresholds];
    if (!thresholds) return;

    const targetProgress = (thresholds.start + thresholds.end) / 2;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * scrollHeight;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 2,
      ease: 'power2.inOut',
    });
  }, []);

  // Check if section is active
  const isSectionActive = (section: keyof typeof sectionThresholds) => {
    const { start, end } = sectionThresholds[section];
    return scrollProgress >= start && scrollProgress <= end;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Space background - always visible */}
      <SpaceScene 
        scrollProgress={scrollProgress}
        isLaunched={isLaunched}
        warpSpeed={warpSpeed}
      />

      {/* Cockpit landing screen */}
      <Cockpit onLaunch={handleLaunch} isLaunched={isLaunched} />

      {/* Main scrollable content - only when launched */}
      {isLaunched && (
        <>
          {/* Scroll container */}
          <div className="relative z-10" style={{ height: '800vh' }}>
            {/* This creates the scrollable space */}
          </div>

          {/* HUD */}
          <HUD 
            scrollProgress={scrollProgress}
            currentSection={currentSection}
            onNavigate={handleNavigate}
          />

          {/* Planet sections */}
          <EarthSection isActive={isSectionActive('earth')} />
          <MarsSection isActive={isSectionActive('mars')} />
          <VenusSection isActive={isSectionActive('venus')} />
          <SaturnSection isActive={isSectionActive('saturn')} />
          <ContactSection isActive={isSectionActive('station')} />

          {/* Scroll hint at start */}
          {scrollProgress < 0.05 && (
            <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
              <div className="flex flex-col items-center gap-2 text-primary">
                <span className="font-orbitron text-xs tracking-widest animate-glow-pulse">
                  SCROLL TO EXPLORE
                </span>
                <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
                  <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
