import { CAREER_START_YEAR } from './site';

/**
 * Story beats for the Journey film at /journey. Facts (projects, posts, roles) are
 * pulled from their own data files by the chapter components — this file only holds
 * the narration and ordering.
 */
export interface JourneyChapter {
  id: string;
  /** Small label above the title, e.g. a year */
  kicker: string;
  title: string;
  line: string;
  /** Types the title out like the typewriter intro instead of fading it in */
  typeTitle?: boolean;
  /** Scene needs more room than the default band — gives it half the screen */
  tall?: boolean;
}

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'open',
    kicker: 'Prologue',
    typeTitle: true,
    title: 'Suraj Nandan',
    line: 'A developer, writer and builder from Kishanganj. Scroll to watch how it happened.',
  },
  {
    id: 'first-line',
    kicker: String(CAREER_START_YEAR),
    title: 'The first line of code',
    line: 'It started with a terminal, a blinking cursor and a lot of wrong turns.',
  },
  {
    id: 'in-public',
    kicker: 'Learning in public',
    title: 'Write it down, ship it out',
    line: 'Articles, videos and a book. Teaching it is how it finally stuck.',
  },
  {
    id: 'built',
    kicker: 'Things I built',
    tall: true,
    title: 'From idea to running system',
    line: 'Watch the pieces of real projects click together.',
  },
  {
    id: 'work',
    kicker: 'Work',
    tall: true,
    title: 'Where it got real',
    line: 'Teams, deadlines, production traffic and the lessons that came with them.',
  },
  {
    id: 'next',
    kicker: 'Now & next',
    title: 'Let’s build something',
    line: 'Open for freelance, full-time and the occasional impossible idea.',
  },
];
