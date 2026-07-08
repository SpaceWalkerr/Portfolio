import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionShell from "../components/SectionShell";
import ResumeModal from "../components/ResumeModal";
import { section } from "../lib/sections";
import { PROFILE } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/gsap";

const { def, index } = section("hero");

/** Word-by-word pull-up for the name + role. */
function PullUp({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.08 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const heroEl = document.getElementById("hero");
    const ctx = gsap.context(() => {
      // As the visitor scrolls off the surface, the hero title sinks, scales up
      // and dissolves into blur — as if diving down through it into the descent.
      gsap.to(contentRef.current, {
        yPercent: -18,
        scale: 1.08,
        opacity: 0,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom 40%", scrub: 0.8 },
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionShell section={def} index={index} loopOpacity={0.3}>
      <div ref={contentRef} className="max-w-4xl">
        <motion.p
          className="readout mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Surface — 0M
        </motion.p>

        <h1 className="font-display text-[15vw] font-light leading-[0.95] tracking-tight text-text-primary sm:text-7xl md:text-8xl">
          <PullUp text={PROFILE.name} delay={0.15} />
        </h1>
        <p className="mt-3 font-display text-2xl font-light text-text-muted md:text-4xl">
          <PullUp text="Full Stack Developer" delay={0.45} />
        </p>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          {/* Amber foreshadows the Projects section (brief: Hero). */}
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group rounded-full px-6 py-3 text-sm font-medium text-abyss-black transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--anglerfish-amber)", boxShadow: "0 0 24px 0 rgba(255,179,71,0.35)" }}
          >
            View Projects
            <span className="ml-2 inline-block transition-transform group-hover:translate-y-0.5">↓</span>
          </button>
          <button
            onClick={() => setResumeOpen(true)}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-white/40"
          >
            Resume
          </button>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.3] }}
        transition={{ delay: 1.4, duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className="readout text-[0.6rem]">Scroll to descend</span>
      </motion.div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </SectionShell>
  );
}
