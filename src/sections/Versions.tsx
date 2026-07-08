import { type CSSProperties } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import LazyVideo from "../components/LazyVideo";
import { getVideo, getPoster } from "../lib/assets";
import { VERSIONS, versionUrl, type Version } from "../data/versions";

// Firefly-squid loop as the coda's atmosphere — the one creature not tied to a
// depth in the descent, its pixel-like glow a fitting backdrop for the "modes".
const squidVideo = getVideo("firefly-squid");
const squidPoster = getPoster("firefly-squid");

/**
 * A coda after the abyssal floor: the same portfolio rebuilt in eight different
 * design modes (A–H). Each card opens its own standalone build in a new tab.
 * Not part of the creature descent, so it sits outside the depth gauge; the
 * heading uses the comb-spectrum to signal it's the "all modes at once" moment.
 */
function VersionCard({ v, i }: { v: Version; i: number }) {
  return (
    <motion.a
      href={versionUrl(v.id)}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-500"
      style={{ "--v": v.accent, "--vrgb": v.accentRgb } as CSSProperties}
    >
      {/* accent edge glow on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 34px -10px rgba(var(--vrgb),0.6)", border: "1px solid rgba(var(--vrgb),0.5)" }}
      />

      <div className="mb-5 flex items-center justify-between">
        {/* the version letter, instrument-style */}
        <span
          className="font-mono text-3xl font-bold leading-none"
          style={{ color: "var(--v)", textShadow: "0 0 20px rgba(var(--vrgb),0.5)" }}
        >
          {v.id}
        </span>
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "var(--v)", boxShadow: "0 0 12px 1px rgba(var(--vrgb),0.8)" }}
        />
      </div>

      <h3 className="mb-2 font-display text-xl font-medium text-text-primary">{v.name}</h3>
      <p className="mb-6 flex-grow text-sm leading-relaxed text-text-muted">{v.descriptor}</p>

      <span
        className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="transition-colors group-hover:text-[color:var(--v)]">
          View in this mode
        </span>
        <span className="transition-transform group-hover:translate-x-1" style={{ color: "var(--v)" }}>↗</span>
      </span>
    </motion.a>
  );
}

export default function Versions() {
  return (
    <section
      id="versions"
      className="relative isolate flex min-h-[100vh] w-full flex-col justify-center overflow-hidden bg-abyss-black"
    >
      {/* firefly-squid atmosphere */}
      {squidVideo && (
        <LazyVideo
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src={squidVideo}
          poster={squidPoster}
          opacity={0.16}
        />
      )}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,9,16,0.85) 0%, rgba(5,9,16,0.7) 50%, rgba(5,9,16,0.92) 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-12 md:py-36">
        <Reveal>
          <p
            className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.24em]"
            style={{
              background: "var(--comb-spectrum)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Eight modes · one portfolio
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-4 font-display text-4xl font-light tracking-tight text-text-primary md:text-5xl">
            Versions
          </h2>
          <div className="mb-14 h-0.5 w-24 rounded-full" style={{ background: "var(--comb-spectrum)" }} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-12 max-w-xl text-base leading-relaxed text-text-muted">
            The same work, rebuilt eight ways. Each is a complete, standalone design —
            open any one to explore it in that mode.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VERSIONS.map((v, i) => (
            <VersionCard key={v.id} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
