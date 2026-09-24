import recorded from '../data/clips.json';

/** Scroll-through clips of live sites, recorded by `npm run clips` (scripts/record-clips.mjs). */
const available = new Set<string>(recorded);

export const clipFor = (slug: string) => (available.has(slug) ? `/clips/${slug}.mp4` : null);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
