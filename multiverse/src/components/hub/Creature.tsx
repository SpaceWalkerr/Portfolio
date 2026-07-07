import { useEffect, useMemo, useRef, useState } from 'react'
import type { Universe } from '../../data/universes'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CreatureArt } from './creatures/CreatureArt'

interface CreatureProps {
  universe: Universe
  onDive: (u: Universe, origin: { x: number; y: number }) => void
}

/**
 * One roaming bioluminescent creature.
 *
 * Roam: a Lissajous wander confined to the universe's zone, period randomized
 * per creature (8–14s) so none sync up. Driven by rAF writing transforms to a
 * ref — no React re-renders per frame.
 *
 * Hover/focus: brightens in 220ms (ease-out-expo), movement eases to ~35%
 * speed, label reveals after 80ms.
 */
export function Creature({ universe: u, onDive }: CreatureProps) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const speedRef = useRef(1)
  const activeRef = useRef(false)

  // Random phase offsets + slightly detuned axis frequencies make each path unique.
  const path = useMemo(
    () => ({
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      fx: 0.9 + Math.random() * 0.25,
      fy: 0.65 + Math.random() * 0.25,
    }),
    [],
  )

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || reduced) return
    let raf = 0
    let t = Math.random() * 1000
    let last = performance.now()
    const omega = (Math.PI * 2) / u.roamDuration

    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      // ease speed toward 0.35 while hovered/focused, back to 1 otherwise
      const targetSpeed = activeRef.current ? 0.35 : 1
      speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 4)
      t += dt * speedRef.current

      const dx = Math.sin(t * omega * path.fx + path.px) * u.zone.rx
      const dy = Math.sin(t * omega * path.fy + path.py) * u.zone.ry
      el.style.transform = `translate(${dx}vw, ${dy}vh)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [u, path, reduced])

  const dive = () => {
    const rect = btnRef.current?.getBoundingClientRect()
    onDive(u, {
      x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
      y: rect ? rect.top + rect.height / 2 : window.innerHeight / 2,
    })
  }

  return (
    <div
      className="absolute"
      style={{ left: `${u.zone.x}%`, top: `${u.zone.y}%` }}
    >
      <div ref={wrapRef}>
        <button
          ref={btnRef}
          aria-label={`${u.creature} — enter the ${u.name} portfolio`}
          onClick={dive}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          className="group relative -translate-x-1/2 -translate-y-1/2 rounded-full p-6"
        >
          <CreatureBody universe={u} active={active} />

          {/* Label — 180ms reveal, 80ms delay, ease-out-expo */}
          <span
            className={`pointer-events-none absolute top-full left-1/2 mt-3 w-56 -translate-x-1/2 text-center transition-opacity duration-[180ms] delay-[80ms] group-hover:opacity-100 group-focus-visible:opacity-100 ${active ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
          >
            <span className="font-display block text-lg text-jellyfish">
              {u.name}
            </span>
            <span className="mt-1 block text-[11px] leading-snug tracking-wide text-snow/80">
              {u.tagline}
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}

/**
 * Creature body. When a generated photoreal asset exists it renders that
 * cutout; otherwise it renders the hand-animated SVG art (CreatureArt).
 */
function CreatureBody({ universe: u, active }: { universe: Universe; active: boolean }) {
  if (u.asset) {
    return (
      <span className="relative block h-24 w-24 md:h-28 md:w-28">
        <span
          aria-hidden="true"
          className="absolute inset-0 scale-150 rounded-full"
          style={{
            background: `radial-gradient(circle, ${u.core}55 0%, transparent 70%)`,
            filter: 'blur(16px)',
            opacity: active ? 1 : 0.55,
            transition: 'opacity 220ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        <img
          src={u.asset}
          alt=""
          className="relative h-full w-full object-contain"
          style={{
            filter: `brightness(${active ? 1.15 : 0.85})`,
            transition: 'filter 220ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </span>
    )
  }
  return <CreatureArt universe={u} active={active} />
}
