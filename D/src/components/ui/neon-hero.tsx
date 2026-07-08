import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { ResumeModal } from '../ResumeModal';
import { TermButton, TerminalWindow, neonEase } from './terminal';
import { useTypewriter } from '../../hooks/useTypewriter';

interface NeonHeroProps {
  introDone?: boolean;
}

const bootLines = [
  '$ ./boot suraj.exe',
  '> INVENTOR : Suraj Nandan, Full-Stack Developer',
  '> LOCATION : Kishanganj, Bihar, IN',
  '> STACK    : React · Node · TypeScript · AI',
  '> STATUS   : OPEN_TO_WORK',
  '> ACCESS GRANTED',
];

const stats = [
  { value: '3+', label: 'yrs_experience' },
  { value: '20+', label: 'projects_shipped' },
  { value: '20+', label: 'technologies' },
  { value: '60+', label: 'certifications' },
];

const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: neonEase },
  }),
};

/** The synthwave sun + scrolling neon grid horizon behind the boot terminal. */
const Skyline = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-screen overflow-hidden" aria-hidden="true">
      <div
        className="animate-sun-pulse absolute left-1/2 top-[8%] h-40 w-40 -translate-x-1/2 rounded-full sm:h-56 sm:w-56"
        style={{
          background: 'linear-gradient(180deg,#ffd15e,#ff5ea8 55%,#c23fda)',
          boxShadow: '0 0 90px rgba(255,94,168,0.45)',
        }}
      />
      <div
        className={`absolute inset-x-[-30%] bottom-0 h-[46%] ${reduceMotion ? '' : 'animate-grid-scroll'}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(94,236,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,94,196,0.4) 1px, transparent 1px)',
          backgroundSize: '48px 34px',
          transform: 'perspective(300px) rotateX(62deg)',
          transformOrigin: 'bottom',
          WebkitMaskImage: 'linear-gradient(transparent, #000 40%)',
          maskImage: 'linear-gradient(transparent, #000 40%)',
        }}
      />
    </div>
  );
};

const NeonHero = ({ introDone = true }: NeonHeroProps) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const { lines, done } = useTypewriter({ lines: bootLines, active: introDone, typeMs: 13, linePauseMs: 120 });
  const reduceMotion = useReducedMotion();
  const contentState = done ? 'visible' : 'hidden';

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-void text-ink">
      <Skyline />
      <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-28 sm:px-8">
        <TerminalWindow title="user@suraj:~/boot" className="w-full max-w-xl">
          <pre className="min-h-[168px] whitespace-pre-wrap font-mono text-[12px] leading-[1.8] text-neon-cyan-bright sm:text-[13px]">
            {lines.map((l, i) => (
              <span key={i} className={i === bootLines.length - 1 ? 'text-neon-pink' : undefined}>
                {l}
                {'\n'}
              </span>
            ))}
            {!done && !reduceMotion && <span className="inline-block h-3.5 w-2 animate-terminal-caret bg-neon-cyan-bright align-middle" />}
          </pre>
        </TerminalWindow>

        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={contentState}
          className="mt-10 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-neon-pink">U-02 :: Synthwave / Retro-Future</p>
          <h1 className="neon-text-glow mt-5 font-display text-4xl font-black uppercase leading-[1.05] tracking-wide sm:text-6xl lg:text-7xl">
            Boot Into
            <br />
            The Cockpit
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-relaxed text-ink-mute sm:text-[15px]">
            &ldquo;Passionate about building intelligent systems that solve real-world problems.&rdquo; A full-stack
            developer bridging modern web technologies and AI — the terminal types the rest of the story below.
          </p>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate={contentState} className="mt-8 flex flex-wrap justify-center gap-4">
          <TermButton onClick={scrollToProjects} variant="solid">
            VIEW_PROJECTS <ArrowDownRight size={15} />
          </TermButton>
          <TermButton onClick={() => setResumeOpen(true)} variant="outline">
            DOWNLOAD_RESUME <Download size={15} />
          </TermButton>
        </motion.div>

        <motion.dl
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={contentState}
          className="mt-14 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-neon-cyan/20 pt-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="font-display text-2xl font-bold text-ink sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default NeonHero;
