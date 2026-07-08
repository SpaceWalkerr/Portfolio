/**
 * Eight alternate design "modes" of the portfolio, each a fully separate build
 * hosted under /public/versions/<id>/. The Versions section arranges A–H and
 * each opens its own build via "View in this mode".
 */
export interface Version {
  id: string; // folder letter A–H, also the /versions/<id>/ path segment
  name: string;
  descriptor: string;
  /** Per-card accent (one distinct colour each, echoing the 8-creature scheme). */
  accent: string;
  accentRgb: string;
}

export const VERSIONS: Version[] = [
  { id: "A", name: "Glass & Light", descriptor: "Soft glassmorphism, luminous depth.", accent: "#E8F4FF", accentRgb: "232,244,255" },
  { id: "B", name: "The Broadsheet", descriptor: "Editorial press layout, print discipline.", accent: "#F2D675", accentRgb: "242,214,117" },
  { id: "C", name: "Blueprint", descriptor: "Patent-sheet schematic, drafted in cyan.", accent: "#3FE0F2", accentRgb: "63,224,242" },
  { id: "D", name: "Neon Terminal", descriptor: "Dev-console green, monospaced glow.", accent: "#35E8B8", accentRgb: "53,232,184" },
  { id: "E", name: "The Case File", descriptor: "Investigation dossier, pinned evidence.", accent: "#FFB347", accentRgb: "255,179,71" },
  { id: "F", name: "The Field Guide", descriptor: "Naturalist plates, hand-annotated.", accent: "#7BE0A0", accentRgb: "123,224,160" },
  { id: "G", name: "Mission Control", descriptor: "Telemetry readouts, launch cadence.", accent: "#6BC1FF", accentRgb: "107,193,255" },
  { id: "H", name: "The Arcade Cabinet", descriptor: "8-bit pixels, high-score energy.", accent: "#F23FA0", accentRgb: "242,63,160" },
];

/** URL that opens a version's standalone build. */
export const versionUrl = (id: string) => `/versions/${id}/index.html`;
