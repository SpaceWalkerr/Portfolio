import { useMemo, useState } from 'react';
import { MissionSection, SectionHeader } from './ui/mission';
import { Constellation } from './ui/constellation';
import { MissionPatchCard } from './ui/mission-patch-card';
import { projects, type ProjectCategory } from '../data/projects';

const filters: Array<ProjectCategory | 'All'> = ['All', 'Full Stack', 'AI', 'Web'];

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <MissionSection id="projects">
      <SectionHeader log="Mission Log 06" status="Status: Multiple Launches" headline="Fourteen Missions" standfirst="Each project flown, logged, and recovered — a small constellation of problems, solved." />

      <Constellation />

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
              filter === f ? 'border-amber bg-amber/10 text-amber' : 'border-ink/25 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <MissionPatchCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </MissionSection>
  );
};

export default Projects;
