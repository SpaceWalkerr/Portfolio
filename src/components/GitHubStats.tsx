import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, Users, BookOpen, ExternalLink, Code2, ChevronDown } from 'lucide-react';
import { PressButton, pressReveal } from './ui/press';
import useCountUp from '../hooks/useCountUp';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
}

const GITHUB_USERNAME = 'SpaceWalkerr';

const GitHubStats = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const starsCount = useCountUp(repos.reduce((sum, r) => sum + r.stargazers_count, 0), 1800);
  const reposCount = useCountUp(user?.public_repos ?? 0, 1800);
  const followersCount = useCountUp(user?.followers ?? 0, 1800);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        setUser(userData);
        const sorted = reposData
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        setRepos(sorted);
    } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return null;

  return (
    <div id="github" className="relative overflow-hidden bg-paper text-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        {/* Toggle header */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setIsOpen(!isOpen)}
          className="group flex w-full items-center justify-between border-t-4 border-double border-ink pt-6 text-left"
          aria-expanded={isOpen}
          aria-label="Toggle GitHub activity section"
        >
          <div>
            <div className="flex items-baseline gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
              <span className="text-oxblood">Supplement</span>
              <span>The Analytics</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              GitHub Activity
            </h2>
            <p className="mt-2 max-w-2xl font-editorial text-sm italic text-ink-mute sm:text-base">
              Live data from the open-source record — repositories, stars, and contributions.
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 border border-ink/30 p-3 transition-colors group-hover:border-ink"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>

        {/* Collapsible content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-10">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="block h-5 w-5 rounded-full border-2 border-ink/30 border-t-ink"
                      />
                      <span className="font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                        Fetching the ledger…
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Stats grid */}
                    <motion.div
                      variants={pressReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
                    >
                      <div className="border-2 border-ink p-5" ref={reposCount.ref as React.RefObject<HTMLDivElement>}>
                        <BookOpen size={20} className="mb-2 text-ink-mute" />
                        <div className="font-display text-3xl font-black tracking-[-0.02em] sm:text-4xl">
                          {reposCount.count}
                        </div>
                        <div className="mt-1 font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                          Public Repos
                        </div>
                      </div>

                      <div className="border-2 border-ink p-5" ref={starsCount.ref as React.RefObject<HTMLDivElement>}>
                        <Star size={20} className="mb-2 text-ink-mute" />
                        <div className="font-display text-3xl font-black tracking-[-0.02em] sm:text-4xl">
                          {starsCount.count}
                        </div>
                        <div className="mt-1 font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                          Total Stars
                        </div>
                      </div>

                      <div className="border-2 border-ink p-5" ref={followersCount.ref as React.RefObject<HTMLDivElement>}>
                        <Users size={20} className="mb-2 text-ink-mute" />
                        <div className="font-display text-3xl font-black tracking-[-0.02em] sm:text-4xl">
                          {followersCount.count}
                        </div>
                        <div className="mt-1 font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                          Followers
                        </div>
                      </div>

                      <div className="border-2 border-ink p-5">
                        <Code2 size={20} className="mb-2 text-ink-mute" />
                        <div className="font-display text-3xl font-black tracking-[-0.02em] sm:text-4xl">
                          {user?.following ?? 0}
                        </div>
                        <div className="mt-1 font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                          Following
                        </div>
                      </div>
                    </motion.div>

                    {/* Top repos */}
                    <motion.div
                      variants={pressReveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                    >
                      <h3 className="mb-4 font-display text-xl font-black uppercase tracking-[-0.01em]">
                        Top Repositories
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {repos.map((repo) => (
                          <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border border-ink/30 p-4 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-display text-sm font-bold uppercase tracking-[-0.01em] group-hover:text-paper">
                                {repo.name}
                              </h4>
                              <ExternalLink size={14} className="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100" />
                            </div>
                            {repo.description && (
                              <p className="mt-2 line-clamp-2 font-editorial text-[13px] leading-snug text-ink-mute group-hover:text-paper/80">
                                {repo.description}
                              </p>
                            )}
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                              {repo.language && (
                                <span className="flex items-center gap-1.5 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-mute group-hover:text-paper/70">
                                  <span className="h-2 w-2 rounded-full bg-oxblood" />
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-1 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-mute group-hover:text-paper/70">
                                <Star size={12} />
                                {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-mute group-hover:text-paper/70">
                                <GitFork size={12} />
                                {repo.forks_count}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={pressReveal}
                      custom={1}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      className="mt-8 flex justify-center"
                    >
                      <PressButton href={`https://github.com/${GITHUB_USERNAME}`}>
                        <ExternalLink size={14} />
                        View Full Profile on GitHub
                      </PressButton>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GitHubStats;

