export interface Universe {
  id: string
  /** Portfolio folder in this repo (A–H) */
  folder: string
  name: string
  creature: string
  tagline: string
  core: string
  dim: string
  /** Where the dive transition navigates. TODO: replace with deployed URLs. */
  url: string
  /**
   * Idle-roam zone, in % of viewport (x, y = zone center; rx, ry = wander radius).
   * Zones are laid out so no two creatures overlap while roaming.
   */
  zone: { x: number; y: number; rx: number; ry: number }
  /** Randomized per creature so the idle loops never sync up (spec: 8–14s). */
  roamDuration: number
  pulseDuration: number
  /** Generated asset path — blank means the hub renders a placeholder glow blob. */
  asset: string | null
}

// TODO: swap in generated assets (see /public/assets/creatures/) once rendered
// via Higgsfield/OpenArt per the creature prompts. A `null` asset renders the
// placeholder glow blob in that creature's colors.
export const universes: Universe[] = [
  {
    id: 'u-01',
    folder: 'B',
    name: 'Newspaper & Letterpress',
    creature: 'Lanternfish',
    tagline: 'Every project, printed in ink that never dries.',
    core: '#F2B155',
    dim: '#7A4A12',
    url: '/press/',
    zone: { x: 15, y: 24, rx: 9, ry: 10 },
    roamDuration: 9.2,
    pulseDuration: 2.6,
    asset: null,
  },
  {
    id: 'u-02',
    folder: 'D',
    name: 'Neon Dev-Terminal',
    creature: 'Electric Eel',
    tagline: 'A portfolio that boots straight into the shell.',
    core: '#00FF9C',
    dim: '#00332B',
    url: '/terminal/',
    zone: { x: 50, y: 16, rx: 12, ry: 7 },
    roamDuration: 11.8,
    pulseDuration: 3.1,
    asset: null,
  },
  {
    id: 'u-03',
    folder: 'A',
    name: 'Glass & Light',
    creature: 'Moon Jellyfish',
    tagline: 'Work seen through frosted glass and soft light.',
    core: '#EAF6FF',
    dim: '#274A66',
    url: '/glass/',
    zone: { x: 84, y: 24, rx: 9, ry: 10 },
    roamDuration: 13.4,
    pulseDuration: 3.8,
    asset: null,
  },
  {
    id: 'u-04',
    folder: 'C',
    name: 'Blueprint / Patent',
    creature: 'Firefly Squid',
    tagline: 'Engineering drawings for everything I have built.',
    core: '#3AA0FF',
    dim: '#0D3B66',
    url: '/blueprint/',
    zone: { x: 15, y: 58, rx: 9, ry: 11 },
    roamDuration: 8.4,
    pulseDuration: 2.9,
    asset: null,
  },
  {
    id: 'u-05',
    folder: 'E',
    name: 'The Case File',
    creature: 'Anglerfish',
    tagline: 'Open the dossier. Follow the evidence.',
    core: '#FFB84D',
    dim: '#0A0805',
    url: '/case-file/',
    zone: { x: 50, y: 50, rx: 10, ry: 9 },
    roamDuration: 12.6,
    pulseDuration: 3.4,
    asset: null,
  },
  {
    id: 'u-06',
    folder: 'F',
    name: 'The Field Guide',
    creature: 'Firefly Swarm',
    tagline: 'A naturalist’s notebook of shipped software.',
    core: '#D4FF6B',
    dim: '#2E3A12',
    url: '/field-guide/',
    zone: { x: 84, y: 58, rx: 9, ry: 11 },
    roamDuration: 10.4,
    pulseDuration: 2.4,
    asset: null,
  },
  {
    id: 'u-07',
    folder: 'G',
    name: 'Mission Control',
    creature: 'Comb Jelly',
    tagline: 'Live telemetry from every launch so far.',
    core: '#9C6BFF',
    dim: '#2B1F4A',
    url: '/mission-control/',
    zone: { x: 30, y: 84, rx: 11, ry: 7 },
    roamDuration: 13.9,
    pulseDuration: 4.0,
    asset: null,
  },
  {
    id: 'u-08',
    folder: 'H',
    name: 'The Arcade Cabinet',
    creature: 'Flashlight Fish',
    tagline: 'Insert coin. Browse the high-score reel.',
    core: '#FF2D6B',
    dim: '#111111',
    url: '/arcade/',
    zone: { x: 68, y: 84, rx: 11, ry: 7 },
    roamDuration: 8.9,
    pulseDuration: 2.5,
    asset: null,
  },
]

export const OWNER_NAME = 'Suraj Nandan'
export const TAGLINE = 'Full-stack developer · eight universes, one multiverse'
