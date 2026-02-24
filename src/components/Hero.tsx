import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Code2, Database, Zap, Terminal } from 'lucide-react';
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
      {/* Animated gradient background with parallax */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          x: mousePosition.x * 15,
          y: mousePosition.y * 15,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 15,
          mass: 0.5
        }}
      >
        <div className="absolute inset-0 opacity-40" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
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
            className="space-y-6 sm:space-y-7 text-left"
          >
            {/* Small intro text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-cyan-400 to-transparent"></div>
              <span className="text-cyan-400/80 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
                Full Stack Developer
              </span>
            </motion.div>

            {/* Main Heading with improved hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="space-y-2 sm:space-y-3"
            >
              <h1 className="leading-[1.1]">
                <span className="block text-slate-400 text-lg sm:text-xl md:text-2xl font-normal mb-2">Hi, I'm</span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 relative">
                  Suraj Nandan
                  {/* Soft glow behind name */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-20 -z-10"></span>
                </span>
              </h1>
            </motion.div>

            {/* Subheading with better readability */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4, 
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed"
            >
              I design and develop high-performance web applications, AI-powered systems, and user-focused platforms that turn complex ideas into real-world solutions.
            </motion.p>

            {/* Short Intro Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5, 
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed"
            >
              From financial platforms to enterprise systems, I build technology that is fast, reliable, and impactful.
            </motion.p>

            {/* CTA Buttons - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            >
              {/* Primary Button with enhanced glow */}
              <button
                onClick={() => scrollToSection('#projects')}
                className="group relative px-7 py-4 sm:px-9 sm:py-4.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-base font-semibold rounded-xl overflow-hidden transition-all duration-300 ease-out flex items-center justify-center gap-2.5 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(6,182,212,0.5)] active:scale-[0.98]"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Soft glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
              
              {/* Secondary Button - Enhanced Glassmorphism */}
              <a
                href="/Suraj_Resume.pdf"
                download="Suraj_Nandan_Resume.pdf"
                className="group relative px-7 py-4 sm:px-9 sm:py-4.5 bg-slate-800/40 backdrop-blur-md text-white text-base font-semibold rounded-xl border border-slate-600/50 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-slate-800/60 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] active:scale-[0.98] flex items-center justify-center"
              >
                <span className="relative z-10">Download Resume</span>
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-sm"></div>
                  <div className="absolute inset-[1px] rounded-xl bg-slate-800/80 backdrop-blur-md"></div>
                </div>
                {/* Content overlay */}
               
              </a>
            </motion.div>

            {/* Social Links - Refined */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.7, 
                duration: 0.5,
              }}
              className="flex items-center gap-3 pt-1"
            >
              <a
                href="https://github.com/SpaceWalkerr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-11 h-11 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/70 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <Github size={19} />
                <div className="absolute inset-0 rounded-xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
              <a
                href="https://www.linkedin.com/in/surajnandan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-11 h-11 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/70 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <Linkedin size={19} />
                <div className="absolute inset-0 rounded-xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
              <a
                href="mailto:surajnandan78@gmail.com"
                aria-label="Send email"
                className="w-11 h-11 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800/70 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <Mail size={19} />
                <div className="absolute inset-0 rounded-xl bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Tech Stack Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ 
              delay: 0.5,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="relative hidden lg:flex items-center justify-center h-full"
          >
            <motion.div 
              className="relative w-full max-w-lg h-[500px]"
              animate={{
                x: mousePosition.x * -15,
                y: mousePosition.y * -15,
              }}
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 20
              }}
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
              
              {/* Floating Tech Cards */}
              {/* Card 1 - Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute top-8 left-8 group"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-500/30">
                      <Code2 className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Frontend</p>
                      <p className="text-xs text-slate-400">React, Next.js</p>
                    </div>
                  </div>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </motion.div>
              </motion.div>

              {/* Card 2 - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute top-24 right-8 group"
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="relative backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center border border-blue-500/30">
                      <Database className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Backend</p>
                      <p className="text-xs text-slate-400">Node, Python</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </motion.div>
              </motion.div>

              {/* Card 3 - Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="relative backdrop-blur-xl bg-slate-800/60 border border-slate-600/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-2xl"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center border border-purple-500/30">
                      <Zap className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">AI & ML</p>
                      <p className="text-xs text-slate-400">TensorFlow, PyTorch</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  {/* Center glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-20"></div>
                </motion.div>
              </motion.div>

              {/* Card 4 - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="absolute bottom-24 left-12 group"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                  className="relative backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-600/20 flex items-center justify-center border border-cyan-500/30">
                      <Terminal className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">DevOps</p>
                      <p className="text-xs text-slate-400">Docker, AWS</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </motion.div>
              </motion.div>

              {/* Decorative floating dots */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-cyan-400"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-blue-400"
              />
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-purple-400"
              />
            </motion.div>
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
