/**
 * U-04 preview — a patent sheet on drafting-grid cyanotype. The invention
 * (a lightbulb schematic) draws and erases itself on a loop, with callout
 * annotations and a title block.
 */
const BlueprintPreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-[#0f3f78] font-monopress text-[#eaf2ff]">
    {/* drafting grids */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />

    <div className="absolute left-3 top-2 flex w-[calc(100%-24px)] justify-between text-[7px] tracking-[0.14em] text-[#bcd6f5]">
      <span>PATENT No. SN-2026</span>
      <span>FIG. 1</span>
    </div>

    {/* self-drawing schematic */}
    <svg
      viewBox="0 0 160 150"
      className="absolute left-1/2 top-1/2 h-[68%] -translate-x-1/2 -translate-y-1/2"
      fill="none"
      stroke="#eaf2ff"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        className="animate-mv-draw"
        d="M80 24c-20 0-34 15-34 34 0 14 9 22 14 30 3 5 4 9 4 14h32c0-5 1-9 4-14 5-8 14-16 14-30 0-19-14-34-34-34z"
      />
      <path className="animate-mv-draw" style={{ animationDelay: '0.4s' }} d="M68 58l8 10 8-14 8 14 8-10" />
      <path d="M64 106h32M66 114h28M70 122c3 4 17 4 20 0" opacity="0.85" />
      <line x1="118" y1="40" x2="146" y2="26" opacity="0.7" />
      <circle cx="149" cy="24" r="6" opacity="0.7" />
      <text x="149" y="27" textAnchor="middle" fontSize="7" fill="#bcd6f5" stroke="none">
        1
      </text>
      <line x1="66" y1="120" x2="24" y2="132" opacity="0.7" />
      <circle cx="18" cy="134" r="6" opacity="0.7" />
      <text x="18" y="137" textAnchor="middle" fontSize="7" fill="#bcd6f5" stroke="none">
        2
      </text>
    </svg>

    {/* title block */}
    <div className="absolute bottom-2 right-3 border border-[#eaf2ff]/60 text-[6.5px] leading-relaxed tracking-[0.08em]">
      <div className="border-b border-[#eaf2ff]/35 px-1.5 py-0.5">
        INVENTOR: <span className="text-white">S. NANDAN</span>
      </div>
      <div className="px-1.5 py-0.5">TITLE: FULL-STACK DEVELOPER</div>
    </div>
  </div>
);

export default BlueprintPreview;
