/**
 * U-03 preview — floating frosted panes over drifting colour, a rainbow
 * dispersion streak across the front pane. Backdrop-blur does the real
 * refraction work.
 */
const GlassPreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-[#241a4d]">
    {/* colour field behind the glass */}
    <div
      className="absolute -inset-[20%]"
      style={{
        background: [
          'radial-gradient(45% 45% at 25% 30%, #ff7ac6, transparent 65%)',
          'radial-gradient(45% 45% at 75% 60%, #5ad1ff, transparent 65%)',
          'radial-gradient(40% 40% at 55% 20%, #c58bff, transparent 60%)',
        ].join(','),
        filter: 'blur(22px)',
      }}
    />

    {/* back pane */}
    <div className="animate-mv-float absolute left-[12%] top-[22%] h-[52%] w-[46%] rounded-lg border border-white/30 bg-white/10 backdrop-blur-[6px]" />

    {/* front pane with dispersion streak */}
    <div
      className="absolute left-[30%] top-[30%] h-[54%] w-[52%] rounded-xl border border-white/45 bg-white/15 backdrop-blur-[10px]"
      style={{ boxShadow: '0 16px 34px -14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.55)' }}
    >
      <span
        className="absolute left-[10%] top-0 h-[3px] w-[80%] rounded-full opacity-90"
        style={{ background: 'linear-gradient(90deg,#ff5e5e,#ffd15e,#5eff9e,#5ec8ff,#b95eff)' }}
      />
      <div className="flex h-full flex-col items-center justify-center gap-1 text-white">
        <span className="font-monopress text-[7px] uppercase tracking-[0.35em] text-white/75">
          Selected Works
        </span>
        <span className="font-editorial text-lg italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          Suraj Nandan
        </span>
      </div>
    </div>
  </div>
);

export default GlassPreview;
