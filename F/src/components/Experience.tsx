import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { FieldSection, SectionHeader, Tag, fieldReveal } from './ui/fieldguide';

const expeditions = [
  {
    tag: 'Expedition III',
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
    tag: 'Expedition II',
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
    tag: 'Expedition I',
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
    <FieldSection id="experience">
      <SectionHeader plate="Plate No. 4" collected="Expedition Log" headline="Field Expeditions" standfirst="Every posting filed as an expedition — what was observed, what was learned." />

      <div className="relative">
        <div className="absolute bottom-2 left-[9px] top-2 w-px bg-ink/25" aria-hidden="true" />

        <div className="space-y-12">
          {expeditions.map((e, i) => (
            <motion.div
              key={e.tag}
              variants={fieldReveal}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative pl-9"
            >
              <span className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-forest bg-paper text-forest">
                <Compass size={12} />
              </span>

              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 font-serif text-[12px] italic text-ink-mute">
                <span className="text-forest">{e.tag}</span>
                <span>{e.period}</span>
              </div>

              <h3 className="font-display text-xl italic text-ink sm:text-2xl">{e.role}</h3>
              <p className="mt-1 font-serif text-[13px] uppercase tracking-[0.06em] text-forest">{e.org}</p>

              <ul className="mt-4 space-y-2">
                {e.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 font-serif text-[15px] leading-relaxed text-ink-mute">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-mute" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {e.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FieldSection>
  );
};

export default Experience;
