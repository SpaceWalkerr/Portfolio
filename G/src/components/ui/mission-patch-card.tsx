import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';
import type { Project } from '../../data/projects';
import { MissionButton, Tag, missionReveal } from './mission';

interface MissionPatchCardProps {
  project: Project;
  index: number;
}

export const MissionPatchCard = ({ project, index }: MissionPatchCardProps) => {
  return (
    <motion.article
      variants={missionReveal}
      custom={index % 4}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col border border-ink/20 bg-void-bright p-6"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-amber font-mono text-[10px] text-amber">
          {project.mission}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base text-ink">{project.title}</h3>
          <p className="truncate font-mono text-[11px] uppercase tracking-[0.06em] text-ink-mute">{project.subtitle}</p>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between border-y border-white/5 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute">
        <span>Category</span>
        <span className="text-amber">{project.category}</span>
      </div>

      <p className="flex-grow font-mono text-[12.5px] leading-relaxed text-ink">{project.abstract}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag} className="text-[9.5px]">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <MissionButton href={project.live} variant="solid" className="px-4 py-2 text-[10px]">
          Live <ExternalLink size={12} />
        </MissionButton>
        {project.github ? (
          <MissionButton href={project.github} variant="outline" className="px-4 py-2 text-[10px]">
            Source <Github size={12} />
          </MissionButton>
        ) : project.sourcePrivate ? (
          <span className="inline-flex items-center gap-1.5 border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute/60">
            Classified <Lock size={11} />
          </span>
        ) : null}
      </div>
    </motion.article>
  );
};
