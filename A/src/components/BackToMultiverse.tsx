const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** Glass & Light — frosted glass pill, matches the glassmorphism cards. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="fixed bottom-6 left-6 z-[60] flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/15 hover:text-white"
    >
      <span aria-hidden="true">←</span> Multiverse
    </a>
  );
}
