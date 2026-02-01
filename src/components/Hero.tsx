import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to viewport center
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen h-screen flex items-center relative overflow-hidden bg-slate-950"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 animate-gradient-shift"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 1
        }}
      >
        <div className="absolute inset-0 opacity-50" style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 25%, #164e63 50%, #1e293b 75%, #1e1b4b 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        }}></div>
      </motion.div>

      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f05_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full py-8 sm:py-0">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 text-left"
          >
            {/* Small intro text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              <span className="text-cyan-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                Full Stack Developer
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3, 
                duration: 0.7,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="space-y-3 sm:space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] space-y-1">
                <span className="block text-white mb-1">Hi, I'm </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Suraj Nandan
                </span>
                <span className="block text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.3]">
                  Full Stack Developer Building
                </span>
                <span className="block text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.3]">
                  Scalable & Intelligent Digital Products
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.7,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed pt-2"
            >
              I design and develop high-performance web applications, AI-powered systems, and user-focused platforms that turn complex ideas into real-world solutions.
            </motion.p>

            {/* Short Intro Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.75, 
                duration: 0.7,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed -mt-2"
            >
              From financial platforms to enterprise systems, I build technology that is fast, reliable, and impactful.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.9, 
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6"
            >
              {/* Primary Button - Futuristic with Glow */}
              <button
                onClick={() => scrollToSection('#projects')}
                className="group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-500 ease-out flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(6,182,212,0.4)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:via-blue-500 before:to-purple-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 active:scale-95 min-h-[48px]"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                {/* Soft glow effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </button>
              
              {/* Secondary Button - Glassmorphism */}
              <a
                href="/Suraj_Resume.pdf"
                download="Suraj_Nandan_Resume.pdf"
                className="group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-slate-800/30 backdrop-blur-md text-white font-semibold rounded-xl border border-slate-700/50 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-slate-800/40 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/10 before:to-blue-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 active:scale-95 min-h-[48px] flex items-center justify-center"
              >
                <span className="relative z-10">Download Resume</span>
                {/* Border glow on hover */}
                <div className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-sm"></div>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.1, 
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="flex items-center gap-3 sm:gap-5 pt-2 sm:pt-4"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 active:scale-95"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 active:scale-95"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 active:scale-95"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </a>
            </motion.div>

            {/* Floating Glassmorphism Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.3, 
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block backdrop-blur-xl bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40 border border-slate-700/50 rounded-2xl px-6 py-4 shadow-2xl"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-300">Full Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <span className="text-sm font-medium text-slate-300">AI Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    <span className="text-sm font-medium text-slate-300">Open to Opportunities</span>
                  </div>
                </div>
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Decorative Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: mousePosition.x * -30,
              y: mousePosition.y * -30,
            }}
            transition={{ 
              opacity: { delay: 0.4, duration: 1, ease: "easeOut" },
              scale: { delay: 0.4, duration: 1, ease: "easeOut" },
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 }
            }}
            className="relative hidden lg:flex items-center justify-center h-full"
          >
            {/* Main gradient blob */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Animated gradient orbs */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-600/30 rounded-full blur-3xl"
              ></motion.div>
              
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-12 bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-2xl"
              ></motion.div>

              {/* Abstract geometric shapes */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 right-1/4 w-32 h-32 border border-cyan-500/30 rounded-2xl backdrop-blur-sm bg-slate-900/20"
              ></motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-blue-500/30 rounded-full backdrop-blur-sm bg-slate-900/20"
              ></motion.div>

              {/* Central glowing element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            className="text-cyan-400"
          >
            <path 
              d="M8 3L8 13M8 13L4 9M8 13L12 9" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
