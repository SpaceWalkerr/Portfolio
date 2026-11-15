/**
 * The author's books — rendered by the Book section, each book's own page, the /books hub, the
 * structured data, the sitemap and the Ask-the-Editor brief. Edition details (ISBNs, dates, page
 * counts) are copied from the Amazon listings; keep them exact, search engines match on them.
 */
export interface Edition {
  label: string;
  url: string;
  /** schema.org bookFormat */
  format: 'Paperback' | 'Hardcover' | 'EBook';
  isbn?: string;
  asin?: string;
  /** ISO date */
  datePublished?: string;
  pages?: number;
}

export interface Book {
  /** URL slug; the page lives at `path` */
  slug: string;
  path: string;
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
  /** The Kindle edition behind `buyUrl` */
  kindle?: Omit<Edition, 'label' | 'url' | 'format'>;
  /** Other editions (paperback, hardcover, other marketplaces) */
  editions?: Edition[];
  /** For the page's <title>, meta description and share card */
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  /** schema.org genre and about */
  genres: string[];
  about: string[];
  /** Questions answered on the book's page (and in its FAQPage data) — only facts from the book's own copy */
  faqs: { q: string; a: string }[];
}

export const book: Book & { learn: string[] } = {
  slug: 'unscrolled',
  path: '/book',
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
  kindle: { asin: 'B0HQ61YYC4' },
  editions: [
    {
      label: 'Paperback',
      url: 'https://www.amazon.com/dp/B0HQ78LZQZ',
      format: 'Paperback',
      isbn: '9798166800497',
      asin: 'B0HQ78LZQZ',
      datePublished: '2026-11-01',
      pages: 164,
    },
    {
      label: 'Hardcover',
      url: 'https://www.amazon.com/dp/B0HQGV36NW',
      format: 'Hardcover',
      isbn: '9798167726031',
      asin: 'B0HQGV36NW',
      datePublished: '2026-11-04',
      pages: 164,
    },
  ],
  seoTitle: 'Unscrolled by Suraj Nandan — Book on Focus, Attention & Phone Addiction',
  seoDescription:
    'Unscrolled: Reclaim Your Focus, Time and Ambition in a World Built to Distract You, by Suraj Nandan. A practical guide to taking your attention back, with a 30-day plan. On Amazon in Kindle, paperback and hardcover.',
  ogImage: '/og/book.png',
  genres: ['Self-help', 'Personal growth', 'Productivity'],
  about: ['Digital distraction', 'Attention', 'Deep focus', 'Phone addiction'],
  faqs: [
    {
      q: 'What is Unscrolled about?',
      a: 'Unscrolled is a practical, compassionate guide to taking your attention back from the phone, without throwing it in a river. It explains why your phone is so hard to put down and why willpower alone keeps failing, then shows how to redesign it and train deep focus.',
    },
    {
      q: 'Who is Unscrolled for?',
      a: 'Anyone whose mornings disappear into the feed and whose evenings vanish into reels, and who wants their focus, time and ambition back, whether they are students, professionals or makers.',
    },
    {
      q: 'Who wrote Unscrolled?',
      a: 'Suraj Nandan, a full-stack and AI engineer from Kishanganj, India, and an NPTEL gold medallist in Human–Computer Interaction. He has shipped more than twenty web and AI products and knows how software is built to hold attention.',
    },
    {
      q: 'Is there a plan or are there exercises?',
      a: 'Yes. A simple exercise at the end of every chapter, and a 30-day plan to tie it all together.',
    },
    {
      q: 'Where can I buy Unscrolled?',
      a: 'On Amazon, as a Kindle edition (amazon.in/dp/B0HQ61YYC4), a paperback (amazon.com/dp/B0HQ78LZQZ, ISBN 979-8166800497) and a hardcover (amazon.com/dp/B0HQGV36NW, ISBN 979-8167726031).',
    },
  ],
  authorNote:
    'Suraj Nandan is a full-stack and AI engineer from Kishanganj, India, and an NPTEL gold medallist in Human–Computer Interaction. He has shipped more than twenty web and AI products and knows how software is built to hold attention.',
};

