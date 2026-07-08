import { useEffect, useRef, useState } from "react";

/**
 * A background loop that only plays while it's near the viewport — the rest are
 * paused, and their source isn't even attached until first approach. Playing
 * eight full-screen videos at once is what made the page lag; this keeps at most
 * one or two decoding at a time. Honours reduced-motion by freezing on the poster.
 */
export default function LazyVideo({
  src,
  poster,
  opacity,
  className = "",
}: {
  src: string;
  poster?: string;
  opacity: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Once true, the <video> gets its real src. Stays true after first approach.
  const [active, setActive] = useState(false);
  // Whether this section is currently in view (drives play vs pause).
  const inView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setActive(true);
          // If the src is already attached, resume immediately; otherwise the
          // [active] effect below plays it once the source mounts.
          if (el.getAttribute("src")) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // When the source first mounts (or re-mounts), start playing if still in view.
  useEffect(() => {
    const el = ref.current;
    if (active && el && inView.current) el.play().catch(() => {});
  }, [active]);

  return (
    <video
      ref={ref}
      className={className}
      style={{ opacity }}
      src={active ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      onLoadedData={(e) => {
        // Safety: some browsers need the play call after data is ready.
        if (inView.current) (e.currentTarget as HTMLVideoElement).play().catch(() => {});
      }}
    />
  );
}
