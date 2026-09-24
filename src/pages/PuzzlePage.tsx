import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Seo from '../components/Seo';
import { COLS, ROWS, entries, solution, numberAt, cellsOf, type Entry } from '../data/puzzle';

type Dir = 'across' | 'down';
const STORAGE_KEY = 'press-daily-mini';

const emptyGrid = () => solution.map((row) => row.map((c) => (c ? '' : null)));

const loadGrid = (): (string | null)[][] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const g = JSON.parse(raw) as (string | null)[][];
      if (g.length === ROWS && g[0]?.length === COLS) return g;
    }
  } catch {
    /* storage unavailable */
  }
  return emptyGrid();
};

const entryAt = (row: number, col: number, dir: Dir): Entry | undefined =>
  entries.find((e) => e.direction === dir && cellsOf(e).some((c) => c.row === row && c.col === col));

/** /puzzle — The Daily Mini, a crossword set from the tools behind this site. */
const PuzzlePage = () => {
  const [grid, setGrid] = useState(loadGrid);
  const [active, setActive] = useState({ row: 3, col: 0 });
  const [dir, setDir] = useState<Dir>('across');
  const [checked, setChecked] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(grid));
    } catch {
      /* storage unavailable */
    }
  }, [grid]);

  const solved = useMemo(
    () => solution.every((row, r) => row.every((c, col) => c === null || grid[r][col] === c)),
    [grid]
  );

  // Fall back to the other direction when the active cell isn't part of one in the current direction
  const current = entryAt(active.row, active.col, dir) ?? entryAt(active.row, active.col, dir === 'across' ? 'down' : 'across');
  const currentCells = current ? cellsOf(current) : [];
  const inCurrent = (r: number, c: number) => currentCells.some((x) => x.row === r && x.col === c);

  const focus = (row: number, col: number) => {
    setActive({ row, col });
    inputs.current[row][col]?.focus();
  };

  const step = (row: number, col: number, d: Dir, delta: 1 | -1) => {
    const r = row + (d === 'down' ? delta : 0);
    const c = col + (d === 'across' ? delta : 0);
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS && solution[r][c]) focus(r, c);
  };

  const effectiveDir: Dir = current?.direction ?? dir;

  const write = (row: number, col: number, value: string) => {
    setChecked(false);
    setGrid((g) => g.map((line, r) => line.map((cell, c) => (r === row && c === col ? value : cell))));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    const moves: Record<string, [Dir, 1 | -1]> = {
      ArrowRight: ['across', 1],
      ArrowLeft: ['across', -1],
      ArrowDown: ['down', 1],
      ArrowUp: ['down', -1],
    };
    if (moves[e.key]) {
      e.preventDefault();
      const [d, delta] = moves[e.key];
      if (entryAt(row, col, d)) setDir(d);
      step(row, col, d, delta);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (grid[row][col]) write(row, col, '');
      else step(row, col, effectiveDir, -1);
    } else if (/^[a-z]$/i.test(e.key) && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      write(row, col, e.key.toUpperCase());
      step(row, col, effectiveDir, 1);
    }
  };

  // Only a click on a square that already had focus turns the corner
  const hadFocus = useRef(false);

  const onCellClick = (row: number, col: number) => {
    // Clicking the active cell again flips direction, like every crossword app
    if (hadFocus.current && active.row === row && active.col === col) {
      const other: Dir = dir === 'across' ? 'down' : 'across';
      if (entryAt(row, col, other)) setDir(other);
    } else if (!entryAt(row, col, dir)) {
      setDir(dir === 'across' ? 'down' : 'across');
    }
    setActive({ row, col });
  };

  const reset = () => {
    setGrid(emptyGrid());
    setChecked(false);
    focus(3, 0);
  };

  const clueList = (d: Dir) => (
    <div>
      <h2 className="border-b-2 border-ink pb-1.5 font-monopress text-[10px] uppercase tracking-[0.2em] text-ink">{d}</h2>
      <ol className="mt-2 space-y-1.5">
        {entries
          .filter((e) => e.direction === d)
          .sort((a, b) => a.number - b.number)
          .map((e) => {
            const on = current?.number === e.number && current.direction === d;
            return (
              <li key={`${d}-${e.number}`}>
                <button
                  type="button"
                  onClick={() => {
                    setDir(d);
                    focus(e.row, e.col);
                  }}
                  className={`flex w-full gap-2 px-1.5 py-1 text-left font-editorial text-[14.5px] leading-snug transition-colors ${
                    on ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/10'
                  }`}
                >
                  <span className="w-4 shrink-0 font-monopress text-[11px] font-bold">{e.number}</span>
                  <span>{e.clue}</span>
                </button>
              </li>
            );
          })}
      </ol>
    </div>
  );

  return (
    <>
      <Seo
        title="The Daily Mini — Suraj Nandan"
        description="A small crossword set from the tools behind The Nandan Review."
        path="/puzzle"
        noindex
      />
      <article className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">Puzzles</span>
            <span>Pg. 32</span>
          </div>
          <div className="border-t border-ink" />

          <h1 className="mt-8 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
            The Daily Mini
          </h1>
          <p className="mt-3 font-editorial text-lg italic text-ink-mute">
            Seven words from the tools behind this paper. Type to fill; click a square twice to turn the corner.
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-[auto_1fr]">
            <div>
              <div
                role="group"
                aria-label="Crossword grid"
                className="inline-grid border-2 border-ink bg-ink"
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gap: '2px' }}
              >
                {solution.map((row, r) =>
                  row.map((cell, c) => {
                    if (!cell) return <div key={`${r}-${c}`} className="h-11 w-11 bg-ink sm:h-14 sm:w-14" aria-hidden="true" />;
                    const n = numberAt(r, c);
                    const isActive = active.row === r && active.col === c;
                    const wrong = checked && grid[r][c] && grid[r][c] !== cell;
                    return (
                      <div
                        key={`${r}-${c}`}
                        className={`relative h-11 w-11 sm:h-14 sm:w-14 ${
                          solved ? 'bg-paper-bright' : isActive ? 'bg-oxblood/25' : inCurrent(r, c) ? 'bg-ink/10' : 'bg-paper'
                        }`}
                      >
                        {n && (
                          <span className="pointer-events-none absolute left-0.5 top-0 font-monopress text-[9px] text-ink-mute">
                            {n}
                          </span>
                        )}
                        <input
                          ref={(el) => {
                            inputs.current[r][c] = el;
                          }}
                          value={grid[r][c] ?? ''}
                          onChange={(e) => {
                            // Mobile keyboards often send "Unidentified" keydowns — take the letter from the input instead
                            const letter = e.target.value.slice(-1).toUpperCase();
                            if (/^[A-Z]$/.test(letter)) {
                              write(r, c, letter);
                              step(r, c, effectiveDir, 1);
                            }
                          }}
                          onKeyDown={(e) => onKeyDown(e, r, c)}
                          onFocus={() => setActive({ row: r, col: c })}
                          onMouseDown={(e) => {
                            hadFocus.current = document.activeElement === e.currentTarget;
                          }}
                          onClick={() => onCellClick(r, c)}
                          autoComplete="off"
                          autoCapitalize="characters"
                          aria-label={`Row ${r + 1}, column ${c + 1}${n ? `, clue ${n}` : ''}`}
                          className={`h-full w-full bg-transparent text-center font-display text-xl font-black uppercase caret-transparent focus:outline-none sm:text-2xl ${
                            wrong ? 'text-oxblood line-through' : 'text-ink'
                          }`}
                        />
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setChecked(true)}
                  className="bg-ink px-4 py-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-oxblood"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 border border-ink/40 px-4 py-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute transition-colors hover:border-ink hover:text-ink"
                >
                  <RotateCcw size={12} /> Clear
                </button>
              </div>

              <p aria-live="polite" className="mt-4 min-h-[1.5rem] font-editorial text-[15px] italic">
                {solved
                  ? 'Solved. The Editor tips a hat.'
                  : checked
                    ? 'Wrong letters are struck through.'
                    : ''}
              </p>
            </div>

            <div className="grid content-start gap-8 sm:grid-cols-2 md:grid-cols-1">
              {clueList('across')}
              {clueList('down')}
            </div>
          </div>

          <div className="mt-14">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink hover:text-oxblood"
            >
              <ArrowLeft size={14} /> Back to the front page
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default PuzzlePage;
