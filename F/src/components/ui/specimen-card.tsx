import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';
import type { Project } from '../../data/projects';
import { FieldButton, Tag, fieldReveal, fieldEase } from './fieldguide';

const SPRIGS = [
  'M10 50 C 12 30, 20 15, 18 2 M18 20 C 8 22, 2 30, 0 34 M14 34 C 24 34, 30 42, 32 48',
  'M10 50 C 8 34, 4 20, 12 2 M12 22 C 22 20, 28 26, 30 30 M10 32 C 0 36, -4 44, -6 50',
];

interface SpecimenCardProps {
  project: Project;
  index: number;
}

export const SpecimenCard = ({ project, index }: SpecimenCardProps) => {
  const reduceMotion = useReducedMotion();
  const sprig = SPRIGS[index % SPRIGS.length];

  return (
    <motion.article
      variants={fieldReveal}
      custom={index % 4}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col border border-ink/40 bg-paper p-6"
    >
      <div className="mb-2 flex items-start justify-between">
        <div>
          <span className="font-serif text-[11px] italic text-forest">{project.plate}</span>
          <h3 className="font-display text-xl italic leading-tight text-ink">{project.title}</h3>
          <p className="font-serif text-[12px] italic text-ink-mute">{project.subtitle}</p>
        </div>
        <svg viewBox="0 0 40 60" className="h-12 w-8 flex-shrink-0 overflow-visible" fill="none" stroke="#3f5c33" strokeWidth="1.5" aria-hidden="true">
          <motion.path
            d={sprig}
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: fieldEase }}
          />
        </svg>
      </div>

      <p className="mt-2 flex-grow font-serif text-[14px] leading-relaxed text-ink">{project.abstract}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag} className="text-[9.5px]">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <FieldButton href={project.live} variant="solid" className="px-4 py-2 text-[11px]">
          Specimen Live <ExternalLink size={12} />
        </FieldButton>
        {project.github ? (
          <FieldButton href={project.github} variant="outline" className="px-4 py-2 text-[11px]">
            Source <Github size={12} />
          </FieldButton>
        ) : project.sourcePrivate ? (
          <span className="inline-flex items-center gap-1.5 border border-ink/25 px-4 py-2 font-serif text-[11px] italic text-ink-mute/70">
            Unlisted <Lock size={11} />
          </span>
        ) : null}
      </div>
    </motion.article>
  );
};
