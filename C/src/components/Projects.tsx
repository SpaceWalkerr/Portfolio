import { useMemo, useState } from 'react';
import { BlueprintSection, SheetHeader } from './ui/blueprint';
import { ProjectCard } from './ui/project-card';
import { projects, type ProjectCategory } from '../data/projects';

const filters: Array<ProjectCategory | 'All'> = ['All', 'Full Stack', 'AI', 'Web'];

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');

  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <BlueprintSection id="projects">
      <SheetHeader
        sheetNo={6}
        sheetTotal={8}
        fig="FIG. 5"
        sectionRef="Sec. E — Claims: Preferred Embodiments"
        headline="Fourteen Embodiments"
        standfirst="Each project below is a separate embodiment of the same inventive concept: turning a problem into working software. Three are disclosed with full interactive exploded-view figures."
      />

      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              filter === f ? 'border-brass bg-brass text-blueprint-deep' : 'border-ink/35 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </BlueprintSection>
  );
};

export default Projects;
