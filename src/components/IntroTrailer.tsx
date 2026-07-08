import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Plays the user's edited opening film full-bleed with nothing drawn over it —
 * just a Skip control. On end / skip / error it dives away to the site. Served
 * from /public (web-optimized H.264, faststart) so it starts instantly.
 */
export default function IntroTrailer({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const done = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const v = videoRef.current;

    const finish = () => {
      if (done.current) return;
      done.current = true;
      let handedOff = false;
      const handoff = () => {
        if (handedOff) return;
        handedOff = true;
        if (rootRef.current) rootRef.current.style.display = "none";
        document.body.style.overflow = "";
        onDone();
      };
      gsap
        .timeline({ onComplete: handoff })
        .to(skipRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" })
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1");
      window.setTimeout(handoff, 1400); // backstop independent of gsap
    };

    v?.play().catch(() => {});
    v?.addEventListener("ended", finish);
    v?.addEventListener("error", finish);

    // If autoplay is blocked (video never starts), don't trap the visitor on a
    // black frame for a minute — hand off. Skip stays available regardless.
    const stallCheck = window.setTimeout(() => {
      if (v && (v.paused || v.readyState < 2)) finish();
    }, 3000);

    // Reveal the skip control after a beat so it doesn't fight the opening frame.
    gsap.fromTo(skipRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.2 });

    return () => {
      clearTimeout(stallCheck);
      v?.removeEventListener("ended", finish);
      v?.removeEventListener("error", finish);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => videoRef.current?.dispatchEvent(new Event("ended"));

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-abyss-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/opening-sequence.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
      />

      {/* the only thing drawn over the film */}
      <SkipHint ref={skipRef} onClick={skip} />
    </div>
  );
}

const SkipHint = forwardRef<HTMLButtonElement, { onClick: () => void }>(
  function SkipHint({ onClick }, ref) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="group absolute bottom-8 right-8 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-black/50 hover:text-white"
      >
        Skip
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
      </button>
    );
  },
);
