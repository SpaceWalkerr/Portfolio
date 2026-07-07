import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useCountUp } from '../../hooks/useCountUp';

export const missionEase = [0.16, 1, 0.3, 1] as const;

export const missionReveal = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: missionEase },
  }),
};

interface MissionSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  deep?: boolean;
}

/** One panel of the console: void ground, faint starfield. */
export const MissionSection = ({ id, children, className = '', deep = false }: MissionSectionProps) => (
  <section id={id} className={cn('relative overflow-hidden', deep ? 'bg-void-bright' : 'bg-void', className)}>
    <div className="starfield pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">{children}</div>
  </section>
);

interface SectionHeaderProps {
  /** e.g. "MISSION LOG 02" */
  log: string;
  status: string;
  headline: string;
  standfirst?: string;
}

export const SectionHeader = ({ log, status, headline, standfirst }: SectionHeaderProps) => {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>('-80px');

  return (
    <div ref={ref} className="mb-12 sm:mb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/25 pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
        <span>{log}</span>
        <span className="text-amber">{status}</span>
      </div>

      <div className="relative mt-6 overflow-hidden">
        <motion.h2
          initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: missionEase }}
          className="font-display text-2xl leading-tight text-ink sm:text-4xl lg:text-5xl"
        >
          {headline}
        </motion.h2>
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 bg-void"
            initial={{ width: '100%' }}
            animate={inView ? { width: '0%' } : { width: '100%' }}
            transition={{ duration: 0.7, ease: missionEase }}
          />
        )}
      </div>

      {standfirst ? (
        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.5, ease: missionEase }}
          className="mt-5 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-mute sm:text-sm"
        >
          {standfirst}
        </motion.p>
      ) : null}
    </div>
  );
};

export const Tag = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={cn('inline-block border border-ink/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute', className)}>
    {children}
  </span>
);

interface MissionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

export const MissionButton = ({ children, onClick, href, variant = 'solid', className = '' }: MissionButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200';
  const look =
    variant === 'solid'
      ? 'bg-amber text-void-deep shadow-[0_0_16px_rgba(255,176,32,0.4)] hover:shadow-[0_0_24px_rgba(255,176,32,0.65)]'
      : 'border border-ink/40 text-ink hover:border-amber hover:text-amber';

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

/** A telemetry counter — ticks up from 0 to its target once the panel is in view. */
export const Readout = ({ target, suffix = '', label, active }: { target: number; suffix?: string; label: string; active: boolean }) => {
  const value = useCountUp({ target, active });
  return (
    <div>
      <dt className="font-display text-2xl text-ink sm:text-3xl">
        {value}
        {suffix}
      </dt>
      <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">{label}</dd>
    </div>
  );
};
