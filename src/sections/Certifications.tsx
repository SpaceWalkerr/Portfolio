import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionShell from "../components/SectionShell";
import Reveal from "../components/Reveal";
import { section } from "../lib/sections";
import { CERTIFICATIONS, type Certification } from "../data/content";

const { def, index } = section("certifications");

function CertBadge({ cert, order }: { cert: Certification; order: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  // staggered blink-on (~80ms per badge) mimics flashlight-fish signalling,
  // capped so a long library doesn't crawl in one at a time.
  const lit = inView;
  const delay = Math.min(order, 8) * 0.08;

  // Featured badges get the pink/cyan two-tone; the rest steady cyan.
  const dotColor = cert.featured ? "var(--flashlight-pink)" : "var(--flashlight-cyan)";
  const dotGlow = cert.featured
    ? "0 0 14px 2px rgba(242,63,160,0.85), 0 0 26px 4px rgba(63,224,242,0.4)"
    : "0 0 12px 1px rgba(63,224,242,0.7)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={lit ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
      style={{
        borderColor: lit && cert.featured ? "rgba(242,63,160,0.35)" : undefined,
      }}
    >
      {/* the blinking photophore */}
      <motion.span
        className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
        initial={{ opacity: 0.15 }}
        animate={lit ? { opacity: [0.15, 1, 0.6, 1] } : {}}
        transition={{ duration: 0.6, delay, times: [0, 0.4, 0.7, 1] }}
        style={{ background: lit ? dotColor : "rgba(124,147,163,0.3)", boxShadow: lit ? dotGlow : "none" }}
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-medium leading-snug text-text-primary">{cert.title}</h3>
        <p className="mt-1 text-sm text-text-muted">
          {cert.issuer} · <span className="readout text-[0.6rem]">{cert.year}</span>
        </p>
        {cert.score && (
          <p
            className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium"
            style={{ color: "var(--flashlight-pink)", background: "rgba(242,63,160,0.1)" }}
          >
            {cert.score}
          </p>
        )}
        {cert.url && (
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block text-xs text-text-muted transition-colors hover:text-[color:var(--flashlight-cyan)]"
          >
            View certificate →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <SectionShell section={def} index={index} loopOpacity={0.24}>
      <Reveal>
        <p className="eyebrow mb-4">Bathypelagic — coded signals</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="accent-underline mb-14 font-display text-4xl font-light tracking-tight text-text-primary md:text-5xl">
          Certifications
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((c, i) => (
          <CertBadge key={c.title} cert={c} order={i} />
        ))}
      </div>
    </SectionShell>
  );
}
