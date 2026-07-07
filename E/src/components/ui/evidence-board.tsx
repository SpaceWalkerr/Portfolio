import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { caseEase } from './casefile';

const PIN_POINTS = [
  { x: 60, y: 60 },
  { x: 260, y: 140 },
  { x: 480, y: 50 },
  { x: 700, y: 160 },
  { x: 900, y: 70 },
  { x: 780, y: 320 },
  { x: 520, y: 260 },
  { x: 300, y: 340 },
  { x: 90, y: 250 },
];

const STRING_PATH =
  'M60,60 C160,110 200,150 260,140 S 400,60 480,50 S 620,140 700,160 S 850,60 900,70 M700,160 C 760,220 740,280 780,320 S 580,300 520,260 S 360,290 300,340 S 130,300 90,250';

/** The red-string backdrop connecting evidence pins — decorative, self-drawing on scroll-in. */
export const EvidenceBoard = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative border-4 border-ink/80 bg-[#5b432c] p-6 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] sm:p-10 ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.5) 1px, transparent 1.5px)',
          backgroundSize: '10px 10px',
        }}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 960 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        aria-hidden="true"
      >
        <motion.path
          d={STRING_PATH}
          fill="none"
          stroke="#b32b2b"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.8, ease: caseEase }}
        />
        {PIN_POINTS.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="#8a1f1f"
            stroke="#e4ddc8"
            strokeWidth="1.5"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: reduceMotion ? 0 : 0.3 + i * 0.12 }}
          />
        ))}
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
