/**
 * "Corrections & Amendments" — the paper's own record of changes, newest first.
 * Curated by hand from the git history; add an entry when something ships.
 */

export interface Edition {
  date: string;
  headline: string;
  items: string[];
}

export interface Correction {
  date: string;
  subject: string;
  note: string;
}

export const editions: Edition[] = [
  {
    date: '2026-09-24',
    headline: 'Live captures, a few hidden extras, and this page',
    items: [
      'Fourteen projects now play a short scroll-through of the live site — hover a card, or open its page.',
      'This changelog, and a corrections column below it.',
      'Some things are hidden. Readers who know the old cheat codes may find one.',
      'Privacy-friendly page analytics (no cookies).',
    ],
  },
  {
    date: '2026-09-24',
    headline: 'Case studies for five projects',
    items: [
      'Knot.ai, CardBridge, Hospitality.ai, Job Scheduler and GigShield each get a full write-up: the brief, the approach, a flow diagram, key decisions, lessons and known limits.',
      'The About page now talks about how I work rather than where.',
    ],
  },
  {
    date: '2026-09-24',
    headline: 'Ask the Editor, the Scoreboard, and a better Op-Ed',
    items: [
      'Ask the Editor: an AI assistant that answers questions about my work from this site’s own pages.',
      'The Scoreboard: live LeetCode stats and a year of GitHub contributions.',
      'Skills are cross-referenced — pick one to see every project, role and article that used it.',
      'Articles gained an RSS feed, share links, earlier/later navigation and their own preview cards.',
      'Today’s date on the masthead, a searchable certificate archive, and “Print this edition”.',
    ],
  },
  {
    date: '2026-09-24',
    headline: 'A faster, clearer front page',
    items: [
      'The portrait went from 2.9 MB to 150 KB and the main script from 564 KB to 359 KB; sections below the fold now load on demand.',
      'The opening animation plays once per visit and can be skipped with any key.',
      'Dialogs keep keyboard focus, the navigation follows the page order, and skills are graded by how they’re used instead of percentages.',
      'Seventeen certificate links that pointed at the wrong file now open the right document.',
    ],
  },
  {
    date: '2026-09-10',
    headline: 'Every project gets its own page',
    items: [
      'Projects and articles moved to their own addresses, pre-rendered for search engines and link previews.',
      'Real screenshots of each live site, a proper 404 page, and the Berry Stenley experience certificate.',
    ],
  },
  {
    date: '2026-08-09',
    headline: 'Search housekeeping',
    items: ['An automatically generated sitemap and richer metadata for search engines.'],
  },
  {
    date: '2026-07-23',
    headline: 'The Op-Ed opens',
    items: ['A blog of case studies and technical write-ups, and a GitHub activity supplement.'],
  },
  {
    date: '2026-07-22',
    headline: 'The certificate archive',
    items: ['Every certificate filed by category, with an in-page viewer.'],
  },
  {
    date: '2026-07-07',
    headline: 'Rebuilt from scratch',
    items: ['The portfolio was redesigned and rebuilt from a clean slate.'],
  },
  {
    date: '2026-03-21',
    headline: 'LeetCode on the record',
    items: ['LeetCode profile linked from the front page and the contact section.'],
  },
  {
    date: '2026-02-23',
    headline: 'Indexed',
    items: ['Sitemap and search-engine indexing.'],
  },
  {
    date: '2026-02-01',
    headline: 'First edition',
    items: ['The portfolio goes to press.'],
  },
];

export const corrections: Correction[] = [
  {
    date: '2026-09-24',
    subject: 'Building CardBridge',
    note: 'The article has been rewritten to match the code: it now uses the real transaction states and notes that the escrow and KYC providers are stubbed in the prototype.',
  },
  {
    date: '2026-09-24',
    subject: 'GigShield',
    note: 'The article now credits the three-person team, describes my part specifically, and notes that payouts are simulated. Its date has been corrected to April 2026.',
  },
  {
    date: '2026-09-24',
    subject: 'Credentials on file',
    note: 'The count on the About page is now taken directly from the certificate archive.',
  },
];
