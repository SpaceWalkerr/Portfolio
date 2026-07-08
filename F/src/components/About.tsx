import { motion } from 'framer-motion';
import { FieldSection, SectionHeader, InkBloom, Tag, fieldReveal } from './ui/fieldguide';

const paragraphs = [
  "I'm a full-stack developer who loves turning complex challenges into elegant, user-focused solutions. My work bridges modern web technologies and AI, creating applications that are both powerful and intuitive.",
  "Problem-solving is at the heart of what I do. Whether it's optimizing performance, architecting scalable systems, or implementing cutting-edge features, I approach each challenge with curiosity and a commitment to clean, maintainable code.",
  'I believe in continuous learning and staying ahead of the curve. Beyond writing code, I contribute to open-source projects and engage with the developer community, always seeking to grow and share knowledge along the way.',
];

const marks = ['Problem Solver', 'Fast Learner', 'Team Player', 'AI Enthusiast'];

const stats = [
  { value: '3+', label: 'Seasons Active' },
  { value: '20+', label: 'Specimens Logged' },
  { value: '20+', label: 'Techniques Known' },
  { value: '60+', label: 'Findings Certified' },
];

const specimenLabel = [
  { k: 'Genus', v: 'Developer, Full-Stack' },
  { k: 'Habitat', v: 'Kishanganj, Bihar, IN' },
  { k: 'Range', v: 'SRM IST, Chennai' },
  { k: 'Distinguishing Marks', v: 'React, Node, TypeScript, AI' },
  { k: 'Observed Status', v: 'Open to Work' },
];

const About = () => {
  return (
    <FieldSection id="about">
      <SectionHeader plate="Plate No. 2" collected="Collected: Chennai, 2023" headline="The Naturalist" standfirst={'"Passionate about building intelligent systems that solve real-world problems."'} />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <motion.div variants={fieldReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-serif text-[17px] leading-relaxed text-ink">
                <InkBloom delay={i * 0.15}>{p}</InkBloom>
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {marks.map((m) => (
              <Tag key={m}>{m}</Tag>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/25 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl italic text-ink sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 font-serif text-[10px] uppercase tracking-[0.08em] text-ink-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div variants={fieldReveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="border border-ink/60 bg-paper-deep p-5">
            <div className="mb-4 flex items-center justify-between border-b border-ink/50 pb-3">
              <span className="font-serif text-[12px] italic text-forest">Specimen Label</span>
              <span className="font-hand text-base text-forest">No. SN-2026</span>
            </div>
            <dl className="space-y-2.5 font-serif text-[13.5px]">
              {specimenLabel.map((row) => (
                <div key={row.k} className="flex justify-between gap-3 border-b border-ink/10 pb-2 italic">
                  <dt className="text-ink-mute">{row.k}</dt>
                  <dd className="text-right text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </FieldSection>
  );
};

export default About;
