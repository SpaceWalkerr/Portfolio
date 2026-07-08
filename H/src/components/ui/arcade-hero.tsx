import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { ResumeModal } from '../ResumeModal';
import { ArcadeButton, arcadeEase } from './arcade';

interface ArcadeHeroProps {
  introDone?: boolean;
}

const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.09, ease: arcadeEase },
  }),
};

const highScores = [
  { value: '3+', label: 'Years Played' },
  { value: '20+', label: 'Levels Cleared' },
  { value: '20+', label: 'Power-Ups' },
  { value: '60+', label: 'Achievements' },
];

const ArcadeHero = ({ introDone = true }: ArcadeHeroProps) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-void text-ink">
      <div className="pixel-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={introDone ? 'visible' : 'hidden'}
          className="grid w-full grid-cols-2 gap-x-6 gap-y-3 border-y-4 border-ink/70 py-4 font-mono text-sm uppercase text-ink-mute sm:grid-cols-4"
        >
          <div>
            <span className="block text-ink-mute/70">Player</span>
            <span className="text-ink">S. Nandan</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Continent</span>
            <span className="text-ink">Chennai, IN</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Lives</span>
            <span className="text-ink">&#9829;&#9829;&#9829;</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Status</span>
            <span className="text-gold">Ready</span>
          </div>
        </motion.div>

        <motion.p custom={1} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="mt-10 font-display text-[10px] uppercase text-cyan">
          The Arcade Cabinet Of
        </motion.p>

        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={introDone ? 'visible' : 'hidden'}
          className="mt-5 font-display text-3xl leading-relaxed text-gold sm:text-5xl lg:text-6xl"
          style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.55)' }}
        >
          Suraj
          <br />
          Nandan
        </motion.h1>

        <motion.p custom={3} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="mx-auto mt-7 max-w-xl font-mono text-xl leading-relaxed text-ink-mute">
          &ldquo;Passionate about building intelligent systems that solve real-world problems.&rdquo; A full-stack
          developer bridging modern web technologies and AI — select a level below to continue.
        </motion.p>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="mt-9 flex flex-wrap justify-center gap-5">
          <ArcadeButton onClick={scrollToProjects} variant="solid">
            Start Game <ArrowDownRight size={15} />
          </ArcadeButton>
          <ArcadeButton onClick={() => setResumeOpen(true)} variant="outline">
            Load File <Download size={15} />
          </ArcadeButton>
        </motion.div>

        {!reduceMotion && introDone && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="animate-blink-hard mt-10 font-display text-[10px] uppercase text-ink-mute"
          >
            Press Start
          </motion.p>
        )}

        <motion.dl
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate={introDone ? 'visible' : 'hidden'}
          className="mt-12 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t-4 border-ink/50 pt-6 sm:grid-cols-4"
        >
          {highScores.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-lg text-ink sm:text-xl">{s.value}</dt>
              <dd className="mt-2 font-mono text-sm uppercase text-ink-mute">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default ArcadeHero;
