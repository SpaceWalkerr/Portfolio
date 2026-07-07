import { motion } from 'framer-motion'
import type { Universe } from '../../data/universes'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface DiveProps {
  universe: Universe
  origin: { x: number; y: number }
  onComplete: () => void
}

/**
 * Dive transition (spec: 900–1200ms, cubic-bezier(0.83,0,0.17,1)):
 * the chosen creature's glow expands from its position to fill the viewport
 * while the rest of the screen darkens, then navigation fires.
 */
export function DiveTransition({ universe: u, origin, onComplete }: DiveProps) {
  const reduced = useReducedMotion()
  // radius that guarantees full viewport coverage from the origin point
  const r = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  )

  if (reduced) {
    return (
      <motion.div
        className="fixed inset-0 z-40 bg-void"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        onAnimationComplete={onComplete}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-40" aria-hidden="true">
      {/* screen darkens */}
      <motion.div
        className="absolute inset-0 bg-void"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
      />
      {/* glow expands to fill the viewport */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: origin.x,
          top: origin.y,
          width: r * 2,
          height: r * 2,
          x: '-50%',
          y: '-50%',
          background: `radial-gradient(circle, ${u.core} 0%, ${u.core}CC 35%, ${u.dim} 78%, var(--color-void) 100%)`,
        }}
        initial={{ scale: 0.02, opacity: 0.9 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 1.05, ease: [0.83, 0, 0.17, 1] }}
        onAnimationComplete={onComplete}
      />
    </div>
  )
}
