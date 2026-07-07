import { motion, useMotionTemplate } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useTilt3D } from '../hooks/useTilt3D';
import { sound } from './sound';
import type { Universe } from './universes';
import NewspaperPreview from './previews/NewspaperPreview';
import TerminalPreview from './previews/TerminalPreview';
import GlassPreview from './previews/GlassPreview';
import BlueprintPreview from './previews/BlueprintPreview';
import CaseFilePreview from './previews/CaseFilePreview';
import FieldGuidePreview from './previews/FieldGuidePreview';
import MissionControlPreview from './previews/MissionControlPreview';
import ArcadeCabinetPreview from './previews/ArcadeCabinetPreview';

const PREVIEWS: Record<string, React.ComponentType> = {
  newspaper: NewspaperPreview,
  terminal: TerminalPreview,
  glass: GlassPreview,
  blueprint: BlueprintPreview,
  'case-file': CaseFilePreview,
  'field-guide': FieldGuidePreview,
  'mission-control': MissionControlPreview,
  arcade: ArcadeCabinetPreview,
};

interface PortalCardProps {
  universe: Universe;
  index: number;
  onEnter: (universe: Universe, origin: { x: number; y: number }) => void;
}

const cardReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const PortalCard = ({ universe, index, onEnter }: PortalCardProps) => {
  const tilt = useTilt3D({ max: 6, glare: true });
  const [denied, setDenied] = useState(0);
  const Preview = PREVIEWS[universe.id];

  const enterable = universe.status === 'live' && universe.href !== '';

  const chip =
    universe.status === 'soon'
      ? { label: 'Reality Forming', cls: 'border-dashed border-paper/30 text-paper/50' }
      : enterable
        ? { label: 'Reality Online', cls: 'border-paper/30 text-paper/80' }
        : { label: 'Awaiting Link', cls: 'border-paper/25 text-paper/45' };

  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (enterable) {
      const rect = e.currentTarget.getBoundingClientRect();
      sound.play('portal-open');
      onEnter(universe, { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
    } else {
      sound.play('reality-denied');
      setDenied((d) => d + 1); // re-keys the shake animation
    }
  };

  return (
    <motion.article
      ref={tilt.ref}
      variants={cardReveal}
      custom={index}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onMouseEnter={() => sound.play('portal-hover')}
      style={{ transformPerspective: 1100, rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-paper/10 bg-white/[0.03] transition-colors duration-300 hover:border-paper/25"
    >
      {/* accent aura that blooms on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(45% 45% at 50% 30%, ${universe.accentSoft}, transparent 70%)` }}
      />
      {/* cursor glare */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: tilt.glareOpacity,
          background: useMotionTemplate`radial-gradient(260px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.9), transparent 70%)`,
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-paper/10">
        <Preview />
      </div>

      <div className="relative flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between">
          <span className="font-monopress text-[10px] tracking-[0.3em]" style={{ color: universe.accent }}>
            {universe.index}
          </span>
          <span
            className={`border px-2 py-0.5 font-monopress text-[8px] uppercase tracking-[0.18em] ${chip.cls}`}
          >
            {chip.label}
          </span>
        </div>

        <h2 className="font-display text-xl font-black uppercase tracking-[-0.01em] text-paper">
          {universe.name}
        </h2>
        <p className="font-monopress text-[9px] uppercase tracking-[0.22em] text-paper/45">{universe.theme}</p>
        <p className="font-editorial text-[13.5px] italic leading-snug text-paper/70">{universe.tagline}</p>

        <motion.button
          key={denied}
          type="button"
          data-cursor="hover"
          onClick={handleEnter}
          animate={denied ? { x: [0, -7, 7, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          aria-disabled={!enterable}
          className={`mt-3 inline-flex items-center justify-center gap-2 self-start px-5 py-2.5 font-monopress text-[10px] uppercase tracking-[0.2em] transition-all ${
            enterable
              ? 'bg-paper text-ink hover:gap-3'
              : universe.status === 'soon'
                ? 'cursor-not-allowed border border-dashed border-paper/25 text-paper/40'
                : 'cursor-not-allowed border border-paper/20 text-paper/45'
          }`}
          style={enterable ? { boxShadow: `0 0 24px ${universe.accentSoft}` } : undefined}
        >
          {enterable ? (
            <>
              Enter Reality
              <ArrowUpRight className="h-3.5 w-3.5" />
            </>
          ) : universe.status === 'soon' ? (
            <>
              <Lock className="h-3 w-3" />
              In Development
            </>
          ) : (
            <>
              <Lock className="h-3 w-3" />
              Link Pending
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
};

export default PortalCard;
