import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';
import { book, novel, type Book as BookData } from '../data/book';
import { withBase } from '../lib/utils';

/**
 * The Shelf — a book review column for the author's own titles: the novel first,
 * then Unscrolled. Each cover sits on a hard print shadow with the back-cover copy
 * beside it, and the paperback wrap below. A book with no `buyUrl` shows "Coming soon".
 */

const linkBtn =
  'inline-flex items-center gap-2 border border-ink px-5 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper';

/** Store buttons: the main listing, then any other editions. */
const BuyButtons = ({ b }: { b: BookData }) => (
  <>
    {b.buyUrl ? (
      <a
        href={b.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood"
      >
        Get the book <ArrowUpRight size={14} />
      </a>
    ) : b.published ? (
      <a
        href={`https://www.amazon.in/s?k=${encodeURIComponent(`${b.title} ${b.author}`)}&i=stripbooks`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood"
      >
        Out now on Amazon <ArrowUpRight size={14} />
      </a>
    ) : (
      <span className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink">
        <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-oxblood" />
        Coming soon
      </span>
    )}
    {b.editions?.map((e) => (
      <a key={e.label} href={e.url} target="_blank" rel="noopener noreferrer" className={linkBtn}>
        {e.label} <ArrowUpRight size={14} />
      </a>
    ))}
  </>
);

const AskLink = ({ b }: { b: BookData }) => (
  <a
    href={`mailto:surajnandan78@gmail.com?subject=${encodeURIComponent(`About ${b.title}`)}`}
    className="inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:decoration-oxblood"
  >
    <Mail size={14} /> Ask about the book
  </a>
);

const Cover = ({ b }: { b: BookData }) => (
  <motion.figure
    variants={pressReveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    className="mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-none"
  >
    <div className="relative">
      <img
        src={withBase(b.cover)}
        alt={`Cover of ${b.title}: ${b.subtitle}, by ${b.author}`}
        width={1000}
        height={1600}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full border border-ink"
        style={{ boxShadow: '10px 10px 0 0 var(--color-ink)' }}
      />
      {!b.buyUrl && !b.published && (
        <span className="absolute -left-3 top-6 -rotate-3 bg-oxblood px-3.5 py-1.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper">
          Coming soon
        </span>
      )}
    </div>
    <figcaption className="mt-6 flex items-baseline justify-between gap-4 font-monopress text-[9px] uppercase tracking-[0.18em] text-ink-mute sm:text-[10px]">
      <span>
        {b.format} · {b.genre}
      </span>
      <span>By {b.author}</span>
    </figcaption>
  </motion.figure>
);

/** The paperback laid flat: back cover, spine and front in one wrap. */
const Wrap = ({ b, size }: { b: BookData; size: [number, number] }) => (
  <motion.figure
    variants={pressReveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    className="mt-14 border-t border-ink/40 pt-6 sm:mt-16"
  >
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h4 className="font-display text-xl font-black uppercase leading-[1] tracking-[-0.015em] sm:text-2xl">
        {b.title} · The paperback
      </h4>
      <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        Back cover · Spine · Front
      </span>
    </div>
    <a
      href={withBase(b.paperback)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 block"
      aria-label={`Open the full-size paperback cover of ${b.title}`}
    >
      <img
        src={withBase(b.paperback)}
        alt={`The paperback of ${b.title}, laid flat: back cover with the blurb on the left, the spine in the middle and the front cover on the right`}
        width={size[0]}
        height={size[1]}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full border border-ink"
        style={{ boxShadow: '8px 8px 0 0 var(--color-ink)' }}
      />
    </a>
    <figcaption className="mt-5 font-editorial text-[13.5px] italic text-ink-mute">
      The cover as printed, laid flat. Tap or click for the full-size image.
    </figcaption>
  </motion.figure>
);

/** The novel — shown first on the shelf. */
const Novel = () => (
  <article aria-labelledby="novel-title">
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:gap-16">
      <Cover b={novel} />
      <motion.div
        variants={pressReveal}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <span className="inline-block bg-oxblood px-2 py-1 font-monopress text-[10px] uppercase tracking-[0.2em] text-paper">
          New · A novel
        </span>
        <h3
          id="novel-title"
          aria-label={`${novel.title}: ${novel.subtitle}`}
          className="mt-4 font-display font-black uppercase leading-[0.85] tracking-[-0.03em]"
        >
          <span aria-hidden="true" className="block text-[11vw] lg:text-[6.3vw] xl:text-[96px]">
            Above the <span className="text-oxblood">Clouds</span>
          </span>
        </h3>

        <blockquote className="mt-8 border-l-2 border-oxblood py-1 pl-6">
          <p className="font-editorial text-2xl italic leading-snug text-ink sm:text-3xl">“{novel.tagline}”</p>
        </blockquote>

        <div className="mt-8 max-w-2xl space-y-4 font-editorial text-[15.5px] leading-relaxed text-ink sm:text-[17px]">
          {novel.blurb.map((p, i) => (
            <p key={p} className={i === novel.blurb.length - 1 ? 'font-semibold' : undefined}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {novel.features.map((f) => (
            <PressTag key={f}>{f}</PressTag>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BuyButtons b={novel} />
          <AskLink b={novel} />
        </div>

        <p className="mt-10 max-w-2xl border-t border-ink/20 pt-4 font-editorial text-[13.5px] italic leading-relaxed text-ink-mute">
          {novel.authorNote}
        </p>
      </motion.div>
    </div>
    <Wrap b={novel} size={[2000, 1397]} />
  </article>
);

const Book = () => (
  <PressSection id="book" className="bg-paper-bright">
    <SectionMasthead
      section="Book Review"
      name="The Shelf"
      headline="The Author's Books"
      standfirst="Two books so far: a horror thriller that began as a dream, and a guide to taking your attention back."
    />

    <Novel />

    <div className="mb-14 mt-16 flex items-center gap-4 sm:mt-20" aria-hidden="true">
      <span className="h-[2px] flex-1 bg-ink" />
      <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">Also by the author</span>
      <span className="h-[2px] flex-1 bg-ink" />
    </div>

    <article aria-labelledby="unscrolled-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:gap-16">
        <Cover b={book} />

        {/* ===== Back-cover copy ===== */}
        <motion.div
          variants={pressReveal}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h3
            id="unscrolled-title"
            aria-label={`${book.title}: ${book.subtitle}`}
            className="font-display font-black uppercase leading-[0.85] tracking-[-0.03em]"
          >
            <span aria-hidden="true" className="block text-[11vw] lg:text-[6.3vw] xl:text-[96px]">
              <span className="text-oxblood">Un</span>scrolled
            </span>
            <span
              aria-hidden="true"
              className="mt-4 block max-w-xl font-editorial text-lg font-normal normal-case italic leading-snug tracking-normal text-ink-mute sm:text-xl"
            >
              {book.subtitle}
            </span>
          </h3>

          <blockquote className="mt-8 border-l-2 border-oxblood py-1 pl-6">
            <p className="font-display text-2xl font-black uppercase leading-[1.02] tracking-[-0.01em] sm:text-3xl">
              You are not lazy.
              <span className="block text-oxblood">You are outgunned.</span>
            </p>
          </blockquote>

          <div className="mt-8 max-w-2xl space-y-4 font-editorial text-[15.5px] leading-relaxed text-ink sm:text-[17px]">
            {book.blurb.map((p) => (
              <p key={p}>
                {p
                  .split(book.title)
                  .flatMap((part, i, parts) => (i < parts.length - 1 ? [part, <em key={i}>{book.title}</em>] : [part]))}
              </p>
            ))}
          </div>

          <div className="mt-8 max-w-2xl">
            <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">You will learn</span>
            <ol className="mt-3 divide-y divide-ink/15 border-y border-ink/30">
              {book.learn.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 py-3">
                  <span className="font-monopress text-[10px] text-oxblood">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-editorial text-[15px] leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {book.features.map((f) => (
              <PressTag key={f}>{f}</PressTag>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BuyButtons b={book} />
            <Link
              to="/book"
              className="inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-oxblood hover:decoration-oxblood"
            >
              About the book
            </Link>
            <a
              href={`mailto:surajnandan78@gmail.com?subject=${encodeURIComponent(`About ${book.title}`)}`}
              className="inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/30 underline-offset-4 transition-colors hover:decoration-oxblood"
            >
              <Mail size={14} /> Ask about the book
            </a>
          </div>

          <p className="mt-10 max-w-2xl border-t border-ink/20 pt-4 font-editorial text-[13.5px] italic leading-relaxed text-ink-mute">
            {book.authorNote}
          </p>
        </motion.div>
      </div>

      <Wrap b={book} size={[2000, 1460]} />
    </article>
  </PressSection>
);

export default Book;
