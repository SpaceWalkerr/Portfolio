import { useEffect, useRef } from "react";
import { useDescent } from "../lib/DescentContext";
import { SECTIONS } from "../lib/sections";

/**
 * The one playful move (brief §0, §3, §6): moving the cursor disturbs faint
 * bioluminescent plankton that glow briefly and decay over ~400ms. A single
 * recycled particle pool, colour-shifted to the active section's accent —
 * NOT a new effect per section, and the only signature interaction on the site.
 */
const POOL = 28;
const DECAY_MS = 400;

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  size: number;
  active: boolean;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeIndex } = useDescent();
  // Read active accent without re-subscribing the animation loop each frame.
  const accentRef = useRef<[number, number, number]>(SECTIONS[0].accentRgb);
  accentRef.current = SECTIONS[activeIndex]?.accentRgb ?? SECTIONS[0].accentRgb;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pool: P[] = Array.from({ length: POOL }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, born: 0, size: 0, active: false,
    }));
    let cursor = 0;
    let lastEmit = 0;

    const emit = (x: number, y: number) => {
      const now = performance.now();
      // Throttle so a fast drag doesn't burn the whole pool in one frame.
      if (now - lastEmit < 16) return;
      lastEmit = now;
      const p = pool[cursor];
      cursor = (cursor + 1) % POOL;
      p.x = x;
      p.y = y;
      const a = Math.random() * Math.PI * 2;
      const sp = 0.2 + Math.random() * 0.5;
      p.vx = Math.cos(a) * sp;
      p.vy = Math.sin(a) * sp - 0.15; // slight upward drift, like stirred plankton
      p.born = now;
      p.size = 1 + Math.random() * 2.2;
      p.active = true;
    };

    const onMove = (e: MouseEvent) => emit(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) emit(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    let raf = 0;
    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      const [r, g, b] = accentRef.current;

      for (const p of pool) {
        if (!p.active) continue;
        const age = now - p.born;
        if (age >= DECAY_MS) {
          p.active = false;
          continue;
        }
        const life = 1 - age / DECAY_MS;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = life * life * 0.9;
        const radius = p.size * (0.6 + life);

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4);
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}
