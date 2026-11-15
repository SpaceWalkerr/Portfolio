/**
 * The author's books — rendered by the Book section, the structured data and the Ask-the-Editor brief.
 * `book` (Unscrolled) also has its own page at /book; `novel` is the fiction title shown first on the shelf.
 */
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
  /** "You will learn" list (non-fiction only) */
  learn?: string[];
  features: string[];
  /** Short author note from the back cover */
  authorNote: string;
  /** Set to the store link once the listing is live — the section then shows a buy button instead of "Coming soon". */
  buyUrl?: string;
  /** Already on sale but the listing link isn't known yet — shows "Out now on Amazon" (an Amazon search) instead of "Coming soon". */
  published?: boolean;
  /** Other editions (paperback, hardcover, other marketplaces) */
  editions?: { label: string; url: string }[];
}

export const book: Book & { learn: string[] } = {
  title: 'Unscrolled',
  subtitle: 'Reclaim Your Focus, Time and Ambition in a World Built to Distract You',
  author: 'Suraj Nandan',
  genre: 'Self-help · Personal growth',
  cover: '/book/unscrolled-cover.jpg',
  format: 'Kindle edition',
  paperback: '/book/unscrolled-paperback.webp',
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
  editions: [
    { label: 'Paperback', url: 'https://www.amazon.com/dp/B0HQ78LZQZ' },
    { label: 'Hardcover', url: 'https://www.amazon.com/dp/B0HQGV36NW' },
  ],
  authorNote:
    'Suraj Nandan is a full-stack and AI engineer from Kishanganj, India, and an NPTEL gold medallist in Human–Computer Interaction. He has shipped more than twenty web and AI products and knows how software is built to hold attention.',
};

export const novel: Book = {
  title: 'Above the Clouds',
  subtitle: 'A Novel',
  author: 'Suraj Nandan',
  genre: 'Fiction · Horror thriller',
  cover: '/book/above-the-clouds-cover.jpg',
  format: 'Paperback',
  paperback: '/book/above-the-clouds-paperback.jpg',
  tagline: 'I was doing my homework when Delhi ended.',
  blurb: [
    'On a Thursday morning in November, a blue-green pillar of gas rises over Delhi. Suraj, a final-year engineering student, watches it from a cricket ground near Ghaziabad, breathes in a smell like old coins, and catches his train home to Kishanganj. By the time he gets there, the news has a word for what the gas does to people. The ones it doesn’t kill, it turns. They stand still and say the same sentence, over and over. And when they hear you, they run.',
    'The cloud is rolling east across the plains at sixteen kilometres an hour. Papa has a full tank, a Tata Sierra and one rule: it’s heavy, it can’t climb, so go up. Mumma has packed the pressure cooker. And Suraj has a secret on the inside of his wrist that he is hiding from both of them.',
    'Above the clouds, nothing can happen to them. That’s what Papa says. But the cloud is rising.',
  ],
  published: true,
  features: ['30 chapters in three parts', 'Delhi to Kishanganj to Darjeeling', 'Began as a dream'],
  authorNote:
    'Above the Clouds is Suraj Nandan’s first novel. It began as a dream: a gas over Delhi, a train home to Kishanganj, and a father driving his family up into the mountains because above the clouds, nothing would happen to them.',
};

/** Every book on the shelf, newest first. */
export const books: Book[] = [novel, book];
