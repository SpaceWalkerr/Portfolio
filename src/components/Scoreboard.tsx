import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, GitFork, Star } from 'lucide-react';
import { PressSection, SectionMasthead, PressButton, pressReveal } from './ui/press';
import useCountUp from '../hooks/useCountUp';
import { useInViewOnce } from '../hooks/useInViewOnce';
import snapshot from '../data/github-snapshot.json';

/**
 * The Scoreboard — live coding stats: LeetCode (via /api/leetcode), the GitHub
 * contribution calendar (via /api/contributions) and top repositories.
 * Everything loads when the section nears the viewport; the build-time
 * snapshot stands in whenever a source is unavailable.
 */

const GITHUB_USERNAME = 'SpaceWalkerr';
const LEETCODE_URL = 'https://leetcode.com/u/SurajNandan/';

type LeetCode = typeof snapshot.leetcode;
interface Day {
  date: string;
  level: number;
  count: number;
}
interface Contributions {
  total: number;
  streak: number;
  days: Day[];
}
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
}

const fetchJson = async <T,>(url: string): Promise<T | null> => {
  try {
    const res = await fetch(url);
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
};

/* ── LeetCode ledger ──────────────────────────────────────────────── */

const LeetCodeCard = ({ data, live }: { data: LeetCode; live: boolean }) => {
  const solved = useCountUp(data.solved.all, 1800);
  const rows = [
    { label: 'Easy', solved: data.solved.easy, of: data.available.easy },
    { label: 'Medium', solved: data.solved.medium, of: data.available.medium },
    { label: 'Hard', solved: data.solved.hard, of: data.available.hard },
  ];

  return (
    <div className="border-2 border-ink p-5 sm:p-6">
      <div className="flex items-baseline justify-between border-b border-ink pb-2.5 font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        <span>LeetCode</span>
        <span className={live ? 'text-oxblood' : ''}>{live ? '● Live' : 'Snapshot'}</span>
      </div>

      <div ref={solved.ref} className="mt-5 flex items-end gap-3">
        <span className="font-display text-6xl font-black leading-none tracking-[-0.03em] sm:text-7xl">
          {solved.count}
        </span>
        <span className="pb-1.5 font-editorial text-[15px] italic leading-tight text-ink-mute">
          problems
          <br />
          solved
        </span>
      </div>

      <dl className="mt-6 space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between">
              <dt className="font-monopress text-[10px] uppercase tracking-[0.16em] text-ink">{r.label}</dt>
              <dd className="font-monopress text-[10px] text-ink-mute">
                <span className="text-ink">{r.solved}</span> / {r.of.toLocaleString()}
              </dd>
            </div>
            <div className="mt-1.5 h-[5px] w-full bg-ink/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (r.solved / Math.max(1, r.of)) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`h-full ${r.label === 'Hard' ? 'bg-oxblood' : 'bg-ink'}`}
              />
            </div>
          </div>
        ))}
      </dl>

      {data.contest && (
        <p className="mt-5 border-t border-ink/20 pt-3 font-editorial text-[13.5px] italic text-ink-mute">
          Contest rating <span className="not-italic text-ink">{data.contest.rating}</span> across{' '}
          {data.contest.attended} rated contests.
        </p>
      )}

      <a
        href={LEETCODE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 font-monopress text-[10px] uppercase tracking-[0.16em] text-oxblood underline decoration-oxblood/30 underline-offset-4 hover:decoration-oxblood"
      >
        Profile on LeetCode <ExternalLink size={12} />
      </a>
    </div>
  );
};

/* ── Contribution calendar ────────────────────────────────────────── */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CELL = 11;
const GAP = 3;
// Ink density per level, like a halftone press running heavier
const LEVEL_OPACITY = [0.08, 0.3, 0.5, 0.72, 1];

