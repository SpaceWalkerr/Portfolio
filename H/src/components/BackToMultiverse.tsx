const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** The Arcade Cabinet — a pixel EXIT sign in player-1 gold. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="font-display fixed bottom-6 left-6 z-[60] border-2 border-gold bg-void-deep px-3 py-2 text-[9px] text-gold shadow-[3px_3px_0_0_#0b0a1c] transition-all duration-150 hover:bg-gold hover:text-void-deep active:translate-y-0.5 active:shadow-none"
    >
      ◄ EXIT TO MULTIVERSE
    </a>
  );
}
