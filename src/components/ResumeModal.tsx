import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { PROFILE } from "../data/content";

/**
 * Lightweight resume modal opened from the Hero CTA. Glass panel over a dimmed
 * abyss; restrained fade — the cursor trail is the only playful move.
 */
export default function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-abyss-black/80 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-deep-navy/90 p-8 shadow-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="eyebrow mb-3">Resume</p>
            <h3 className="mb-2 font-display text-2xl font-light text-text-primary">
              {PROFILE.name}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-text-muted">
              {PROFILE.role}. Grab whichever résumé suits you, or reach out
              directly.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {PROFILE.resumes.map((r, i) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
                  style={
                    i === 0
                      ? { background: "var(--accent)", color: "var(--abyss-black)" }
                      : { border: "1px solid rgba(255,255,255,0.15)", color: "var(--text-primary)" }
                  }
                >
                  {r.label}
                </a>
              ))}
              <button
                onClick={onClose}
                className="ml-auto text-sm text-text-muted hover:text-text-primary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
