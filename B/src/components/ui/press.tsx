import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Shared primitives for "The Press" design system.
 * Every section of the paper composes these so the whole site
 * reads as one continuous broadsheet.
 */

export const pressEase = [0.16, 1, 0.3, 1] as const;

export const pressReveal = {
  hidden: { y: 28, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, delay: i * 0.1, ease: pressEase },
  }),
};

/* ── Masthead choreography: the press stamping a new page down ── */
const mastheadContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const ruleDraw = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: pressEase } },
};
const rowFade = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: pressEase } },
};
const headlineReveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: pressEase } },
};
const standfirstReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: pressEase } },
};
/* Reduced-motion stand-in: a plain, short fade — no draw, blur, or blur-focus. */
const stillReveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

interface PressSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/** A page of the paper: paper ground, ink type, print grain. */
export const PressSection = ({ id, children, className = '' }: PressSectionProps) => (
  <section id={id} className={`relative overflow-hidden bg-paper text-ink ${className}`}>
    <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      {children}
    </div>
  </section>
);

interface SectionMastheadProps {
  /** e.g. "Section A" */
  section: string;
  /** e.g. "The Profile" */
  name: string;
  /** The big display headline */
  headline: string;
  /** Optional serif standfirst under the headline */
  standfirst?: string;
}

/** The newspaper section header: double rule, folio line, colossal headline. */
export const SectionMasthead = ({ section, name, headline, standfirst }: SectionMastheadProps) => {
  const reduceMotion = useReducedMotion();
  const rule = reduceMotion ? stillReveal : ruleDraw;
  const row = reduceMotion ? stillReveal : rowFade;
  const heading = reduceMotion ? stillReveal : headlineReveal;
  const deck = reduceMotion ? stillReveal : standfirstReveal;

  return (
    <motion.header
      variants={mastheadContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-12 sm:mb-16"
    >
      <motion.div
        variants={rule}
        style={{ transformOrigin: 'left' }}
        className="border-t-4 border-double border-ink"
      />
      <motion.div
        variants={row}
        className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute"
      >
        <span className="text-oxblood">{section}</span>
        <span>{name}</span>
      </motion.div>
      <motion.div variants={rule} style={{ transformOrigin: 'left' }} className="border-t border-ink" />
      <motion.h2
        variants={heading}
        className="mt-6 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:mt-8 sm:text-6xl lg:text-7xl"
      >
        {headline}
      </motion.h2>
      {standfirst ? (
        <motion.p
          variants={deck}
          className="mt-4 max-w-2xl font-editorial text-base italic text-ink-mute sm:text-lg"
        >
          {standfirst}
        </motion.p>
      ) : null}
    </motion.header>
  );
};

interface PressTagProps {
  children: ReactNode;
  className?: string;
}

/** Mono bordered tag — replaces every glowing pill chip in the old design. */
export const PressTag = ({ children, className = '' }: PressTagProps) => (
  <span
    className={`inline-block border border-ink/35 px-2.5 py-1 font-monopress text-[10px] uppercase tracking-[0.12em] text-ink-mute ${className}`}
  >
    {children}
  </span>
);

interface PressButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

/** Ink slab / outline button in the house style. */
export const PressButton = ({
  children,
  onClick,
  href,
  variant = 'solid',
  className = '',
}: PressButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-3 font-monopress text-[11px] uppercase tracking-[0.16em] transition-colors';
  const look =
    variant === 'solid'
      ? 'bg-ink text-paper hover:bg-oxblood'
      : 'border border-ink text-ink hover:bg-ink hover:text-paper';

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`${base} ${look} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${look} ${className}`}>
      {children}
    </button>
  );
};
