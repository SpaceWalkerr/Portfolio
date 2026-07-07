import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MarineSnow } from '../hub/MarineSnow'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { universes, OWNER_NAME, TAGLINE } from '../../data/universes'
import { SoundToggle } from './SoundToggle'

const SKIP_KEY = 'multiverse-intro-skipped'

export function wasIntroSkipped(): boolean {
  return sessionStorage.getItem(SKIP_KEY) === '1'
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as const
const EASE_DIVE = [0.83, 0, 0.17, 1] as const

/**
 * Storyboard (spec-exact):
 *  0.0–0.8s  black/deep-navy, faint marine snow begins
 *  0.8–2.6s  point of light ignites → name unfurls letter-by-letter
 *  2.6–3.6s  8 creature silhouettes streak past, glow shifting per universe
 *  3.6–4.8s  hero portrait resolves, backlit
 *  4.8–5.6s  tagline settles beneath name
 *  5.6–6.5s  dive to black → hub fades up (handled by parent on `onDone`)
 */
export function Cinematic({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [elapsed, setElapsed] = useState(0)
  const [portraitFailed, setPortraitFailed] = useState(false)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    // Persist for the session whether skipped or watched to the end, so the
    // round-trip back from a portfolio never forces a replay.
    sessionStorage.setItem(SKIP_KEY, '1')
    onDone()
  }

  useEffect(() => {
    if (reduced) {
      // Reduced motion: static fade-in of name + portrait (~400ms), then hold
      // briefly so it reads, then continue.
      const t = window.setTimeout(() => finish(), 1600)
      return () => window.clearTimeout(t)
    }
    const start = performance.now()
    let raf = 0
    const tick = () => {
      const s = (performance.now() - start) / 1000
      setElapsed(s)
      if (s >= 6.5) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  const letters = OWNER_NAME.split('')

  if (reduced) {
    return (
      <div className="relative flex h-full flex-col items-center justify-center gap-6 bg-void">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <Portrait failed={portraitFailed} onFail={() => setPortraitFailed(true)} />
          <h1 className="font-display text-5xl font-light tracking-tight text-jellyfish">
            {OWNER_NAME}
          </h1>
          <p className="text-sm tracking-[0.2em] text-snow uppercase">{TAGLINE}</p>
        </motion.div>
      </div>
    )
  }

  const diving = elapsed >= 5.6

  return (
    <div className="relative h-full overflow-hidden bg-void">
      <MarineSnow density={0.5} />

      {/* Beat 2 — 0.8s: light ignites and unfurls into the name */}
      {elapsed >= 0.8 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* the igniting point of light */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: [0, 1, 0.35], scale: [0.1, 1.6, 1] }}
            transition={{ duration: 1.2, ease: EASE_EXPO }}
            className="absolute h-40 w-40 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(234,246,255,0.5) 0%, rgba(234,246,255,0.08) 45%, transparent 70%)',
              filter: 'blur(6px)',
            }}
          />
          <h1
            aria-label={OWNER_NAME}
            className="font-display relative text-5xl font-light tracking-tight text-jellyfish md:text-7xl"
          >
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  // ~1800ms total: per-letter reveal staggered ~40ms
                  duration: 1.1,
                  delay: i * 0.04,
                  ease: EASE_EXPO,
                }}
                className="inline-block"
                style={{
                  textShadow:
                    '0 0 24px rgba(234,246,255,0.45), 0 0 64px rgba(58,160,255,0.25)',
                  whiteSpace: ch === ' ' ? 'pre' : undefined,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          {/* Beat 5 — 4.8s: tagline settles in beneath the name */}
          {elapsed >= 4.8 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
              className="mt-6 text-xs tracking-[0.3em] text-snow uppercase md:text-sm"
            >
              {TAGLINE}
            </motion.p>
          )}
        </div>
      )}

      {/* Beat 3 — 2.6–3.6s: creature silhouettes streak past the background */}
      {elapsed >= 2.6 && elapsed < 4.0 && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {universes.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ x: '-18vw', opacity: 0 }}
              animate={{ x: '118vw', opacity: [0, 0.7, 0] }}
              transition={{
                duration: 0.55,
                delay: (i % 8) * 0.11,
                ease: 'easeIn',
              }}
              className="absolute h-10 w-36 rounded-full"
              style={{
                top: `${12 + ((i * 11) % 76)}%`,
                background: `radial-gradient(ellipse, ${u.core}66 0%, transparent 70%)`,
                filter: 'blur(10px)',
              }}
            />
          ))}
        </div>
      )}

      {/* Beat 4 — 3.6s: hero portrait resolves, backlit, surfacing from the dark */}
      {elapsed >= 3.6 && (
        <motion.div
          initial={{ opacity: 0, scale: 1.06, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: EASE_EXPO }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
        >
          <Portrait failed={portraitFailed} onFail={() => setPortraitFailed(true)} />
        </motion.div>
      )}

      {/* Skip control — appears at 1.5s, choice persisted in sessionStorage */}
      <AnimatePresence>
        {elapsed >= 1.5 && !diving && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => finish()}
            className="absolute right-6 bottom-6 rounded-full border border-snow/25 px-4 py-2 text-xs tracking-[0.2em] text-snow uppercase transition-colors duration-200 hover:border-snow/60 hover:text-jellyfish"
          >
            Skip intro
          </motion.button>
        )}
      </AnimatePresence>

      <SoundToggle />

      {/* Beat 6 — 5.6s: dive to black */}
      {diving && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_DIVE }}
          className="absolute inset-0 bg-void"
        />
      )}
    </div>
  )
}

function Portrait({ failed, onFail }: { failed: boolean; onFail: () => void }) {
  return (
    <div className="relative">
      {/* backlit rim glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-125 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(58,160,255,0.28) 0%, rgba(234,246,255,0.1) 40%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />
      {failed ? (
        // TODO: replace with generated asset — drop hero-portrait into
        // /public/assets/photos/hero-portrait.webp and this fallback disappears.
        <div className="flex h-48 w-48 items-center justify-center rounded-full border border-snow/20 bg-abyss md:h-64 md:w-64">
          <span className="font-display text-6xl text-jellyfish/80 md:text-7xl">
            {'</>'}
          </span>
        </div>
      ) : (
        <img
          src="/assets/photos/hero-portrait.webp"
          alt="Illustrated portrait of Suraj Nandan at a desk with a neon code sign"
          onError={onFail}
          className="h-48 w-48 rounded-full object-cover md:h-64 md:w-64"
        />
      )}
    </div>
  )
}
