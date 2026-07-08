import { motion, useReducedMotion } from 'framer-motion';
import { missionEase } from './mission';

const STARS = [
  { x: 40, y: 40 },
  { x: 180, y: 20 },
  { x: 320, y: 60 },
  { x: 460, y: 25 },
  { x: 600, y: 55 },
  { x: 740, y: 20 },
  { x: 880, y: 50 },
];

/** A self-drawing star-chart connecting each mission — purely decorative, sets the scene above the mission grid. */
export const Constellation = () => {
  const reduceMotion = useReducedMotion();
  const path = STARS.map((s, i) => `${i === 0 ? 'M' : 'L'}${s.x},${s.y}`).join(' ');

  return (
    <svg viewBox="0 0 920 90" preserveAspectRatio="none" className="mb-10 h-16 w-full opacity-80" aria-hidden="true">
      <motion.path
        d={path}
        fill="none"
        stroke="#ffb020"
        strokeWidth="1"
        strokeDasharray="3 4"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.6, ease: missionEase }}
      />
      {STARS.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x}
          cy={s.y}
          r="3"
          fill="#dce8f5"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: reduceMotion ? 0 : 0.2 + i * 0.15 }}
        />
      ))}
    </svg>
  );
};
