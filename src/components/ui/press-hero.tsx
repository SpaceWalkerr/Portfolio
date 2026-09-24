import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ResumeModal } from '../ResumeModal';
import HalftonePortrait from './halftone-portrait';
import { useTilt3D } from '../../hooks/useTilt3D';
import { withBase } from '../../lib/utils';
import { CITY, CAREER_START_YEAR } from '../../data/site';

/**
 * PressHero — "The Press" front page.
 * Brutalist punch × Newspaper soul × Atelier polish.
 */

interface PressHeroProps {
  /** Gate the kinetic typesetting until the loading screen has lifted */
  introDone?: boolean;
}

const tickerItems = [
  'Available for Work',
  'Full-Stack & AI Engineer',
  'React · Node · TypeScript',
  'AI-Driven Products',
  `${CITY}, India`,
  'Class of 2027 — SRM IST',
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const ROMAN: [number, string][] = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const toRoman = (n: number) =>
  ROMAN.reduce((out, [v, r]) => {
    while (n >= v) {
      out += r;
      n -= v;
    }
    return out;
  }, '');

/** Today's edition: the real date, volume = years since the press started, number = day of the year. */
const todaysEdition = () => {
  const now = new Date();
  const start = Date.UTC(now.getFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - start) / 86_400_000);
  return {
    long: now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    short: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    folio: `Vol. ${toRoman(Math.max(1, now.getFullYear() - CAREER_START_YEAR + 1))} — No. ${day}`,
  };
};

const lineReveal = {
  hidden: { y: '115%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.95, delay: 0.15 + i * 0.16, ease: easeOutExpo },
  }),
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.5 + i * 0.12, ease: easeOutExpo },
  }),
};

const PressHero = ({ introDone = true }: PressHeroProps) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const state = introDone ? 'visible' : 'hidden';
  const tilt = useTilt3D({ max: 6 });
  const [edition] = useState(todaysEdition);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-paper text-ink"
    >
      {/* print grain over the whole page */}
      <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />

      <div className="flex flex-1 flex-col">
        <div className="flex w-full flex-1 flex-col px-5 pt-20 sm:px-8 lg:px-12">
        {/* ===== Masthead ===== */}
        <motion.header
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={state}
          className="flex items-baseline justify-between gap-4 border-b-4 border-double border-ink pb-3"
        >
          <span className="font-editorial text-lg italic sm:text-xl">The Nandan Review</span>
          <span className="hidden font-monopress text-[10px] uppercase tracking-[0.22em] text-ink-mute sm:block">
            A Portfolio, Set in Type
          </span>
        </motion.header>

        {/* ===== Folio strip ===== */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={state}
          className="grid grid-cols-2 border-b border-ink font-monopress text-[9px] uppercase tracking-[0.18em] text-ink-mute sm:grid-cols-3 sm:text-[10px]"
        >
          <time className="py-2 pr-3" dateTime={new Date().toISOString().slice(0, 10)}>
            <span className="sm:hidden">{edition.short}</span>
            <span className="hidden sm:inline">{edition.long}</span>
          </time>
          <span className="hidden border-l border-ink/20 py-2 px-3 text-center sm:block">
            {CITY} · India
          </span>
          <span className="border-l border-ink/20 py-2 pl-3 text-right">{edition.folio}</span>
        </motion.div>

        {/* ===== Front page ===== */}
        <div className="grid flex-1 gap-8 py-8 sm:py-10 lg:grid-cols-[1.55fr_1fr] lg:gap-0">
          {/* Left — the headline story */}
          <div className="flex flex-col justify-center lg:pr-10">
            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={state}
              className="mb-4 font-monopress text-[10px] uppercase tracking-[0.3em] text-oxblood sm:mb-6 sm:text-[11px]"
            >
              Late Edition — Est. {CAREER_START_YEAR}
            </motion.p>

            <h1
              aria-label="Suraj Nandan"
              className="isolate font-display font-black uppercase leading-[0.84] tracking-[-0.03em]"
            >
              <span aria-hidden="true" className="block overflow-hidden">
                <motion.span
                  variants={lineReveal}
                  custom={0}
                  initial="hidden"
                  animate={state}
                  className="block text-[19vw] lg:text-[11vw]"
                >
                  Suraj
                </motion.span>
              </span>
              <span aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={lineReveal}
                  custom={1}
                  initial="hidden"
                  animate={state}
                  className="block text-[19vw] lg:text-[11vw]"
                >
                  <span className="relative inline-block">
                    Nandan
                    <span
                      aria-hidden="true"
                      className="absolute -left-[0.04em] -right-[0.04em] bottom-[0.06em] -z-10 h-[0.16em] bg-vermilion"
                    />
                  </span>
                  <span className="ml-[0.18em] align-[0.5em] font-editorial text-[0.22em] font-normal normal-case italic tracking-normal text-ink-mute">
                    the developer
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Deck — editorial two-column standfirst */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={state}
              className="mt-6 gap-8 font-editorial text-[15px] leading-relaxed text-ink sm:columns-2 sm:text-base lg:mt-8"
            >
              <p className="text-justify">
                <span className="float-left pr-2 pt-1 font-editorial text-[3.2rem] font-bold leading-[0.65] text-oxblood">
                  B
                </span>
                uilding fast, reliable web applications and AI-driven products — with the
                polish of a design studio and the rigour of an engineer. Twenty-plus projects
                shipped and counting, across React, Node and TypeScript.
              </p>
              <p className="mt-4 text-justify sm:mt-0">
                Lately that means RAG pipelines and AI assistants in production, APIs
                serving 10,000+ requests a day, and payment flows that never double-charge.
                B.Tech CSE at SRM, class of 2027 — open to internships and full-time roles.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={state}
              className="mt-8 flex flex-wrap items-center gap-4 lg:mt-10"
            >
              <button
                type="button"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood"
              >
                Read the Work
                <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center border border-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                The Résumé
              </button>
            </motion.div>
          </div>

          {/* Right — the halftone plate */}
          <motion.aside
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={state}
            className="flex flex-col justify-center gap-3 lg:border-l lg:border-ink lg:pl-10"
          >
            {/* The plate tilts in 3D like a held print — only the plate, so the type stays still */}
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              style={{ perspective: 1200 }}
            >
              <motion.div
                style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
                className="relative aspect-[4/3.4] border border-ink bg-paper-bright sm:aspect-[1/1.02]"
              >
                <HalftonePortrait src={withBase('/profile.webp')} className="absolute inset-0 h-full w-full" />
              </motion.div>
            </div>
            <div className="flex items-baseline justify-between font-monopress text-[9px] uppercase tracking-[0.18em] text-ink-mute sm:text-[10px]">
              <span>Fig. 1</span>
              <span>The Developer — in live halftone</span>
            </div>
            <p className="border-t border-ink/20 pt-3 font-editorial text-[13px] italic leading-snug text-ink-mute">
              Move your cursor across the plate — the ink is printed in real time.
            </p>
          </motion.aside>
        </div>
        </div>
      </div>

      {/* ===== Running-headline ticker ===== */}
      <div className="relative z-0 w-full overflow-hidden border-t border-ink bg-ink text-paper">
        <div className="animate-press-marquee flex w-max whitespace-nowrap py-2.5 font-monopress text-[10px] uppercase tracking-[0.22em]">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1}>
              {tickerItems.map((item) => (
                <span key={item} className="px-5">
                  <span className="pr-5 text-vermilion">✦</span>
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export { PressHero };
