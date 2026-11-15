import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Seo, { SITE_URL } from '../components/Seo';
import { PERSON, WEBSITE_REF, bookId, bookJsonLd } from '../lib/schema';
import { books } from '../data/book';
import { withBase } from '../lib/utils';

const PATH = '/books';
const AMAZON_AUTHOR = 'https://www.amazon.com/stores/author/B0HRRX84CH';

/**
 * /books — the author's bibliography: every book by Suraj Nandan with its cover, genre, editions and
 * a link to its own page. Structured data names the author as the creator of each book, so the
 * page answers "books by Suraj Nandan" and "who wrote Above the Clouds / Unscrolled".
 */
const BooksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const titles = books.map((b) => b.title);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}${PATH}`,
      url: `${SITE_URL}${PATH}`,
      name: 'Books by Suraj Nandan',
      description: `Every book by Suraj Nandan: ${titles.join(' and ')}.`,
      isPartOf: WEBSITE_REF,
      about: PERSON,
      mainEntity: {
        '@type': 'ItemList',
        name: 'Books by Suraj Nandan',
        numberOfItems: books.length,
        itemListElement: books.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}${b.path}`,
          item: { '@id': bookId(b), '@type': 'Book', name: b.title, author: PERSON },
        })),
      },
    },
    ...books.map(bookJsonLd),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Books by Suraj Nandan', item: `${SITE_URL}${PATH}` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title="Books by Suraj Nandan — Above the Clouds & Unscrolled"
        description="All books by author Suraj Nandan: Above the Clouds, a horror thriller novel set in India, and Unscrolled, a guide to taking your attention back. Kindle, paperback and hardcover."
        path={PATH}
        image="/og/books.png"
        type="website"
        jsonLd={jsonLd}
      />
      <article className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute"
          >
            <Link to="/" className="hover:text-oxblood">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink">Books</span>
          </nav>

          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">The Shelf</span>
            <span>
              {books.length} books · {new Date().getFullYear()}
            </span>
          </div>
          <div className="border-t border-ink" />

          <h1 className="mt-10 font-display text-[12vw] font-black uppercase leading-[0.88] tracking-[-0.03em] sm:text-7xl">
            Books by <span className="text-oxblood">Suraj Nandan</span>
          </h1>
          <p className="mt-6 max-w-2xl font-editorial text-lg italic leading-relaxed text-ink-mute sm:text-xl">
            Suraj Nandan is an author and a full-stack and AI engineer from Kishanganj, India. He has written{' '}
            {books.length} books: <em>Above the Clouds</em>, a horror thriller novel that began as a dream, and{' '}
            <em>Unscrolled</em>, a practical guide to taking your attention back from the phone.
          </p>

          <ol className="mt-14 space-y-16">
            {books.map((b, i) => (
              <li
                key={b.slug}
                className="grid grid-cols-1 gap-8 border-t-2 border-ink pt-10 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-10"
              >
                <Link to={b.path} className="mx-auto block w-full max-w-[220px] sm:mx-0">
                  <img
                    src={withBase(b.cover)}
                    alt={`Cover of ${b.title}: ${b.subtitle}, by ${b.author}`}
                    width={1000}
                    height={1600}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="block h-auto w-full border border-ink"
                    style={{ boxShadow: '8px 8px 0 0 var(--color-ink)' }}
                  />
                </Link>
                <div>
                  <span className="font-monopress text-[10px] uppercase tracking-[0.22em] text-oxblood">{b.genre}</span>
                  <h2 className="mt-2 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-5xl">
                    <Link to={b.path} className="hover:text-oxblood">
                      {b.title}
                    </Link>
                  </h2>
                  <p className="mt-2 font-editorial text-lg italic text-ink-mute">{b.subtitle}</p>
                  <p className="mt-1 font-monopress text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
                    By <span className="text-ink">{b.author}</span>
                  </p>
                  <p className="mt-5 max-w-2xl font-editorial text-[16px] leading-relaxed">{b.blurb[0]}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to={b.path}
                      className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-monopress text-[10.5px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-oxblood"
                    >
                      About {b.title}
                    </Link>
                    {b.buyUrl && (
                      <a
                        href={b.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-ink px-4 py-3 font-monopress text-[10.5px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
                      >
                        Kindle <ArrowUpRight size={13} />
                      </a>
                    )}
                    {b.editions?.map((e) => (
                      <a
                        key={e.label}
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-ink px-4 py-3 font-monopress text-[10.5px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
                      >
                        {e.label} <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-16 border-t border-ink/30 pt-5 font-editorial text-[15px] leading-relaxed text-ink-mute">
            Find Suraj Nandan on{' '}
            <a
              href={AMAZON_AUTHOR}
              target="_blank"
              rel="noopener noreferrer me"
              className="text-oxblood underline underline-offset-4"
            >
              his Amazon author page
            </a>
            , or read his essays on{' '}
            <Link to="/#medium" className="text-oxblood underline underline-offset-4">
              Medium
            </Link>
            .
          </p>

          <div className="mt-10">
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

export default BooksPage;
