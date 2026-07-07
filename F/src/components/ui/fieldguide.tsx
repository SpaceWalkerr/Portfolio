import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const fieldEase = [0.22, 1, 0.36, 1] as const;

export const fieldReveal = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.09, ease: fieldEase },
  }),
};

interface FieldSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  deep?: boolean;
}

/** One page of the journal: parchment ground, faint paper grain. */
export const FieldSection = ({ id, children, className = '', deep = false }: FieldSectionProps) => (
  <section id={id} className={cn('relative overflow-hidden', deep ? 'bg-paper-deep' : 'bg-paper', className)}>
    <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-multiply" aria-hidden="true" />
    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">{children}</div>
  </section>
);

/** Text that blooms in like ink soaking into paper — this universe's signature reveal. */
export const InkBloom = ({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, filter: 'blur(9px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 1, delay, ease: fieldEase }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  );
};

interface SectionHeaderProps {
  /** e.g. "Plate No. 2" */
  plate: string;
  /** e.g. "Collected: Chennai, 2023–" */
  collected: string;
  headline: string;
  standfirst?: string;
}

export const SectionHeader = ({ plate, collected, headline, standfirst }: SectionHeaderProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/50 pb-2 font-serif text-[12px] uppercase tracking-[0.14em] text-ink-mute">
        <span>{plate}</span>
        <span className="text-forest">{collected}</span>
      </div>

      <h2 className="mt-6 font-display text-3xl italic leading-tight text-ink sm:text-5xl lg:text-6xl">
        <InkBloom>{headline}</InkBloom>
      </h2>

      {standfirst ? (
        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.5, ease: fieldEase }}
          className="mt-5 max-w-2xl font-serif text-base italic leading-relaxed text-ink-mute"
        >
          {standfirst}
        </motion.p>
      ) : null}
    </div>
  );
};

export const Tag = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={cn('inline-block border border-ink/35 px-2.5 py-1 font-serif text-[11px] uppercase tracking-[0.08em] text-ink-mute', className)}>
    {children}
  </span>
);

interface FieldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

export const FieldButton = ({ children, onClick, href, variant = 'solid', className = '' }: FieldButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 font-serif text-[13px] uppercase tracking-[0.1em] transition-colors';
  const look = variant === 'solid' ? 'bg-ink text-paper hover:bg-forest' : 'border border-ink text-ink hover:border-forest hover:text-forest';

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

/** A handwritten field-note annotation, in the one script face this universe permits. */
export const HandLabel = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={cn('font-hand text-lg text-forest', className)}>{children}</span>
);
