import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useInViewOnce } from '../../hooks/useInViewOnce';

export const caseEase = [0.83, 0, 0.17, 1] as const;

export const caseReveal = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: caseEase },
  }),
};

interface CaseSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Alternate darker aged-paper tone, used to break up the rhythm between files */
  deep?: boolean;
}

/** One page in the file: manila ground, film grain, typewriter ink. */
export const CaseSection = ({ id, children, className = '', deep = false }: CaseSectionProps) => (
  <section id={id} className={cn('relative overflow-hidden', deep ? 'bg-paper-deep' : 'bg-paper', className)}>
    <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply" aria-hidden="true" />
    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">{children}</div>
  </section>
);

/**
 * A line of text hidden behind a black redaction bar that slides away once
 * the section scrolls into view — the signature "self-revealing" effect
 * this universe is built around. The text itself is always present in the
 * DOM (real content for SEO/AT); only the visual bar animates, and it's
 * skipped entirely under reduced motion.
 */
export const RedactedText = ({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLSpanElement>('-80px');

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      {children}
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute -inset-y-0.5 inset-x-0 bg-redaction"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: inView ? 0 : 1 }}
          style={{ transformOrigin: 'right' }}
          transition={{ duration: 0.65, delay, ease: caseEase }}
        />
      )}
    </span>
  );
};

interface SectionHeaderProps {
  /** e.g. "FILE 02 OF 08" */
  file: string;
  /** e.g. "STATUS: UNDER REVIEW" */
  status: string;
  headline: string;
  standfirst?: string;
}

/** Every page opens the same way: a case-number folio, then a redacted headline. */
export const SectionHeader = ({ file, status, headline, standfirst }: SectionHeaderProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink/70 pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
        <span>Case No. SN-2026 &middot; {file}</span>
        <span className="text-blood">{status}</span>
      </div>

      <h2 className="mt-6 font-display text-3xl uppercase leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
        <RedactedText>{headline}</RedactedText>
      </h2>

      {standfirst ? (
        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.5, ease: caseEase }}
          className="mt-5 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-mute sm:text-sm"
        >
          {standfirst}
        </motion.p>
      ) : null}
    </div>
  );
};

export const Tag = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span
    className={cn(
      'inline-block border border-ink/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute',
      className
    )}
  >
    {children}
  </span>
);

interface CaseButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

export const CaseButton = ({ children, onClick, href, variant = 'solid', className = '' }: CaseButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors';
  const look =
    variant === 'solid' ? 'bg-ink text-paper hover:bg-blood' : 'border-2 border-ink text-ink hover:border-blood hover:text-blood';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={cn(base, look, className)}>
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

/** A rotated rubber-stamp — "APPROVED" / "CLASSIFIED" — the one flourish worth a splash of red. */
export const Stamp = ({ label, className = '' }: { label: string; className?: string }) => (
  <span
    className={cn(
      'inline-flex rotate-[-6deg] items-center gap-1.5 border-4 border-blood px-3 py-1.5 font-display text-sm uppercase tracking-[0.15em] text-blood',
      className
    )}
  >
    {label}
  </span>
);
