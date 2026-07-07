import { motion } from 'framer-motion';
import { TerminalSection, SectionHeader, NeonTag, TerminalWindow, neonReveal } from './ui/terminal';

const paragraphs = [
  "I'm a full-stack developer who loves turning complex challenges into elegant, user-focused solutions. My work bridges modern web technologies and AI, creating applications that are both powerful and intuitive.",
  "Problem-solving is at the heart of what I do. Whether it's optimizing performance, architecting scalable systems, or implementing cutting-edge features, I approach each challenge with curiosity and a commitment to clean, maintainable code.",
  'I believe in continuous learning and staying ahead of the curve. Beyond writing code, I contribute to open-source projects and engage with the developer community, always seeking to grow and share knowledge along the way.',
];

const flags = ['--problem-solver', '--fast-learner', '--team-player', '--ai-enthusiast'];

const stats = [
  { value: '3+', label: 'years_active' },
  { value: '20+', label: 'projects' },
  { value: '20+', label: 'stacks' },
  { value: '60+', label: 'certs' },
];

const neofetch = [
  { k: 'user', v: 'suraj@nandan' },
  { k: 'os', v: 'SurajOS 3.0 (Full-Stack Edition)' },
  { k: 'host', v: 'Kishanganj, Bihar, IN' },
  { k: 'kernel', v: 'react-node-typescript' },
  { k: 'uptime', v: '3+ years, no crashes' },
  { k: 'shell', v: '/bin/problem-solver' },
  { k: 'languages', v: 'Java, TS, Python, JS' },
  { k: 'status', v: 'open_to_work' },
];

const About = () => {
  return (
    <TerminalSection id="about">
      <SectionHeader
        command="cd ./about && cat README.md"
        headline="whoami"
        standfirst="&ldquo;Passionate about building intelligent systems that solve real-world problems.&rdquo;"
      />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <motion.div variants={neonReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="font-mono text-[14px] leading-relaxed text-ink sm:text-[15px]">
                <span className="mr-2 text-neon-cyan-bright">#{i + 1}</span>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {flags.map((f) => (
              <NeonTag key={f}>{f}</NeonTag>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-neon-cyan/20 pt-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-ink sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          variants={neonReveal}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <TerminalWindow title="user@suraj:~$ neofetch">
            <dl className="space-y-2 font-mono text-[12px] sm:text-[13px]">
              {neofetch.map((row) => (
                <div key={row.k} className="flex gap-3">
                  <dt className="w-24 flex-shrink-0 text-neon-pink">{row.k}</dt>
                  <dd className="text-ink-mute">{row.v}</dd>
                </div>
              ))}
            </dl>
          </TerminalWindow>
        </motion.div>
      </div>
    </TerminalSection>
  );
};

export default About;
