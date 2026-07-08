import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock, Star } from 'lucide-react';
import type { Project } from '../../data/projects';
import { ArcadeButton, Tag, arcadeReveal } from './arcade';

interface LevelTileCardProps {
  project: Project;
  index: number;
}

export const LevelTileCard = ({ project, index }: LevelTileCardProps) => {
  return (
    <motion.article
      variants={arcadeReveal}
      custom={index % 4}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col border-2 border-ink/60 bg-void-bright p-6 shadow-[5px_5px_0_rgba(0,0,0,0.45)]"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="border-2 border-cyan/50 px-2 py-1 font-display text-[9px] text-cyan">{project.level}</span>
        <div className="flex gap-0.5" aria-label={`${project.stars} of 3 stars`}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} size={14} className={i < project.stars ? 'fill-gold text-gold' : 'text-ink-mute/30'} />
          ))}
        </div>
      </div>

      <h3 className="font-display text-sm uppercase leading-relaxed text-ink">{project.title}</h3>
      <p className="mt-1 font-mono text-base uppercase text-ink-mute">{project.subtitle}</p>

      <div className="my-3 border-y border-white/10 py-2 font-mono text-sm uppercase text-ink-mute">
        World: <span className="text-gold">{project.category}</span>
      </div>

      <p className="flex-grow font-mono text-lg leading-relaxed text-ink">{project.abstract}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag} className="text-xs">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <ArcadeButton href={project.live} variant="solid" className="px-4 py-2 text-[10px]">
          Play <ExternalLink size={12} />
        </ArcadeButton>
        {project.github ? (
          <ArcadeButton href={project.github} variant="outline" className="px-4 py-2 text-[10px]">
            View Code <Github size={12} />
          </ArcadeButton>
        ) : project.sourcePrivate ? (
          <span className="inline-flex items-center gap-1.5 border-2 border-white/10 px-4 py-2 font-mono text-sm uppercase text-ink-mute/70">
            Locked <Lock size={11} />
          </span>
        ) : null}
      </div>
    </motion.article>
  );
};
