import { useMemo, useState } from 'react';
import { FieldSection, SectionHeader } from './ui/fieldguide';
import { SpecimenCard } from './ui/specimen-card';
import { projects, type ProjectCategory } from '../data/projects';

const filters: Array<ProjectCategory | 'All'> = ['All', 'Full Stack', 'AI', 'Web'];

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <FieldSection id="projects">
      <SectionHeader
        plate="Plate No. 6"
        collected="The Collection"
        headline="Fourteen Specimens"
        standfirst="Each project pressed and catalogued — a small collection of problems, solved."
      />

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-2 font-serif text-[13px] italic transition-colors ${
              filter === f ? 'border-forest bg-forest/10 text-forest' : 'border-ink/30 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <SpecimenCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </FieldSection>
  );
};

export default Projects;
