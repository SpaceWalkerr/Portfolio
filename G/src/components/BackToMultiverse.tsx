const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** Mission Control — an RTB (return to base) directive in telemetry amber. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="font-mono fixed bottom-6 left-6 z-[60] border border-amber/40 bg-void-deep/80 px-3 py-1.5 text-[11px] tracking-[0.2em] text-amber uppercase transition-all duration-200 hover:border-amber hover:bg-amber/10"
    >
      ◄ RTB · Multiverse
    </a>
  );
}
