import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon } from 'lucide-react';
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

/**
 * A compact archive entry: icon, title, issuer and year on two short lines.
 * Clicking an entry with a file opens it in the certificate modal.
 */
export const CertificateCard = ({ certificate, index, onSelect }: CertificateCardProps) => {
  const isImage = isJpgUrl(certificate.url);
  const catColor = categoryColors[certificate.category] || 'bg-ink text-paper';
  const Icon = isImage ? ImageIcon : FileText;

  return (
    <motion.div
      variants={pressReveal}
      custom={index % 4}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      // Credentials listed without a file (no `url`) are shown but not openable
      {...(certificate.url
        ? {
            onClick: () => onSelect(certificate),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(certificate);
              }
            },
            role: 'button',
            tabIndex: 0,
            'aria-label': `View certificate: ${certificate.title}`,
            'data-cursor': 'hover',
          }
        : {})}
      className={`group flex h-full items-start gap-3 border border-ink/25 bg-paper px-3 py-2.5 transition-colors ${
        certificate.url ? 'cursor-pointer hover:border-ink hover:bg-paper-bright' : ''
      }`}
    >
      <Icon
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className={`mt-0.5 shrink-0 transition-colors ${certificate.url ? 'text-ink-mute group-hover:text-oxblood' : 'text-ink-faint'}`}
      />
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-[12.5px] font-bold uppercase leading-[1.15] tracking-[-0.005em] text-ink group-hover:text-oxblood">
          {certificate.title}
        </h4>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="min-w-0 truncate font-editorial text-[12px] italic text-ink-mute">{certificate.platform}</span>
          <span className="ml-auto shrink-0 font-monopress text-[9px] uppercase tracking-[0.1em] text-ink-faint">
            {certificate.year}
          </span>
        </div>
        {(certificate.score || certificate.category) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className={`px-1.5 py-px font-monopress text-[7.5px] uppercase tracking-[0.12em] ${catColor}`}>
              {certificate.category}
            </span>
            {certificate.score && (
              <span className="font-monopress text-[8.5px] uppercase tracking-[0.08em] text-oxblood">{certificate.score}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
