import { motion } from 'framer-motion';
import type { Universe } from './universes';

/**
 * PortalTransition — the moment of travel.
 *
 * A circular wash of the destination universe's accent tears open from the
 * ENTER button and swallows the screen, with a white core a beat behind it.
 * Implemented as scale transforms on oversized circles rather than clip-path
 * animation — Framer can't interpolate `circle(...)` strings and snaps to
 * the end state (verified), while scale tweens reliably on the GPU.
 * When fully open, `onDone` fires and the browser departs for the universe.
 */
interface PortalTransitionProps {
  universe: Universe;
  origin: { x: number; y: number };
  onDone: () => void;
}

const PortalTransition = ({ universe, origin, onDone }: PortalTransitionProps) => {
  // radius reaching the farthest viewport corner from the origin
  const w = window.innerWidth;
  const h = window.innerHeight;
  const radius = Math.ceil(
    Math.max(
      Math.hypot(origin.x, origin.y),
      Math.hypot(w - origin.x, origin.y),
      Math.hypot(origin.x, h - origin.y),
      Math.hypot(w - origin.x, h - origin.y)
    )
  );

  const circleStyle = (background: string): React.CSSProperties => ({
    position: 'absolute',
    left: origin.x - radius,
    top: origin.y - radius,
    width: radius * 2,
    height: radius * 2,
    borderRadius: '50%',
    background,
  });

  return (
    <div className="fixed inset-0 z-[240] overflow-hidden" aria-hidden="true">
      {/* accent wash */}
      <motion.div
        style={circleStyle(`radial-gradient(circle, ${universe.accent} 0%, ${universe.accent} 55%, #05060a 100%)`)}
        initial={{ scale: 0 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 0.72, ease: [0.83, 0, 0.17, 1] }}
      />
      {/* white core, a beat behind */}
      <motion.div
        style={circleStyle('#EFEBDF')}
        initial={{ scale: 0 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 0.6, delay: 0.24, ease: [0.83, 0, 0.17, 1] }}
        onAnimationComplete={onDone}
      />
    </div>
  );
};

export default PortalTransition;
