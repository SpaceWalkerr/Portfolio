/**
 * U-08 preview — an 8-bit boot screen. Chunky pixel grid, a blocky XP bar
 * filling on a loop, and a hard-blinking "PRESS START" prompt.
 */
const ArcadeCabinetPreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-[#14132b] font-monopress text-[#eef0fb]">
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage: 'linear-gradient(rgba(238,240,251,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(238,240,251,0.08) 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      }}
    />

    <div className="absolute left-3 top-2 flex w-[calc(100%-24px)] justify-between text-[7px] tracking-[0.14em] text-[#4fd1e8]">
      <span>SN-2026</span>
      <span>WORLD 1-1</span>
    </div>

    <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="text-[13px] font-bold text-[#ffcc00]" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
        SURAJ
      </div>
      <div className="mt-2 flex justify-center gap-[2px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className={`h-2 w-2 border border-black/30 ${i < 7 ? 'bg-[#ffcc00]' : 'bg-white/10'}`} />
        ))}
      </div>
    </div>

    <div className="animate-mv-caret absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.14em] text-[#eef0fb]">
      Press Start
    </div>
  </div>
);

export default ArcadeCabinetPreview;
