import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { ResumeModal } from '../ResumeModal';
import { DraftButton } from './blueprint';

interface BlueprintHeroProps {
  introDone?: boolean;
}

const draftEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: 0.25 + i * 0.1, ease: draftEase },
  }),
};

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '20+', label: 'Technologies' },
  { value: '60+', label: 'Certifications' },
];

/**
 * The FIG. 0 system schematic — the invention this whole binder discloses.
 * Every stroke is a real SVG path whose `pathLength` is driven directly by
 * scroll progress through the hero section (framer's pathLength compiles to
 * stroke-dasharray/dashoffset under the hood), so the drawing completes
 * itself as you scroll rather than on a fixed timer.
 */
const SystemSchematic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end start'],
  });

  const orbit = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const spokeA = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  const spokeB = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const spokeC = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
  const spokeD = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);
  const core = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const nodes = [
    { cx: 150, cy: 30, label: 'CLIENT', sub: 'React · TS', spoke: spokeA, n: 1 },
    { cx: 270, cy: 150, label: 'SERVER', sub: 'Node · Express', spoke: spokeB, n: 2 },
    { cx: 150, cy: 270, label: 'DATA', sub: 'Postgres · RLS', spoke: spokeC, n: 3 },
    { cx: 30, cy: 150, label: 'AI LAYER', sub: 'RAG · LLM', spoke: spokeD, n: 4 },
  ];

  const p = (v: typeof orbit) => (reduceMotion ? 1 : v);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible" fill="none" aria-hidden="true">
        {/* outer sectional orbit, dashed like a patent reference circle */}
        <motion.circle
          cx="150"
          cy="150"
          r="120"
          stroke="#eaf2ff"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="4 5"
          style={{ pathLength: p(orbit) }}
          initial={false}
        />

        {/* spokes + nodes */}
        {nodes.map((node) => (
          <g key={node.label}>
            <motion.line
              x1="150"
              y1="150"
              x2={node.cx}
              y2={node.cy}
              stroke="#eaf2ff"
              strokeWidth="1.5"
              style={{ pathLength: p(node.spoke) }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="14"
              fill="#0f3f78"
              stroke="#c9a24a"
              strokeWidth="1.5"
              style={{ opacity: p(node.spoke) }}
            />
            <motion.text
              x={node.cx}
              y={node.cy + 4}
              textAnchor="middle"
              fontSize="11"
              fill="#c9a24a"
              fontFamily="'IBM Plex Mono', monospace"
              style={{ opacity: p(node.spoke) }}
            >
              {node.n}
            </motion.text>
            <motion.text
              x={node.cx}
              y={node.cy + (node.cy < 150 ? -22 : 32)}
              textAnchor="middle"
              fontSize="10"
              letterSpacing="1"
              fill="#eaf2ff"
              fontFamily="'IBM Plex Mono', monospace"
              style={{ opacity: p(node.spoke) }}
            >
              {node.label}
            </motion.text>
            <motion.text
              x={node.cx}
              y={node.cy + (node.cy < 150 ? -10 : 44)}
              textAnchor="middle"
              fontSize="8"
              fill="#9fc0e8"
              fontFamily="'IBM Plex Mono', monospace"
              style={{ opacity: p(node.spoke) }}
            >
              {node.sub}
            </motion.text>
          </g>
        ))}

        {/* core */}
        <motion.circle
          cx="150"
          cy="150"
          r="34"
          fill="#0a2d59"
          stroke="#eaf2ff"
          strokeWidth="2"
          style={{ pathLength: p(core) }}
        />
        <motion.text
          x="150"
          y="156"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill="#eaf2ff"
          fontFamily="'IBM Plex Mono', monospace"
          style={{ opacity: p(core) }}
        >
          SN
        </motion.text>
      </svg>

      <div className="absolute -bottom-8 left-0 right-0 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-pale/70">
        <span>Fig. 0 — System Overview</span>
        <span>Scale 1:4</span>
      </div>
    </div>
  );
};

const BlueprintHero = ({ introDone = true }: BlueprintHeroProps) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const state = introDone ? 'visible' : 'hidden';

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="draft-grid relative flex min-h-screen flex-col overflow-hidden text-ink">
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        {/* Title-block header row, patent-filing style */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={state}
          className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-ink/30 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-pale sm:grid-cols-4"
        >
          <div>
            <span className="block text-ink-mute/70">Inventor</span>
            <span className="text-ink">Suraj Nandan</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Docket No.</span>
            <span className="text-ink">SN-2026</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Filed</span>
            <span className="text-ink">Kishanganj, IN</span>
          </div>
          <div>
            <span className="block text-ink-mute/70">Status</span>
            <span className="text-brass">Open to Work</span>
          </div>
        </motion.div>

        <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-2">
          <div>
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={state}
              className="font-mono text-xs uppercase tracking-[0.4em] text-brass"
            >
              Patent No. SN-2026 &middot; Full Stack Developer
            </motion.p>

            <motion.h1
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={state}
              className="mt-5 font-sans text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            >
              An Apparatus
              <br /> for Building
              <br /> Software
            </motion.h1>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={state}
              className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-ink-mute sm:text-[15px]"
            >
              &ldquo;Passionate about building intelligent systems that solve real-world
              problems.&rdquo; A full-stack developer bridging modern web technologies and AI —
              disclosed herein across nine sheets.
            </motion.p>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate={state} className="mt-8 flex flex-wrap gap-4">
              <DraftButton onClick={scrollToProjects} variant="solid">
                View Schematics <ArrowDownRight size={15} />
              </DraftButton>
              <DraftButton onClick={() => setResumeOpen(true)} variant="outline">
                Full Disclosure (Résumé) <Download size={15} />
              </DraftButton>
            </motion.div>

            <motion.dl
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={state}
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/25 pt-6 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-2xl font-bold text-ink sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={state}
            className="flex justify-center pb-8 lg:pb-0"
          >
            <SystemSchematic />
          </motion.div>
        </div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default BlueprintHero;
