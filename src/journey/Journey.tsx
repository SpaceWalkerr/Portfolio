import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pause, Play } from 'lucide-react';
import { journeyChapters } from '../data/journey';
import ChapterScene from './ChapterScene';
import ProgressRail from './ProgressRail';
import { SCREENS_PER_CHAPTER, useJourneyProgress } from './useJourneyProgress';

const count = journeyChapters.length;

/**
 * The Journey film: a tall scroll track with a pinned full-screen stage. Scrolling
 * scrubs the master progress; each chapter fades through its slice of it.
 */
const Journey = () => {
  const navigate = useNavigate();
  const { trackRef, progress, active, goTo, playing, setPlaying } = useJourneyProgress(count);
  const exit = () => navigate('/');

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'The Journey — Suraj Nandan';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/');
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo, navigate, setPlaying]);

  return (
    <div className="bg-[#0e0d0b] text-[#f3ede1]">
      <div ref={trackRef} style={{ height: `${count * SCREENS_PER_CHAPTER * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Stage background — a soft vignette now; chapter scenes layer their own art over it */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(139,30,30,0.22), transparent 60%)' }}
            aria-hidden="true"
          />
          {journeyChapters.map((chapter, i) => (
            <ChapterScene key={chapter.id} chapter={chapter} index={i} count={count} progress={progress} />
          ))}

          <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6">
            <button
              type="button"
              onClick={exit}
              className="pointer-events-auto inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.18em] text-[#f3ede1]/80 transition-colors hover:text-vermilion"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Skip to site
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={playing}
              className="pointer-events-auto inline-flex items-center gap-2 border border-[#f3ede1]/40 px-3 py-2 font-monopress text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-vermilion hover:text-vermilion"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? 'Pause' : 'Auto-play'}
            </button>
          </header>

          <ProgressRail chapters={journeyChapters} active={active} progress={progress} onGo={goTo} />

          <p className="pointer-events-none absolute inset-x-0 bottom-5 z-20 text-center font-monopress text-[10px] uppercase tracking-[0.3em] text-[#f3ede1]/50">
            {active === 0 ? 'Scroll ↓' : `Chapter ${active + 1} / ${count}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journey;
