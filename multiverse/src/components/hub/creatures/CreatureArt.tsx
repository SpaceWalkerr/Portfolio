/**
 * Hand-built animated SVG creatures — the code-drawn tier of the visual
 * pipeline. Layered radial gradients + gaussian blur + turbulence give each
 * body an organic, non-vector feel; all motion is CSS keyframes (defined in
 * index.css) so `prefers-reduced-motion` silences everything at once.
 *
 * TODO: swap in generated asset — when a universe's `asset` path is filled
 * with a photoreal render, Creature.tsx bypasses these entirely.
 */
import type { Universe } from '../../../data/universes'

export function CreatureArt({ universe, active }: { universe: Universe; active: boolean }) {
  const art = {
    'u-01': <Lanternfish />,
    'u-02': <ElectricEel />,
    'u-03': <MoonJellyfish />,
    'u-04': <FireflySquid />,
    'u-05': <Anglerfish />,
    'u-06': <FireflySwarm />,
    'u-07': <CombJelly />,
    'u-08': <FlashlightFish />,
  }[universe.id]

  return (
    <span
      aria-hidden="true"
      className="relative block h-28 w-28 md:h-32 md:w-32"
      style={{
        opacity: active ? 1 : 0.62,
        transform: active ? 'scale(1.1)' : 'scale(1)',
        transition:
          'opacity 220ms cubic-bezier(0.16,1,0.3,1), transform 220ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* ambient water glow beneath every creature */}
      <span
        className="absolute inset-0 scale-150 rounded-full"
        style={{
          background: `radial-gradient(circle, ${universe.core}30 0%, transparent 65%)`,
          filter: 'blur(14px)',
          animation: `glow-pulse ${universe.pulseDuration}s cubic-bezier(0.37,0,0.63,1) infinite`,
        }}
      />
      {art}
    </span>
  )
}

/* ---------- U-01 Lanternfish — warm amber photophores, press-lamp flicker ---------- */
function Lanternfish() {
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <radialGradient id="lf-body" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#2a2118" />
          <stop offset="60%" stopColor="#14100b" />
          <stop offset="100%" stopColor="#0a0805" />
        </radialGradient>
        <filter id="lf-soft"><feGaussianBlur stdDeviation="0.6" /></filter>
        <filter id="lf-glow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      {/* pool of lamp-light under the belly */}
      <ellipse cx="78" cy="100" rx="46" ry="18" fill="#F2B155" opacity="0.14" filter="url(#lf-glow)" />
      {/* body */}
      <g style={{ animation: 'eel-swim 5.5s ease-in-out infinite', transformOrigin: '50% 50%' }}>
        <path
          d="M22 80 Q40 54 78 54 Q112 54 130 72 L142 62 L140 80 L142 98 L130 88 Q112 102 78 102 Q40 102 22 80 Z"
          fill="url(#lf-body)" filter="url(#lf-soft)"
        />
        {/* dorsal + pectoral fins */}
        <path d="M70 54 Q78 40 92 46 Q84 52 80 56 Z" fill="#14100b" opacity="0.85" />
        <path d="M64 88 Q56 100 66 106 Q70 96 72 90 Z" fill="#14100b" opacity="0.7" />
        {/* eye — big, deep-sea */}
        <circle cx="42" cy="72" r="9" fill="#060504" />
        <circle cx="42" cy="72" r="8" fill="#1c1610" />
        <circle cx="40" cy="70" r="3.4" fill="#F2B155" opacity="0.85" />
        <circle cx="38.6" cy="68.6" r="1.2" fill="#fff" opacity="0.9" />
        {/* belly photophores — uneven flicker, like old press lamps */}
        {[
          { x: 36, y: 92, r: 2.6, d: 0 },
          { x: 50, y: 97, r: 3.0, d: 0.7 },
          { x: 65, y: 100, r: 2.4, d: 1.6 },
          { x: 80, y: 101, r: 3.2, d: 0.3 },
          { x: 95, y: 99, r: 2.6, d: 2.2 },
          { x: 109, y: 94, r: 2.9, d: 1.1 },
          { x: 121, y: 87, r: 2.2, d: 2.8 },
        ].map((p, i) => (
          <g key={i} style={{ animation: `photophore-flicker 3.4s linear infinite`, animationDelay: `${p.d}s` }}>
            <circle cx={p.x} cy={p.y} r={p.r * 2.4} fill="#F2B155" opacity="0.35" filter="url(#lf-glow)" />
            <circle cx={p.x} cy={p.y} r={p.r} fill="#FFDCA8" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ---------- U-02 Electric Eel — cyan-green current threading a dark body ---------- */
function ElectricEel() {
  const spine = 'M14 96 Q34 60 58 78 Q84 98 106 74 Q124 54 146 66'
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <linearGradient id="ee-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#04120d" />
          <stop offset="50%" stopColor="#0a1f16" />
          <stop offset="100%" stopColor="#04120d" />
        </linearGradient>
        <filter id="ee-glow"><feGaussianBlur stdDeviation="2.5" /></filter>
        <filter id="ee-halo"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <g style={{ animation: 'eel-swim 7s ease-in-out infinite', transformOrigin: '50% 50%' }}>
        {/* halo along the whole body */}
        <path d={spine} fill="none" stroke="#00FF9C" strokeWidth="16" strokeLinecap="round" opacity="0.1" filter="url(#ee-halo)" />
        {/* body — thick tapering stroke */}
        <path d={spine} fill="none" stroke="url(#ee-body)" strokeWidth="13" strokeLinecap="round" />
        {/* bioluminescent veins — dash animation reads as current flow */}
        <path
          d={spine} fill="none" stroke="#00FF9C" strokeWidth="2.2" strokeLinecap="round"
          strokeDasharray="10 14 4 18" opacity="0.9" filter="url(#ee-glow)"
          style={{ animation: 'eel-current 2.8s linear infinite' }}
        />
        <path
          d={spine} fill="none" stroke="#B8FFE3" strokeWidth="0.9" strokeLinecap="round"
          strokeDasharray="3 21 2 26"
          style={{ animation: 'eel-current 2.8s linear infinite' }}
        />
        {/* head + eye */}
        <circle cx="146" cy="66" r="7" fill="#0a1f16" />
        <circle cx="148.5" cy="64" r="1.6" fill="#00FF9C">
          {/* terminal-cursor blink */}
        </circle>
        <circle cx="148.5" cy="64" r="3.5" fill="#00FF9C" opacity="0.4" filter="url(#ee-glow)"
          style={{ animation: 'glow-pulse 1.1s steps(2, jump-none) infinite' }} />
      </g>
    </svg>
  )
}

/* ---------- U-03 Moon Jellyfish — translucent bell, four gonads, drifting tentacles ---------- */
function MoonJellyfish() {
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <radialGradient id="mj-bell" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#EAF6FF" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#BFE3F7" stopOpacity="0.26" />
          <stop offset="85%" stopColor="#7FB4D6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#274A66" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="mj-gonad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EAF6FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9CC9E8" stopOpacity="0.15" />
        </radialGradient>
        <filter id="mj-soft"><feGaussianBlur stdDeviation="1.2" /></filter>
        <filter id="mj-glow"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <g style={{ animation: 'jelly-pulse 4.2s cubic-bezier(0.37,0,0.63,1) infinite', transformOrigin: '50% 42%' }}>
        {/* bell */}
        <path d="M28 74 Q28 26 80 26 Q132 26 132 74 Q132 86 80 88 Q28 86 28 74 Z"
          fill="url(#mj-bell)" filter="url(#mj-soft)" />
        {/* inner glow rim */}
        <path d="M36 72 Q38 34 80 33 Q122 34 124 72" fill="none" stroke="#EAF6FF" strokeWidth="2" opacity="0.35" filter="url(#mj-glow)" />
        {/* the four horseshoe gonads — the moon jelly's signature */}
        {[{ x: 66, y: 52 }, { x: 94, y: 52 }, { x: 66, y: 66 }, { x: 94, y: 66 }].map((g, i) => (
          <path key={i}
            d={`M${g.x - 7} ${g.y + 3} Q${g.x} ${g.y - 7} ${g.x + 7} ${g.y + 3}`}
            fill="none" stroke="url(#mj-gonad)" strokeWidth="5" strokeLinecap="round" opacity="0.75" filter="url(#mj-soft)" />
        ))}
        {/* frilled margin */}
        <path d="M28 76 Q40 82 52 78 Q66 84 80 80 Q94 84 108 78 Q120 82 132 76"
          fill="none" stroke="#CFE9FA" strokeWidth="1.4" opacity="0.5" />
      </g>
      {/* tentacles — layered sway, out of phase */}
      {[
        { x: 44, len: 42, d: 0, w: 1.1 },
        { x: 58, len: 56, d: 0.8, w: 1.4 },
        { x: 72, len: 48, d: 1.7, w: 1.1 },
        { x: 86, len: 60, d: 0.4, w: 1.5 },
        { x: 100, len: 50, d: 2.1, w: 1.2 },
        { x: 114, len: 40, d: 1.2, w: 1 },
      ].map((t, i) => (
        <path key={i}
          d={`M${t.x} 86 Q${t.x - 5} ${86 + t.len * 0.5} ${t.x + 3} ${86 + t.len}`}
          fill="none" stroke="#CFE9FA" strokeWidth={t.w} strokeLinecap="round" opacity="0.4"
          style={{
            animation: `tentacle-sway ${3.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${t.d}s`,
            transformOrigin: `${t.x}px 86px`,
          }}
        />
      ))}
    </svg>
  )
}

/* ---------- U-04 Firefly Squid — blueprint-blue photophores in schematic rows ---------- */
function FireflySquid() {
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <linearGradient id="fs-mantle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10243d" />
          <stop offset="100%" stopColor="#081426" />
        </linearGradient>
        <filter id="fs-glow"><feGaussianBlur stdDeviation="2.2" /></filter>
      </defs>
      <g style={{ animation: 'squid-bob 4.6s ease-in-out infinite' }}>
        {/* fins */}
        <path d="M80 22 L58 42 L80 38 Z" fill="#0d1e33" />
        <path d="M80 22 L102 42 L80 38 Z" fill="#0d1e33" />
        {/* mantle */}
        <path d="M80 20 Q100 44 96 84 L64 84 Q60 44 80 20 Z" fill="url(#fs-mantle)" stroke="#1b3a5e" strokeWidth="1" />
        {/* schematic grid photophores on the mantle */}
        {[0, 1, 2, 3].flatMap((row) =>
          [0, 1, 2].map((col) => {
            const x = 70 + col * 10
            const y = 40 + row * 11
            const d = (row * 3 + col) * 0.35
            return (
              <g key={`${row}-${col}`} style={{ animation: 'photophore-flicker 2.9s linear infinite', animationDelay: `${d}s` }}>
                <circle cx={x} cy={y} r="4" fill="#3AA0FF" opacity="0.3" filter="url(#fs-glow)" />
                <circle cx={x} cy={y} r="1.6" fill="#9CCEFF" />
              </g>
            )
          }),
        )}
        {/* eyes — firefly squid have huge lit eyes */}
        <circle cx="70" cy="92" r="6" fill="#081426" />
        <circle cx="90" cy="92" r="6" fill="#081426" />
        <circle cx="70" cy="92" r="2.6" fill="#3AA0FF" style={{ animation: 'photophore-flicker 3.7s linear infinite' }} />
        <circle cx="90" cy="92" r="2.6" fill="#3AA0FF" style={{ animation: 'photophore-flicker 3.7s linear infinite', animationDelay: '0.5s' }} />
        {/* arms with tip photophores — their real light organs */}
        {[-18, -10, -3, 3, 10, 18].map((dx, i) => (
          <g key={i} style={{ animation: `tentacle-sway ${3 + i * 0.3}s ease-in-out infinite`, transformOrigin: `${80 + dx * 0.4}px 96px` }}>
            <path d={`M${80 + dx * 0.4} 96 Q${80 + dx * 0.8} 112 ${80 + dx} 122`} fill="none" stroke="#122c4a" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx={80 + dx} cy={122} r="2.4" fill="#3AA0FF" opacity="0.85" filter="url(#fs-glow)"
              style={{ animation: 'photophore-flicker 2.2s linear infinite', animationDelay: `${i * 0.4}s` }} />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ---------- U-05 Anglerfish — one lure burning in the dark ---------- */
function Anglerfish() {
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <radialGradient id="af-lure" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE7BF" />
          <stop offset="35%" stopColor="#FFB84D" />
          <stop offset="100%" stopColor="#FFB84D" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="af-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB84D" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFB84D" stopOpacity="0" />
        </radialGradient>
        <filter id="af-glow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      {/* light pool from the lure — the only illumination */}
      <circle cx="98" cy="46" r="44" fill="url(#af-pool)" />
      {/* body — barely there, rim-lit on top by the lure light */}
      <path
        d="M30 84 Q44 60 78 60 Q112 62 124 80 Q126 92 116 100 Q94 112 62 108 Q36 102 30 84 Z"
        fill="#070503"
      />
      <path d="M44 66 Q66 56 96 60" fill="none" stroke="#7a5a2e" strokeWidth="1.2" opacity="0.5" filter="url(#af-glow)" />
      {/* jaw + translucent needle teeth caught in the glow */}
      <path d="M112 82 Q124 84 122 92 Q112 98 100 98" fill="none" stroke="#0d0a06" strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i}
          d={`M${104 + i * 4.4} ${86 + (i % 2) * 2} l1.6 7`}
          stroke="#E8D9BE" strokeWidth="0.9" opacity="0.4" strokeLinecap="round"
        />
      ))}
      {/* small dead eye just inside the light */}
      <circle cx="96" cy="72" r="3.4" fill="#0d0a06" stroke="#7a5a2e" strokeWidth="0.8" strokeOpacity="0.6" />
      <circle cx="95" cy="71" r="1" fill="#FFB84D" opacity="0.5" />
      {/* ilicium arcing forward, esca burning at its tip */}
      <path d="M84 60 Q86 34 98 42 Q102 44 98 46" fill="none" stroke="#241a0e" strokeWidth="1.6" />
      <g style={{ animation: 'photophore-flicker 4.5s linear infinite' }}>
        <circle cx="98" cy="46" r="12" fill="url(#af-lure)" opacity="0.55" filter="url(#af-glow)" />
        <circle cx="98" cy="46" r="4.4" fill="url(#af-lure)" />
        <circle cx="97" cy="45" r="1.4" fill="#FFF4E0" />
      </g>
    </svg>
  )
}

/* ---------- U-06 Firefly Swarm — individually drifting gold-green lights ---------- */
function FireflySwarm() {
  const flies = [
    { x: 34, y: 38, s: 1.15, c: '#D4FF6B', dur: 7.2, delay: 0, fl: 2.3 },
    { x: 74, y: 24, s: 0.8, c: '#FFD36B', dur: 8.8, delay: 1.2, fl: 3.1 },
    { x: 112, y: 44, s: 1.0, c: '#D4FF6B', dur: 6.4, delay: 0.6, fl: 2.7 },
    { x: 52, y: 70, s: 0.7, c: '#FFD36B', dur: 9.4, delay: 2.0, fl: 3.7 },
    { x: 92, y: 78, s: 1.2, c: '#D4FF6B', dur: 7.8, delay: 0.3, fl: 2.1 },
    { x: 28, y: 100, s: 0.65, c: '#FFD36B', dur: 8.2, delay: 1.7, fl: 4.1 },
    { x: 124, y: 92, s: 0.9, c: '#D4FF6B', dur: 6.9, delay: 2.4, fl: 2.9 },
    { x: 66, y: 116, s: 1.05, c: '#FFD36B', dur: 7.5, delay: 0.9, fl: 3.3 },
    { x: 104, y: 122, s: 0.75, c: '#D4FF6B', dur: 8.6, delay: 1.5, fl: 2.5 },
  ]
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <filter id="ff-glow"><feGaussianBlur stdDeviation="2.6" /></filter>
      </defs>
      {flies.map((f, i) => (
        <g
          key={i}
          style={{
            animation: `firefly-drift ${f.dur}s ease-in-out infinite`,
            animationDelay: `${f.delay}s`,
            ['--dx' as string]: `${6 + i * 1.3}px`,
            ['--dy' as string]: `${5 + (i % 4) * 2}px`,
          }}
        >
          <g style={{ animation: `photophore-flicker ${f.fl}s linear infinite`, animationDelay: `${f.delay * 0.7}s` }}>
            <circle cx={f.x} cy={f.y} r={7 * f.s} fill={f.c} opacity="0.3" filter="url(#ff-glow)" />
            <circle cx={f.x} cy={f.y} r={2.2 * f.s} fill={f.c} />
            {/* tiny dark thorax above the lantern */}
            <ellipse cx={f.x} cy={f.y - 3.4 * f.s} rx={1.6 * f.s} ry={2.4 * f.s} fill="#1d2410" />
          </g>
        </g>
      ))}
    </svg>
  )
}

/* ---------- U-07 Comb Jelly — rainbow light rippling down transparent comb rows ---------- */
function CombJelly() {
  const rows = [
    { d: 'M80 22 Q52 50 56 92 Q58 116 72 128', hue: 0 },
    { d: 'M80 22 Q64 52 66 96 Q67 118 76 130', hue: 45 },
    { d: 'M80 22 Q78 54 78 98 Q78 120 80 132', hue: 90 },
    { d: 'M80 22 Q96 52 94 96 Q93 118 84 130', hue: 180 },
    { d: 'M80 22 Q108 50 104 92 Q102 116 88 128', hue: 260 },
  ]
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <radialGradient id="cj-body" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#EAF6FF" stopOpacity="0.14" />
          <stop offset="70%" stopColor="#BFD8EC" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#274A66" stopOpacity="0.02" />
        </radialGradient>
        <filter id="cj-glow"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>
      {/* nearly transparent lobed body */}
      <path d="M80 18 Q118 42 108 96 Q100 130 80 136 Q60 130 52 96 Q42 42 80 18 Z"
        fill="url(#cj-body)" stroke="#CFE4F5" strokeWidth="0.8" strokeOpacity="0.22" />
      {/* comb rows — dashes scrolling = cilia wave; hue-rotate cycles the spectrum */}
      {rows.map((r, i) => (
        <g key={i} style={{ animation: 'hue-cycle 7s linear infinite', animationDelay: `${-i * 1.4}s` }}>
          <path
            d={r.d} fill="none"
            stroke={`hsl(${r.hue}, 95%, 65%)`} strokeWidth="2.4" strokeLinecap="round"
            strokeDasharray="2.5 5" opacity="0.85" filter="url(#cj-glow)"
            style={{ animation: `comb-shimmer ${2.4 + i * 0.35}s linear infinite` }}
          />
        </g>
      ))}
    </svg>
  )
}

/* ---------- U-08 Flashlight Fish — hard pixel blinks under the eye ---------- */
function FlashlightFish() {
  return (
    <svg viewBox="0 0 160 160" className="relative h-full w-full overflow-visible">
      <defs>
        <radialGradient id="flf-body" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1e1d3d" />
          <stop offset="65%" stopColor="#141328" />
          <stop offset="100%" stopColor="#0b0a1c" />
        </radialGradient>
        <filter id="flf-glow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <g style={{ animation: 'eel-swim 4.5s ease-in-out infinite', transformOrigin: '50% 50%' }}>
        {/* deep-bodied little fish */}
        <path
          d="M34 78 Q52 48 86 50 Q116 52 126 74 L140 62 L136 80 L140 96 L126 84 Q114 106 84 106 Q50 106 34 78 Z"
          fill="url(#flf-body)" stroke="#26244d" strokeWidth="1"
        />
        <path d="M76 50 Q84 36 98 42 L88 52 Z" fill="#141328" />
        {/* eye */}
        <circle cx="56" cy="70" r="7" fill="#0b0a1c" />
        <circle cx="54" cy="68" r="2.4" fill="#8c8ab0" />
        {/* the light organ — sharp-edged, pixel-blocky, cycling primaries */}
        <g filter="url(#flf-glow)" opacity="0.55">
          <rect x="44" y="80" width="22" height="9" rx="1"
            style={{ animation: 'flashlight-blink-fill 3.2s steps(1) infinite' }} />
        </g>
        <rect
          x="46" y="81" width="18" height="7" rx="1"
          shapeRendering="crispEdges"
          style={{ animation: 'flashlight-blink-fill 3.2s steps(1) infinite' }}
        />
        {/* second smaller block — pixel cluster feel */}
        <rect
          x="66" y="83" width="5" height="5"
          shapeRendering="crispEdges"
          style={{ animation: 'flashlight-blink-fill 3.2s steps(1) infinite', animationDelay: '0.1s' }}
        />
      </g>
    </svg>
  )
}
