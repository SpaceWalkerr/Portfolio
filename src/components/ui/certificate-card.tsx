import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useTilt3D } from '../../hooks/useTilt3D';
import { pressReveal } from './press';

export interface Certificate {
  title: string;
  platform: string;
  year: string;
  category: string;
  url?: string;
  featured?: boolean;
  score?: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  onSelect: (certificate: Certificate) => void;
}

const isJpgUrl = (url?: string): boolean => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

const categoryColors: Record<string, string> = {
  'Programming': 'bg-ink text-paper',
  'Web Development': 'bg-oxblood text-paper',
  'AI/ML': 'bg-vermilion text-paper',
  'Cloud/DevOps': 'bg-ink-mute text-paper',
  'Certifications': 'bg-ink text-paper',
  'Workshops': 'bg-ink-mute text-paper',
  'Competitions': 'bg-oxblood text-paper',
  'Leadership': 'bg-vermilion text-paper',
  'National Programs': 'bg-ink text-paper',
};

export const CertificateCard = ({ certificate, index, onSelect }: CertificateCardProps) => {
  const tilt = useTilt3D({ max: 5, glare: false });
  const isJpg = isJpgUrl(certificate.url);
  const catColor = categoryColors[certificate.category] || 'bg-ink text-paper';

  return (
    <motion.div
      ref={tilt.ref}
      variants={pressReveal}
      custom={index % 4}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{
        transformPerspective: 1000,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      onClick={() => onSelect(certificate)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(certificate);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View certificate: ${certificate.title}`}
      className="group relative cursor-pointer break-inside-avoid border border-ink/30 bg-paper transition-colors hover:border-ink"
      data-cursor="hover"
    >
      {/* Preview area */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/20 bg-paper-bright">
        {isJpg ? (
          <>
            <img
              src={certificate.url!}
              alt={certificate.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
          </>
        ) : (
          /* PDF / generic document cover */
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-paper-bright p-6 transition-colors group-hover:bg-ink/5">
            <FileText
              size={48}
              className="text-ink-mute transition-colors group-hover:text-oxblood"
              strokeWidth={1.2}
            />
            <span className="text-center font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-faint">
              PDF Document
            </span>
            {/* Decorative lines to suggest a document */}
            <div className="mt-2 w-3/4 space-y-1.5 opacity-40">
              <div className="h-[2px] w-full bg-ink-mute" />
              <div className="h-[2px] w-2/3 bg-ink-mute" />
              <div className="h-[2px] w-5/6 bg-ink-mute" />
              <div className="h-[2px] w-1/2 bg-ink-mute" />
            </div>
          </div>
        )}

        {/* Category badge */}
        <span
          className={`absolute right-2 top-2 px-2 py-0.5 font-monopress text-[8px] uppercase tracking-[0.12em] ${catColor}`}
        >
          {certificate.category}
        </span>

        {/* Score badge */}
        {certificate.score && (
          <span className="absolute bottom-2 left-2 bg-paper/90 px-2 py-0.5 font-monopress text-[8px] uppercase tracking-[0.08em] text-ink shadow-sm">
            {certificate.score}
          </span>
        )}

        {/* Hover overlay indicator */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/20">
          <span className="translate-y-2 border border-paper bg-ink px-3 py-1.5 font-monopress text-[9px] uppercase tracking-[0.14em] text-paper opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Document →
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-3.5">
        <h4 className="font-display text-sm font-bold uppercase leading-[1.1] tracking-[-0.01em] text-ink group-hover:text-oxblood">
          {certificate.title}
        </h4>
        <div className="mt-1.5 flex items-baseline justify-between gap-2">
          <span className="truncate font-editorial text-[12px] italic text-ink-mute">
            {certificate.platform}
          </span>
          <span className="shrink-0 font-monopress text-[9px] uppercase tracking-[0.1em] text-ink-faint">
            {certificate.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

