import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import type { Certificate } from './certificate-card';
import { withBase } from '../../lib/utils';

interface CertificateModalProps {
  certificate: Certificate | null;
  certificates: Certificate[];
  onClose: () => void;
  onNavigate: (certificate: Certificate) => void;
}

const isJpgUrl = (url?: string): boolean => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

export const CertificateModal = ({
  certificate,
  certificates,
  onClose,
  onNavigate,
}: CertificateModalProps) => {
  const currentIndex = certificate ? certificates.findIndex((c) => c.title === certificate.title) : -1;

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(certificates[currentIndex - 1]);
    }
  }, [currentIndex, certificates, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < certificates.length - 1) {
      onNavigate(certificates[currentIndex + 1]);
    }
  }, [currentIndex, certificates, onNavigate]);

  useEffect(() => {
    if (!certificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
        case 'ArrowRight':
          goNext();
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [certificate, onClose, goPrev, goNext]);

  if (!certificate) return null;

  const isJpg = isJpgUrl(certificate.url);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < certificates.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-4 z-50 flex flex-col border-2 border-ink bg-paper shadow-2xl sm:inset-8 md:inset-12 lg:inset-x-[8%] lg:inset-y-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate: ${certificate.title}`}
      >
        {/* Masthead bar */}
        <div className="flex items-center justify-between border-b-4 border-double border-ink bg-paper px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-base italic">The Archive Vault</span>
            <span className="hidden font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute sm:inline">
              {currentIndex + 1} / {certificates.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Navigation buttons */}
            <button
              onClick={goPrev}
              disabled={!hasPrev}
              aria-label="Previous certificate"
              className={`border p-1.5 transition-colors ${
                hasPrev
                  ? 'border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper'
                  : 'border-ink/10 text-ink-faint cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goNext}
              disabled={!hasNext}
              aria-label="Next certificate"
              className={`border p-1.5 transition-colors ${
                hasNext
                  ? 'border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper'
                  : 'border-ink/10 text-ink-faint cursor-not-allowed'
              }`}
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {/* Document viewer */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#f5f3ed]">
            {isJpg ? (
              <img
                src={certificate.url!}
                alt={certificate.title}
                className="max-h-full max-w-full object-contain p-4"
              />
            ) : (
              <iframe
                src={withBase(certificate.url!)}
                title={certificate.title}
                className="h-full w-full"
                style={{ border: 'none' }}
              />
            )}

            {/* Corner navigation hints for PDFs */}
            {!isJpg && (
              <a
                href={withBase(certificate.url!)}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-1.5 border border-ink/30 bg-paper/90 px-3 py-2 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper"
              >
                <ExternalLink size={12} />
                Open in New Tab
              </a>
            )}
          </div>

          {/* Metadata sidebar */}
          <div className="flex-shrink-0 border-t border-ink/20 bg-paper-bright p-5 lg:w-72 lg:border-t-0 lg:border-l lg:border-ink/20">
            <div className="space-y-5">
              {/* Category */}
              <div>
                <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                  Category
                </span>
                <p className="mt-1 font-monopress text-[11px] uppercase tracking-[0.1em] text-ink">
                  {certificate.category}
                </p>
              </div>

              {/* Title */}
              <div>
                <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                  Title
                </span>
                <h3 className="mt-1 font-display text-lg font-black uppercase leading-[1.05] tracking-[-0.01em]">
                  {certificate.title}
                </h3>
              </div>

              {/* Platform */}
              <div>
                <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                  Issued By
                </span>
                <p className="mt-1 font-editorial text-[15px] italic text-ink">
                  {certificate.platform}
                </p>
              </div>

              {/* Year */}
              <div>
                <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                  Date
                </span>
                <p className="mt-1 font-editorial text-[15px] italic text-ink">
                  {certificate.year}
                </p>
              </div>

              {/* Score */}
              {certificate.score && (
                <div>
                  <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    Score / Notes
                  </span>
                  <p className="mt-1 font-editorial text-[15px] italic text-oxblood">
                    {certificate.score}
                  </p>
                </div>
              )}

              {/* Action */}
              {certificate.url && (
                <div className="pt-2">
                  <a
                    href={withBase(certificate.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-ink px-4 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <FileText size={14} />
                    Open PDF / Image
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

