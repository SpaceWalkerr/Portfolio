/**
 * The reality index — one entry per portfolio universe.
 *
 * `href` rules:
 *  - internal path with a trailing slash ("/press/") → each universe is a
 *    separate static app served from this subpath (see /scripts/build-all.mjs
 *    and each universe's `base` in vite.config.ts). The trailing slash
 *    matters: it's what makes the link resolve to that folder's index.html
 *    on every static host, not just ones with extra rewrite rules configured.
 *  - absolute URL → full-page travel to a universe deployed elsewhere
 *  - '' with status 'live' → the universe exists but its deployment URL
 *    hasn't been pasted here yet; the card renders "Awaiting Link"
 */
export type UniverseStatus = 'live' | 'soon';

export interface Universe {
  id: string;
  index: string;
  name: string;
  theme: string;
  tagline: string;
  status: UniverseStatus;
  href: string;
  /** Accent used for glows, chips, and the portal-open wash */
  accent: string;
  accentSoft: string;
}

export const universes: Universe[] = [
  {
    id: 'newspaper',
    index: 'U-01',
    name: 'Newspaper & Letterpress',
    theme: 'Broadsheet · c. 1905',
    tagline: 'Photos become living halftone ink. Headlines typeset themselves.',
    status: 'live',
    href: '/press/',
    accent: '#C6392B',
    accentSoft: 'rgba(198, 57, 43, 0.35)',
  },
  {
    // Built in folder D — folder A was mistakenly wired up here before, but
    // A is actually the Glass & Light build (see below).
    id: 'terminal',
    index: 'U-02',
    name: 'Neon Dev-Terminal',
    theme: 'Synthwave · Retro-Future',
    tagline: 'Boot into a cockpit. The terminal types my story.',
    status: 'live',
    href: '/terminal/',
    accent: '#FF5EA8',
    accentSoft: 'rgba(255, 94, 168, 0.35)',
  },
  {
    // This is folder A's actual identity — glassmorphism panels, not synthwave.
    id: 'glass',
    index: 'U-03',
    name: 'Glass & Light',
    theme: 'Refraction · Crystal',
    tagline: 'Work encased in crystal. Light split into rainbows.',
    status: 'live',
    href: '/glass/',
    accent: '#8B7CF6',
    accentSoft: 'rgba(139, 124, 246, 0.35)',
  },
  {
    id: 'blueprint',
    index: 'U-04',
    name: 'Blueprint / Patent',
    theme: 'Cyanotype · Draftsman',
    tagline: 'Projects drawn as living patent schematics.',
    status: 'live',
    href: '/blueprint/',
    accent: '#4F8FD9',
    accentSoft: 'rgba(79, 143, 217, 0.35)',
  },
  {
    id: 'case-file',
    index: 'U-05',
    name: 'The Case File',
    theme: 'Noir · Investigation',
    tagline: 'Redactions lift on scroll. Evidence pinned, string and all.',
    status: 'live',
    href: '/case-file/',
    accent: '#A52A2A',
    accentSoft: 'rgba(165, 42, 42, 0.35)',
  },
  {
    id: 'field-guide',
    index: 'U-06',
    name: 'The Field Guide',
    theme: 'Naturalist · Expedition Journal',
    tagline: 'Specimens pressed into the page. Ink blooms as you scroll.',
    status: 'live',
    href: '/field-guide/',
    accent: '#3F5C33',
    accentSoft: 'rgba(63, 92, 51, 0.35)',
  },
  {
    id: 'mission-control',
    index: 'U-07',
    name: 'Mission Control',
    theme: 'Space Program · Telemetry',
    tagline: 'Telemetry ticks up live. A constellation of shipped missions.',
    status: 'live',
    href: '/mission-control/',
    accent: '#FFB020',
    accentSoft: 'rgba(255, 176, 32, 0.35)',
  },
  {
    id: 'arcade',
    index: 'U-08',
    name: 'The Arcade Cabinet',
    theme: '8-Bit · Pixel Arcade',
    tagline: 'Insert coin. Skills level up, projects are levels to clear.',
    status: 'live',
    href: '/arcade/',
    accent: '#FFCC00',
    accentSoft: 'rgba(255, 204, 0, 0.35)',
  },
];
