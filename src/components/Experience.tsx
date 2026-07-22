import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Wealth Shala',
    companyUrl: 'https://wealthshala.com',
    period: '2025 — Present',
    description:
      'Architected and developed a responsive financial literacy platform using React and TypeScript, integrating modern UI libraries and smooth animations. Successfully launched the platform to active users while maintaining high reliability and uptime through optimized deployment practices.',
    highlights: [
      'Designed and built responsive UI with React and TypeScript for financial literacy platform',
      'Implemented smooth animations and interactive features using Framer Motion',
      'Deployed and maintained platform with 99.9% uptime using modern DevOps practices',
      'Integrated third-party financial APIs and payment systems',
      'Optimized application performance resulting in 40% faster load times',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Xtin Capital',
    companyUrl: 'https://xtincapital.com',
    period: '2025 — Present',
    description:
      'Built the core foundation of the Xtin Capital platform from scratch, developing scalable APIs and client-facing systems. Led a team of developers, managed sprint workflows, and ensured consistent technical delivery across all projects.',
    highlights: [
      'Architected scalable backend infrastructure using Node.js and Express',
      'Developed RESTful APIs handling 10,000+ daily requests',
      'Led a team of 3 developers, managing sprints and code quality standards',
      'Implemented authentication and authorization systems with JWT and OAuth2',
      'Built real-time data visualization dashboards for financial analytics',
      'Built a newsletter system automation that provides daily emails to subscribers',
    ],
    technologies: ['Node.js', 'Express', 'React', 'PostgreSQL', 'GoDaddy', 'Supabase', 'Vercel', 'Render', 'REST APIs'],
  },
  {
    role: 'Team Leader — Ambassador Program',
    company: 'Viral Fission',
    companyUrl: undefined,
    period: '2024 — 2025',
    description:
      'Led and managed a large ambassador team, improving coordination, communication, and campaign performance through structured task management and leadership. Coordinated cross-functional initiatives while maintaining team morale and productivity.',
    highlights: [
      'Managed and coordinated 20+ ambassadors across multiple campaigns',
      'Implemented task management system improving team coordination by 60%',
      'Increased campaign performance metrics by 45% through strategic planning',
      'Conducted training sessions for 50+ team members on campaign best practices',
      'Built and maintained communication channels ensuring transparency and collaboration',
      'Developed performance tracking dashboards for real-time campaign analytics',
    ],
    technologies: ['Leadership', 'Project Management', 'Communication', 'Analytics', 'Strategy'],
  },
];

const Experience = () => {
  return (
    <PressSection id="experience">
      <SectionMasthead
        section="Section C"
        name="The Record"
        headline="Professional Experience"
        standfirst="Dispatches from the field — roles where production systems were built, teams were led, and platforms were delivered."
      />

      <div className="divide-y-2 divide-ink border-y-2 border-ink">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.company}
            variants={pressReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-4 py-8 sm:py-10 lg:grid-cols-[160px_1fr] lg:gap-8"
          >
            {/* Dateline column */}
            <div className="font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <div className="text-oxblood">{exp.period}</div>
              <div className="mt-1">Dispatch {String(index + 1).padStart(2, '0')}</div>
            </div>

            {/* Story */}
            <div>
              <h3 className="font-display text-2xl font-black uppercase leading-[0.95] tracking-[-0.015em] sm:text-3xl">
                {exp.role}
              </h3>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-editorial text-lg italic text-oxblood hover:underline"
                  >
                    {exp.company}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="font-editorial text-lg italic text-oxblood">{exp.company}</span>
                )}
              </div>

              <p className="mt-4 max-w-3xl font-editorial text-[15px] leading-relaxed text-ink sm:text-base">
                {exp.description}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {exp.highlights.map((point) => (
                  <li key={point} className="flex gap-2.5 font-editorial text-[13.5px] leading-snug text-ink-mute">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-oxblood" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <PressTag key={tech}>{tech}</PressTag>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PressSection>
  );
};

export default Experience;
