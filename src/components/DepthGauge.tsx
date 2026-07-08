import { useDescent } from "../lib/DescentContext";
import { SECTIONS, formatDepth, MAX_DEPTH } from "../lib/sections";

/**
 * Live depth gauge pinned to the left edge of the viewport. Doubles as the
 * scroll-progress indicator (brief §5): the readout ticks from SURFACE down to
 * 4,000M, and the tick nearest the current depth lights in the active accent.
 */
export default function DepthGauge() {
  const { activeIndex, depth } = useDescent();
  const fillPct = (depth / MAX_DEPTH) * 100;

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-screen w-16 flex-col items-center justify-center md:flex"
    >
      {/* vertical rail */}
      <div className="relative flex h-[62vh] w-px flex-col justify-between bg-white/10">
        {/* progress fill */}
        <div
          className="absolute left-0 top-0 w-px"
          style={{
            height: `${fillPct}%`,
            background: "var(--accent)",
            boxShadow: "0 0 10px 0 rgba(var(--accent-rgb), 0.7)",
          }}
        />

        {/* depth ticks */}
        {SECTIONS.map((s, i) => {
          const top = (s.depth / MAX_DEPTH) * 100;
          const isActive = i === activeIndex;
          return (
            <div
              key={s.id}
              className="absolute left-1/2 flex -translate-x-1/2 items-center"
              style={{ top: `${top}%` }}
            >
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width: isActive ? 7 : 4,
                  height: isActive ? 7 : 4,
                  background: isActive ? "var(--accent)" : "rgba(124,147,163,0.5)",
                  boxShadow: isActive
                    ? "0 0 12px 2px rgba(var(--accent-rgb), 0.8)"
                    : "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* live readout */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <span
          className="readout tabular-nums"
          style={{ color: "var(--accent)", writingMode: "horizontal-tb" }}
        >
          {formatDepth(depth)}
        </span>
        <span className="readout text-[0.6rem] opacity-60">
          {SECTIONS[activeIndex]?.zone}
        </span>
      </div>
    </aside>
  );
}
