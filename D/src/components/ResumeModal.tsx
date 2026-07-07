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
    title: 'resume_1page.pdf',
    description: 'A concise, recruiter-friendly single-page snapshot of my experience, projects, and skills.',
    href: '/Suraj_Resume_1Page.pdf',
    badge: 'QUICK_READ',
  },
  {
    title: 'resume_full.pdf',
    description: 'The complete build log — expanded experience, all projects, education, achievements, and certifications.',
    href: '/Suraj_Resume.pdf',
    badge: 'FULL_DETAIL',
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
            className="fixed inset-0 z-[60] bg-void/80 backdrop-blur-sm"
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
            <div className="border border-neon-cyan/30 bg-void-deep shadow-[0_0_40px_rgba(94,236,255,0.15)]">
              <div className="flex items-center gap-2 border-b border-neon-cyan/20 bg-white/[0.02] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  user@suraj:~/resume $ ls -la
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="ml-auto text-ink-mute transition-colors hover:text-neon-pink"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <p className="mb-6 font-mono text-xs text-ink-mute">Choose a file — it opens in a new tab.</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {resumes.map((r) => (
                    <a
                      key={r.title}
                      href={withBase(r.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col border border-neon-cyan/20 p-5 transition-colors hover:border-neon-pink/60 hover:bg-white/[0.02]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <FileText size={22} className="text-neon-cyan-bright" />
                        <span className="border border-neon-pink/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-neon-pink">
                          {r.badge}
                        </span>
                      </div>
                      <h4 className="mb-2 font-mono text-sm font-bold text-ink">{r.title}</h4>
                      <p className="mb-4 flex-grow font-mono text-[12.5px] leading-snug text-ink-mute">{r.description}</p>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neon-cyan-bright">
                        open_file
                        <ExternalLink size={13} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
