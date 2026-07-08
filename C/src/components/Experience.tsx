import { motion } from 'framer-motion';
import { BlueprintSection, SheetHeader, DraftTag, draftReveal } from './ui/blueprint';

const deployments = [
  {
    rev: 'REV. C',
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
    rev: 'REV. B',
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
    rev: 'REV. A',
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
    <BlueprintSection id="experience">
      <SheetHeader
        sheetNo={4}
        sheetTotal={8}
        fig="FIG. 3"
        sectionRef="Sec. C — Deployment Log"
        headline="Revision History"
        standfirst="Every position filed as a revision — what shipped, what scaled, what changed."
      />

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/25 sm:left-[9px]" aria-hidden="true" />

        <div className="space-y-12">
          {deployments.map((d, i) => (
            <motion.div
              key={d.rev}
              variants={draftReveal}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative pl-8 sm:pl-10"
            >
              <span className="absolute left-0 top-1.5 h-3.5 w-3.5 border-2 border-brass bg-blueprint sm:h-4.5 sm:w-4.5" aria-hidden="true" />

              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-pale">
                <span>{d.rev}</span>
                <span>{d.period}</span>
              </div>

              <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-ink sm:text-2xl">{d.role}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-brass">{d.org}</p>

              <ul className="mt-4 space-y-2">
                {d.points.map((point, pi) => (
                  <li key={pi} className="flex gap-2.5 font-sans text-[14.5px] leading-relaxed text-ink-mute">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-mute" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {d.tags.map((t) => (
                  <DraftTag key={t}>{t}</DraftTag>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BlueprintSection>
  );
};

export default Experience;
