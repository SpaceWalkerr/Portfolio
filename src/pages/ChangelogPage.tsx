import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { editions, corrections } from '../data/changelog';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** /changelog — "Corrections & Amendments": what changed on the site, and what was corrected. */
const ChangelogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title="Corrections & Amendments — Suraj Nandan"
        description="The changelog of The Nandan Review: every edition of this portfolio, and every correction."
        path="/changelog"
      />
      <article className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">Back Page</span>
            <span>The Record</span>
          </div>
          <div className="border-t border-ink" />

          <h1 className="mt-8 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
            Corrections &amp; Amendments
          </h1>
          <p className="mt-4 font-editorial text-lg italic text-ink-mute">
            Every edition of this paper since it first went to press — and every correction, printed where you can see it.
          </p>

          {/* Editions */}
          <ol className="mt-12 border-l-2 border-ink">
            {editions.map((e, i) => (
              <li key={`${e.date}-${e.headline}`} className="relative pb-10 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[7px] top-1.5 h-3 w-3 border-2 border-ink ${i === 0 ? 'bg-oxblood' : 'bg-paper'}`}
                />
                <time dateTime={e.date} className="font-monopress text-[10px] uppercase tracking-[0.18em] text-oxblood">
                  {formatDate(e.date)}
                </time>
                <h2 className="mt-1 font-display text-lg font-black uppercase leading-tight tracking-[-0.01em] sm:text-xl">
                  {e.headline}
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {e.items.map((item) => (
                    <li key={item} className="flex gap-2.5 font-editorial text-[15px] leading-relaxed text-ink-mute">
                      <span className="mt-2.5 h-1 w-1 flex-shrink-0 bg-ink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {/* Corrections */}
          <section className="mt-16 border-2 border-ink p-5 sm:p-7">
            <h2 className="border-b-4 border-double border-ink pb-2 font-editorial text-2xl italic">Corrections</h2>
            <dl className="mt-4 divide-y divide-ink/20">
              {corrections.map((c) => (
                <div key={c.subject} className="py-3.5">
                  <dt className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-display text-sm font-bold uppercase tracking-[0.02em]">{c.subject}</span>
                    <time dateTime={c.date} className="font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                      {formatDate(c.date)}
                    </time>
                  </dt>
                  <dd className="mt-1.5 font-editorial text-[14.5px] leading-relaxed text-ink-mute">{c.note}</dd>
                </div>
              ))}
            </dl>
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

export default ChangelogPage;
