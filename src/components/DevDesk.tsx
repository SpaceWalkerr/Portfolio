import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { PROFILES, DEVTO_USERNAME } from '../data/site';
import snapshot from '../data/devto.json';

/**
 * Filed on DEV — the dev.to desk as a front-page feature: a dark banner with the
 * numbers and a follow button, the latest piece as the lead story, then the two
 * running series as columns. Loads the live API once the section nears the
 * viewport; the build-time snapshot stands in whenever dev.to is unreachable.
 */

interface DevArticle {
  id: number;
  title: string;
  url: string;
  date: string;
  tags: string[];
  cover: string | null;
  readingTime: number;
}

interface ApiArticle {
  id: number;
  title: string;
  url: string;
  published_at: string;
  tag_list: string[] | string;
  cover_image: string | null;
  reading_time_minutes: number;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const fromApi = (a: ApiArticle): DevArticle => ({
  id: a.id,
  title: a.title,
  url: a.url,
  date: a.published_at,
  tags: Array.isArray(a.tag_list) ? a.tag_list : String(a.tag_list ?? '').split(', ').filter(Boolean),
  cover: a.cover_image ?? null,
  readingTime: a.reading_time_minutes ?? 0,
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

const isWire = (a: DevArticle) => a.tags.includes('news');

const Ledger = ({ items }: { items: DevArticle[] }) => (
  <ol className="divide-y divide-ink/20 border-y border-ink">
    {items.map((a) => (
      <li key={a.id}>
        <a href={a.url} target="_blank" rel="noopener noreferrer" className="group block py-3.5">
          <span className="flex items-baseline justify-between gap-4 font-monopress text-[9.5px] uppercase tracking-[0.16em] text-ink-mute">
            <time dateTime={a.date}>{formatDate(a.date)}</time>
            <span>{a.readingTime} min read</span>
          </span>
          <span className="mt-1.5 block font-editorial text-[17px] leading-snug text-ink transition-colors group-hover:text-oxblood">
            {a.title}
          </span>
        </a>
      </li>
    ))}
  </ol>
);

const DevDesk = () => {
  const [articles, setArticles] = useState<DevArticle[]>(snapshot.articles);
  const { ref, inView } = useInViewOnce<HTMLDivElement>('300px');

  useEffect(() => {
    if (!inView) return;
    const controller = new AbortController();
    fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=100`, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<ApiArticle[]>) : null))
      .then((list) => {
        if (Array.isArray(list) && list.length) {
          setArticles(list.map(fromApi).sort((a, b) => b.date.localeCompare(a.date)));
        }
      })
      .catch(() => {
        /* offline or blocked — the snapshot stays on screen */
      });
    return () => controller.abort();
  }, [inView]);

  const { lead, wire, notes, thisWeek } = useMemo(() => {
    const [first, ...rest] = articles;
    const cutoff = Date.now() - WEEK_MS;
    return {
      lead: first,
      wire: rest.filter(isWire).slice(0, 4),
      notes: rest.filter((a) => !isWire(a)).slice(0, 4),
      thisWeek: articles.filter((a) => new Date(a.date).getTime() >= cutoff).length,
    };
  }, [articles]);

  const stats = [
    { value: String(articles.length), label: 'Articles filed' },
    { value: String(thisWeek), label: 'New this week' },
    { value: '2', label: 'Series running' },
    { value: lead ? formatDate(lead.date) : '—', label: 'Latest dispatch', small: true },
  ];

  return (
    <PressSection id="dev">
      <SectionMasthead
        section="Wire Service"
        name="dev.to/suraj_nandan"
        headline="Filed on DEV"
        standfirst="Two running series on dev.to: a tech and security news desk, and honest notes from a student learning to build software."
      />

      <div ref={ref}>
        {/* ===== Banner: the numbers, and a way to follow ===== */}
        <motion.div
          variants={pressReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 bg-ink p-6 text-paper sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:p-10"
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center bg-paper font-display text-2xl font-black tracking-[-0.04em] text-ink sm:h-20 sm:w-20 sm:text-3xl"
            >
              DEV
            </span>
            <div className="font-monopress text-[10px] uppercase leading-relaxed tracking-[0.2em] text-paper/70">
              Published
              <br />
              on dev.to
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-1 sm:px-5 ${i > 0 ? 'sm:border-l sm:border-paper/25' : ''}`}>
                <dd
                  className={`font-display font-black leading-none tracking-[-0.03em] ${
                    s.small ? 'text-2xl sm:text-3xl' : 'text-5xl sm:text-6xl'
                  }`}
                >
                  {s.value}
                </dd>
                <dt className="mt-2 font-monopress text-[9px] uppercase tracking-[0.18em] text-paper/70">{s.label}</dt>
              </div>
            ))}
          </dl>

          <a
            href={PROFILES.devto}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-paper px-6 py-4 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-vermilion hover:text-paper"
          >
            Follow on DEV <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* ===== Lead story: the latest piece ===== */}
        {lead && (
          <motion.a
            href={lead.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={pressReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="group mt-10 grid gap-6 border-b-2 border-ink pb-10 lg:grid-cols-[1.1fr_1fr] lg:gap-10"
          >
            {lead.cover && (
              <div className="overflow-hidden border border-ink bg-paper-bright">
                <img
                  src={lead.cover}
                  alt=""
                  width={1000}
                  height={420}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[1000/420] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="flex flex-col justify-center">
              <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-oxblood">
                Latest dispatch · {formatDate(lead.date)} · {lead.readingTime} min read
              </span>
              <h3 className="mt-3 font-display text-2xl font-black uppercase leading-[1.02] tracking-[-0.02em] transition-colors group-hover:text-oxblood sm:text-4xl">
                {lead.title}
              </h3>
              <span className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-monopress text-[9.5px] uppercase tracking-[0.14em] text-ink-mute">
                {lead.tags.slice(0, 4).map((t) => (
                  <span key={t}>#{t}</span>
                ))}
              </span>
              <span className="mt-6 inline-flex w-fit items-center gap-2 bg-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors group-hover:bg-oxblood">
                Read on DEV <ArrowUpRight size={13} />
              </span>
            </div>
          </motion.a>
        )}

        {/* ===== The two series ===== */}
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={pressReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <span className="inline-block bg-oxblood px-2 py-1 font-monopress text-[10px] uppercase tracking-[0.2em] text-paper">
              The Wire
            </span>
            <h3 className="mt-3 font-display text-2xl font-black uppercase leading-[1] tracking-[-0.015em] sm:text-3xl">
              Tech &amp; security desk
            </h3>
            <p className="mb-5 mt-2 font-editorial text-[14.5px] italic leading-relaxed text-ink-mute">
              Real breaches, AI and big-tech stories, written up with sources. Written with AI and labelled as such on
              every post.
            </p>
            <Ledger items={wire} />
          </motion.div>

          <motion.div
            variants={pressReveal}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <span className="inline-block border border-ink px-2 py-1 font-monopress text-[10px] uppercase tracking-[0.2em] text-ink">
              Notes &amp; build logs
            </span>
            <h3 className="mt-3 font-display text-2xl font-black uppercase leading-[1] tracking-[-0.015em] sm:text-3xl">
              Learning in public
            </h3>
            <p className="mb-5 mt-2 font-editorial text-[14.5px] italic leading-relaxed text-ink-mute">
              Honest notes from a student learning to build software, and write-ups of what I built along the way.
            </p>
            <Ledger items={notes} />
          </motion.div>
        </div>

        <p className="mt-8 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
          {articles.length} articles in all ·{' '}
          <a
            href={PROFILES.devto}
            target="_blank"
            rel="noopener noreferrer"
            className="text-oxblood underline decoration-oxblood/30 underline-offset-4 hover:decoration-oxblood"
          >
            Read them all on DEV
          </a>
        </p>
      </div>
    </PressSection>
  );
};

export default DevDesk;
