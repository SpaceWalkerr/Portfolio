import { motion } from 'framer-motion';
import { MissionSection, SectionHeader, Tag, missionReveal } from './ui/mission';

const paragraphs = [
  "I'm a full-stack developer who loves turning complex challenges into elegant, user-focused solutions. My work bridges modern web technologies and AI, creating applications that are both powerful and intuitive.",
  "Problem-solving is at the heart of what I do. Whether it's optimizing performance, architecting scalable systems, or implementing cutting-edge features, I approach each challenge with curiosity and a commitment to clean, maintainable code.",
  'I believe in continuous learning and staying ahead of the curve. Beyond writing code, I contribute to open-source projects and engage with the developer community, always seeking to grow and share knowledge along the way.',
];

const quals = ['Problem Solver', 'Fast Learner', 'Team Player', 'AI Enthusiast'];

const stats = [
  { value: '3+', label: 'Years Active' },
  { value: '20+', label: 'Missions Flown' },
  { value: '20+', label: 'Systems Known' },
  { value: '60+', label: 'Certifications' },
];

const crewManifest = [
  { k: 'Callsign', v: 'SpaceWalkerr' },
  { k: 'Role', v: 'Full-Stack Developer' },
  { k: 'Home Base', v: 'Kishanganj, Bihar, IN' },
  { k: 'Training Center', v: 'SRM IST, Chennai' },
  { k: 'Primary Systems', v: 'React, Node, TypeScript, AI' },
  { k: 'Clearance', v: 'Open to Work' },
];

const About = () => {
  return (
    <MissionSection id="about">
      <SectionHeader log="Mission Log 02" status="Status: Nominal" headline="The Crew" standfirst={'"Passionate about building intelligent systems that solve real-world problems."'} />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <motion.div variants={missionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-mono text-[14px] leading-relaxed text-ink sm:text-[15px]">
                <span className="mr-2 text-amber">[{String(i + 1).padStart(2, '0')}]</span>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {quals.map((q) => (
              <Tag key={q}>{q}</Tag>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/20 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl text-ink sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div variants={missionReveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="border border-ink/25 bg-void-bright p-5">
            <div className="mb-4 flex items-center justify-between border-b border-ink/20 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">Crew Manifest</span>
              <span className="font-mono text-[9px] text-ink-mute">SN-2026</span>
            </div>
            <dl className="space-y-2.5 font-mono text-[12px] sm:text-[13px]">
              {crewManifest.map((row) => (
                <div key={row.k} className="flex justify-between gap-3 border-b border-white/5 pb-2">
                  <dt className="text-ink-mute">{row.k}</dt>
                  <dd className="text-right text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </MissionSection>
  );
};

export default About;