export const novel: Book = {
  slug: 'above-the-clouds',
  path: '/books/above-the-clouds',
  title: 'Above the Clouds',
  subtitle: 'A Novel',
  author: 'Suraj Nandan',
  genre: 'Fiction · Horror thriller',
  cover: '/book/above-the-clouds-cover.jpg',
  format: 'Kindle & print',
  paperback: '/book/above-the-clouds-paperback.jpg',
  tagline: 'I was doing my homework when Delhi ended.',
  blurb: [
    'On a Thursday morning in November, a blue-green pillar of gas rises over Delhi. Suraj, a final-year engineering student, watches it from a cricket ground near Ghaziabad, breathes in a smell like old coins, and catches his train home to Kishanganj. By the time he gets there, the news has a word for what the gas does to people. The ones it doesn’t kill, it turns. They stand still and say the same sentence, over and over. And when they hear you, they run.',
    'The cloud is rolling east across the plains at sixteen kilometres an hour. Papa has a full tank, a Tata Sierra and one rule: it’s heavy, it can’t climb, so go up. Mumma has packed the pressure cooker. And Suraj has a secret on the inside of his wrist that he is hiding from both of them.',
    'Above the clouds, nothing can happen to them. That’s what Papa says. But the cloud is rising.',
  ],
  buyUrl: 'https://www.amazon.in/dp/B0HRRRJFYS',
  kindle: { asin: 'B0HRRRJFYS', datePublished: '2026-11-15', pages: 346 },
  editions: [
    {
      label: 'Paperback',
      url: 'https://www.amazon.com/dp/B0HRRW5ZNQ',
      format: 'Paperback',
      isbn: '9798142762078',
      asin: 'B0HRRW5ZNQ',
      datePublished: '2026-11-15',
      pages: 352,
    },
    {
      label: 'Hardcover',
      url: 'https://www.amazon.com/dp/B0HRS3N5T6',
      format: 'Hardcover',
      isbn: '9798142766922',
      asin: 'B0HRS3N5T6',
      datePublished: '2026-11-15',
      pages: 352,
    },
  ],
  seoTitle: 'Above the Clouds by Suraj Nandan — A Horror Thriller Novel Set in India',
  seoDescription:
    'Above the Clouds, a novel by Suraj Nandan: a gas over Delhi turns people into something else, and one family flees from Kishanganj to Darjeeling. On Amazon in Kindle, paperback and hardcover.',
  ogImage: '/og/above-the-clouds.png',
  genres: ['Fiction', 'Horror', 'Thriller', 'Post-apocalyptic fiction', 'Zombie fiction'],
  about: ['Delhi', 'Kishanganj', 'Darjeeling', 'Family survival', 'Toxic gas outbreak'],
  faqs: [
    {
      q: 'What is Above the Clouds about?',
      a: 'A blue-green pillar of gas rises over Delhi. The ones it doesn’t kill, it turns: they stand still, say the same sentence over and over, and run when they hear you. Suraj, a final-year engineering student, gets home to Kishanganj, and his family drives for the mountains of Darjeeling, because Papa says that above the clouds nothing can happen to them. But the cloud is rising.',
    },
    {
      q: 'Who wrote Above the Clouds?',
      a: 'Suraj Nandan, a full-stack and AI engineer from Kishanganj, Bihar. Above the Clouds is his first novel; he is also the author of Unscrolled, a book on taking your attention back from the phone.',
    },
    {
      q: 'Is Above the Clouds based on a true story?',
      a: 'It began as a dream the author had in 2026: a gas over Delhi, a train home to Kishanganj, and his father driving the family up into the mountains. The rest is invented, and so are the people in it, except the author’s family.',
    },
    {
      q: 'What kind of book is it?',
      a: 'A horror thriller and survival novel set across north India, from Delhi to Kishanganj to the foothills of Kanchenjunga, written in English with Hindi words and flavour. It has violence and horror, but nothing sexually explicit.',
    },
    {
      q: 'Where can I buy Above the Clouds?',
      a: 'On Amazon, as a Kindle edition (amazon.in/dp/B0HRRRJFYS), a paperback (amazon.com/dp/B0HRRW5ZNQ, ISBN 979-8142762078) and a hardcover (amazon.com/dp/B0HRS3N5T6, ISBN 979-8142766922).',
    },
  ],
  features: ['30 chapters in three parts', 'Delhi to Kishanganj to Darjeeling', 'Began as a dream'],
  authorNote:
    'Above the Clouds is Suraj Nandan’s first novel. It began as a dream: a gas over Delhi, a train home to Kishanganj, and a father driving his family up into the mountains because above the clouds, nothing would happen to them.',
};

/** Every book on the shelf, newest first. */
export const books: Book[] = [novel, book];
