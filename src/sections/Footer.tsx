import { PROFILE } from "../data/content";

/** The abyssal floor: near-total black, one line, no loop. Quiet close. */
export default function Footer() {
  return (
    <footer className="flex min-h-[45vh] flex-col items-center justify-center gap-3 bg-abyss-black px-6 text-center">
      <p className="readout opacity-60">4,000M — the floor</p>
      <p className="text-sm text-text-muted">
        {PROFILE.name} · {PROFILE.role}
      </p>
      <a
        href={PROFILE.website}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        surajnandan.in
      </a>
      <p className="readout text-[0.6rem] opacity-40">
        © {new Date().getFullYear()} {PROFILE.name} — built as a descent through the water column
      </p>
    </footer>
  );
}
