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
    title: '1-Page Résumé',
    description:
      'A concise, recruiter-friendly single-page snapshot of my experience, projects, and skills.',
    href: '/Suraj_Resume_1Page.pdf',
    badge: 'Quick Read',
  },
  {
    title: 'Detailed Résumé',
    description:
      'The full version with expanded experience, all projects, education, achievements, and certifications.',
    href: '/Suraj_Resume.pdf',
    badge: 'Full Detail',
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
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
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
            <div className="relative border-2 border-ink bg-paper-bright p-6 shadow-2xl sm:p-8">
              {/* Masthead bar */}
              <div className="mb-6 flex items-center justify-between border-b-4 border-double border-ink pb-3">
                <span className="font-editorial text-lg italic">The Résumé</span>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="mb-6 font-editorial text-sm italic text-ink-mute">
                Choose a version — it opens in a new tab.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {resumes.map((r) => (
                  <a
                    key={r.title}
                    href={withBase(r.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col border border-ink/40 p-5 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <FileText size={22} />
                      <span className="border border-current px-2.5 py-1 font-monopress text-[10px] uppercase tracking-[0.1em]">
                        {r.badge}
                      </span>
                    </div>
                    <h4 className="mb-2 font-display text-base font-bold uppercase tracking-[-0.01em]">
                      {r.title}
                    </h4>
                    <p className="mb-4 flex-grow font-editorial text-[13.5px] leading-snug text-ink-mute group-hover:text-paper/75">
                      {r.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-monopress text-[10px] uppercase tracking-[0.12em]">
                      View PDF
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
