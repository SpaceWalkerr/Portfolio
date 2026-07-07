/**
 * U-07 preview — a mission-control console. Faint starfield, an amber
 * telemetry readout, and a blinking cursor awaiting the next transmission.
 */
const MissionControlPreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-[#080b12] font-monopress text-[#dce8f5]">
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          'radial-gradient(1px 1px at 20px 30px, rgba(220,232,245,0.5), transparent), radial-gradient(1px 1px at 90px 80px, rgba(220,232,245,0.4), transparent), radial-gradient(1.5px 1.5px at 150px 40px, rgba(220,232,245,0.55), transparent), radial-gradient(1px 1px at 200px 20px, rgba(220,232,245,0.4), transparent)',
        backgroundSize: '220px 110px',
      }}
    />

    <div className="absolute left-3 top-2 flex w-[calc(100%-24px)] justify-between text-[7px] tracking-[0.14em] text-[#ffb020]">
      <span>MISSION SN-2026</span>
      <span>NOMINAL</span>
    </div>

    <div className="absolute inset-x-3 top-[42%] border border-[#ffb020]/30 bg-[#080b12]/70 p-2 text-[8px] leading-[1.7]">
      <div>&gt; CALLSIGN: S. NANDAN</div>
      <div>&gt; STATUS: OPEN_TO_WORK</div>
      <div className="text-[#ffb020]">
        &gt; ACCESS GRANTED
        <span className="animate-mv-caret ml-1 inline-block h-[8px] w-[5px] translate-y-[1px] bg-[#ffb020]" />
      </div>
    </div>

    <div className="absolute bottom-2 left-3 right-3 flex items-baseline justify-between text-[6.5px] uppercase tracking-[0.1em] text-[#6b7d94]">
      <span>Suraj Nandan</span>
      <span>Full-Stack Developer</span>
    </div>
  </div>
);

export default MissionControlPreview;
