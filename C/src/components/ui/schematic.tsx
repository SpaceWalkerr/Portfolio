import { motion, useReducedMotion } from 'framer-motion';
import type { ProjectPart } from '../../data/projects';
import { draftEase } from './blueprint';

const SLOTS: Record<number, { x: number; y: number }[]> = {
  3: [
    { x: 40, y: 40 },
    { x: 280, y: 40 },
    { x: 160, y: 205 },
  ],
  4: [
    { x: 40, y: 40 },
    { x: 280, y: 40 },
    { x: 40, y: 190 },
    { x: 280, y: 190 },
  ],
  5: [
    { x: 30, y: 32 },
    { x: 290, y: 32 },
    { x: 20, y: 190 },
    { x: 300, y: 190 },
    { x: 160, y: 210 },
  ],
};

const BOX = { x: 95, y: 60, w: 130, h: 90 };

function edgePoint(node: { x: number; y: number }) {
  if (node.y <= BOX.y) return { x: Math.min(Math.max(node.x, BOX.x), BOX.x + BOX.w), y: BOX.y };
  if (node.y >= BOX.y + BOX.h) return { x: Math.min(Math.max(node.x, BOX.x), BOX.x + BOX.w), y: BOX.y + BOX.h };
  if (node.x <= BOX.x) return { x: BOX.x, y: Math.min(Math.max(node.y, BOX.y), BOX.y + BOX.h) };
  return { x: BOX.x + BOX.w, y: Math.min(Math.max(node.y, BOX.y), BOX.y + BOX.h) };
}

interface ProjectSchematicProps {
  id: string;
  title: string;
  parts: ProjectPart[];
}

/**
 * The generic "exploded" schematic language every project sheet shares: a
 * hatched system-boundary body with numbered leader-line callouts to each
 * part, drawn in as the card enters the viewport (real pathLength / stroke
 * animation, not an opacity fade).
 */
export const ProjectSchematic = ({ id, title, parts }: ProjectSchematicProps) => {
  const reduceMotion = useReducedMotion();
  const slots = SLOTS[parts.length] ?? SLOTS[4];
  const patternId = `hatch-${id}`;

  return (
    <div>
      <svg viewBox="0 0 320 220" className="h-auto w-full" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#eaf2ff" strokeOpacity="0.35" strokeWidth="1" />
          </pattern>
        </defs>

        <motion.rect
          x={BOX.x}
          y={BOX.y}
          width={BOX.w}
          height={BOX.h}
          fill={`url(#${patternId})`}
          stroke="#eaf2ff"
          strokeWidth="1.6"
          initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: draftEase }}
        />
        <text
          x={BOX.x + BOX.w / 2}
          y={BOX.y + BOX.h / 2 + 4}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="1"
          fill="#eaf2ff"
          fontFamily="'IBM Plex Mono', monospace"
        >
          {title.toUpperCase()}
        </text>

        {parts.map((part, i) => {
          const node = slots[i];
          const edge = edgePoint(node);
          return (
            <g key={part.label}>
              <motion.line
                x1={edge.x}
                y1={edge.y}
                x2={node.x}
                y2={node.y}
                stroke="#9fc0e8"
                strokeWidth="1.2"
                initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.3 + i * 0.12, ease: draftEase }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="10"
                fill="#0f3f78"
                stroke="#c9a24a"
                strokeWidth="1.4"
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: reduceMotion ? 0 : 0.4 + i * 0.12 }}
              />
              <motion.text
                x={node.x}
                y={node.y + 3}
                textAnchor="middle"
                fontSize="9"
                fill="#c9a24a"
                fontFamily="'IBM Plex Mono', monospace"
                initial={{ opacity: reduceMotion ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: reduceMotion ? 0 : 0.4 + i * 0.12 }}
              >
                {i + 1}
              </motion.text>
            </g>
          );
        })}
      </svg>

      <ol className="mt-4 space-y-1.5">
        {parts.map((part, i) => (
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
