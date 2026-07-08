import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "../components/SectionShell";
import Reveal from "../components/Reveal";
import { section } from "../lib/sections";
import { EXPERIENCE, type Role } from "../data/content";

const { def, index } = section("experience");

function RoleCard({ role, delay }: { role: Role; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className="group relative"
    >
      {/* node on the electric pathway */}
      <span
        className="absolute -left-[34px] top-1.5 h-2.5 w-2.5 rounded-full transition-shadow duration-500 md:-left-[42px]"
        style={{
          background: inView ? "var(--accent)" : "rgba(124,147,163,0.4)",
          boxShadow: inView ? "0 0 12px 1px rgba(var(--accent-rgb),0.8)" : "none",
        }}
      />
      {/* card — left border lights in accent on scroll-into-view */}
      <div
        className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6"
        style={{
          borderLeftWidth: 2,
          borderLeftColor: inView ? "var(--accent)" : "rgba(255,255,255,0.08)",
          transition: "border-left-color 0.7s ease",
        }}
      >
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-medium text-text-primary">{role.title}</h3>
          <span className="readout">{role.period}</span>
        </div>
        <p className="mb-4 text-sm">
          {role.companyUrl ? (
            <a
              href={role.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
              style={{ color: "var(--accent)" }}
            >
              {role.company} ↗
            </a>
          ) : (
            <span style={{ color: "var(--accent)" }}>{role.company}</span>
          )}
          <span className="text-text-muted"> · {role.location}</span>
        </p>
        <p className="mb-4 text-sm leading-relaxed text-text-muted">{role.summary}</p>
        <ul className="mb-5 space-y-2">
          {role.bullets.map((b, j) => (
            <li key={j} className="flex gap-3 text-sm leading-relaxed text-text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted/50" />
              {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {role.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[0.7rem] text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <SectionShell section={def} index={index} loopOpacity={0.26}>
      <Reveal>
        <p className="eyebrow mb-4">Mesopelagic — the current</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="accent-underline mb-16 font-display text-4xl font-light tracking-tight text-text-primary md:text-5xl">
          Experience
        </h2>
      </Reveal>

      <div className="relative pl-8 md:pl-10">
        {/* timeline connector = the eel's electric pathway */}
        <div className="absolute left-[3px] top-1 h-full w-px bg-white/10" />
        <div
          className="absolute left-[2px] top-1 h-full w-[3px] animate-current-flow"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--accent) 20%, transparent 60%, var(--accent) 85%, transparent)",
            backgroundSize: "100% 200%",
            opacity: 0.6,
            filter: "blur(0.5px)",
          }}
        />

        <div className="space-y-12">
          {EXPERIENCE.map((role, i) => (
            <RoleCard key={role.company + role.period} role={role} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
