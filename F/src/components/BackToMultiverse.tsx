const HUB_URL = import.meta.env.VITE_MULTIVERSE_URL ?? '/';

/** The Field Guide — a naturalist's margin note in herbarium green. */
export default function BackToMultiverse() {
  return (
    <a
      href={HUB_URL}
      aria-label="Back to the Multiverse"
      className="font-hand fixed bottom-6 left-6 z-[60] rounded-sm bg-paper-deep/90 px-3 py-1 text-lg text-forest underline decoration-forest/40 decoration-wavy underline-offset-4 transition-colors duration-200 hover:text-forest-bright hover:decoration-forest-bright"
    >
      ← back to the multiverse
    </a>
  );
}
