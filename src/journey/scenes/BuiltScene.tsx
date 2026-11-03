import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';
import { projects } from '../../data/projects';
import { caseStudies } from '../../data/caseStudies';
import { useScrubbedCount } from '../useScrubbedCount';
import type { SceneProps } from './types';

/** Projects shown in the film — each one's pipeline and figures come straight from its case study. */
const SLUGS = ['cardbridge', 'job-scheduler', 'knot-ai', 'gigshield'];
const SHOWN = SLUGS.map((slug) => {
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];
  return project && study ? { project, study } : null;
}).filter((x): x is NonNullable<typeof x> => x !== null);

const Slide = ({ slot, index }: { slot: MotionValue<number>; index: number }) => {
  const { project, study } = SHOWN[index];
  const nodes = study.flow;
  const built = useScrubbedCount(slot, 0.12, 0.7, nodes.length);
  const figures = study.figures.slice(0, 2);
  const figOpacity = useTransform(slot, [0.75, 0.88], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 mx-auto grid max-w-5xl grid-cols-1 items-center gap-4 px-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-8"
    >
      <figure className="hidden overflow-hidden rounded-sm border border-[#f3ede1]/15 shadow-2xl sm:block">
        <img src={project.image} alt="" className="aspect-[16/10] w-full object-cover object-top" loading="lazy" />
        <figcaption className="flex items-center justify-between bg-black/60 px-3 py-2 text-left font-monopress text-[10px] uppercase tracking-[0.16em]">
          <span className="text-[#f3ede1]">{project.name}</span>
          <span className="text-vermilion">{project.category}</span>
        </figcaption>
      </figure>

      <div className="text-left">
        <p className="mb-2 font-monopress text-[10px] uppercase tracking-[0.18em] text-[#f3ede1] sm:hidden">
          {project.name} · <span className="text-vermilion">{project.category}</span>
        </p>
        <p className="mb-3 hidden font-monopress text-[10px] uppercase tracking-[0.2em] text-[#f3ede1]/50 sm:block">How it works</p>
        <ol className="relative space-y-1.5 border-l border-[#f3ede1]/15 pl-4">
          <motion.span
            aria-hidden="true"
            className="absolute -left-px top-0 w-px origin-top bg-vermilion"
            style={{ height: '100%', scaleY: useTransform(slot, [0.12, 0.7], [0, 1]) }}
          />
          {nodes.map((n, i) => (
            <motion.li
              key={n.label}
              initial={false}
              animate={{ opacity: i < built ? 1 : 0.15, x: i < built ? 0 : 12 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <span className="absolute -left-[21px] top-[7px] h-2 w-2 rounded-full bg-vermilion" aria-hidden="true" />
              <span className="font-display text-sm font-bold text-[#f3ede1] sm:text-base">{n.label}</span>
              <span className="ml-2 font-monopress text-[10px] text-[#f3ede1]/55 sm:text-[11px]">{n.detail}</span>
            </motion.li>
          ))}
        </ol>
        <motion.dl style={{ opacity: figOpacity }} className="mt-4 flex gap-6">
          {figures.map((f) => (
            <div key={f.label}>
              <dd className="font-display text-xl font-extrabold text-vermilion sm:text-2xl">{f.value}</dd>
              <dt className="max-w-[9rem] font-monopress text-[9px] uppercase leading-tight tracking-[0.12em] text-[#f3ede1]/55">{f.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </motion.div>
  );
};

/** One project at a time: its screenshot, then its real pipeline building node by node, then headline figures. */
const BuiltScene = ({ local }: SceneProps) => {
  const n = SHOWN.length;
  const [index, setIndex] = useState(0);
  const slot = useTransform(local, (v) => {
    const s = Math.min(n - 1, Math.floor(v * n));
    return Math.min(1, v * n - s);
  });
  useMotionValueEvent(local, 'change', (v) => {
    const next = Math.min(n - 1, Math.floor(Math.max(0, v) * n));
    setIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <Slide key={SHOWN[index].project.slug} slot={slot} index={index} />
      </AnimatePresence>
    </div>
  );
};

export default BuiltScene;
