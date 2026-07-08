import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionShell from "../components/SectionShell";
import Reveal from "../components/Reveal";
import { section } from "../lib/sections";
import { ABOUT } from "../data/content";

const { def, index } = section("about");

/** Count-up that "ignites" when the stat scrolls into view (brief: About). */
function IgniteStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const id = setTimeout(() => (raf = requestAnimationFrame(tick)), delay * 1000);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="relative">
      {/* the igniting point */}
      <span
        className="mb-3 block h-2 w-2 rounded-full transition-all duration-700"
        style={{
          background: inView ? "var(--accent)" : "rgba(124,147,163,0.3)",
          boxShadow: inView ? "0 0 16px 2px rgba(var(--accent-rgb),0.8)" : "none",
        }}
      />
      <div className="font-display text-5xl font-light tabular-nums text-text-primary md:text-6xl">
        {n}
        <span style={{ color: "var(--accent)" }}>{suffix}</span>
      </div>
      <div className="readout mt-2">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <SectionShell section={def} index={index} loopOpacity={0.22}>
      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Epipelagic — the threshold</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="accent-underline mb-8 font-display text-4xl font-light tracking-tight text-text-primary md:text-5xl">
              About
            </h2>
          </Reveal>
          {ABOUT.bio.map((para, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="mb-5 max-w-prose text-base leading-relaxed text-text-muted">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 self-center md:grid-cols-1 md:gap-10">
          {ABOUT.stats.map((s, i) => (
            <IgniteStat key={s.label} {...s} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
