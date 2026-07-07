const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** The Case File — a red evidence stamp, slightly askew like a real one. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="font-display fixed bottom-6 left-6 z-[60] -rotate-2 border-2 border-blood px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] text-blood uppercase transition-all duration-200 hover:rotate-0 hover:bg-blood hover:text-paper"
    >
      ← Case: Multiverse
    </a>
  );
}
