/**
 * The descent, as data. One entry per section in scroll order. The depth
 * gauge, the accent system, and (later) each section component all read from
 * this single table so the eight-creature scheme stays maintainable.
 */

export type AccentClass =
  | "accent-surface"
  | "accent-firefly"
  | "accent-lantern"
  | "accent-eel"
  | "accent-jelly"
  | "accent-anglerfish"
  | "accent-flashlight"
  | "accent-comb";

export interface SectionDef {
  id: string;
  label: string;
  /** Depth in metres shown on the gauge when this section is centred. */
  depth: number;
  zone: string;
  creature: string;
  accentClass: AccentClass;
  /** rgb triple string for the cursor trail's per-section colour shift. */
  accentRgb: [number, number, number];
  /** Asset basenames (see src/assets/bioluminescence/{videos,images}). */
  asset: string | null;
}

export const SECTIONS: SectionDef[] = [
  {
    id: "hero",
    label: "Surface",
    depth: 0,
    zone: "Surface haze",
    creature: "Ambient marine snow",
    accentClass: "accent-surface",
    accentRgb: [232, 244, 255],
    asset: "ambient-environment-loop",
  },
  {
    id: "about",
    label: "About",
    depth: 12,
    zone: "Epipelagic",
    creature: "Firefly swarm",
    accentClass: "accent-firefly",
    accentRgb: [242, 214, 117],
    asset: "firefly-swarm",
  },
  {
    id: "skills",
    label: "Skills",
    depth: 340,
    zone: "Mesopelagic",
    creature: "Lanternfish · Firefly squid",
    accentClass: "accent-lantern",
    accentRgb: [63, 224, 242],
    asset: "lanternfish",
  },
  {
    id: "experience",
    label: "Experience",
    depth: 620,
    zone: "Mesopelagic",
    creature: "Electric eel",
    accentClass: "accent-eel",
    accentRgb: [53, 232, 184],
    asset: "electric-eel",
  },
  {
    id: "education",
    label: "Education",
    depth: 820,
    zone: "Mesopelagic",
    creature: "Moon jellyfish",
    accentClass: "accent-jelly",
    accentRgb: [232, 244, 255],
    asset: "moon-jellyfish",
  },
  {
    id: "projects",
    label: "Projects",
    depth: 1000,
    zone: "Bathypelagic",
    creature: "Anglerfish",
    accentClass: "accent-anglerfish",
    accentRgb: [255, 179, 71],
    asset: "anglerfish",
  },
  {
    id: "certifications",
    label: "Certifications",
    depth: 2500,
    zone: "Bathypelagic",
    creature: "Flashlight fish",
    accentClass: "accent-flashlight",
    accentRgb: [242, 63, 160],
    asset: "flashlight-fish",
  },
  {
    id: "contact",
    label: "Contact",
    depth: 4000,
    zone: "Abyssal",
    creature: "Comb jelly",
    accentClass: "accent-comb",
    accentRgb: [107, 193, 255],
    asset: "comb-jelly-ctenophore",
  },
];

export const MAX_DEPTH = 4000;

/** Look up a section + its scroll-order index by id (both needed by sections). */
export function section(id: string): { def: SectionDef; index: number } {
  const index = SECTIONS.findIndex((s) => s.id === id);
  if (index < 0) throw new Error(`Unknown section id: ${id}`);
  return { def: SECTIONS[index], index };
}

/**
 * Interpolate a metre reading from overall scroll fraction [0..1]. The mapping
 * is piecewise across the section depths so the gauge ticks through the real
 * markers (SURFACE → 12M → 340M → 1,000M → 4,000M) rather than a flat ramp.
 */
export function depthFromScroll(fraction: number): number {
  const f = Math.min(1, Math.max(0, fraction));
  const n = SECTIONS.length - 1;
  const pos = f * n;
  const i = Math.min(n - 1, Math.floor(pos));
  const t = pos - i;
  const a = SECTIONS[i].depth;
  const b = SECTIONS[i + 1].depth;
  return Math.round(a + (b - a) * t);
}

export function formatDepth(metres: number): string {
  if (metres <= 0) return "SURFACE";
  return `${metres.toLocaleString("en-US")}M`;
}
