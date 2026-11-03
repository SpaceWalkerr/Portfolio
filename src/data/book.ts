/** The book — rendered by the Book section, the structured data and the Ask-the-Editor brief. */
export interface Book {
  title: string;
  subtitle: string;
  author: string;
  genre: string;
  cover: string;
  /** Print format of the edition */
  format: string;
  /** Full paperback wrap (back cover, spine, front) */
  paperback: string;
  /** Back-cover hook */
  tagline: string;
  /** Back-cover copy, one string per paragraph */
  blurb: string[];
  learn: string[];
  features: string[];
  /** Short author note from the back cover */
  authorNote: string;
  /** Set to the store link once the listing is live — the section then shows a buy button instead of "Coming soon". */
  buyUrl?: string;
}

export const book: Book = {
  title: 'Unscrolled',
  subtitle: 'Reclaim Your Focus, Time and Ambition in a World Built to Distract You',
  author: 'Suraj Nandan',
  genre: 'Self-help · Personal growth',
  cover: '/book/unscrolled-cover.jpg',
  format: 'Kindle edition',
  paperback: '/book/unscrolled-paperback.jpg',
  tagline: 'You are not lazy. You are outgunned.',
  blurb: [
    'Every day, some of the most powerful companies on earth compete for the same scarce resource: your attention. They are very good at winning. The result is a life lived in fragments — mornings lost to the feed, evenings that vanish into reels, and work that never quite gets your full mind.',
    'Unscrolled is a practical, compassionate guide to taking your attention back, without throwing your phone in a river.',
  ],
  learn: [
    'Why your phone is so hard to put down, and why willpower alone keeps failing',
    'How to redesign your phone in a single evening',
    'How to train deep focus like a muscle',
    'Why boredom is the secret source of ideas and calm',
    'How to stop escaping your life and build one you want to stay in',
  ],
  features: ['A simple exercise at the end of every chapter', 'A 30-day plan to tie it all together'],
  buyUrl: 'https://www.amazon.in/dp/B0HQ61YYC4',
  authorNote:
    'Suraj Nandan is a full-stack and AI engineer from Kishanganj, India, and an NPTEL gold medallist in Human–Computer Interaction. He has shipped more than twenty web and AI products and knows how software is built to hold attention.',
};
