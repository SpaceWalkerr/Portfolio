import { motion } from 'framer-motion';
import { ArcadeSection, SectionHeader, Tag, arcadeReveal } from './ui/arcade';

const paragraphs = [
  "I'm a full-stack developer who loves turning complex challenges into elegant, user-focused solutions. My work bridges modern web technologies and AI, creating applications that are both powerful and intuitive.",
  "Problem-solving is at the heart of what I do. Whether it's optimizing performance, architecting scalable systems, or implementing cutting-edge features, I approach each challenge with curiosity and a commitment to clean, maintainable code.",
  'I believe in continuous learning and staying ahead of the curve. Beyond writing code, I contribute to open-source projects and engage with the developer community, always seeking to grow and share knowledge along the way.',
];

const perks = ['Problem Solver', 'Fast Learner', 'Team Player', 'AI Enthusiast'];

const stats = [
  { value: '3+', label: 'Years Played' },
  { value: '20+', label: 'Levels Cleared' },
  { value: '20+', label: 'Power-Ups' },
  { value: '60+', label: 'Achievements' },
];

const characterSheet = [
  { k: 'Class', v: 'Full-Stack Developer' },
  { k: 'Guild', v: 'SpaceWalkerr' },
  { k: 'Home Base', v: 'Kishanganj, Bihar, IN' },
  { k: 'Training Ground', v: 'SRM IST, Chennai' },
  { k: 'Primary Weapons', v: 'React, Node, TypeScript, AI' },
  { k: 'Availability', v: 'Open to Work' },
];

const About = () => {
  return (
    <ArcadeSection id="about">
      <SectionHeader world="World 1-2" status="Status: Ready" headline="Player Profile" standfirst={'"Passionate about building intelligent systems that solve real-world problems."'} />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <motion.div variants={arcadeReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-mono text-lg leading-relaxed text-ink">
                <span className="mr-2 text-cyan">[{i + 1}]</span>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {perks.map((p) => (
              <Tag key={p}>{p}</Tag>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t-4 border-ink/40 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-lg text-ink sm:text-xl">{s.value}</dt>
                <dd className="mt-2 font-mono text-sm uppercase text-ink-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div variants={arcadeReveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="border-2 border-ink bg-void-bright p-5 shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
            <div className="mb-4 flex items-center justify-between border-b-4 border-ink/60 pb-3">
              <span className="font-display text-[9px] uppercase text-gold">Character Sheet</span>
              <span className="font-mono text-sm text-ink-mute">SN-2026</span>
            </div>
            <dl className="space-y-2.5 font-mono text-base">
              {characterSheet.map((row) => (
                <div key={row.k} className="flex justify-between gap-3 border-b border-white/10 pb-2">
                  <dt className="text-ink-mute">{row.k}</dt>
                  <dd className="text-right text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </ArcadeSection>
  );
};

export default About;
