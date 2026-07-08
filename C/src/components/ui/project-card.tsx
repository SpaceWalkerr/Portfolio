import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';
import type { Project } from '../../data/projects';
import { DraftButton, DraftTag, draftReveal } from './blueprint';
import { ProjectSchematic } from './schematic';
import { ExplodedView } from './exploded-view';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.article
      variants={draftReveal}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col border border-ink/30 p-6 sm:p-7"
    >
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-pale">
        <span>{project.fig}</span>
        <DraftTag>{project.category}</DraftTag>
      </div>

      <h3 className="font-sans text-xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-brass">{project.subtitle}</p>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 border-y border-ink/20 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">
        <span>
          <span className="text-ink-mute/60">Inventor:</span> Suraj Nandan
        </span>
        <span>
          <span className="text-ink-mute/60">Docket:</span> SN-2026/{project.id.slice(0, 6)}
        </span>
      </div>

      <p className="mt-4 font-sans text-[14px] leading-relaxed text-ink-mute">{project.abstract}</p>

      <div className="mt-6">
        {project.exploded ? <ExplodedView project={project} /> : <ProjectSchematic id={project.id} title={project.title} parts={project.parts} />}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <DraftTag key={tag}>{tag}</DraftTag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <DraftButton href={project.live} variant="solid">
          Live Demo <ExternalLink size={14} />
        </DraftButton>
        {project.github ? (
          <DraftButton href={project.github} variant="outline">
            Source <Github size={14} />
          </DraftButton>
        ) : project.sourcePrivate ? (
          <span className="inline-flex items-center gap-2 border border-ink/30 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute/70">
            Source — Private <Lock size={13} />
          </span>
        ) : null}
      </div>
    </motion.article>
  );
};
