import { motion, useTransform } from 'framer-motion';
import { CAREER_START_YEAR } from '../../data/site';
import { useEffect } from 'react';
import { useScrubbedCount } from '../useScrubbedCount';
import { sound } from '../sound';
import type { SceneProps } from './types';

const LINES = [
  { text: '$ mkdir hello-world && cd hello-world', out: false },
  { text: `$ echo "console.log('hello, world')" > index.js`, out: false },
  { text: '$ node index.js', out: false },
  { text: 'hello, world', out: true },
];
const TOTAL = LINES.reduce((n, l) => n + l.text.length, 0);

const MILESTONES = [
  { year: CAREER_START_YEAR, label: 'B.Tech CSE begins' },
  { year: CAREER_START_YEAR + 1, label: 'Leading a team' },
  { year: CAREER_START_YEAR + 2, label: 'Shipping to production' },
  { year: CAREER_START_YEAR + 3, label: 'AI & training models' },
];

const Milestone = ({ local, index, year, label }: SceneProps & { index: number; year: number; label: string }) => {
  const at = 0.55 + index * 0.1;
  const opacity = useTransform(local, [at, at + 0.06], [0, 1]);
  const y = useTransform(local, [at, at + 0.06], [10, 0]);
  return (
    <motion.li style={{ opacity, y }} className="flex flex-col items-center gap-1 text-center">
      <span className="h-2.5 w-2.5 rounded-full bg-vermilion" aria-hidden="true" />
      <span className="font-display text-lg font-extrabold text-[#f3ede1]">{year}</span>
      <span className="max-w-[7rem] font-monopress text-[9px] uppercase tracking-[0.14em] text-[#f3ede1]/60 sm:text-[10px]">{label}</span>
    </motion.li>
  );
};

/** A terminal that types itself as you scroll, then the career timeline draws underneath. */
const FirstLineScene = ({ local }: SceneProps) => {
  const typed = useScrubbedCount(local, 0.08, 0.5, TOTAL);
  useEffect(() => {
    if (typed > 0 && typed < TOTAL) sound.tick();
  }, [typed]);
  const spine = useTransform(local, [0.52, 0.9], ['0%', '100%']);
  let remaining = typed;

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-between gap-6 px-5">
      <div className="overflow-hidden rounded-md border border-[#f3ede1]/15 bg-black/50 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-[#f3ede1]/10 px-3 py-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f3ede1]/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f3ede1]/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f3ede1]/25" />
        </div>
        <pre className="min-h-[7.5rem] whitespace-pre-wrap text-left break-words p-4 font-monopress text-[11px] leading-relaxed sm:text-xs" aria-label="A terminal printing hello, world">
          {LINES.map((l, i) => {
            const shown = Math.max(0, Math.min(l.text.length, remaining));
            remaining -= l.text.length;
            if (shown === 0) return null;
            return (
              <span key={i} className={`block ${l.out ? 'text-vermilion' : 'text-[#f3ede1]/85'}`}>
                {l.text.slice(0, shown)}
                {shown < l.text.length && <span className="ml-px inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-[#f3ede1]" />}
              </span>
            );
          })}
        </pre>
      </div>

      <div className="relative pt-3">
        <div className="absolute left-0 right-0 top-[18px] h-px bg-[#f3ede1]/15" aria-hidden="true" />
        <motion.div style={{ width: spine }} className="absolute left-0 top-[18px] h-px bg-vermilion" aria-hidden="true" />
        <ol className="relative grid grid-cols-4">
          {MILESTONES.map((m, i) => (
            <Milestone key={m.year} local={local} index={i} year={m.year} label={m.label} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default FirstLineScene;
