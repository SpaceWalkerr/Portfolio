import { motion, useReducedMotion } from 'framer-motion';
import { BlueprintSection, SheetHeader, DraftTag, draftReveal } from './ui/blueprint';

const paragraphs = [
  "I'm a full-stack developer who loves turning complex challenges into elegant, user-focused solutions. My work bridges modern web technologies and AI, creating applications that are both powerful and intuitive.",
  "Problem-solving is at the heart of what I do. Whether it's optimizing performance, architecting scalable systems, or implementing cutting-edge features, I approach each challenge with curiosity and a commitment to clean, maintainable code.",
  'I believe in continuous learning and staying ahead of the curve. Beyond writing code, I contribute to open-source projects and engage with the developer community, always seeking to grow and share knowledge along the way.',
];

const traits = ['Problem Solver', 'Fast Learner', 'Team Player', 'AI Enthusiast'];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '20+', label: 'Technologies' },
  { value: '60+', label: 'Certifications' },
];

/** FIG. 1 — an abstract "inventor elevation": a drafted bust silhouette that draws itself in. */
const InventorElevation = () => {
  const reduceMotion = useReducedMotion();
  const draw = (delay: number) => ({
    initial: reduceMotion ? { pathLength: 1 } : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <svg viewBox="0 0 200 240" className="h-full w-full overflow-visible" fill="none" aria-hidden="true">
        {/* cross-hair centerlines */}
        <line x1="100" y1="0" x2="100" y2="240" stroke="#eaf2ff" strokeOpacity="0.12" strokeDasharray="3 4" />
        <line x1="0" y1="120" x2="200" y2="120" stroke="#eaf2ff" strokeOpacity="0.12" strokeDasharray="3 4" />

        <motion.circle cx="100" cy="66" r="42" stroke="#eaf2ff" strokeWidth="1.8" {...draw(0)} />
        <motion.path
          d="M40 224c0-46 27-78 60-78s60 32 60 78"
          stroke="#eaf2ff"
          strokeWidth="1.8"
          {...draw(0.3)}
        />
        <motion.path d="M70 96c8 10 52 10 60 0" stroke="#c9a24a" strokeWidth="1.5" {...draw(0.6)} />

        {/* dimension line + leader */}
        <motion.line x1="150" y1="24" x2="150" y2="108" stroke="#eaf2ff" strokeOpacity="0.4" {...draw(0.4)} />
        <motion.line x1="150" y1="24" x2="180" y2="24" stroke="#eaf2ff" strokeOpacity="0.4" {...draw(0.4)} />
        <motion.line x1="150" y1="108" x2="180" y2="108" stroke="#eaf2ff" strokeOpacity="0.4" {...draw(0.5)} />
        <motion.text
          x="184"
          y="70"
          fontSize="8"
          fill="#9fc0e8"
          fontFamily="'IBM Plex Mono', monospace"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          84mm
        </motion.text>
      </svg>
      <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-pale/70">
        <span>Fig. 1 &mdash; Inventor Elevation</span>
        <span>Scale 1:4</span>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <BlueprintSection id="about">
      <SheetHeader
        sheetNo={2}
        sheetTotal={8}
        fig="FIG. 1"
        sectionRef="Sec. A — Inventor's Disclosure"
        headline="Background of the Inventor"
        standfirst="&ldquo;Passionate about building intelligent systems that solve real-world problems.&rdquo;"
      />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <motion.div variants={draftReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-[15px] leading-relaxed text-ink sm:text-base">
                <span className="mr-2 font-mono text-xs text-brass">[{String(i + 1).padStart(4, '0')}]</span>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {traits.map((t) => (
              <DraftTag key={t}>{t}</DraftTag>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/25 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-2xl font-bold text-ink sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          variants={draftReveal}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex items-start justify-center"
        >
          <InventorElevation />
        </motion.div>
      </div>
    </BlueprintSection>
  );
};

export default About;
