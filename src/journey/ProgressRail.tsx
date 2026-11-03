import { motion, type MotionValue } from 'framer-motion';
import type { JourneyChapter } from '../data/journey';

interface Props {
  chapters: JourneyChapter[];
  active: number;
  progress: MotionValue<number>;
  onGo: (index: number) => void;
}

/** Chapter dots down the right edge, with a thin fill showing film progress. */
const ProgressRail = ({ chapters, active, progress, onGo }: Props) => (
  <nav aria-label="Journey chapters" className="pointer-events-auto fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 sm:block">
    <div className="relative flex flex-col items-end gap-5">
      <div className="absolute right-[5px] top-1 bottom-1 w-px bg-[#f3ede1]/15" aria-hidden="true">
        <motion.div style={{ scaleY: progress }} className="h-full origin-top bg-vermilion" />
      </div>
      {chapters.map((c, i) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onGo(i)}
          aria-current={i === active ? 'step' : undefined}
          aria-label={`Chapter ${i + 1}: ${c.title}`}
          className="group relative flex items-center gap-3"
        >
          <span
            className={`font-monopress text-[10px] uppercase tracking-[0.18em] transition-opacity ${
              i === active ? 'text-[#f3ede1] opacity-100' : 'text-[#f3ede1]/60 opacity-0 group-hover:opacity-100'
            }`}
          >
            {c.kicker}
          </span>
          <span
            className={`relative h-[11px] w-[11px] rounded-full border transition-colors ${
              i === active ? 'border-vermilion bg-vermilion' : 'border-[#f3ede1]/40 bg-[#0e0d0b] group-hover:border-[#f3ede1]'
            }`}
          />
        </button>
      ))}
    </div>
  </nav>
);

export default ProgressRail;