const ContributionCalendar = ({ data }: { data: Contributions }) => {
  const weeks = useMemo(() => {
    const cols: (Day | null)[][] = [];
    let col: (Day | null)[] = [];
    data.days.forEach((d, i) => {
      const dow = new Date(`${d.date}T00:00:00Z`).getUTCDay();
      if (i === 0) col = Array(dow).fill(null);
      col.push(d);
      if (dow === 6) {
        cols.push(col);
        col = [];
      }
    });
    if (col.length) cols.push(col);
    return cols;
  }, [data.days]);

  const monthLabels = weeks
    .map((w, i) => {
      const first = w.find(Boolean);
      if (!first) return null;
      const day = Number(first.date.slice(8, 10));
      return day <= 7 ? { i, label: MONTHS[Number(first.date.slice(5, 7)) - 1] } : null;
    })
    .filter(Boolean) as { i: number; label: string }[];

  const width = weeks.length * (CELL + GAP);
  const height = 7 * (CELL + GAP) + 16;
  const busiest = data.days.reduce((best, d) => (d.count > best.count ? d : best), data.days[0]);

  return (
    <div className="border-2 border-ink p-5 sm:p-6">
      <div className="flex items-baseline justify-between border-b border-ink pb-2.5 font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        <span>GitHub — The Year in Ink</span>
        <span className="text-oxblood">● Live</span>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3">
        <div className="flex items-end gap-3">
          <span className="font-display text-5xl font-black leading-none tracking-[-0.03em] sm:text-6xl">
            {data.total.toLocaleString()}
          </span>
          <span className="pb-1 font-editorial text-[15px] italic leading-tight text-ink-mute">
            contributions
            <br />
            in the last year
          </span>
        </div>
        {data.streak > 1 && (
          <span className="pb-1.5 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink">
            {data.streak}-day streak
          </span>
        )}
      </div>

      {/* Scrolls on small screens; starts at the most recent week */}
      <div
        className="mt-5 overflow-x-auto pb-1"
        ref={(el) => {
          if (el) el.scrollLeft = el.scrollWidth;
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year`}
          className="block"
        >
          {monthLabels.map((m) => (
            <text
              key={`${m.label}-${m.i}`}
              x={m.i * (CELL + GAP)}
              y={9}
              className="fill-ink-mute font-monopress"
              style={{ fontSize: 9, letterSpacing: '0.1em' }}
            >
              {m.label.toUpperCase()}
            </text>
          ))}
          {weeks.map((week, x) =>
            week.map((day, y) =>
              day ? (
                <rect
                  key={day.date}
                  x={x * (CELL + GAP)}
                  y={16 + y * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  className="fill-ink"
                  fillOpacity={LEVEL_OPACITY[day.level] ?? 0.08}
                >
                  <title>
                    {day.count === 0 ? 'No' : day.count} contribution{day.count === 1 ? '' : 's'} on {day.date}
                  </title>
                </rect>
              ) : null
            )
          )}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-mute">
        <span>
          Busiest day: {busiest.count} on {busiest.date}
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {LEVEL_OPACITY.map((o) => (
            <span key={o} className="inline-block h-[9px] w-[9px] bg-ink" style={{ opacity: o }} />
          ))}
          More
        </span>
      </div>
    </div>
  );
};

/* ── Section ──────────────────────────────────────────────────────── */

const Scoreboard = () => {
  const section = useInViewOnce<HTMLDivElement>('400px');
  const [leetcode, setLeetcode] = useState<LeetCode>(snapshot.leetcode);
  const [leetcodeLive, setLeetcodeLive] = useState(false);
  const [calendar, setCalendar] = useState<Contributions | null>(null);
  const [reposOpen, setReposOpen] = useState(false);
  const repos = snapshot.repos as Repo[];
  const reposCount = useCountUp(snapshot.user.public_repos, 1600);

  useEffect(() => {
    if (!section.inView) return;
    let cancelled = false;
    fetchJson<LeetCode>('/api/leetcode').then((d) => {
      if (!cancelled && d?.solved) {
        setLeetcode(d);
        setLeetcodeLive(true);
      }
    });
    fetchJson<Contributions>('/api/contributions').then((d) => {
      if (!cancelled && d?.days?.length) setCalendar(d);
    });
    return () => {
      cancelled = true;
    };
  }, [section.inView]);

  return (
    <PressSection id="github">
      <div ref={section.ref}>
        <SectionMasthead
          section="Supplement"
          name="The Scoreboard"
          headline="By the Numbers"
          standfirst="The practice behind the portfolio — problems solved, code committed, and repositories on the public record."
        />

        <motion.div
          variants={pressReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 lg:grid-cols-[1fr_1.7fr]"
        >
          <LeetCodeCard data={leetcode} live={leetcodeLive} />
          {calendar ? (
            <ContributionCalendar data={calendar} />
          ) : (
            <div className="flex min-h-[260px] flex-col justify-between border-2 border-ink p-5 sm:p-6">
              <span className="border-b border-ink pb-2.5 font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                GitHub — The Year in Ink
              </span>
              <div ref={reposCount.ref}>
                <span className="font-display text-6xl font-black leading-none tracking-[-0.03em]">
                  {reposCount.count}
                </span>
                <span className="ml-3 font-editorial text-[15px] italic text-ink-mute">public repositories</span>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-monopress text-[10px] uppercase tracking-[0.16em] text-oxblood"
              >
                github.com/{GITHUB_USERNAME} <ExternalLink size={12} />
              </a>
            </div>
          )}
        </motion.div>

        {/* Repositories — one click deeper */}
        <div className="mt-8 border-t-2 border-ink">
          <button
            type="button"
            onClick={() => setReposOpen(!reposOpen)}
            aria-expanded={reposOpen}
            className="group flex w-full items-center justify-between py-4 text-left"
          >
            <span className="font-display text-xl font-black uppercase tracking-[-0.01em] group-hover:text-oxblood">
              {snapshot.user.public_repos} Repositories on File
            </span>
            <span className="flex items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              {reposOpen ? 'Hide' : 'Show recent'}
              <ChevronDown size={16} className={`transition-transform ${reposOpen ? 'rotate-180' : ''}`} />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {reposOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-4 pb-2 sm:grid-cols-2 lg:grid-cols-3">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group border border-ink/30 p-4 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm font-bold uppercase tracking-[-0.01em]">{repo.name}</h4>
                        <ExternalLink size={14} className="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100" />
                      </div>
                      {repo.description && (
                        <p className="mt-2 line-clamp-2 font-editorial text-[13px] leading-snug text-ink-mute group-hover:text-paper/80">
                          {repo.description}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-mute group-hover:text-paper/70">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-oxblood" />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={12} /> {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork size={12} /> {repo.forks_count}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-6 flex justify-center pb-2">
                  <PressButton href={`https://github.com/${GITHUB_USERNAME}`}>
                    <ExternalLink size={14} />
                    Full Profile on GitHub
                  </PressButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PressSection>
  );
};

export default Scoreboard;
