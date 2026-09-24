import { motion } from 'framer-motion';
import { ExternalLink, Search, X } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
import { PressSection, SectionMasthead, PressButton, pressReveal } from './ui/press';
import { CertificateCard } from './ui/certificate-card';
import { CertificateModal } from './ui/certificate-modal';
import type { Certificate } from './ui/certificate-card';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { withBase } from '../lib/utils';
import { certifications, notableAchievements, certificationCategories } from '../data/certifications';

// Three.js is a heavy dependency (~130KB gzipped) — code-split AND gated on
// actual scroll visibility (see useInViewOnce below), since this section is
// unconditionally mounted and React.lazy alone would fetch it on first
// render, defeating the point.
const WaxSeal = lazy(() => import('./ui/wax-seal'));

const featuredCerts = certifications.filter((c) => c.featured);
const otherCerts = certifications.filter((c) => !c.featured);

const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [query, setQuery] = useState('');
  const seal = useInViewOnce<HTMLDivElement>();

  const q = query.trim().toLowerCase();
  const matches = (c: Certificate) =>
    [c.title, c.platform, c.category, c.year, c.score ?? ''].some((f) => f.toLowerCase().includes(q));

  // A search looks across the whole archive, featured entries included
  const visibleOther = q
    ? certifications.filter(matches)
    : activeFilter === 'All' || activeFilter === 'Featured'
      ? otherCerts
      : otherCerts.filter((c) => c.category === activeFilter);

  const showFeatured = !q && (activeFilter === 'All' || activeFilter === 'Featured');
  const showOther = (q || activeFilter !== 'Featured') && visibleOther.length > 0;

  return (
    <PressSection id="certifications" className="bg-paper-bright">
      <SectionMasthead
        section="Section F"
        name="The Archive"
        headline="Certifications &amp; Achievements"
        standfirst="Validated skills and milestones, indexed by category — a record of continuous learning."
      />

      {/* Search the archive */}
      <div className="mb-4 flex items-center gap-3 border border-ink/40 bg-paper px-4 focus-within:border-ink">
        <Search size={16} className="shrink-0 text-ink-mute" />
        <label htmlFor="cert-search" className="sr-only">
          Search certifications
        </label>
        <input
          id="cert-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${certifications.length} entries — e.g. "Java", "NPTEL", "hackathon"`}
          className="w-full bg-transparent py-3 font-editorial text-[15px] text-ink placeholder:text-ink-faint focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="shrink-0 p-1 text-ink-mute hover:text-ink"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filter — index tabs */}
      <div className={`mb-10 flex flex-wrap gap-2 border-y border-ink py-4 ${q ? 'pointer-events-none opacity-40' : ''}`}>
        {certificationCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={`px-3.5 py-1.5 font-monopress text-[9.5px] uppercase tracking-[0.14em] transition-colors ${
              activeFilter === category
                ? 'bg-ink text-paper'
                : 'border border-ink/30 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured — Notable Achievements ledger */}
      {showFeatured && (
        <motion.div
          variants={pressReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mb-14"
        >
          <h3 className="mb-1 font-display text-2xl font-black uppercase tracking-[-0.01em]">
            Notable Achievements
          </h3>
          <p className="mb-6 font-editorial text-sm italic text-ink-mute">
            The most impactful entries in the record.
          </p>

          <div ref={seal.ref} className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {notableAchievements.map((item, i) => (
              <div key={item.title} className="flex gap-4 border-t-2 border-ink pt-3">
                {i === 0 && seal.inView ? (
                  <Suspense
                    fallback={
                      <span className="font-editorial text-2xl italic text-oxblood">01</span>
                    }
                  >
                    <WaxSeal size={40} className="flex-shrink-0 -mt-1" />
                  </Suspense>
                ) : (
                  <span className="font-editorial text-2xl italic text-oxblood">{`0${i + 1}`}</span>
                )}
                <div>
                  <h4 className="font-display text-sm font-bold uppercase tracking-[0.02em]">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-editorial text-[13px] leading-snug text-ink-mute">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured certificate row */}
          <div className="mt-10 divide-y divide-ink/20 border-y border-ink">
            {featuredCerts.map((cert) => (
              <a
                key={cert.title}
                href={withBase(cert.url!)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <span className="font-editorial text-[15px] text-ink group-hover:text-oxblood sm:text-base">
                    {cert.title}
                  </span>
                  <span className="ml-2 font-monopress text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    {cert.platform}
                  </span>
                  {cert.score && (
                    <span className="ml-2 font-monopress text-[9.5px] uppercase tracking-[0.08em] text-oxblood">
                      {cert.score}
                    </span>
                  )}
                </div>
                <span className="flex flex-shrink-0 items-center gap-1.5 font-monopress text-[10px] uppercase tracking-[0.14em] text-ink-mute group-hover:text-ink">
                  {cert.year}
                  <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Other certifications — Archive Vault (masonry gallery) */}
      {showOther && (
        <motion.div
          variants={pressReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <h3 className="mb-6 font-display text-2xl font-black uppercase tracking-[-0.01em]">
            {q
              ? `${visibleOther.length} ${visibleOther.length === 1 ? 'entry' : 'entries'} for “${query.trim()}”`
              : activeFilter === 'All'
                ? 'All Other Entries'
                : activeFilter}
          </h3>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {(showAll || q ? visibleOther : visibleOther.slice(0, 12)).map((cert, index) => (
              <div key={cert.title} className="mb-5 break-inside-avoid">
                <CertificateCard
                  certificate={cert}
                  index={index}
                  onSelect={setSelectedCertificate}
                />
              </div>
            ))}
          </div>

          {!q && visibleOther.length > 12 && (
            <div className="mt-8 flex justify-center">
              <PressButton variant="outline" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : `View All (${visibleOther.length})`}
              </PressButton>
            </div>
          )}
        </motion.div>
      )}

      {q && visibleOther.length === 0 && (
        <p className="border-y border-ink/30 py-8 text-center font-editorial text-[15px] italic text-ink-mute">
          Nothing on file for “{query.trim()}”.
        </p>
      )}

      {/* Certificate detail modal */}
      <CertificateModal
        certificate={selectedCertificate}
        certificates={visibleOther}
        onClose={() => setSelectedCertificate(null)}
        onNavigate={setSelectedCertificate}
      />
    </PressSection>
  );
};

export default Certifications;
