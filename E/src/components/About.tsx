import { motion } from 'framer-motion';
import { CaseSection, SectionHeader, RedactedText, Tag, caseReveal } from './ui/casefile';

const paragraphs = [
  "I'm a full-stack developer who loves turning complex challenges into elegant, user-focused solutions. My work bridges modern web technologies and AI, creating applications that are both powerful and intuitive.",
  "Problem-solving is at the heart of what I do. Whether it's optimizing performance, architecting scalable systems, or implementing cutting-edge features, I approach each challenge with curiosity and a commitment to clean, maintainable code.",
  'I believe in continuous learning and staying ahead of the curve. Beyond writing code, I contribute to open-source projects and engage with the developer community, always seeking to grow and share knowledge along the way.',
];

const traits = ['Problem Solver', 'Fast Learner', 'Team Player', 'AI Enthusiast'];

const stats = [
  { value: '3+', label: 'years active' },
  { value: '20+', label: 'cases closed' },
  { value: '20+', label: 'methods known' },
  { value: '60+', label: 'records on file' },
];

const idCard = [
  { k: 'Alias', v: 'SpaceWalkerr' },
  { k: 'Occupation', v: 'Full-Stack Developer' },
  { k: 'Base', v: 'Kishanganj, Bihar, IN' },
  { k: 'Affiliation', v: 'SRM IST, Chennai' },
  { k: 'Known For', v: 'React, Node, TypeScript, AI' },
  { k: 'Status', v: 'At Large — Open to Work' },
];

const About = () => {
  return (
    <CaseSection id="about">
      <SectionHeader file="File 02 of 08" status="Status: Under Review" headline="Subject Profile" standfirst={'"Passionate about building intelligent systems that solve real-world problems."'} />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <motion.div variants={caseReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-mono text-[14px] leading-relaxed text-ink sm:text-[15px]">
                <span className="mr-2 text-blood">[Note {i + 1}]</span>
                <RedactedText delay={i * 0.15}>{p}</RedactedText>
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {traits.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t-2 border-ink/25 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl text-ink sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div variants={caseReveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="border-2 border-ink bg-paper-deep p-5">
            <div className="mb-4 flex items-center justify-between border-b-2 border-ink pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood">Subject ID Card</span>
              <span className="font-mono text-[9px] text-ink-mute">SN-2026</span>
            </div>
            <div className="mb-4 flex h-28 items-center justify-center border-2 border-dashed border-ink/40 bg-ink/5">
              <span className="rotate-[-6deg] border-2 border-blood px-3 py-1 font-display text-xs uppercase tracking-[0.15em] text-blood">
                Photo Redacted
              </span>
            </div>
            <dl className="space-y-2.5 font-mono text-[12px] sm:text-[13px]">
              {idCard.map((row) => (
                <div key={row.k} className="flex justify-between gap-3 border-b border-ink/10 pb-2">
                  <dt className="text-ink-mute">{row.k}</dt>
                  <dd className="text-right text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </CaseSection>
  );
};

export default About;
