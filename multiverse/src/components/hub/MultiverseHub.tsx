import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { universes, OWNER_NAME, type Universe } from '../../data/universes'
import { MarineSnow } from './MarineSnow'
import { Creature } from './Creature'
import { CursorGlow } from './CursorGlow'
import { DiveTransition } from './DiveTransition'
import { SoundToggle } from '../intro/SoundToggle'

interface DiveState {
  universe: Universe
  origin: { x: number; y: number }
}

export function MultiverseHub() {
  const [dive, setDive] = useState<DiveState | null>(null)

  const navigate = () => {
    if (!dive) return
    // Each portfolio is its own app — full navigation, not a client route.
    window.location.href = dive.universe.url
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="hub-cursor-zone relative h-full overflow-hidden bg-void"
    >
      {/*
        Ambient environment layer.
        TODO: replace with generated asset — the deep-ocean loop video
        (H.264 + VP9/AV1 pair, poster fallback, muted loop playsinline) goes
        here; this gradient stands in until the render is dropped into
        /public/assets/creatures/environment-loop.*
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 110%, #060B18 0%, #030509 60%), radial-gradient(60% 40% at 70% 0%, #060B1866 0%, transparent 70%)',
        }}
      />

      <MarineSnow />

      {/* header */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 md:p-8">
        <div>
          <h1 className="font-display text-2xl tracking-tight text-jellyfish md:text-3xl">
            {OWNER_NAME}
          </h1>
          <p className="mt-1 text-[11px] tracking-[0.3em] text-snow/70 uppercase">
            The Multiverse — choose a universe
          </p>
        </div>
        <Link
          to="/about"
          className="pointer-events-auto rounded-full border border-snow/25 px-4 py-2 text-xs tracking-[0.2em] text-snow uppercase transition-colors duration-200 hover:border-snow/60 hover:text-jellyfish"
        >
          Behind the code
        </Link>
      </header>

      {/* the 8 roaming creatures */}
      {universes.map((u) => (
        <Creature
          key={u.id}
          universe={u}
          onDive={(universe, origin) => setDive({ universe, origin })}
        />
      ))}

      <SoundToggle />
      <CursorGlow />

      {dive && (
        <DiveTransition
          universe={dive.universe}
          origin={dive.origin}
          onComplete={navigate}
        />
      )}
    </motion.main>
  )
}
