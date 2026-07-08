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
    title: 'Quick Save',
    description: 'A concise, recruiter-friendly single-page snapshot of my experience, projects, and skills.',
    href: '/Suraj_Resume_1Page.pdf',
    badge: 'Brief',
  },
  {
    title: 'Full Save File',
    description: 'The complete playthrough — expanded experience, all projects, education, achievements, and certifications.',
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
            className="fixed inset-0 z-[60] bg-void-deep/85"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-1/2 z-[60] w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2"
            role="dialog"
            aria-modal="true"
            aria-label="View résumé"
          >
            <div className="border-4 border-ink bg-void-bright p-6 shadow-[8px_8px_0_rgba(0,0,0,0.6)] sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b-4 border-ink/60 pb-3">
                <span className="font-display text-[10px] uppercase text-gold">Load Game</span>
                <button onClick={onClose} aria-label="Close" className="border-2 border-ink/40 p-1.5 text-ink transition-colors hover:border-gold hover:text-gold">
                  <X size={16} />
                </button>
              </div>

              <p className="mb-6 font-mono text-lg text-ink-mute">Choose a save file — it opens in a new tab.</p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {resumes.map((r) => (
                  <a
                    key={r.title}
                    href={withBase(r.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col border-2 border-ink/40 p-5 transition-colors hover:border-gold hover:bg-white/[0.03]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <FileText size={22} className="text-ink" />
                      <span className="border-2 border-cyan/50 px-2.5 py-1 font-mono text-xs uppercase text-cyan">{r.badge}</span>
                    </div>
                    <h4 className="mb-2 font-display text-xs text-ink">{r.title}</h4>
                    <p className="mb-4 flex-grow font-mono text-base leading-snug text-ink-mute">{r.description}</p>
                    <span className="inline-flex items-center gap-1.5 font-mono text-sm uppercase text-ink group-hover:text-gold">
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
