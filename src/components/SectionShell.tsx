import { useEffect, useRef, type ReactNode } from "react";
import type { SectionDef } from "../lib/sections";
import { getVideo, getPoster } from "../lib/assets";
import LazyVideo from "./LazyVideo";
import { gsap, prefersReducedMotion } from "../lib/gsap";

interface Props {
  section: SectionDef;
  index: number;
  children: ReactNode;
  /** Background loop opacity, 0.20–0.35 per brief §3. Default 0.28. */
  loopOpacity?: number;
  /** Suppress the built-in single loop so a section can render its own (Skills). */
  hideLoop?: boolean;
  className?: string;
}

/**
 * Every section's cinematic frame: an oversized, parallaxed creature loop behind
 * a gradient, with the content layer drifting at a different rate — a real depth
 * illusion tied to the scrollbar (GSAP ScrollTrigger, scrub). The loop is
 * atmosphere; it plays only while near the viewport (LazyVideo).
 */
export default function SectionShell({
  section,
  index,
  children,
  loopOpacity = 0.28,
  hideLoop = false,
  className = "",
}: Props) {
  const video = section.asset ? getVideo(section.asset) : undefined;
  const poster = section.asset ? getPoster(section.asset) : undefined;

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Background sinks slowly (depth): starts lifted, drifts down as the
      // section passes — the oversize (-top-[14%] h-[128%]) hides any gap.
      gsap.fromTo(
        bgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
      // Content lifts a touch faster than the frame — foreground parallax.
      gsap.fromTo(
        contentRef.current,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={section.id}
      data-section-index={index}
      className={`${section.accentClass} relative isolate flex min-h-[118vh] w-full flex-col justify-center overflow-hidden ${className}`}
    >
      {/* parallax background layer (oversized so the drift never reveals an edge) */}
      <div ref={bgRef} className="pointer-events-none absolute -inset-x-0 -top-[14%] -z-20 h-[128%] will-change-transform">
        {video && !hideLoop && (
          <LazyVideo
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            poster={poster}
            opacity={loopOpacity}
          />
        )}
      </div>

      {/* gradient overlay — keeps copy legible, deepens toward the abyss */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,9,16,0.72) 0%, rgba(5,9,16,0.55) 45%, rgba(5,9,16,0.82) 100%)",
        }}
      />

      {/* thin accent vignette at the section seam */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,9,16,0) 0%, rgba(5,9,16,0.9) 100%)",
        }}
      />

      <div ref={contentRef} className="mx-auto w-full max-w-6xl px-6 py-32 md:px-12 md:py-44">
        {children}
      </div>
    </section>
  );
}
