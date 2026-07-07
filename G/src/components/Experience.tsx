import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { MissionSection, SectionHeader, Tag, missionReveal } from './ui/mission';

const flights = [
  {
    tag: 'Flight 03',
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
    tag: 'Flight 02',
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
    tag: 'Flight 01',
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
    <MissionSection id="experience">
      <SectionHeader log="Mission Log 04" status="Status: Logged" headline="Flight History" standfirst="Every posting filed as a flight — what launched, what stayed in orbit." />

      <div className="relative">
        <div className="absolute bottom-2 left-[9px] top-2 w-px bg-ink/20" aria-hidden="true" />

        <div className="space-y-12">
          {flights.map((f, i) => (
            <motion.div
              key={f.tag}
              variants={missionReveal}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative pl-9"
            >
              <span className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-amber bg-void text-amber">
                <Rocket size={12} />
              </span>

              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                <span className="text-amber">{f.tag}</span>
                <span>{f.period}</span>
              </div>

              <h3 className="font-display text-lg uppercase text-ink sm:text-xl">{f.role}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-amber">{f.org}</p>

              <ul className="mt-4 space-y-2">
                {f.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 font-mono text-[14px] leading-relaxed text-ink-mute">
                    <span className="text-amber">▸</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {f.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MissionSection>
  );
};

export default Experience;
