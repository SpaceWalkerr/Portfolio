import { useMemo, useState } from 'react';
import { CaseSection, SectionHeader } from './ui/casefile';
import { EvidenceBoard } from './ui/evidence-board';
import { ProjectPinCard } from './ui/project-pin-card';
import { projects, type ProjectCategory } from '../data/projects';

const filters: Array<ProjectCategory | 'All'> = ['All', 'Full Stack', 'AI', 'Web'];

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');

  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <CaseSection id="projects">
      <SectionHeader
        file="File 06 of 08"
        status="Status: Active Investigation"
        headline="The Evidence Board"
        standfirst="Fourteen leads, pinned and cross-referenced. Each card is a closed case — read the notes, follow the link."
      />

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`border-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
              filter === f ? 'border-blood bg-blood/10 text-blood' : 'border-ink/30 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <EvidenceBoard>
        <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <ProjectPinCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </EvidenceBoard>
    </CaseSection>
  );
};

export default Projects;
