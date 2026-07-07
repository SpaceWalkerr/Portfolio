import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Github, Lock } from 'lucide-react';
import { TerminalSection, SectionHeader, NeonTag, TermButton, TerminalWindow } from './ui/terminal';
import { projects, type ProjectCategory } from '../data/projects';

const filters: Array<ProjectCategory | 'All'> = ['All', 'Full Stack', 'AI', 'Web'];

const permsFor = (category: ProjectCategory) =>
  category === 'AI' ? 'drwxr-x---' : category === 'Full Stack' ? 'drwxr-xr-x' : 'drwxrwxr-x';

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [openId, setOpenId] = useState<string | null>('cardbridge');

  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <TerminalSection id="projects">
      <SectionHeader
        command="ls -la ~/projects/"
        headline="ls_projects"
        standfirst="Fourteen directories, fourteen problems solved. Click any entry to cat its README."
      />

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`border px-4 py-2 font-mono text-[11px] lowercase tracking-[0.08em] transition-colors ${
              filter === f
                ? 'border-neon-pink bg-neon-pink/10 text-neon-pink'
                : 'border-neon-cyan/25 text-ink-mute hover:border-neon-cyan/50 hover:text-ink'
            }`}
          >
            --{f === 'All' ? 'all' : f.toLowerCase().replace(' ', '-')}
          </button>
        ))}
      </div>

      <TerminalWindow title="user@suraj:~/projects$ ls -la">
        <div className="hidden grid-cols-[110px_60px_70px_1fr_24px] gap-3 border-b border-white/10 pb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute sm:grid">
          <span>perms</span>
          <span>size</span>
          <span>date</span>
          <span>name</span>
          <span />
        </div>

        <div className="divide-y divide-white/5">
          {visible.map((project) => {
            const isOpen = openId === project.id;
            return (
              <div key={project.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[1fr_24px] items-center gap-3 py-3 text-left font-mono text-[13px] transition-colors hover:bg-white/[0.03] sm:grid-cols-[110px_60px_70px_1fr_24px]"
                >
                  <span className="hidden text-ink-mute sm:inline">{permsFor(project.category)}</span>
                  <span className="hidden text-ink-mute sm:inline">{project.size}</span>
                  <span className="hidden text-ink-mute sm:inline">{project.date}</span>
                  <span className="min-w-0 truncate">
                    <span className="text-neon-cyan-bright">{project.title}/</span>
                    <span className="ml-2 hidden text-ink-mute sm:inline">{project.subtitle}</span>
                  </span>
                  <ChevronRight
                    size={16}
                    className={`justify-self-end text-ink-mute transition-transform ${isOpen ? 'rotate-90 text-neon-pink' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4 border-l-2 border-neon-pink/50 pl-4 sm:pl-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neon-cyan-bright">
                          $ cat {project.title}/README.md
                        </p>
                        <p className="mt-3 max-w-2xl font-mono text-[13.5px] leading-relaxed text-ink">{project.abstract}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <NeonTag key={tag}>{tag}</NeonTag>
                          ))}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3 pb-2">
                          <TermButton href={project.live} variant="solid">
                            LIVE_DEMO <ExternalLink size={13} />
                          </TermButton>
                          {project.github ? (
                            <TermButton href={project.github} variant="outline">
                              SOURCE <Github size={13} />
                            </TermButton>
                          ) : project.sourcePrivate ? (
                            <span className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute/60">
                              source_private <Lock size={12} />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </TerminalWindow>
    </TerminalSection>
  );
};

export default Projects;
