import { useEffect, useRef } from 'react';

/**
 * Starfield — the multiverse's ambient space.
 *
 * Three parallax star layers on one canvas: deep stars barely move, near
 * stars drift faster and answer the cursor more strongly, so the page has
 * real depth without any 3D engine. Pauses when the tab is hidden;
 * reduced-motion renders one static frame.
 */
interface Star {
  x: number;
  y: number;
  r: number;
  layer: number; // 0 deep · 1 mid · 2 near
  twinkle: number;
}

const LAYER_PARALLAX = [6, 16, 34];
const LAYER_DRIFT = [0.6, 1.4, 2.6];
const LAYER_ALPHA = [0.35, 0.55, 0.85];

const Starfield = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let running = false;

    // eased cursor, normalized to -1..1
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const seed = () => {
      const count = Math.min(380, Math.round((width * height) / 4200));
      stars = Array.from({ length: count }, () => {
        const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.5 + layer * 0.45 + Math.random() * 0.6,
          layer,
          twinkle: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      for (const s of stars) {
        const drift = reducedMotion ? 0 : (time * 0.001 * LAYER_DRIFT[s.layer]) % width;
        const px = mouse.x * LAYER_PARALLAX[s.layer];
        const py = mouse.y * LAYER_PARALLAX[s.layer] * 0.6;
        const x = (((s.x + drift + px) % width) + width) % width;
        const y = (((s.y + py) % height) + height) % height;

        const tw = reducedMotion ? 1 : 0.7 + 0.3 * Math.sin(time * 0.0012 + s.twinkle);
        ctx.globalAlpha = LAYER_ALPHA[s.layer] * tw;
        ctx.fillStyle = '#E9E4D6';
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reducedMotion) draw(0);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / width) * 2 - 1;
      mouse.ty = (e.clientY / height) * 2 - 1;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 ${className}`} aria-hidden="true">
      {/* nebula tints — one faint breath of each universe's colour */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(50% 40% at 12% 20%, rgba(198,57,43,0.08), transparent 70%)',
            'radial-gradient(45% 40% at 88% 24%, rgba(255,94,168,0.07), transparent 70%)',
            'radial-gradient(50% 45% at 16% 82%, rgba(139,124,246,0.07), transparent 70%)',
            'radial-gradient(45% 42% at 86% 80%, rgba(79,143,217,0.08), transparent 70%)',
          ].join(','),
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default Starfield;
