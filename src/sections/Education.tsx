import SectionShell from "../components/SectionShell";
import Reveal from "../components/Reveal";
import { section } from "../lib/sections";
import { EDUCATION } from "../data/content";

const { def, index } = section("education");

/**
 * The calmest, slowest section (brief: Education). Extra vertical breathing
 * room, the loop a touch more visible, minimal motion — a rest before Projects.
 */
export default function Education() {
  return (
    <SectionShell section={def} index={index} loopOpacity={0.3}>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow mb-4">Mesopelagic — the slow drift</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-16 inline-block accent-underline font-display text-4xl font-light tracking-tight text-text-primary md:text-5xl">
            Education
          </h2>
        </Reveal>

        <div className="space-y-14">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.school} delay={0.1 + i * 0.1}>
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
                  <p className="readout">{e.period}</p>
                  {e.score && (
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ color: "var(--accent)", background: "rgba(var(--accent-rgb),0.1)" }}
                    >
                      {e.score}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-light text-text-primary md:text-3xl">
                  {e.degree}
                </h3>
                <p className="mt-2 text-lg" style={{ color: "var(--accent)" }}>
                  {e.school}
                </p>
                <p className="readout mt-1 text-[0.6rem] opacity-70">
                  {e.location} · {e.status}
                </p>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted">
                  {e.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
