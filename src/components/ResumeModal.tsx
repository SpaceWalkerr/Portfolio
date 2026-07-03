import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumes = [
  {
    title: '1-Page Resume',
    description:
      'A concise, recruiter-friendly single-page snapshot of my experience, projects, and skills.',
    href: '/Suraj_Resume_1Page.pdf',
    accent: 'from-cyan-500 to-blue-600',
    badge: 'Quick read',
  },
  {
    title: 'Detailed Resume',
    description:
      'The full version with expanded experience, all projects, education, achievements, and certifications.',
    href: '/Suraj_Resume.pdf',
    accent: 'from-violet-500 to-fuchsia-600',
    badge: 'Full detail',
  },
];

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[60] w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2"
            role="dialog"
            aria-modal="true"
            aria-label="View resume"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-8">
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-xl border border-slate-700/50 bg-slate-900/70 p-2 text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-white"
              >
                <X size={18} />
              </button>

              <h3 className="mb-1 text-2xl font-bold text-white sm:text-3xl">View Resume</h3>
              <p className="mb-6 text-sm text-slate-400">
                Choose a version — it opens in a new tab.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {resumes.map((r) => (
                  <a
                    key={r.title}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-800/60 hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${r.accent} text-white`}
                      >
                        <FileText size={20} />
                      </div>
                      <span className="rounded-full border border-slate-600/50 bg-slate-900/50 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                        {r.badge}
                      </span>
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-white">{r.title}</h4>
                    <p className="mb-4 flex-grow text-sm text-slate-400">{r.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300">
                      View PDF
                      <ExternalLink size={14} />
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
