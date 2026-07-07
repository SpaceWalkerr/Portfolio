import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { withBase } from '../lib/utils';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumes = [
  {
    title: 'Flight Summary',
    description: 'A concise, recruiter-friendly single-page snapshot of my experience, projects, and skills.',
    href: '/Suraj_Resume_1Page.pdf',
    badge: 'Brief',
  },
  {
    title: 'Full Manifest',
    description: 'The complete record — expanded experience, all projects, education, achievements, and certifications.',
    href: '/Suraj_Resume.pdf',
    badge: 'Unabridged',
  },
];

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-void-deep/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[60] w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2"
            role="dialog"
            aria-modal="true"
            aria-label="View résumé"
          >
            <div className="border border-ink/30 bg-void-bright p-6 shadow-2xl sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-ink/25 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">Mission SN-2026 &middot; Manifest</span>
                <button onClick={onClose} aria-label="Close" className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-amber hover:text-amber">
                  <X size={16} />
                </button>
              </div>

              <p className="mb-6 font-mono text-xs text-ink-mute">Select a document — it opens in a new tab.</p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {resumes.map((r) => (
                  <a
                    key={r.title}
                    href={withBase(r.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col border border-ink/25 p-5 transition-colors hover:border-amber/60 hover:bg-white/[0.02]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <FileText size={22} className="text-ink" />
                      <span className="border border-amber/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-amber">{r.badge}</span>
                    </div>
                    <h4 className="mb-2 font-display text-sm text-ink">{r.title}</h4>
                    <p className="mb-4 flex-grow font-mono text-[12.5px] leading-snug text-ink-mute">{r.description}</p>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink group-hover:text-amber">
                      Open File
                      <ExternalLink size={13} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
