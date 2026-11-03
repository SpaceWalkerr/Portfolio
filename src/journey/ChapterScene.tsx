import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { JourneyChapter } from '../data/journey';

interface Props {
  chapter: JourneyChapter;
  index: number;
  count: number;
  /** Master film progress, 0–1 */
  progress: MotionValue<number>;
}

/**
 * One chapter's stage. Phase 1 renders the title card only; each chapter gets its own
 * scene component in later phases and this stays as the shared fade/translate shell.
 */
const ChapterScene = ({ chapter, index, count, progress }: Props) => {
  const start = index / count;
  const end = (index + 1) / count;
  const span = end - start;
  // Fade in over the first 12% of the chapter, out over the last 12% (first/last chapter stay put at the film's edges)
  const fadeIn = index === 0 ? [start, start] : [start, start + span * 0.12];
  const fadeOut = index === count - 1 ? [end, end] : [end - span * 0.12, end];
  const opacity = useTransform(progress, [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]], [index === 0 ? 1 : 0, 1, 1, index === count - 1 ? 1 : 0]);
  const y = useTransform(progress, [start, start + span * 0.2, end - span * 0.2, end], [40, 0, 0, -40]);
  const lineWidth = useTransform(progress, [start, start + span * 0.5], ['0%', '100%']);

  return (
    <motion.section
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      aria-label={chapter.title}
    >
      <p className="font-monopress text-[11px] uppercase tracking-[0.3em] text-vermilion">
        {String(index + 1).padStart(2, '0')} · {chapter.kicker}
      </p>
      <h2 className="mt-5 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-[#f3ede1] sm:text-7xl lg:text-8xl">
        {chapter.title}
      </h2>
      <motion.div style={{ width: lineWidth }} className="mt-8 h-px max-w-md bg-vermilion" />
      <p className="mt-6 max-w-xl font-editorial text-lg italic text-[#f3ede1]/70 sm:text-xl">{chapter.line}</p>
    </motion.section>
  );
};

export default ChapterScene;
