import { lazy, Suspense } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Project } from '../../data/projects';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { ProjectSchematic } from './schematic';

// Three.js is a ~130KB gzipped dependency — code-split AND gated on actual
// scroll visibility (see useInViewOnce below). React.lazy alone triggers its
// import() on first render, which is too early for a card that may sit far
// down a 14-item grid that's unconditionally mounted.
const LazyScene = lazy(() => import('./exploded-view-3d'));

const LAYER_COLORS = [0x1a5caf, 0x2a6fc9, 0x3a82e0, 0x4f95f0, 0x6aa8ff];

const SceneFallback = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-2 opacity-60">
    {[0, 1, 2].map((i) => (
      <div key={i} className="h-2 w-2/3 border border-ink/40" style={{ opacity: 1 - i * 0.2 }} />
    ))}
    <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-pale/70">Loading Fig&hellip;</span>
  </div>
);

interface ExplodedViewProps {
  project: Project;
}

/** The one place true WebGL earns its keep: a draggable, self-exploding 3D patent figure. */
export const ExplodedView = ({ project }: ExplodedViewProps) => {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>('150px');

  if (reduceMotion) {
    return <ProjectSchematic id={project.id} title={project.title} parts={project.parts} />;
  }

  return (
    <div>
      <div ref={ref} className="relative aspect-[4/3] w-full border border-ink/25 bg-blueprint-shadow/40">
        {inView ? (
          <Suspense fallback={<SceneFallback />}>
            <LazyScene
              className="h-full w-full"
              layers={project.parts.map((part, i) => ({
                label: part.label,
                color: LAYER_COLORS[i % LAYER_COLORS.length],
              }))}
            />
          </Suspense>
        ) : (
          <SceneFallback />
        )}
        <div className="pointer-events-none absolute inset-x-2 bottom-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-pale/70">
          <span>Drag to Rotate</span>
          <span>Scale 1:4</span>
        </div>
      </div>

      <ol className="mt-4 space-y-1.5">
        {project.parts.map((part, i) => (
          <li key={part.label} className="flex gap-2.5 font-mono text-[11px] leading-relaxed text-ink-mute">
            <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center border border-brass text-[9px] text-brass">
              {i + 1}
            </span>
            <span>
              <span className="text-ink">{part.label}</span> &mdash; {part.note}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
