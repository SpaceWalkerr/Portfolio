/**
 * The Daily Mini — a small crossword set from the tools behind this paper.
 *
 *   col 0 1 2 3 4 5
 *   r0  . V . . . .
 *   r1  . I . . . .
 *   r2  . T . . . .
 *   r3  R E A C T .
 *   r4  A . . S . .
 *   r5  G . . S Q L
 *   r6  . . . . . L
 *   r7  . . . D O M
 */

export interface Entry {
  number: number;
  direction: 'across' | 'down';
  row: number;
  col: number;
  answer: string;
  clue: string;
}

export const ROWS = 8;
export const COLS = 6;

export const entries: Entry[] = [
  { number: 2, direction: 'across', row: 3, col: 0, answer: 'REACT', clue: 'Library this whole paper is set in' },
  { number: 4, direction: 'across', row: 5, col: 3, answer: 'SQL', clue: 'Language of the database that referees CardBridge' },
  { number: 6, direction: 'across', row: 7, col: 3, answer: 'DOM', clue: 'The tree a browser builds from a page (abbr.)' },
  { number: 1, direction: 'down', row: 0, col: 1, answer: 'VITE', clue: 'French for “quick” — and this site’s build tool' },
  { number: 2, direction: 'down', row: 3, col: 0, answer: 'RAG', clue: 'How Ask the Editor stays grounded in its sources (abbr.)' },
  { number: 3, direction: 'down', row: 3, col: 3, answer: 'CSS', clue: 'Styles that cascade (abbr.)' },
  { number: 5, direction: 'down', row: 5, col: 5, answer: 'LLM', clue: 'What Knot.ai keeps on a short, deterministic leash (abbr.)' },
];

export const cellsOf = (e: Entry) =>
  [...e.answer].map((letter, i) => ({
    row: e.row + (e.direction === 'down' ? i : 0),
    col: e.col + (e.direction === 'across' ? i : 0),
    letter,
  }));

/** The solution grid: a letter for every playable cell, null for blocks. */
export const solution: (string | null)[][] = (() => {
  const grid: (string | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  for (const e of entries) {
    for (const c of cellsOf(e)) {
      if (grid[c.row][c.col] && grid[c.row][c.col] !== c.letter) {
        throw new Error(`Crossword clash at ${c.row},${c.col}`);
      }
      grid[c.row][c.col] = c.letter;
    }
  }
  return grid;
})();

/** Clue numbers shown in the corner of the first cell of each entry. */
export const numberAt = (row: number, col: number) =>
  entries.find((e) => e.row === row && e.col === col)?.number;
