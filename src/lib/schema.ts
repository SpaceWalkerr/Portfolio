/** The one Person every page's structured data points back to (defined in index.html). */
export const PERSON = {
  '@type': 'Person',
  '@id': 'https://surajnandan.in/#person',
  name: 'Suraj Nandan',
  url: 'https://surajnandan.in/',
};

export const WEBSITE_REF = { '@id': 'https://surajnandan.in/#website' };

const SITE = 'https://surajnandan.in';
const FORMAT_URL = {
  EBook: 'https://schema.org/EBook',
  Paperback: 'https://schema.org/Paperback',
  Hardcover: 'https://schema.org/Hardcover',
} as const;

/** Minimal shape of a book from src/data/book.ts (kept structural so this file has no data imports). */
interface BookLike {
  slug: string;
  path: string;
  title: string;
  subtitle: string;
  cover: string;
  blurb: string[];
  learn?: string[];
  buyUrl?: string;
  kindle?: { asin?: string; isbn?: string; datePublished?: string; pages?: number };
  editions?: {
    label: string;
    url: string;
    format: keyof typeof FORMAT_URL;
    isbn?: string;
    asin?: string;
    datePublished?: string;
    pages?: number;
  }[];
  genres: string[];
  about: string[];
}

/** The stable @id for a book, shared by the home page, its own page and the /books hub. */
export const bookId = (b: { slug: string }) => `${SITE}/#${b.slug}`;

/**
 * schema.org Book for one title: the work, with every edition (Kindle, paperback, hardcover) as a
 * workExample carrying its format, ISBN, ASIN, page count, date and Amazon offer. Author is the
 * site's Person, so search engines tie every edition back to the same author entity.
 */
export function bookJsonLd(b: BookLike) {
  const editions = [
    ...(b.buyUrl ? [{ label: 'Kindle edition', url: b.buyUrl, format: 'EBook' as const, ...(b.kindle ?? {}) }] : []),
    ...(b.editions ?? []),
  ];
  const isbns = editions.map((e) => e.isbn).filter(Boolean);
  const dates = editions
    .map((e) => e.datePublished)
    .filter(Boolean)
    .sort();
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': bookId(b),
    name: b.title,
    alternateName: `${b.title}: ${b.subtitle}`,
    url: `${SITE}${b.path}`,
    mainEntityOfPage: `${SITE}${b.path}`,
    image: `${SITE}${b.cover}`,
    author: PERSON,
    creator: PERSON,
    genre: b.genres,
    about: b.about,
    inLanguage: 'en',
    ...(dates[0] ? { datePublished: dates[0] } : {}),
    ...(isbns[0] ? { isbn: isbns[0] } : {}),
    description: [...b.blurb, ...(b.learn ?? [])].join(' '),
    isPartOf: WEBSITE_REF,
    sameAs: editions.map((e) => e.url),
    workExample: editions.map((e) => ({
      '@type': 'Book',
      '@id': `${SITE}/#${b.slug}-${e.format.toLowerCase()}`,
      name: `${b.title} (${e.label})`,
      bookFormat: FORMAT_URL[e.format],
      inLanguage: 'en',
      author: PERSON,
      url: e.url,
      ...(e.isbn ? { isbn: e.isbn } : {}),
      ...(e.asin ? { identifier: { '@type': 'PropertyValue', propertyID: 'ASIN', value: e.asin } } : {}),
      ...(e.pages ? { numberOfPages: e.pages } : {}),
      ...(e.datePublished ? { datePublished: e.datePublished } : {}),
      potentialAction: {
        '@type': 'ReadAction',
        target: { '@type': 'EntryPoint', urlTemplate: e.url, actionPlatform: 'https://schema.org/DesktopWebPlatform' },
      },
      offers: {
        '@type': 'Offer',
        url: e.url,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Amazon' },
      },
    })),
  };
}
