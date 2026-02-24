import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

/* ─── Particle System ─── */
const makeParticles = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random(),                       // depth layer 0‑1
    size: Math.random() * 2 + 0.8,
    dur: Math.random() * 4 + 3,
    delay: Math.random() * 2,
    drift: (Math.random() - 0.5) * 50,
    hue: Math.random() > 0.7 ? 270 : 190,  // some purple, mostly cyan
  }));

/* ─── Circuit trace paths (radiating from centre) ─── */
const circuitPaths = [
  'M 50,50 L 50,20 L 65,20 L 65,10',
  'M 50,50 L 80,50 L 80,30 L 92,30',
  'M 50,50 L 50,80 L 35,80 L 35,92',
  'M 50,50 L 20,50 L 20,70 L 8,70',
  'M 50,50 L 70,30 L 85,30 L 85,15',
  'M 50,50 L 30,70 L 15,70 L 15,85',
  'M 50,50 L 75,65 L 90,65 L 90,80',
  'M 50,50 L 25,35 L 10,35 L 10,20',
];

/* ─── EQ Visualiser bar count ─── */
const EQ_BARS = 40;

/* ─── Typing effect hook ─── */
const useTyping = (text: string, startDelay: number, speed = 40) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let idx = 0;
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        idx++;
        setDisplay(text.slice(0, idx));
        if (idx >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay, speed]);
  return display;
};

