const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** Newspaper & Letterpress — a small classified-ad style notice in press ink. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="font-monopress fixed bottom-6 left-6 z-[60] border-2 border-ink bg-paper px-3 py-1.5 text-[11px] font-bold tracking-[0.15em] text-ink uppercase shadow-[3px_3px_0_0_rgba(23,23,26,0.9)] transition-colors duration-200 hover:bg-paper-bright hover:text-vermilion"
    >
      ← Return to the Multiverse
    </a>
  );
}
