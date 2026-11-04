import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Seo, { SITE_URL } from '../components/Seo';
import { PressTag } from '../components/ui/press';
import { PERSON, WEBSITE_REF } from '../lib/schema';
import { book } from '../data/book';
import { withBase } from '../lib/utils';

const PATH = '/book';

/** Answers are drawn only from the book's own copy (src/data/book.ts) — nothing is claimed beyond it. */
const faqs = [
  {
    q: `What is ${book.title} about?`,
    a: `${book.title} is a practical, compassionate guide to taking your attention back from the phone, without throwing it in a river. It explains why your phone is so hard to put down and why willpower alone keeps failing, then shows how to redesign it and train deep focus.`,
  },
  {
    q: `Who is ${book.title} for?`,
    a: 'Anyone whose mornings disappear into the feed and whose evenings vanish into reels, and who wants their focus, time and ambition back, whether they are students, professionals or makers.',
  },
  {
    q: `Who wrote ${book.title}?`,
    a: book.authorNote,
  },
  {
    q: 'Is there a plan or are there exercises?',
    a: `Yes. ${book.features.join(', and ')}.`,
  },
  {
    q: `Where can I buy ${book.title}?`,
    a: `${book.title} is available as a Kindle edition on Amazon: ${book.buyUrl}`,
  },
];
const ASIN = 'B0HQ61YYC4';

/** /book — the book's own indexable page: a real URL for search engines, Amazon's listing as the offer. */
const BookPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': `${SITE_URL}/#unscrolled`,
      name: `${book.title}: ${book.subtitle}`,
      alternateName: book.title,
      url: `${SITE_URL}${PATH}`,
      image: `${SITE_URL}${book.cover}`,
      author: PERSON,
      genre: ['Self-help', 'Personal growth', 'Productivity'],
      about: ['Digital distraction', 'Attention', 'Deep focus', 'Phone addiction'],
      inLanguage: 'en',
      description: `${book.blurb.join(' ')} ${book.learn.join('. ')}.`,
      identifier: ASIN,
      isPartOf: WEBSITE_REF,
      workExample: {
        '@type': 'Book',
        bookFormat: 'https://schema.org/EBook',
        name: `${book.title} (Kindle edition)`,
        inLanguage: 'en',
        author: PERSON,
        identifier: ASIN,
        url: book.buyUrl,
        potentialAction: {
          '@type': 'ReadAction',
          target: { '@type': 'EntryPoint', urlTemplate: book.buyUrl, actionPlatform: 'https://schema.org/DesktopWebPlatform' },
        },
        offers: {
          '@type': 'Offer',
          url: book.buyUrl,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Amazon' },
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: book.title, item: `${SITE_URL}${PATH}` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`${book.title} by Suraj Nandan — Book on Focus, Attention & Phone Addiction`}
        description={`${book.title}: ${book.subtitle}. A practical Kindle guide by Suraj Nandan to taking your attention back, with a 30-day deep-focus plan. Read it on Amazon.`}
        path={PATH}
        image="/og/book.png"
        type="website"
        jsonLd={jsonLd}
      />
      <article className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            <Link to="/" className="hover:text-oxblood">Home</Link>
            <span>/</span>
            <span className="text-ink">{book.title}</span>
          </nav>

          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">Book Review</span>
            <span>{book.format} · {book.genre}</span>
          </div>
          <div className="border-t border-ink" />

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] lg:gap-16">
            <figure className="mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-none">
              <img
                src={withBase(book.cover)}
                alt={`Cover of ${book.title}: ${book.subtitle}, by ${book.author}`}
                width={1000}
                height={1600}
                decoding="async"
                {...{ fetchpriority: 'high' }}
                className="block h-auto w-full border border-ink"
                style={{ boxShadow: '10px 10px 0 0 var(--color-ink)' }}
              />
            </figure>

            <div>
              <h1 className="font-display font-black uppercase leading-[0.85] tracking-[-0.03em]">
                <span className="block text-[13vw] sm:text-[88px] lg:text-[6.3vw] xl:text-[88px]">
                  <span className="text-oxblood">Un</span>scrolled
                </span>
                <span className="mt-4 block max-w-xl font-editorial text-lg font-normal normal-case italic leading-snug tracking-normal text-ink-mute sm:text-xl">
                  {book.subtitle}
                </span>
              </h1>
              <p className="mt-3 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                By <span className="text-ink">{book.author}</span>
              </p>

              <blockquote className="mt-8 border-l-2 border-oxblood py-1 pl-6">
                <p className="font-display text-2xl font-black uppercase leading-[1.02] tracking-[-0.01em] sm:text-3xl">
                  You are not lazy.
                  <span className="block text-oxblood">You are outgunned.</span>
                </p>
              </blockquote>

              <div className="mt-8 max-w-2xl space-y-4 font-editorial text-[15.5px] leading-relaxed sm:text-[17px]">
                {book.blurb.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={book.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood"
                >
                  Get it on Amazon <ArrowUpRight size={14} />
                </a>
                <Link
                  to="/#book"
                  className="font-monopress text-[11px] uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/30 underline-offset-4 hover:decoration-oxblood"
                >
                  See the paperback cover
                </Link>
              </div>
            </div>
          </div>

          <section className="mt-16 max-w-2xl" aria-labelledby="book-learn">
            <h2 id="book-learn" className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">
              What you will learn
            </h2>
            <ol className="mt-4 divide-y divide-ink/15 border-b border-ink/30">
              {book.learn.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 py-3">
                  <span className="font-monopress text-[10px] text-oxblood">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-editorial text-[15.5px] leading-snug">{item}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-2">
              {book.features.map((f) => (
                <PressTag key={f}>{f}</PressTag>
              ))}
            </div>
          </section>

          <section className="mt-14 max-w-2xl" aria-labelledby="book-faq">
            <h2 id="book-faq" className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">
              Questions about the book
            </h2>
            <dl className="mt-4 divide-y divide-ink/15">
              {faqs.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-display text-sm font-bold uppercase tracking-[0.02em]">{f.q}</dt>
                  <dd className="mt-1.5 font-editorial text-[15px] leading-relaxed text-ink-mute">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-14 max-w-2xl" aria-labelledby="book-author">
            <h2 id="book-author" className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">
              About the author
            </h2>
            <p className="mt-4 font-editorial text-[15.5px] leading-relaxed text-ink-mute">{book.authorNote}</p>
            <p className="mt-3 font-editorial text-[15.5px] leading-relaxed">
              More from Suraj: <Link to="/" className="text-oxblood underline underline-offset-4">the portfolio</Link>,{' '}
              <Link to="/#dev" className="text-oxblood underline underline-offset-4">writing on DEV</Link> and{' '}
              <Link to="/#guides" className="text-oxblood underline underline-offset-4">developer guides</Link>.
            </p>
          </section>

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

export default BookPage;