/* ─── Glitch text component ─── */
const GlitchText = ({ text, active }: { text: string; active: boolean }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!active) return;
    // Random micro‑glitch bursts
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <span className="relative inline-flex">
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      {/* Chromatic aberration layers */}
      {glitch && (
        <>
          <span
            className="absolute inset-0 text-cyan-400/70 z-0"
            style={{ transform: 'translate(-2px, 1px)', clipPath: 'inset(15% 0 40% 0)' }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-purple-400/70 z-0"
            style={{ transform: 'translate(2px, -1px)', clipPath: 'inset(50% 0 10% 0)' }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

/* ═══════════════════════════════════════════════════════════════ */

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0);          // 0→1→2→3
  const particles = useMemo(() => makeParticles(70), []);

  // EQ bar heights driven by progress
  const eqHeights = useMemo(
    () =>
      Array.from({ length: EQ_BARS }, (_, i) => {
        const angle = (i / EQ_BARS) * Math.PI * 2;
        const wave = Math.sin(angle * 3 + count * 0.08) * 0.5 + 0.5;
        return 6 + wave * 14 * (count / 100);
      }),
    [count],
  );

  // Typed HUD lines
  const hud1 = useTyping('SYS.BOOT //INITIALIZING', 600);
  const hud2 = useTyping('LOADING MODULES ████████', 1200);
  const hud3 = useTyping('PORTFOLIO.V3 — READY', 2000);
  const hudR1 = useTyping('REACT 18 · TYPESCRIPT', 800);
  const hudR2 = useTyping('VITE · TAILWIND · FRAMER', 1400);
  const hudR3 = useTyping('STATUS: OPERATIONAL', 2200);

  /* ── Progress counter (cubic ease‑out) ── */
  useEffect(() => {
    if (!isLoading) return;
    let frame: number;
    const start = performance.now();
    const dur = 2800;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.92,
            filter: 'blur(20px) brightness(2)',
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020617] overflow-hidden select-none"
        >
          {/* ═══════ LAYER 1 — Background ═══════ */}

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020617_100%)]" />

          {/* Breathing orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.15, 0.06] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500 rounded-full blur-[180px]"
          />

          {/* ═══════ LAYER 2 — Circuit Traces ═══════ */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="circuit-g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {circuitPaths.map((d, i) => (
              <g key={`cir-${i}`}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="url(#circuit-g)"
                  strokeWidth="0.15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Travelling dot on circuit */}
                <motion.circle
                  r="0.4"
                  fill="#06b6d4"
                  initial={{ offsetDistance: '0%', opacity: 0 }}
                  animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.5, delay: 0.15 * i + 0.5, ease: 'easeInOut' }}
                  style={{ offsetPath: `path("${d}")` } as any}
                />
                {/* Node dot at path end */}
                <motion.circle
                  cx={d.split(' ').slice(-1)[0].split(',')[0]}
                  cy={d.split(' ').slice(-1)[0].split(',')[1]}
                  r="0.5"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="0.2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0.4] }}
                  transition={{ duration: 0.6, delay: 0.15 * i + 2 }}
                />
              </g>
            ))}
          </svg>

          {/* Scanning line */}
          <motion.div
            initial={{ top: '-4%' }}
            animate={{ top: '104%' }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-px z-10"
          >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
            <div className="w-full h-16 bg-gradient-to-b from-cyan-500/[0.03] to-transparent" />
          </motion.div>

          {/* ═══════ LAYER 3 — Constellation Particles ═══════ */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {particles.slice(0, 24).map((p, i) => {
              const next = particles[(i + 4) % 24];
              return (
                <motion.line
                  key={`ln-${i}`}
                  x1={`${p.x}%`} y1={`${p.y}%`}
                  x2={`${next.x}%`} y2={`${next.y}%`}
                  stroke={`hsla(${p.hue}, 80%, 60%, 0.12)`}
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.25, 0.25, 0] }}
                  transition={{ duration: 5, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
                />
              );
            })}
          </svg>

          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full z-10"
              initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.7 * (0.3 + p.z * 0.7), 0.3, 0.7 * (0.3 + p.z * 0.7), 0],
                scale: [0, 1, 0.5, 1, 0],
                y: [0, p.drift, -p.drift * 0.4, p.drift * 0.2, 0],
              }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: p.size * (0.5 + p.z * 0.5),
                height: p.size * (0.5 + p.z * 0.5),
                background: `radial-gradient(circle, hsla(${p.hue},85%,65%,0.9) 0%, transparent 70%)`,
                boxShadow: `0 0 ${p.size * 5}px ${p.size}px hsla(${p.hue},85%,55%,0.2)`,
              }}
            />
          ))}

          {/* ═══════ LAYER 4 — Central Hub ═══════ */}
          <div className="relative flex flex-col items-center gap-8 sm:gap-10 z-20">

            {/* ── Logo Container ── */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Pulse rings */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`pr-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    inset: `-${18 + i * 14}px`,
                    border: `1px solid hsla(190, 85%, 55%, ${0.2 - i * 0.04})`,
                  }}
                  animate={{ scale: [1, 1.6 + i * 0.25], opacity: [0.6, 0] }}
                  transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}

              {/* Orbiting satellites */}
              {[
                { size: 1.5, color: '#06b6d4', shadow: 'rgba(6,182,212,0.6)', radius: 65, dur: 5, dir: 1 },
                { size: 1, color: '#8b5cf6', shadow: 'rgba(139,92,246,0.5)', radius: 85, dur: 7, dir: -1 },
                { size: 0.8, color: '#3b82f6', shadow: 'rgba(59,130,246,0.4)', radius: 100, dur: 9, dir: 1 },
              ].map((sat, i) => (
                <motion.div
                  key={`sat-${i}`}
                  className="absolute rounded-full"
                  animate={{ rotate: 360 * sat.dir }}
                  transition={{ duration: sat.dur, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: sat.size * 2, height: sat.size * 2,
                    top: '50%', left: '50%',
                    marginTop: -sat.size, marginLeft: -sat.size,
                    transformOrigin: `0 -${sat.radius}px`,
                    backgroundColor: sat.color,
                    boxShadow: `0 0 ${sat.size * 8}px ${sat.size * 2}px ${sat.shadow}`,
                  }}
                />
              ))}

              {/* Main frame */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">

                {/* EQ visualiser ring */}
                <svg viewBox="0 0 200 200" className="absolute inset-[-20px] sm:inset-[-24px] w-[calc(100%+40px)] h-[calc(100%+40px)] sm:w-[calc(100%+48px)] sm:h-[calc(100%+48px)]">
                  <defs>
                    <linearGradient id="eq-g" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  {eqHeights.map((h, i) => {
                    const angle = (i / EQ_BARS) * 360 - 90;
                    const rad = (angle * Math.PI) / 180;
                    const innerR = 72;
                    const x1 = 100 + Math.cos(rad) * innerR;
                    const y1 = 100 + Math.sin(rad) * innerR;
                    const x2 = 100 + Math.cos(rad) * (innerR + h);
                    const y2 = 100 + Math.sin(rad) * (innerR + h);
                    return (
                      <line
                        key={`eq-${i}`}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="url(#eq-g)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        opacity={0.5 + (h / 20) * 0.5}
                      />
                    );
                  })}
                </svg>

                {/* Hexagon frame */}
                <svg viewBox="0 0 140 140" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="hx-g" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <filter id="hx-glow">
                      <feGaussianBlur stdDeviation="4" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="hx-glow-soft">
                      <feGaussianBlur stdDeviation="2" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  {/* Outer hex */}
                  <motion.polygon
                    points="70,5 130,35 130,105 70,135 10,105 10,35"
                    fill="none"
                    stroke="url(#hx-g)"
                    strokeWidth="1.8"
                    filter="url(#hx-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Inner hex — rotate slowly */}
                  <motion.polygon
                    points="70,20 118,42 118,98 70,120 22,98 22,42"
                    fill="rgba(6,182,212,0.015)"
                    stroke="url(#hx-g)"
                    strokeWidth="0.5"
                    filter="url(#hx-glow-soft)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.35, rotate: 360 }}
                    transition={{
                      pathLength: { duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 1.6, delay: 0.3 },
                      rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                    }}
                    style={{ transformOrigin: '70px 70px' }}
                  />
                  {/* Cross hairs */}
                  {[0, 60, 120].map((angle) => {
                    const rad1 = ((angle - 90) * Math.PI) / 180;
                    const rad2 = ((angle + 90) * Math.PI) / 180;
                    return (
                      <motion.line
                        key={`ch-${angle}`}
                        x1={70 + Math.cos(rad1) * 55}
                        y1={70 + Math.sin(rad1) * 55}
                        x2={70 + Math.cos(rad2) * 55}
                        y2={70 + Math.sin(rad2) * 55}
                        stroke="url(#hx-g)"
                        strokeWidth="0.3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ delay: 1.5 }}
                      />
                    );
                  })}
                </svg>

                {/* SVG-drawn S + N initials */}
                <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10">
                  <defs>
                    <linearGradient id="sn-g" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <filter id="sn-glow">
                      <feGaussianBlur stdDeviation="2.5" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d="M25,38 C25,30 32,24 40,24 C48,24 53,30 53,36 C53,46 25,42 25,56 C25,62 32,68 40,68 C48,68 53,62 53,56"
                    fill="none" stroke="url(#sn-g)" strokeWidth="3.5"
                    strokeLinecap="round" filter="url(#sn-glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.path
                    d="M58,68 L58,24 L78,68 L78,24"
                    fill="none" stroke="url(#sn-g)" strokeWidth="3.5"
                    strokeLinecap="round" strokeLinejoin="round" filter="url(#sn-glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>

                {/* Central glow halo */}
                <motion.div
                  animate={{ opacity: [0.04, 0.12, 0.04] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-[-30%] bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-3xl pointer-events-none"
                />
              </div>
            </motion.div>

            {/* ── Name reveal with glitch ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex overflow-hidden" style={{ perspective: '800px' }}>
                {'SURAJ NANDAN'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 60, opacity: 0, rotateX: -90, scale: 0.5 }}
                    animate={
                      phase >= 2
                        ? { y: 0, opacity: 1, rotateX: 0, scale: 1 }
                        : {}
                    }
                    transition={{
                      delay: i * 0.04,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={
                      char === ' '
                        ? 'w-3 sm:w-5'
                        : 'text-2xl sm:text-3xl font-bold tracking-[0.3em] bg-gradient-to-b from-white via-slate-100 to-slate-500 bg-clip-text text-transparent'
                    }
                  >
                    {char === ' ' ? '\u00A0' : (
                      <GlitchText text={char} active={phase >= 3} />
                    )}
                  </motion.span>
                ))}
              </div>

              {/* Role subtitle with line-draw animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={phase >= 2 ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={phase >= 2 ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500/50 origin-right"
                />
                <span className="text-[10px] sm:text-xs tracking-[0.6em] uppercase text-cyan-400/40 font-light">
                  Full Stack Developer
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={phase >= 2 ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-500/50 origin-left"
                />
              </motion.div>
            </motion.div>

            {/* ── Progress System ── */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col items-center gap-4 w-60 sm:w-72"
            >
              {/* Segmented progress bar */}
              <div className="w-full flex gap-[2px]">
                {Array.from({ length: 30 }, (_, i) => {
                  const filled = (i / 30) * 100 < count;
                  return (
                    <div
                      key={`seg-${i}`}
                      className="flex-1 h-[3px] rounded-[1px] transition-all duration-150"
                      style={{
                        background: filled
                          ? `hsl(${190 + i * 2.5}, 80%, 55%)`
                          : 'rgba(30,41,59,0.5)',
                        boxShadow: filled
                          ? `0 0 6px 1px hsla(${190 + i * 2.5}, 80%, 55%, 0.3)`
                          : 'none',
                      }}
                    />
                  );
                })}
              </div>

              {/* Counter */}
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="text-4xl sm:text-5xl font-mono font-black tabular-nums bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  style={{ textShadow: '0 0 30px rgba(6,182,212,0.3)' }}
                >
                  {String(count).padStart(3, '0')}
                </motion.span>
                <span className="text-slate-600 text-base font-mono font-light">%</span>
              </div>

              {/* Status text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 3 ? 1 : 0.4 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={phase >= 3 ? { backgroundColor: '#06b6d4' } : { opacity: [0.3, 1, 0.3] }}
                  transition={phase >= 3 ? {} : { duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                />
                <span className="text-[10px] sm:text-xs font-mono tracking-wider text-slate-500 uppercase">
                  {phase >= 3 ? 'System Ready' : 'Initializing'}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ═══════ LAYER 5 — HUD Elements ═══════ */}

          {/* Corner brackets */}
          {[
            'top-4 left-4 border-l-2 border-t-2',
            'top-4 right-4 border-r-2 border-t-2',
            'bottom-4 left-4 border-l-2 border-b-2',
            'bottom-4 right-4 border-r-2 border-b-2',
          ].map((pos, i) => (
            <motion.div
              key={`c-${i}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute ${pos} w-5 h-5 sm:w-7 sm:h-7 border-cyan-500/30`}
            />
          ))}

          {/* Corner micro-accents */}
          {[
            { pos: 'top-4 left-12 sm:left-14', w: 'w-4 sm:w-6 h-px' },
            { pos: 'top-12 sm:top-14 left-4', w: 'w-px h-4 sm:h-6' },
            { pos: 'top-4 right-12 sm:right-14', w: 'w-4 sm:w-6 h-px' },
            { pos: 'top-12 sm:top-14 right-4', w: 'w-px h-4 sm:h-6' },
          ].map((a, i) => (
            <motion.div
              key={`ma-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`absolute ${a.pos} ${a.w} bg-cyan-500/30`}
            />
          ))}

          {/* Typed HUD readouts — left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-6 left-6 sm:left-14 font-mono text-[8px] sm:text-[10px] text-cyan-500/60 leading-loose hidden sm:block"
          >
            <p>{hud1}<span className="animate-pulse">▌</span></p>
            <p>{hud2}</p>
            <p className="text-cyan-400/70 font-semibold">{hud3}</p>
          </motion.div>

          {/* Typed HUD readouts — right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-6 right-6 sm:right-14 font-mono text-[8px] sm:text-[10px] text-cyan-500/60 leading-loose text-right hidden sm:block"
          >
            <p>{hudR1}</p>
            <p>{hudR2}</p>
            <p className="text-cyan-400/70 font-semibold">{hudR3}</p>
          </motion.div>

          {/* Top HUD bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.2, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-4 left-1/2 -translate-x-1/2 w-40 sm:w-56 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 1 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] sm:text-[9px] text-cyan-500/50 tracking-[0.4em] uppercase hidden sm:block"
          >
            PORTFOLIO // 2026
          </motion.div>

          {/* Bottom divider bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.2, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-56 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent hidden sm:block"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
