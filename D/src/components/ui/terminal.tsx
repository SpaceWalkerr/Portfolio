import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useTypewriter } from '../../hooks/useTypewriter';

export const neonEase = [0.16, 1, 0.3, 1] as const;

export const neonReveal = {
  hidden: { y: 22, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: neonEase },
  }),
};

interface TerminalSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Alternate darker void tone, used to break up the rhythm between screens */
  deep?: boolean;
}

/** One screen of the cockpit: void ground, scanlines, vignette. */
export const TerminalSection = ({ id, children, className = '', deep = false }: TerminalSectionProps) => (
  <section id={id} className={cn('relative overflow-hidden', deep ? 'bg-void-bright' : 'bg-void', className)}>
    <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden="true" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_45%,rgba(5,2,8,0.65))]" aria-hidden="true" />
    <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">{children}</div>
  </section>
);

interface SectionHeaderProps {
  /** e.g. "cd ./about && cat README.md" */
  command: string;
  headline: string;
  standfirst?: string;
}

/** Every screen opens the same way: a typed command, then a glitch-in neon headline. */
export const SectionHeader = ({ command, headline, standfirst }: SectionHeaderProps) => {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>('-80px');
  const { lines, done } = useTypewriter({ lines: [command], active: inView, typeMs: 26 });

  return (
    <div ref={ref} className="mb-12 sm:mb-16">
      <div className="flex items-center gap-2 font-mono text-[13px] text-neon-cyan-bright sm:text-sm">
        <span className="text-neon-pink">user@suraj</span>
        <span className="text-ink-mute">:~$</span>
        <span>{lines[0]}</span>
        {!done && !reduceMotion && <span className="h-4 w-2 animate-terminal-caret bg-neon-cyan-bright" aria-hidden="true" />}
      </div>

      <motion.h2
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.35, ease: neonEase }}
        className="neon-text-glow mt-4 font-display text-3xl font-black uppercase leading-[1.05] tracking-wide text-ink sm:text-5xl lg:text-6xl"
      >
        {headline}
      </motion.h2>

      {standfirst ? (
        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.5, ease: neonEase }}
          className="mt-4 max-w-2xl font-mono text-[13px] leading-relaxed text-ink-mute sm:text-sm"
        >
          {standfirst}
        </motion.p>
      ) : null}
    </div>
  );
};

interface NeonTagProps {
  children: ReactNode;
  className?: string;
}

/** Bordered mono tag — used for tech-stack chips and flags. */
export const NeonTag = ({ children, className = '' }: NeonTagProps) => (
  <span
    className={cn(
      'inline-block border border-neon-cyan/30 bg-neon-cyan/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-neon-cyan-bright',
      className
    )}
  >
    {children}
  </span>
);

interface TermButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

/** `[ RUN_COMMAND ]` bracket button in the house style. */
export const TermButton = ({ children, onClick, href, variant = 'solid', className = '' }: TermButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200';
  const look =
    variant === 'solid'
      ? 'bg-neon-pink/90 text-void shadow-[0_0_18px_rgba(255,94,168,0.45)] hover:bg-neon-pink hover:shadow-[0_0_26px_rgba(255,94,168,0.7)]'
      : 'border border-neon-cyan/50 text-neon-cyan-bright hover:border-neon-cyan hover:shadow-[0_0_18px_rgba(94,236,255,0.35)]';

  const content = (
    <>
      <span className="opacity-60">[</span>
      {children}
      <span className="opacity-60">]</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={cn(base, look, className)}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cn(base, look, className)}>
      {content}
    </button>
  );
};

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/** A terminal window frame — traffic-light dots + a title bar path. */
export const TerminalWindow = ({ title, children, className = '' }: TerminalWindowProps) => (
  <div className={cn('border border-neon-cyan/25 bg-void-deep/80 shadow-[0_0_30px_rgba(94,236,255,0.08)]', className)}>
    <div className="flex items-center gap-2 border-b border-neon-cyan/20 bg-white/[0.02] px-3.5 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">{title}</span>
    </div>
    <div className="p-4 sm:p-5">{children}</div>
  </div>
);
