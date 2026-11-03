import { motion, useTransform, type MotionValue } from 'framer-motion';
import { experiences } from '../../data/experience';
import { useScrubbedCount } from '../useScrubbedCount';
import type { SceneProps } from './types';

/** Roles on the path, oldest first. Looked up by company so the copy and dates stay in experience.ts. */
const PATH = ['Viral Fission', 'Xtin Capital', 'Wealth Shala', 'Berry Stenley', 'Mercor']
  .map((company) => experiences.find((e) => e.company === company))
  .filter((e): e is NonNullable<typeof e> => e !== undefined);

/** Figures quoted from the role write-ups in experience.ts */
const STATS = [
  { to: 10000, suffix: '+', label: 'daily API requests served', format: (n: number) => n.toLocaleString('en-US') },
  { to: 99.9, suffix: '%', label: 'uptime on the platform', format: (n: number) => (n / 10).toFixed(1), scale: 10 },
  { to: 40, suffix: '%', label: 'faster dashboard load', format: (n: number) => String(n) },
];

const Stop = ({ local, index, role }: { local: MotionValue<number>; index: number; role: (typeof PATH)[number] }) => {
  const at = 0.08 + index * 0.13;
  const opacity = useTransform(local, [at, at + 0.07], [0.12, 1]);
  const scale = useTransform(local, [at, at + 0.07], [0.6, 1]);
  return (
    <motion.li style={{ opacity }} className="relative flex items-center gap-3 sm:block sm:text-center">
      <motion.span style={{ scale }} className="block h-3 w-3 shrink-0 rounded-full bg-vermilion sm:mx-auto sm:mb-2" aria-hidden="true" />
      <div>
        <p className="font-display text-sm font-bold leading-tight text-[#f3ede1] sm:text-base">{role.company}</p>
        <p className="font-monopress text-[9px] uppercase tracking-[0.12em] text-[#f3ede1]/55 sm:text-[10px]">{role.period}</p>
        <p className="hidden font-editorial text-xs italic text-[#f3ede1]/70 sm:block">{role.role}</p>
      </div>
    </motion.li>
  );
};

const Stat = ({ local, stat }: { local: MotionValue<number>; stat: (typeof STATS)[number] }) => {
  const scale = stat.scale ?? 1;
  const n = useScrubbedCount(local, 0.55, 0.9, Math.round(stat.to * scale));
  return (
    <div className="text-center">
      <dd className="font-display text-2xl font-extrabold text-vermilion sm:text-4xl">
        {stat.format(n)}
        {stat.suffix}
      </dd>
      <dt className="font-monopress text-[9px] uppercase tracking-[0.12em] text-[#f3ede1]/55 sm:text-[10px]">{stat.label}</dt>
    </div>
  );
};

/** A career path that lights up stop by stop, then the numbers that came with it count up. */
const WorkScene = ({ local }: SceneProps) => {
  const draw = useTransform(local, [0.08, 0.7], ['0%', '100%']);
  const drawY = useTransform(local, [0.08, 0.7], ['0%', '100%']);
  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col justify-between gap-5 px-5 text-left">
      <div className="relative">
        {/* horizontal spine on desktop, vertical on phones */}
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-[#f3ede1]/15 sm:hidden" aria-hidden="true" />
        <motion.div style={{ height: drawY }} className="absolute left-[5px] top-1 w-px bg-vermilion sm:hidden" aria-hidden="true" />
        <div className="absolute left-0 right-0 top-[5px] hidden h-px bg-[#f3ede1]/15 sm:block" aria-hidden="true" />
        <motion.div style={{ width: draw }} className="absolute left-0 top-[5px] hidden h-px bg-vermilion sm:block" aria-hidden="true" />
        <ol className="relative grid gap-3 sm:grid-cols-5 sm:gap-2">
          {PATH.map((role, i) => (
            <Stop key={role.company} local={local} index={i} role={role} />
          ))}
        </ol>
      </div>
      <dl className="grid grid-cols-3 gap-2 border-t border-[#f3ede1]/10 pt-4">
        {STATS.map((s) => (
          <Stat key={s.label} local={local} stat={s} />
        ))}
      </dl>
    </div>
  );
};

export default WorkScene;
