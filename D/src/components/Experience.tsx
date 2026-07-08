import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';
import { TerminalSection, SectionHeader, NeonTag, neonReveal } from './ui/terminal';

const commits = [
  {
    hash: 'a3f9c1e',
    role: 'Full Stack Developer',
    org: 'Wealth Shala',
    period: '2025 — present',
    points: [
      'Architected a responsive financial literacy platform in React/TypeScript with Framer Motion animations.',
      'Maintained 99.9% uptime; integrated third-party financial APIs and payment systems.',
      'Cut load times by 40% through systematic performance optimization.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
  },
  {
    hash: '7d2e8b4',
    role: 'Full Stack Developer',
    org: 'Xtin Capital',
    period: '2025 — present',
    points: [
      "Built the platform's core foundation from scratch, from schema to deploy pipeline.",
      'Engineered a scalable backend handling 10,000+ daily API requests.',
      'Led a team of 3 developers; shipped JWT/OAuth2 auth and real-time financial dashboards.',
      'Automated the newsletter system end to end.',
    ],
    tags: ['Node.js', 'Express', 'React', 'PostgreSQL', 'GoDaddy', 'Supabase', 'Vercel', 'Render', 'REST APIs'],
  },
  {
    hash: '1c5a6f0',
    role: 'Team Leader, Ambassador Program',
    org: 'Viral Fission',
    period: '2024 — 2025',
    points: [
      'Managed 20+ ambassadors across concurrent campaigns.',
      'Shipped a task-management system that improved coordination by 60%.',
      'Drove campaign performance up 45%; trained 50+ members.',
    ],
    tags: ['Leadership', 'Project Management', 'Communication', 'Analytics', 'Strategy'],
  },
];

const Experience = () => {
  return (
    <TerminalSection id="experience">
      <SectionHeader
        command="git log --oneline --graph"
        headline="commit_history"
        standfirst="Every position filed as a commit — what shipped, what scaled, what changed."
      />

      <div className="relative">
        <div className="absolute left-[9px] bottom-2 top-2 w-px bg-neon-cyan/20 sm:left-[11px]" aria-hidden="true" />

        <div className="space-y-12">
          {commits.map((c, i) => (
            <motion.div
              key={c.hash}
              variants={neonReveal}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative pl-8 sm:pl-10"
            >
              <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-neon-pink bg-void text-neon-pink shadow-[0_0_10px_rgba(255,94,168,0.5)] sm:h-[22px] sm:w-[22px]">
                <GitCommit size={12} />
              </span>

              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neon-cyan-bright">
                <span>commit {c.hash}</span>
                <span>{c.period}</span>
              </div>

              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-ink sm:text-xl">{c.role}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-neon-pink">{c.org}</p>

              <ul className="mt-4 space-y-2">
                {c.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 font-mono text-[13.5px] leading-relaxed text-ink-mute">
                    <span className="text-neon-cyan-bright">+</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {c.tags.map((t) => (
                  <NeonTag key={t}>{t}</NeonTag>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TerminalSection>
  );
};

export default Experience;
