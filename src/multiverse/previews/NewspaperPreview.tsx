/**
 * U-01 preview — a miniature front page. Halftone dots swell on card hover
 * (driven by the parent's `group` class), an ink roller sweeps the masthead,
 * and the headline sits in hot-metal serif.
 */
const NewspaperPreview = () => (
  <div className="relative h-full w-full overflow-hidden bg-paper text-ink">
    <div className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-multiply" />

    <div className="flex h-full flex-col px-4 py-3">
      {/* masthead with sweeping ink roller */}
      <div className="relative overflow-hidden border-b-2 border-double border-ink pb-1.5">
        <span className="font-editorial text-sm italic">The Nandan Review</span>
        <div className="animate-mv-ink-roll absolute inset-y-0 w-1/4 bg-ink/10" />
      </div>

      <div className="mt-2 flex flex-1 gap-3">
        <div className="flex-1">
          <div className="font-display text-[17px] font-black uppercase leading-[0.95] tracking-[-0.02em]">
            Developer
            <br />
            Ships the
            <br />
            <span className="relative inline-block">
              Future
              <span className="absolute -left-px -right-px bottom-[2px] -z-10 h-[5px] bg-vermilion" />
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {[100, 85, 92, 70].map((w, i) => (
              <div key={i} className="h-[3px] bg-ink/25" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        {/* halftone portrait plate — dots swell when the card is hovered */}
        <div className="relative w-[42%] border border-ink bg-paper-bright">
          <div
            className="absolute inset-1 transition-all duration-500 [background-size:5px_5px] group-hover:[background-size:6.5px_6.5px]"
            style={{
              backgroundImage: 'radial-gradient(circle, #17171A 0 1.1px, transparent 1.45px)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 42%, #000 35%, transparent 78%)',
              maskImage: 'radial-gradient(circle at 50% 42%, #000 35%, transparent 78%)',
            }}
          />
          <span className="absolute bottom-1 left-1.5 font-monopress text-[6px] uppercase tracking-[0.14em] text-ink-mute">
            Fig. 1
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-baseline justify-between border-t border-ink pt-1.5 font-monopress text-[7px] uppercase tracking-[0.16em] text-ink-mute">
        <span>Vol. 01 — No. 01</span>
        <span className="text-oxblood">Late Edition</span>
      </div>
    </div>
  </div>
);

export default NewspaperPreview;
