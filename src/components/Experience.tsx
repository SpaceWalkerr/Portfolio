import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, FileText, Award, ArrowRight } from 'lucide-react';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';
import { useDialog } from '../hooks/useDialog';
import { experiences, type ExperienceData } from '../data/experience';
import RichText from './RichText';

const ExperienceModal = ({
  experience,
  onClose,
}: {
  experience: ExperienceData | null;
  onClose: () => void;
}) => {
  const dialogRef = useDialog(!!experience, onClose);

  return (
    <AnimatePresence>
      {experience && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[60] w-[92%] max-h-[90vh] overflow-y-auto overscroll-contain max-w-3xl focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${experience.role} at ${experience.company} — full report`}
          >
            <div className="relative border-2 border-ink bg-paper-bright p-6 shadow-2xl sm:p-8">
              {/* Masthead bar */}
              <div className="mb-6 flex items-center justify-between border-b-4 border-double border-ink pb-3">
                <span className="font-editorial text-lg italic">Field Report</span>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-2xl font-black uppercase leading-[0.95] tracking-[-0.015em] sm:text-3xl">
                  {experience.role}
                </h3>
                <div className="mt-1 font-editorial text-lg italic text-oxblood">
                  {experience.company}
                </div>
              </div>

              <div className="font-editorial text-[15.5px] leading-relaxed text-ink prose-p:mb-4">
                <RichText content={experience.details} />
              </div>

              {experience.projectsBuilt && experience.projectsBuilt.length > 0 && (
                <div className="mt-8 border-l-2 border-oxblood/30 pl-4">
                  <span className="mb-3 block font-monopress text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    Platforms Built
                  </span>
                  <div className="flex flex-col gap-3">
                    {experience.projectsBuilt.map((project) => (
                      <a
                        key={project.url}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-fit items-center gap-2 border border-ink/20 bg-paper px-4 py-2 font-editorial text-[15px] italic text-oxblood transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {project.name}
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {experience.credential && (
                <div className="mt-8 border-l-2 border-oxblood/30 pl-4">
                  <span className="mb-3 block font-monopress text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    On the Record
                  </span>
                  <a
                    href={experience.credential.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 border border-ink/20 bg-paper px-4 py-2 font-editorial text-[15px] italic text-oxblood transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <Award className="h-4 w-4" />
                    {experience.credential.label}
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                  </a>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-ink/20">
                {experience.technologies.map((tech) => (
                  <PressTag key={tech}>{tech}</PressTag>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

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
            onClick={() => setSelectedExperience(exp)}
            className="group grid gap-4 py-8 sm:py-10 lg:grid-cols-[160px_1fr] lg:gap-8 cursor-pointer transition-colors hover:bg-ink/[0.02]"
          >
            {/* Dateline column */}
            <div className="font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <div className="text-oxblood">{exp.period || 'Freelance'}</div>
              <div className="mt-1">Dispatch {String(index + 1).padStart(2, '0')}</div>
            </div>

            {/* Story */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase leading-[0.95] tracking-[-0.015em] sm:text-3xl transition-colors group-hover:text-oxblood">
                    {exp.role}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-editorial text-lg italic text-oxblood hover:underline"
                      >
                        {exp.company}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="font-editorial text-lg italic text-oxblood">{exp.company}</span>
                    )}
                  </div>
                </div>
                <div aria-hidden="true" className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 bg-paper-bright text-ink/40 transition-colors group-hover:border-oxblood group-hover:bg-oxblood group-hover:text-paper">
                  <FileText className="h-4 w-4" />
                </div>
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

              {exp.projectsBuilt && exp.projectsBuilt.length > 0 && (
                <div className="mt-6 border-l-2 border-oxblood/30 pl-4">
                  <span className="mb-2 block font-monopress text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    Platforms Built
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {exp.projectsBuilt.map((project) => (
                      <a
                        key={project.url}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/link flex items-center gap-1.5 font-editorial text-[15px] italic text-oxblood transition-colors hover:text-ink"
                      >
                        {project.name}
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-[1px] group-hover/link:translate-x-[1px]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {exp.credential && (
                <div className="mt-5">
                  <a
                    href={exp.credential.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/cred inline-flex items-center gap-1.5 border border-ink/25 px-3 py-1.5 font-monopress text-[10px] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:border-ink hover:text-ink"
                  >
                    <Award className="h-3.5 w-3.5" />
                    {exp.credential.label}
                    <ExternalLink className="h-3 w-3 transition-transform group-hover/cred:-translate-y-[1px] group-hover/cred:translate-x-[1px]" />
                  </a>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <PressTag key={tech}>{tech}</PressTag>
                ))}
              </div>

              {/* Keyboard- and screen-reader-reachable way into the full report */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedExperience(exp);
                }}
                className="mt-6 inline-flex items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:decoration-oxblood"
              >
                Read the full report
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <ExperienceModal 
        experience={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </PressSection>
  );
};

export default Experience;
