import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Seo, { SITE_URL } from '../components/Seo';
import { PressTag } from '../components/ui/press';
import { bookJsonLd } from '../lib/schema';
import { books, type Book } from '../data/book';
import { withBase } from '../lib/utils';

/** The title set in the site's display type, one accent per book (as on the home page shelf). */
const TitleArt = ({ b }: { b: Book }) =>
  b.slug === 'unscrolled' ? (
    <>
      <span className="text-oxblood">Un</span>scrolled
    </>
  ) : b.slug === 'above-the-clouds' ? (
    <>
      Above the <span className="text-oxblood">Clouds</span>
    </>
  ) : (
    <>{b.title}</>
  );

const formatIsbn = (isbn: string) => (isbn.length === 13 ? `${isbn.slice(0, 3)}-${isbn.slice(3)}` : isbn);

/**
 * A book's own indexable page (/book for Unscrolled, /books/above-the-clouds for the novel): a real
 * URL for search engines with the title, author, back-cover copy, every edition with its ISBN, FAQs
 * drawn only from the book's copy, and links to the author's other books. Amazon holds the offers.
 */
const BookPage = ({ b }: { b: Book }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [b.slug]);

  const others = books.filter((o) => o.slug !== b.slug);
  const allEditions = [
    ...(b.buyUrl
      ? [{ label: 'Kindle edition', url: b.buyUrl, format: 'EBook' as const, isbn: undefined, ...(b.kindle ?? {}) }]
      : []),
    ...(b.editions ?? []),
  ];

  const jsonLd = [
    bookJsonLd(b),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: b.faqs.map((f) => ({
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
        { '@type': 'ListItem', position: 2, name: 'Books by Suraj Nandan', item: `${SITE_URL}/books` },
        { '@type': 'ListItem', position: 3, name: b.title, item: `${SITE_URL}${b.path}` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={b.seoTitle}
        description={b.seoDescription}
        path={b.path}
        image={b.ogImage}
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
            <Link to="/books" className="hover:text-oxblood">
              Books
            </Link>
            <span>/</span>
            <span className="text-ink">{b.title}</span>
          </nav>

          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">Book Review</span>
            <span>{b.genre}</span>
          </div>
          <div className="border-t border-ink" />

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] lg:gap-16">
            <figure className="mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-none">
              <img
                src={withBase(b.cover)}
                alt={`Cover of ${b.title}: ${b.subtitle}, by ${b.author}`}
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
                  <TitleArt b={b} />
                </span>
                <span className="mt-4 block max-w-xl font-editorial text-lg font-normal normal-case italic leading-snug tracking-normal text-ink-mute sm:text-xl">
                  {b.subtitle}
                </span>
              </h1>
              <p className="mt-3 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                By{' '}
                <Link
                  to="/books"
                  rel="author"
                  className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-oxblood"
                >
                  {b.author}
                </Link>
              </p>

              <blockquote className="mt-8 border-l-2 border-oxblood py-1 pl-6">
                <p className="font-editorial text-2xl italic leading-snug sm:text-3xl">“{b.tagline}”</p>
              </blockquote>

              <div className="mt-8 max-w-2xl space-y-4 font-editorial text-[15.5px] leading-relaxed sm:text-[17px]">
                {b.blurb.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {b.buyUrl && (
                  <a
                    href={b.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood"
                  >
                    Kindle on Amazon <ArrowUpRight size={14} />
                  </a>
                )}
                {b.editions?.map((e) => (
                  <a
                    key={e.label}
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-ink px-5 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    {e.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {b.learn && (
            <section className="mt-16 max-w-2xl" aria-labelledby="book-learn">
              <h2 id="book-learn" className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">
                What you will learn
              </h2>
              <ol className="mt-4 divide-y divide-ink/15 border-b border-ink/30">
                {b.learn.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 py-3">
                    <span className="font-monopress text-[10px] text-oxblood">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-editorial text-[15.5px] leading-snug">{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
            {b.features.map((f) => (
              <PressTag key={f}>{f}</PressTag>
            ))}
          </div>

          {/* ===== Editions: what a reader (and a search engine) needs to find the exact book ===== */}
          <section className="mt-14 max-w-2xl" aria-labelledby="book-editions">
            <h2 id="book-editions" className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">
              Editions
            </h2>
            <table className="mt-4 w-full border-collapse text-left">
              <thead>
                <tr className="font-monopress text-[9.5px] uppercase tracking-[0.16em] text-ink-mute">
                  <th className="py-2 pr-4 font-normal">Format</th>
                  <th className="py-2 pr-4 font-normal">ISBN / ASIN</th>
                  <th className="hidden py-2 pr-4 font-normal sm:table-cell">Pages</th>
                  <th className="py-2 font-normal">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/15 border-y border-ink/30 font-editorial text-[15px]">
                {allEditions.map((e) => (
                  <tr key={e.label}>
                    <td className="py-3 pr-4">
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-ink/30 underline-offset-4 hover:text-oxblood"
                      >
                        {e.label}
                      </a>
                    </td>
                    <td className="py-3 pr-4 font-monopress text-[11px] tracking-[0.04em]">
                      {e.isbn ? `ISBN ${formatIsbn(e.isbn)}` : e.asin ? `ASIN ${e.asin}` : '—'}
                    </td>
                    <td className="hidden py-3 pr-4 sm:table-cell">{e.pages ?? '—'}</td>
                    <td className="py-3">
                      {e.datePublished
                        ? new Date(e.datePublished).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '2026'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 font-editorial text-[13.5px] italic text-ink-mute">
              Written by {b.author}. Published on Amazon as a{' '}
              {allEditions
                .map((e) => (e.format === 'EBook' ? e.label : e.label.toLowerCase()))
                .join(', ')
                .replace(/, ([^,]*)$/, ' and $1')}
              .
            </p>
          </section>

          <section className="mt-14 max-w-2xl" aria-labelledby="book-faq">
            <h2 id="book-faq" className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">
              Questions about the book
            </h2>
            <dl className="mt-4 divide-y divide-ink/15">
              {b.faqs.map((f) => (
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
            <p className="mt-4 font-editorial text-[15.5px] leading-relaxed text-ink-mute">{b.authorNote}</p>
            <p className="mt-3 font-editorial text-[15.5px] leading-relaxed">
              More from Suraj Nandan:{' '}
              <Link to="/books" className="text-oxblood underline underline-offset-4">
                all his books
              </Link>
              ,{' '}
              <Link to="/" className="text-oxblood underline underline-offset-4">
                the portfolio
              </Link>{' '}
              and{' '}
              <Link to="/#medium" className="text-oxblood underline underline-offset-4">
                essays on Medium
              </Link>
              .
            </p>
          </section>

          {others.length > 0 && (
            <section className="mt-14" aria-labelledby="book-more">
              <h2 id="book-more" className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">
                Also by Suraj Nandan
              </h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={o.path} className="group flex gap-5">
                      <img
                        src={withBase(o.cover)}
                        alt={`Cover of ${o.title} by ${o.author}`}
                        width={120}
                        height={192}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-24 shrink-0 border border-ink"
                      />
                      <span>
                        <span className="block font-display text-xl font-black uppercase leading-none tracking-[-0.01em] group-hover:text-oxblood">
                          {o.title}
                        </span>
                        <span className="mt-1.5 block font-editorial text-[14px] italic text-ink-mute">
                          {o.subtitle}
                        </span>
                        <span className="mt-2 block font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                          {o.genre}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
