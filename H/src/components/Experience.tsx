import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { ArcadeSection, SectionHeader, Tag, arcadeReveal } from './ui/arcade';

const entries = [
  {
    rank: '#3',
    role: 'Full Stack Developer',
    org: 'Wealth Shala',
    period: '2025 — Present',
    points: [
      'Architected a responsive financial literacy platform in React/TypeScript with Framer Motion animations.',
      'Maintained 99.9% uptime; integrated third-party financial APIs and payment systems.',
      'Cut load times by 40% through systematic performance optimization.',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
  },
  {
    rank: '#2',
    role: 'Full Stack Developer',
    org: 'Xtin Capital',
    period: '2025 — Present',
    points: [
      "Built the platform's core foundation from scratch, from schema to deploy pipeline.",
      'Engineered a scalable backend handling 10,000+ daily API requests.',
      'Led a team of 3 developers; shipped JWT/OAuth2 auth and real-time financial dashboards.',
      'Automated the newsletter system end to end.',
    ],
    tags: ['Node.js', 'Express', 'React', 'PostgreSQL', 'GoDaddy', 'Supabase', 'Vercel', 'Render', 'REST APIs'],
  },
  {
    rank: '#1',
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
    <ArcadeSection id="experience">
      <SectionHeader world="World 1-4" status="Status: New Record" headline="High Score Table" standfirst="Every posting logged as a ranked entry — top score first." />

      <div className="space-y-8">
        {entries.map((e, i) => (
          <motion.div
            key={e.rank}
            variants={arcadeReveal}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-4 border-2 border-ink/50 p-6 sm:flex-row sm:items-start"
          >
            <div className="flex flex-shrink-0 items-center gap-3 sm:w-24 sm:flex-col sm:items-start">
              <Trophy size={20} className="text-gold" />
              <span className="font-display text-lg text-gold">{e.rank}</span>
            </div>

            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 font-mono text-sm uppercase text-ink-mute">
                <span>{e.period}</span>
              </div>

              <h3 className="font-display text-sm uppercase leading-relaxed text-ink sm:text-base">{e.role}</h3>
              <p className="mt-1 font-mono text-base uppercase text-cyan">{e.org}</p>

              <ul className="mt-4 space-y-2">
                {e.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 font-mono text-lg leading-relaxed text-ink-mute">
                    <span className="text-gold">&#9654;</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {e.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ArcadeSection>
  );
};

export default Experience;
