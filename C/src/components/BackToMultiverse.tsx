const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** Blueprint / Patent — a drawing-sheet reference tag in cyanotype line ink. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="font-mono fixed bottom-6 left-6 z-[60] border border-dashed border-ink-mute bg-blueprint-deep px-3 py-1.5 text-[11px] tracking-[0.15em] text-ink-mute uppercase transition-colors duration-200 hover:border-brass hover:text-brass"
    >
      ← Sheet 0 · Multiverse
    </a>
  );
}
