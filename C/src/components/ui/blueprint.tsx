import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/**
 * Shared primitives for the Blueprint / Patent design system.
 * Every section composes these so the whole site reads as one
 * continuous patent binder — same title-block, same folio treatment.
 */

export const draftEase = [0.16, 1, 0.3, 1] as const;

export const draftReveal = {
  hidden: { y: 22, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: draftEase },
  }),
};

interface BlueprintSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Alternate darker cyanotype tone, used to break up the rhythm between sheets */
  deep?: boolean;
}

/** One sheet of the binder: cyanotype ground, drafting grid, ink linework. */
export const BlueprintSection = ({ id, children, className = '', deep = false }: BlueprintSectionProps) => (
  <section id={id} className={cn('relative overflow-hidden', deep ? 'draft-grid-deep' : 'draft-grid', className)}>
    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">{children}</div>
  </section>
);

/* ── Title-block choreography ── */
const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const ruleDraw = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.6, ease: draftEase } } };
const rowFade = { hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: draftEase } } };
const headlineReveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: draftEase } } };
const standfirstReveal = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: draftEase } } };
/* Reduced-motion stand-in: a plain, short fade — no slide, no staged draw. */
const stillReveal = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } };

interface SheetHeaderProps {
  /** e.g. 2 */
  sheetNo: number;
  /** e.g. 8 */
  sheetTotal: number;
  /** e.g. "FIG. 2" */
  fig: string;
  /** e.g. "SEC. B — SPECIFICATION" */
  sectionRef: string;
  headline: string;
  standfirst?: string;
}

/** The folio + title block every sheet in the binder opens with. */
export const SheetHeader = ({ sheetNo, sheetTotal, fig, sectionRef, headline, standfirst }: SheetHeaderProps) => {
  const reduceMotion = useReducedMotion();
  const rule = reduceMotion ? stillReveal : ruleDraw;
  const row = reduceMotion ? stillReveal : rowFade;
  const heading = reduceMotion ? stillReveal : headlineReveal;
  const deck = reduceMotion ? stillReveal : standfirstReveal;

  return (
    <motion.header
      variants={headerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-12 sm:mb-16"
    >
      <motion.div variants={rule} style={{ transformOrigin: 'left' }} className="border-t-2 border-ink/70" />
      <motion.div
        variants={row}
        className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-pale"
      >
        <span>
          Patent No. SN-2026 &middot; Sheet {sheetNo} of {sheetTotal}
        </span>
        <span className="text-brass">{fig}</span>
      </motion.div>
      <motion.div variants={rule} style={{ transformOrigin: 'left' }} className="border-t border-ink/40" />

      <motion.div variants={row} className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
        {sectionRef}
      </motion.div>
      <motion.h2
        variants={heading}
        className="mt-3 font-sans text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl"
      >
        {headline}
      </motion.h2>

      <DraftDivider />

      {standfirst ? (
        <motion.p variants={deck} className="mt-5 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-mute sm:text-sm">
          {standfirst}
        </motion.p>
      ) : null}
    </motion.header>
  );
};

/**
 * A drafting dimension-line: a stroke that draws itself in (real
 * stroke-dasharray/dashoffset via framer's `pathLength`) with endpoint
 * ticks, the way a dimension line is capped on a technical drawing.
 */
export const DraftDivider = ({ className = '' }: { className?: string }) => {
  const reduceMotion = useReducedMotion();
  return (
    <svg
      viewBox="0 0 400 12"
      preserveAspectRatio="none"
      className={cn('mt-4 h-3 w-full max-w-[220px]', className)}
      aria-hidden="true"
    >
      <motion.path
        d="M2 6 H398"
        fill="none"
        stroke="#c9a24a"
        strokeWidth="2"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: draftEase }}
      />
      <motion.circle
        cx="2"
        cy="6"
        r="3"
        fill="#c9a24a"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: reduceMotion ? 0 : 0.05 }}
      />
      <motion.circle
        cx="398"
        cy="6"
        r="3"
        fill="#c9a24a"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: reduceMotion ? 0 : 0.7 }}
      />
    </svg>
  );
};

interface DraftTagProps {
  children: ReactNode;
  className?: string;
}

/** Mono bordered tag — used for tech-stack chips and category labels. */
export const DraftTag = ({ children, className = '' }: DraftTagProps) => (
  <span
    className={cn(
      'inline-block border border-ink/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute',
      className
    )}
  >
    {children}
  </span>
);

interface DraftButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

/** Ink-fill / outline button in the house style. */
export const DraftButton = ({ children, onClick, href, variant = 'solid', className = '' }: DraftButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors';
  const look =
    variant === 'solid'
      ? 'bg-ink text-blueprint-deep hover:bg-brass'
      : 'border border-ink text-ink hover:border-brass hover:text-brass';

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={cn(base, look, className)}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cn(base, look, className)}>
      {children}
    </button>
  );
};

/** A little "APPROVED"-style rubber stamp — the one place brass gets to shine. */
export const ApprovalStamp = ({ label, className = '' }: { label: string; className?: string }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rotate-[-3deg] border-2 border-brass px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brass',
      className
    )}
  >
    {label}
  </span>
);
