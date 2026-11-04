import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';
import { book } from '../data/book';
import { withBase } from '../lib/utils';

/**
 * The Book — a book review column for the author's own title.
 * The cover sits on a hard print shadow; the back-cover copy runs beside it.
 * With no `buyUrl` set, the section announces the book as coming soon.
 */
const Book = () => (
  <PressSection id="book" className="bg-paper-bright">
    <SectionMasthead
      section="Book Review"
      name="The Shelf"
      headline="The Author's Book"
      standfirst="Away from the keyboard, I write about attention: how it gets taken, and how to take it back."
    />

    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] lg:gap-16">
      {/* ===== Cover ===== */}
      <motion.figure
        variants={pressReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-none"
      >
        <div className="relative">
          <img
            src={withBase(book.cover)}
            alt={`Cover of ${book.title}: ${book.subtitle}, by ${book.author}`}
            width={1000}
            height={1600}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full border border-ink"
            style={{ boxShadow: '10px 10px 0 0 var(--color-ink)' }}
          />
          {!book.buyUrl && (
            <span className="absolute -left-3 top-6 -rotate-3 bg-oxblood px-3.5 py-1.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper">
              Coming soon
            </span>
          )}
        </div>
        <figcaption className="mt-6 flex items-baseline justify-between gap-4 font-monopress text-[9px] uppercase tracking-[0.18em] text-ink-mute sm:text-[10px]">
          <span>{book.format} · {book.genre}</span>
          <span>By {book.author}</span>
        </figcaption>
      </motion.figure>

      {/* ===== Back-cover copy ===== */}
      <motion.div
        variants={pressReveal}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <h3
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
              {p.split(book.title).flatMap((part, i, parts) =>
                i < parts.length - 1 ? [part, <em key={i}>{book.title}</em>] : [part]
              )}
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
          {book.buyUrl ? (
            <a
              href={book.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood"
            >
              Get the book <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-oxblood" />
              Coming soon
            </span>
          )}
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

    {/* ===== The paperback: back cover, spine and front in one wrap ===== */}
    <motion.figure
      variants={pressReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="mt-16 border-t-2 border-ink pt-8 sm:mt-20"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-display text-2xl font-black uppercase leading-[1] tracking-[-0.015em] sm:text-3xl">
          The {book.format}
        </h3>
        <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
          Back cover · Spine · Front
        </span>
      </div>
      <a
        href={withBase(book.paperback)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block"
        aria-label={`Open the full-size ${book.format.toLowerCase()} cover of ${book.title}`}
      >
        <img
          src={withBase(book.paperback)}
          alt={`The ${book.format.toLowerCase()} edition of ${book.title}, laid flat: back cover with the blurb on the left, the spine in the middle and the front cover on the right`}
          width={2000}
          height={1460}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full border border-ink"
          style={{ boxShadow: '10px 10px 0 0 var(--color-ink)' }}
        />
      </a>
      <figcaption className="mt-6 font-editorial text-[13.5px] italic text-ink-mute">
        The cover as printed, laid flat. Tap or click for the full-size image.
      </figcaption>
    </motion.figure>
  </PressSection>
);

export default Book;
