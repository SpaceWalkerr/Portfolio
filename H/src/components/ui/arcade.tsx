import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const arcadeEase = [0.16, 1, 0.3, 1] as const;

export const arcadeReveal = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, delay: i * 0.07, ease: arcadeEase },
  }),
};

interface ArcadeSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  deep?: boolean;
}

/** One screen of the cabinet: void ground, faint pixel grid. */
export const ArcadeSection = ({ id, children, className = '', deep = false }: ArcadeSectionProps) => (
  <section id={id} className={cn('relative overflow-hidden', deep ? 'bg-void-bright' : 'bg-void', className)}>
    <div className="pixel-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">{children}</div>
  </section>
);

interface SectionHeaderProps {
  /** e.g. "WORLD 1-2" */
  world: string;
  status: string;
  headline: string;
  standfirst?: string;
}

export const SectionHeader = ({ world, status, headline, standfirst }: SectionHeaderProps) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-4 border-ink/80 pb-3 font-display text-[10px] uppercase text-ink-mute">
        <span>{world}</span>
        <span className="text-gold">{status}</span>
      </div>

      <motion.h2
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.4, ease: arcadeEase }}
        className="mt-6 font-display text-xl leading-relaxed text-ink sm:text-3xl lg:text-4xl"
        style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}
      >
        {headline}
      </motion.h2>

      {standfirst ? (
        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.3, ease: arcadeEase }}
          className="mt-5 max-w-2xl font-mono text-lg leading-relaxed text-ink-mute"
        >
          {standfirst}
        </motion.p>
      ) : null}
    </div>
  );
};

export const Tag = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={cn('inline-block border-2 border-cyan/50 px-2.5 py-1 font-mono text-sm uppercase text-cyan', className)}>{children}</span>
);

interface ArcadeButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

/** A chunky pixel button — hard drop-shadow that "presses" flat on click. */
export const ArcadeButton = ({ children, onClick, href, variant = 'solid', className = '' }: ArcadeButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-2 border-2 px-5 py-3 font-display text-[11px] uppercase transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none';
  const look =
    variant === 'solid'
      ? 'border-ink bg-gold text-void-deep shadow-[4px_4px_0_rgba(0,0,0,0.6)] hover:bg-gold-bright'
      : 'border-ink bg-void text-ink shadow-[4px_4px_0_rgba(0,0,0,0.6)] hover:border-gold hover:text-gold';

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

/** A chunky quantized XP bar — fills in discrete blocks, not a smooth gradient. */
export const XPBar = ({ level, segments = 10 }: { level: number; segments?: number }) => {
  const filled = Math.round((level / 100) * segments);
  return (
    <div className="flex gap-[3px]" role="img" aria-label={`${level}% proficiency`}>
      {Array.from({ length: segments }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, delay: i * 0.04 }}
          className={cn('h-3 flex-1 border border-void-deep', i < filled ? 'bg-gold' : 'bg-white/10')}
          style={{ transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
};
