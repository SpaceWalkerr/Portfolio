import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';
import MediumIcon from './ui/medium-icon';
import { PROFILES } from '../data/site';
import snapshot from '../data/medium.json';

/**
 * The Column — the author's essays on Medium. The newest story leads with its
 * cover; every other story follows as a card with its cover, title and the
 * one-line snippet Medium publishes for it. The list is a build-time snapshot of
 * the public RSS feed (scripts/fetch-medium.mjs): Medium blocks browser requests
 * to the feed, so there is no live refresh.
 */

interface Story {
  id: string;
  title: string;
  url: string;
  date: string;
  tags: string[];
  cover: string | null;
  excerpt: string;
  publication: string | null;
}

const stories = snapshot.stories as Story[];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

/** Medium's CDN serves any width; 800px is plenty for a card, 1400px for the lead. */
const sized = (url: string, w: number) => url.replace(/\/max\/\d+\//, `/max/${w}/`);

const tagLabel = (t: string) => t.replace(/-/g, ' ');

const Dateline = ({ s }: { s: Story }) => (
  <span className="font-monopress text-[9.5px] uppercase tracking-[0.16em] text-ink-mute">
    <time dateTime={s.date}>{formatDate(s.date)}</time>
    {s.publication && <> · In {s.publication}</>}
  </span>
);

const Medium = () => {
  const [lead, ...rest] = stories;

  return (
    <PressSection id="medium" className="bg-paper-bright">
      <SectionMasthead
        section="Op-Ed"
        name="medium.com/@suraj-nandan"
        headline="The Column"
        standfirst="Personal essays on Medium: phones and focus, growing up in a small town, and what building software as a student actually teaches you."
      />

      {/* ===== Banner ===== */}
      <motion.div
        variants={pressReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-6 border-y-2 border-ink py-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center bg-ink text-paper">
            <MediumIcon size={30} />
          </span>
          <div>
            <span className="block font-display text-2xl font-black uppercase leading-none tracking-[-0.02em] sm:text-3xl">
              {stories.length} stories
            </span>
            <span className="mt-1.5 block font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              Latest · {lead ? formatDate(lead.date) : '—'}
            </span>
          </div>
        </div>
        <a
          href={PROFILES.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood"
        >
          Follow on Medium <ArrowUpRight size={14} />
        </a>
      </motion.div>

      {/* ===== Lead story ===== */}
      {lead && (
        <motion.a
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={pressReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="group mt-10 grid gap-6 border-b-2 border-ink pb-10 lg:grid-cols-[1.15fr_1fr] lg:gap-10"
        >
          {lead.cover && (
            <div className="overflow-hidden border border-ink bg-paper">
              <img
                src={sized(lead.cover, 1400)}
                alt=""
                width={1400}
                height={788}
                loading="lazy"
                decoding="async"
                className="block aspect-[16/9] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-oxblood">Latest essay</span>
            <h3 className="mt-3 font-display text-2xl font-black uppercase leading-[1.02] tracking-[-0.02em] transition-colors group-hover:text-oxblood sm:text-4xl">
              {lead.title}
            </h3>
            {lead.excerpt && (
              <p className="mt-4 font-editorial text-[16px] italic leading-relaxed text-ink-mute sm:text-[17px]">
                {lead.excerpt}
              </p>
            )}
            <span className="mt-4">
              <Dateline s={lead} />
            </span>
            <span className="mt-6 inline-flex w-fit items-center gap-2 bg-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors group-hover:bg-oxblood">
              Read on Medium <ArrowUpRight size={13} />
            </span>
          </div>
        </motion.a>
      )}

      {/* ===== Every other story ===== */}
      <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((s, i) => (
          <motion.li
            key={s.id}
            variants={pressReveal}
            custom={i % 3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
              {s.cover && (
                <div className="overflow-hidden border border-ink bg-paper">
                  <img
                    src={sized(s.cover, 800)}
                    alt=""
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[16/9] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              )}
              <span className="mt-4">
                <Dateline s={s} />
              </span>
              <span className="mt-2 block font-display text-xl font-black uppercase leading-[1.05] tracking-[-0.015em] transition-colors group-hover:text-oxblood">
                {s.title}
              </span>
              {s.excerpt && (
                <span className="mt-2.5 block font-editorial text-[15px] leading-snug text-ink-mute">{s.excerpt}</span>
              )}
              {s.tags.length > 0 && (
                <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                  {s.tags.slice(0, 3).map((t) => (
                    <span key={t}>#{tagLabel(t)}</span>
                  ))}
                </span>
              )}
            </a>
          </motion.li>
        ))}
      </ul>

      <p className="mt-12 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
        Showing the {stories.length} newest ·{' '}
        <a
          href={PROFILES.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline decoration-oxblood/30 underline-offset-4 hover:decoration-oxblood"
        >
          Read every story on Medium
        </a>
      </p>
    </PressSection>
  );
};

export default Medium;
