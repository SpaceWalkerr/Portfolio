import { useMemo, useState } from 'react';
import { ArcadeSection, SectionHeader } from './ui/arcade';
import { LevelTileCard } from './ui/level-tile-card';
import { projects, type ProjectCategory } from '../data/projects';

const filters: Array<ProjectCategory | 'All'> = ['All', 'Full Stack', 'AI', 'Web'];

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <ArcadeSection id="projects">
      <SectionHeader world="World 1-6" status="Status: 14 Levels" headline="Level Select" standfirst="Fourteen levels, fourteen problems cleared. Choose one to play." />

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`border-2 px-4 py-2 font-mono text-base uppercase transition-colors ${
              filter === f ? 'border-gold bg-gold/10 text-gold' : 'border-ink/40 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <LevelTileCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </ArcadeSection>
  );
};

export default Projects;
