import { Suspense, useEffect, useState } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { JourneyChapter } from '../data/journey';
import { scenes } from './scenes';
import { useScrubbedCount } from './useScrubbedCount';

interface Props {
  chapter: JourneyChapter;
  index: number;
  count: number;
  /** Master film progress, 0–1 */
  progress: MotionValue<number>;
}

const TITLE_CLASS = 'font-display font-extrabold leading-[0.95] tracking-tight text-[#f3ede1]';

/** The cold-open title: types itself on arrival, then stays in step with scroll if the visitor is faster. */
const TypedTitle = ({ text, local }: { text: string; local: MotionValue<number> }) => {
  const scrubbed = useScrubbedCount(local, 0.01, 0.1, text.length);
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (auto >= text.length) return;
    const t = setTimeout(() => setAuto((n) => n + 1), auto === 0 ? 500 : 95);
    return () => clearTimeout(t);
  }, [auto, text.length]);
  const n = Math.max(auto, scrubbed);
  return (
    <h2 aria-label={text} className={`${TITLE_CLASS} text-5xl sm:text-7xl lg:text-8xl`}>
      <span aria-hidden="true">
        {text.slice(0, n)}
        <span className="ml-1 inline-block h-[0.8em] w-[0.08em] translate-y-[0.08em] animate-pulse bg-vermilion" />
      </span>
    </h2>
  );
};

/**
 * One chapter's stage: the shared fade/translate shell, the title block and, when the
 * chapter has one, its scene artwork underneath.
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
  const local = useTransform(progress, [start, end], [0, 1]);
  const lineWidth = useTransform(local, [0, 0.5], ['0%', '100%']);
  const Art = scenes[chapter.id];

  return (
    <motion.section
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col items-center px-6 text-center ${Art ? 'justify-start pt-[13vh]' : 'justify-center'}`}
      aria-label={chapter.title}
    >
      <p className="font-monopress text-[11px] uppercase tracking-[0.3em] text-vermilion">
        {String(index + 1).padStart(2, '0')} · {chapter.kicker}
      </p>
      <div className="mt-5 max-w-4xl">
        {chapter.typeTitle ? (
          <TypedTitle text={chapter.title} local={local} />
        ) : (
          <h2 className={`${TITLE_CLASS} ${Art ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-5xl sm:text-7xl lg:text-8xl'}`}>{chapter.title}</h2>
        )}
      </div>
      <motion.div style={{ width: lineWidth }} className={`h-px max-w-md bg-vermilion ${Art ? 'mt-5' : 'mt-8'}`} />
      <p className="mt-5 max-w-xl font-editorial text-lg italic text-[#f3ede1]/70 sm:text-xl">{chapter.line}</p>

      {Art && (
        <div className="absolute inset-x-0 bottom-[9vh] h-[36vh] min-h-[250px]">
          <Suspense fallback={null}>
            <Art local={local} />
          </Suspense>
        </div>
      )}
    </motion.section>
  );
};

export default ChapterScene;
