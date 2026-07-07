import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';
import type { Project } from '../../data/projects';
import { CaseButton, Tag, caseReveal } from './casefile';

const ROTATIONS = [-2.5, 1.5, -1, 2, -1.8, 1, -2, 2.5, -1.2, 1.8, -2.2, 1.2, -1.6, 2.2];

interface ProjectPinCardProps {
  project: Project;
  index: number;
}

export const ProjectPinCard = ({ project, index }: ProjectPinCardProps) => {
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.article
      variants={caseReveal}
      custom={index % 4}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      style={{ rotate: rotation }}
      className="relative flex flex-col border-2 border-ink bg-paper p-5 shadow-[4px_6px_0_rgba(0,0,0,0.35)] transition-transform"
    >
      <span className="absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-ink/70 bg-blood shadow-md" aria-hidden="true" />

      <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
        <span className="text-blood">Case {project.caseNo}</span>
        <Tag>{project.category}</Tag>
      </div>

      <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-ink">{project.title}</h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute">{project.subtitle}</p>

      <p className="mt-3 flex-grow font-mono text-[12.5px] leading-relaxed text-ink">{project.abstract}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag} className="text-[9px]">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <CaseButton href={project.live} variant="solid" className="px-4 py-2 text-[10px]">
          Live <ExternalLink size={12} />
        </CaseButton>
        {project.github ? (
          <CaseButton href={project.github} variant="outline" className="px-4 py-2 text-[10px]">
            Source <Github size={12} />
          </CaseButton>
        ) : project.sourcePrivate ? (
          <span className="inline-flex items-center gap-1.5 border border-ink/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute/70">
            Sealed <Lock size={11} />
          </span>
        ) : null}
      </div>
    </motion.article>
  );
};
