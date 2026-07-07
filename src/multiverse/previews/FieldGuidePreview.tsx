/**
 * U-06 preview — a herbarium plate on cream parchment. A fern frond
 * unfurls and wilts on a loop, labelled like a specimen sheet.
 */
const FieldGuidePreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-[#f2ead2] font-monopress text-[#2e2a1f]">
    <div className="absolute left-3 top-2 flex w-[calc(100%-24px)] justify-between text-[7px] tracking-[0.14em] text-[#3f5c33]">
      <span>PLATE NO. SN-2026</span>
      <span>FIG. 1</span>
    </div>

    <svg viewBox="0 0 120 130" className="absolute left-1/2 top-1/2 h-[64%] -translate-x-1/2 -translate-y-1/2" fill="none" stroke="#3f5c33" strokeWidth="1.6" aria-hidden="true">
      <path className="animate-mv-draw" d="M60 118c-1-40 1-76 0-110" />
      <path className="animate-mv-draw" style={{ animationDelay: '0.3s' }} d="M60 90c14-4 22-2 28-10M60 90c-14-6-22-2-30-8" opacity="0.85" />
      <path className="animate-mv-draw" style={{ animationDelay: '0.5s' }} d="M60 60c12-2 18 0 24-8M60 60c-12-4-18 0-26-6" opacity="0.75" />
    </svg>

    <div className="absolute bottom-2 left-3 right-3 flex items-baseline justify-between border-t border-[#2e2a1f]/30 pt-1.5 text-[6.5px] uppercase tracking-[0.1em] text-[#6b6250]">
      <span>Suraj Nandan</span>
      <span>Specimen SN-2026</span>
    </div>
  </div>
);

export default FieldGuidePreview;
