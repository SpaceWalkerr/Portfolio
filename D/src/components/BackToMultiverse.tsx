const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** Neon Dev-Terminal — a shell command in neon cyan. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="font-mono fixed bottom-6 left-6 z-[60] rounded border border-neon-cyan/30 bg-void-deep/80 px-3 py-1.5 text-xs text-neon-cyan transition-all duration-200 hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(94,236,255,0.4)]"
    >
      $ cd ~/multiverse
    </a>
  );
}
