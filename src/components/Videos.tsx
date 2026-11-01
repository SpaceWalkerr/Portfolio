import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';
import { PROFILES } from '../data/site';
import snapshot from '../data/youtube.json';

/**
 * On Screen — the YouTube channel and the Instagram account.
 * The newest video is the lead: a click-to-play poster that loads the player (from
 * youtube-nocookie.com) only after a click, so nothing third-party runs until then.
 * The next videos follow as a wall of vertical posters. The list is a build-time
 * snapshot of the channel's public RSS feed (scripts/fetch-youtube.mjs).
 */

const WALL = 6;

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

/** The videos are vertical; the 4:3 thumbnail holds the picture centred, so a 9:16 crop shows exactly that picture. */
const Poster = ({ id, className = '' }: { id: string; className?: string }) => (
  <img
    src={thumb(id)}
    alt=""
    width={480}
    height={360}
    loading="lazy"
    decoding="async"
    className={`block aspect-[9/16] w-full object-cover object-center ${className}`}
  />
);

const Videos = () => {
  const [lead, ...rest] = snapshot.videos;
  const [playing, setPlaying] = useState(false);

  return (
    <PressSection id="videos" className="bg-paper-bright">
      <SectionMasthead
        section="Broadcast"
        name="YouTube & Instagram"
        headline="On Screen"
        standfirst="Short videos in Hindi on festivals, rituals and the stories behind them, and AI devotional art on Instagram."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] lg:gap-14">
        {/* ===== Lead video ===== */}
        {lead && (
          <motion.figure
            variants={pressReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto w-full max-w-[320px] lg:mx-0 lg:max-w-none"
          >
            <div
              className="relative aspect-[9/16] overflow-hidden border border-ink bg-ink"
              style={{ boxShadow: '10px 10px 0 0 var(--color-ink)' }}
            >
              {playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${lead.id}?autoplay=1&rel=0&playsinline=1`}
                  title={lead.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play: ${lead.title}`}
                  className="group absolute inset-0 block h-full w-full"
                >
                  <Poster id={lead.id} className="h-full" />
                  <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink transition-transform group-hover:scale-110">
                    <Play size={26} className="translate-x-0.5" fill="currentColor" />
                  </span>
                  <span className="absolute left-0 top-0 bg-oxblood px-3 py-1.5 font-monopress text-[10px] uppercase tracking-[0.18em] text-paper">
                    Latest
                  </span>
                </button>
              )}
            </div>
            <figcaption className="mt-7">
              <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                {formatDate(lead.published)}
              </span>
              <span lang="hi" className="mt-1.5 block font-editorial text-[17px] leading-snug text-ink">
                {lead.title}
              </span>
            </figcaption>
          </motion.figure>
        )}

        {/* ===== The channel: more videos, and Instagram ===== */}
        <div className="min-w-0">
          <motion.div
            variants={pressReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4"
          >
            <div>
              <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-oxblood">YouTube</span>
              <h3 className="mt-2 font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl">
                {snapshot.channelName}
              </h3>
            </div>
            <a
              href={PROFILES.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-oxblood"
            >
              Subscribe <ArrowUpRight size={13} />
            </a>
          </motion.div>

          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
            {rest.slice(0, WALL).map((v, i) => (
              <motion.li
                key={v.id}
                variants={pressReveal}
                custom={i % 3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
              >
                <a href={watchUrl(v.id)} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative overflow-hidden border border-ink bg-ink">
                    <Poster id={v.id} className="transition-transform duration-500 group-hover:scale-[1.04]" />
                    <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink">
                      <Play size={13} className="translate-x-px" fill="currentColor" />
                    </span>
                  </div>
                  <span className="mt-2 block font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                    {formatDate(v.published)}
                  </span>
                  <span
                    lang="hi"
                    className="mt-1 line-clamp-2 block font-editorial text-[14px] leading-snug text-ink transition-colors group-hover:text-oxblood"
                  >
                    {v.title}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          <p className="mt-6 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
            {rest.length + 1} latest videos ·{' '}
            <a
              href={PROFILES.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood underline decoration-oxblood/30 underline-offset-4 hover:decoration-oxblood"
            >
              Watch them all on YouTube
            </a>
          </p>

          {/* Instagram */}
          <motion.a
            href={PROFILES.instagram}
            target="_blank"
            rel="noopener noreferrer"
            variants={pressReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="group mt-10 flex flex-wrap items-center justify-between gap-5 border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper sm:p-6"
          >
            <div className="min-w-0">
              <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-oxblood group-hover:text-vermilion">
                Instagram
              </span>
              <h3 className="mt-2 break-words font-display text-2xl font-black uppercase leading-[1] tracking-[-0.015em] sm:text-3xl">
                @pencil_in_a_box_
              </h3>
              <p className="mt-2 font-editorial text-[15px] italic leading-snug text-ink-mute group-hover:text-paper/80">
                AI devotional art in 4K, shared as short reels.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors group-hover:bg-paper group-hover:text-ink">
              Follow <ArrowUpRight size={13} />
            </span>
          </motion.a>
        </div>
      </div>
    </PressSection>
  );
};

export default Videos;
