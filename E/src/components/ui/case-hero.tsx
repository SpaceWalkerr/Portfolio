import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { ResumeModal } from '../ResumeModal';
import { CaseButton, RedactedText, Stamp, caseEase } from './casefile';
import { useTypewriter } from '../../hooks/useTypewriter';

interface CaseHeroProps {
  introDone?: boolean;
}

const reportLines = [
  '"Passionate about building intelligent systems',
  'that solve real-world problems." Subject is a',
  'full-stack developer bridging modern web',
  'technologies and AI. Investigation continues below.',
];

const stats = [
  { value: '3+', label: 'years active' },
  { value: '20+', label: 'cases closed' },
  { value: '20+', label: 'methods known' },
  { value: '60+', label: 'records on file' },
];

const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: caseEase },
  }),
};

const CaseHero = ({ introDone = true }: CaseHeroProps) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { lines, done } = useTypewriter({ lines: reportLines, active: introDone, typeMs: 12, linePauseMs: 160 });

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-paper text-ink">
      <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-28 sm:px-8">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={introDone ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-x-6 gap-y-3 border-y-2 border-ink/70 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute sm:grid-cols-4"
        >
          <div>
            <span className="block text-ink-mute/70">Case No.</span>
            <span className="text-ink">SN-2026</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Opened</span>
            <span className="text-ink">2023, Chennai</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Subject</span>
            <span className="text-ink">S. Nandan</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Status</span>
            <span className="text-blood">Active</span>
          </div>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="mt-10">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-blood">The Case File Of</p>
            {!reduceMotion && <Stamp label="Open Case" />}
          </div>

          <h1 className="mt-5 font-display text-4xl uppercase leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <RedactedText delay={0.3}>Suraj Nandan</RedactedText>
          </h1>

          <div className="mt-7 max-w-xl border-l-4 border-blood/70 pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">Investigator&apos;s Report</p>
            <pre className="mt-2 min-h-[96px] whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-ink sm:text-[14px]">
              {lines.join('\n')}
              {!done && !reduceMotion && <span className="animate-caret-blink inline-block h-3.5 w-2 translate-y-[2px] bg-ink" />}
            </pre>
          </div>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="mt-8 flex flex-wrap gap-4">
          <CaseButton onClick={scrollToProjects} variant="solid">
            Open Case File <ArrowDownRight size={15} />
          </CaseButton>
          <CaseButton onClick={() => setResumeOpen(true)} variant="outline">
            Request Full Dossier <Download size={15} />
          </CaseButton>
        </motion.div>

        <motion.dl
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={introDone ? 'visible' : 'hidden'}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t-2 border-ink/25 pt-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-2xl text-ink sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default CaseHero;
