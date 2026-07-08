import SectionShell from "../components/SectionShell";
import Reveal from "../components/Reveal";
import { section } from "../lib/sections";
import { SKILLS } from "../data/content";

const { def, index } = section("skills");

interface Group {
  group: string;
  items: string[];
}

function SkillGroup({ group, items, baseDelay }: Group & { baseDelay: number }) {
  return (
    <div>
      <Reveal delay={baseDelay}>
        <p className="readout mb-4" style={{ color: "var(--accent)" }}>
          {group}
        </p>
      </Reveal>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item, i) => (
          <Reveal key={item} delay={baseDelay + 0.03 * i} as="span">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-text-primary">
              {/* steady photophore dot instead of a progress bar */}
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent)", boxShadow: "0 0 8px 0 rgba(var(--accent-rgb),0.7)" }}
              />
              {item}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    // Single lanternfish loop (the section's assigned mesopelagic creature).
    <SectionShell section={def} index={index} loopOpacity={0.24}>
      <Reveal>
        <p className="eyebrow mb-4">Mesopelagic — the twilight</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="accent-underline mb-14 font-display text-4xl font-light tracking-tight text-text-primary md:text-5xl">
          Skills
        </h2>
      </Reveal>

      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        {/* lanternfish half — steady rows */}
        <div className="space-y-10">
          <p className="readout text-[0.6rem] opacity-60">Lanternfish · what I build with</p>
          {SKILLS.lantern.map((g, i) => (
            <SkillGroup key={g.group} {...g} baseDelay={0.1 + i * 0.05} />
          ))}
        </div>

        {/* firefly-squid half — API / data */}
        <div className="space-y-10">
          <p className="readout text-[0.6rem] opacity-60">Firefly squid · APIs &amp; data</p>
          {SKILLS.squid.map((g, i) => (
            <SkillGroup key={g.group} {...g} baseDelay={0.15 + i * 0.05} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
