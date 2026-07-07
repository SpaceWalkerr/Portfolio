import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { ResumeModal } from '../ResumeModal';
import { FieldButton, fieldEase } from './fieldguide';

interface FieldHeroProps {
  introDone?: boolean;
}

const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, delay: 0.2 + i * 0.1, ease: fieldEase },
  }),
};

const stats = [
  { value: '3+', label: 'Seasons in the Field' },
  { value: '20+', label: 'Specimens Catalogued' },
  { value: '20+', label: 'Techniques Recorded' },
  { value: '60+', label: 'Certified Findings' },
];

/** A fern frond that unfurls as you scroll through the hero — real stroke-dasharray reveal. */
const FrondIllustration = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end start'] });

  const stem = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const leafletsA = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const leafletsB = useTransform(scrollYProgress, [0.3, 0.75], [0, 1]);

  const p = (v: typeof stem) => (reduceMotion ? 1 : v);

  const leaflets = [
    { y: 40, len: 70, side: 1, prog: leafletsA },
    { y: 90, len: 85, side: -1, prog: leafletsA },
    { y: 140, len: 78, side: 1, prog: leafletsB },
    { y: 190, len: 90, side: -1, prog: leafletsB },
    { y: 240, len: 62, side: 1, prog: leafletsB },
    { y: 280, len: 66, side: -1, prog: leafletsB },
  ];

  return (
    <div ref={ref} className="relative mx-auto aspect-[3/4] w-full max-w-[320px]">
      <svg viewBox="0 0 260 340" className="h-full w-full overflow-visible" fill="none" stroke="#3f5c33" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <motion.path d="M130 320 C 128 240, 132 140, 130 20" style={{ pathLength: p(stem) }} />
        {leaflets.map((l, i) => (
          <motion.path
            key={i}
            d={`M130 ${320 - l.y} C ${130 + l.side * (l.len * 0.5)} ${320 - l.y - 10}, ${130 + l.side * l.len} ${320 - l.y - 4}, ${130 + l.side * (l.len + 10)} ${320 - l.y - 22}`}
            style={{ pathLength: p(l.prog) }}
            opacity="0.85"
          />
        ))}
      </svg>
      <div className="mt-3 flex justify-between font-serif text-[11px] italic text-ink-mute">
        <span>Fig. 1 — Specimen SN-2026</span>
        <span>Nat. Size</span>
      </div>
    </div>
  );
};

const FieldHero = ({ introDone = true }: FieldHeroProps) => {
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-paper text-ink">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-multiply" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={introDone ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-ink/40 py-4 font-serif text-[11px] uppercase tracking-[0.14em] text-ink-mute sm:grid-cols-4"
        >
          <div>
            <span className="block text-ink-mute/70">Specimen No.</span>
            <span className="text-ink">SN-2026</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Collected</span>
            <span className="text-ink">Chennai, 2023–</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Order</span>
            <span className="text-ink">Full-Stack Developer</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Status</span>
            <span className="text-forest">Actively Collecting</span>
          </div>
        </motion.div>

        <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-2">
          <div>
            <motion.p custom={1} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="font-serif text-sm italic uppercase tracking-[0.3em] text-forest">
              The Field Guide Of
            </motion.p>

            <motion.h1
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={introDone ? 'visible' : 'hidden'}
              className="mt-5 font-display text-5xl italic leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
            >
              Suraj Nandan
            </motion.h1>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={introDone ? 'visible' : 'hidden'}
              className="mt-6 max-w-lg font-serif text-lg italic leading-relaxed text-ink-mute"
            >
              &ldquo;Passionate about building intelligent systems that solve real-world problems.&rdquo; A full-stack
              developer bridging modern web technologies and AI — catalogued below, one specimen at a time.
            </motion.p>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="mt-8 flex flex-wrap gap-4">
              <FieldButton onClick={scrollToProjects} variant="solid">
                Browse the Collection <ArrowDownRight size={15} />
              </FieldButton>
              <FieldButton onClick={() => setResumeOpen(true)} variant="outline">
                Request Field Notes <Download size={15} />
              </FieldButton>
            </motion.div>

            <motion.dl
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={introDone ? 'visible' : 'hidden'}
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/25 pt-6 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl italic text-ink sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 font-serif text-[10px] uppercase tracking-[0.1em] text-ink-mute">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate={introDone ? 'visible' : 'hidden'} className="flex justify-center pb-8 lg:pb-0">
            <FrondIllustration />
          </motion.div>
        </div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default FieldHero;
