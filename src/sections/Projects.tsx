import { forwardRef, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionShell from "../components/SectionShell";
import Reveal from "../components/Reveal";
import { section } from "../lib/sections";
import { PROJECTS, PROJECT_FILTERS, type Project, type ProjectCategory } from "../data/content";

const { def, index } = section("projects");

const FILTERS = PROJECT_FILTERS;
type Filter = (typeof FILTERS)[number];

const ProjectCard = forwardRef<
  HTMLButtonElement,
  { project: Project; onOpen: () => void }
>(function ProjectCard({ project, onOpen }, ref) {
  return (
    <motion.button
      ref={ref}
      layout
      onClick={onOpen}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-left transition-colors duration-500 hover:border-[color:var(--accent)]"
      style={{ boxShadow: "0 0 0 0 rgba(var(--accent-rgb),0)" }}
    >
      {/* amber edge glow on hover — drawn toward the light */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 30px -8px rgba(var(--accent-rgb),0.5)" }}
      />
      <p className="readout mb-4" style={{ color: "var(--accent)" }}>
        {project.category}
      </p>
      <h3 className="mb-2 font-display text-xl font-medium text-text-primary">
        {project.title}
      </h3>
      <p className="mb-5 text-sm leading-relaxed text-text-muted">{project.blurb}</p>
      <div className="flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="readout text-[0.6rem] text-text-muted/80">
            {s}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-block text-sm text-text-muted transition-colors group-hover:text-[color:var(--accent)]">
        View details →
      </span>
    </motion.button>
  );
});

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-abyss-black/80 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-deep-navy/95 p-8"
            style={{ boxShadow: "0 0 60px -12px rgba(var(--accent-rgb),0.35)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="eyebrow mb-3">{project.category}</p>
            <h3 className="mb-4 font-display text-2xl font-light text-text-primary">
              {project.title}
            </h3>
            <p className="mb-6 text-base leading-relaxed text-text-muted">
              {project.description}
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-5 py-2.5 text-sm font-medium text-abyss-black transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--accent)" }}
                >
                  Live demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-white/40"
                >
                  GitHub
                </a>
              )}
              <button onClick={onClose} className="ml-auto text-sm text-text-muted hover:text-text-primary">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === (filter as ProjectCategory))),
    [filter],
  );

  return (
    <SectionShell section={def} index={index} loopOpacity={0.24}>
      <Reveal>
        <p className="eyebrow mb-4">Bathypelagic — the lure</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="accent-underline mb-10 font-display text-4xl font-light tracking-tight text-text-primary md:text-5xl">
          Projects
        </h2>
      </Reveal>

      {/* filter tabs — only the active one is the lit lure; others dim */}
      <Reveal delay={0.1}>
        <div className="mb-12 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  "rounded-full border px-4 py-2 text-sm transition-all duration-300 " +
                  (isActive
                    ? ""
                    : "border-white/10 text-text-muted hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]")
                }
                style={
                  isActive
                    ? {
                        color: "var(--abyss-black)",
                        background: "var(--accent)",
                        borderColor: "var(--accent)",
                        boxShadow: "0 0 22px 0 rgba(var(--accent-rgb),0.45)",
                      }
                    : undefined
                }
              >
                {f}
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.title} project={p} onOpen={() => setActive(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}
