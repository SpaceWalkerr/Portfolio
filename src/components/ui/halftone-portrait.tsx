import { useEffect, useRef } from 'react';

/**
 * HalftonePortrait — "The Press" signature flex.
 *
 * Renders an image as a real-time halftone: a grid of ink dots sized by
 * darkness, redrawn every frame. Dots swell and get pushed away as the
 * cursor moves over them, and the whole plate "breathes" at idle.
 *
 * Pure Canvas 2D — no dependencies. Pauses offscreen, respects
 * prefers-reduced-motion (renders a single static frame instead).
 */

interface HalftonePortraitProps {
  src: string;
  className?: string;
  /** Ink colour of the dots */
  ink?: string;
  /** Approx. number of dot columns (density) */
  columns?: number;
}

interface Sample {
  /** normalized 0..1 position within the plate */
  nx: number;
  ny: number;
  /** 0..1 darkness (1 = solid ink) */
  darkness: number;
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const HalftonePortrait = ({
  src,
  className = '',
  ink = '#17171A',
  columns = 84,
}: HalftonePortraitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let samples: Sample[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    let image: HTMLImageElement | null = null;

    // Cursor state (canvas-local CSS px). Parked far away until first move.
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    /** Sample the image luminance into a dot grid matching the canvas aspect. */
    const buildSamples = () => {
      if (!image || width === 0 || height === 0) return;
      const cols = columns;
      const rows = Math.max(1, Math.round(cols * (height / width)));

      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;

      // cover-fit the image into the sample grid
      const scale = Math.max(cols / image.width, rows / image.height);
      const dw = image.width * scale;
      const dh = image.height * scale;
      octx.drawImage(image, (cols - dw) / 2, (rows - dh) / 2, dw, dh);

      const data = octx.getImageData(0, 0, cols, rows).data;
      samples = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          samples.push({
            nx: (x + 0.5) / cols,
            ny: (y + 0.5) / rows,
            darkness: 1 - lum,
          });
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;

      const cell = width / columns;
      // ease the cursor toward its target for a weighty, printed feel
      mouse.x += (mouse.tx - mouse.x) * 0.14;
      mouse.y += (mouse.ty - mouse.y) * 0.14;

      const influenceRadius = Math.max(60, width * 0.22);
      const t = time * 0.0012;

      // All dots share one fillStyle, so batch them into a single path and
      // a single fill() call instead of one beginPath/arc/fill per dot —
      // with ~6,000 dots/frame at 84 columns, that's the difference between
      // ~18,000 canvas calls and 2, and it was the dominant main-thread cost.
      ctx.beginPath();

      for (const s of samples) {
        const x = s.nx * width;
        const y = s.ny * height;

        // elliptical vignette so the plate fades into the paper
        const ex = (s.nx - 0.5) * 2;
        const ey = (s.ny - 0.44) * 2;
        const eDist = Math.sqrt(ex * ex + ey * ey * 0.92);
        if (eDist >= 1) continue;
        const mask = smoothstep(Math.min(1, Math.max(0, (1 - eDist) / 0.42)));
        if (mask <= 0.02) continue;

        let r = Math.pow(s.darkness, 0.85) * cell * 0.62 * mask;

        // idle breathing — the plate is alive even without a cursor
        r *= 1 + 0.05 * Math.sin(t + s.nx * 7 + s.ny * 9);

        // cursor influence — dots swell and are pushed off their grid
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        let ox = 0;
        let oy = 0;
        if (d < influenceRadius) {
          const f = smoothstep(1 - d / influenceRadius);
          r *= 1 + 1.05 * f;
          if (d > 0.001) {
            const push = (f * cell * 1.4) / d;
            ox = dx * push;
            oy = dy * push;
          }
        }

        if (r < 0.28) continue;
        ctx.moveTo(x + ox + r, y + oy);
        ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
      }

      ctx.fill();
    };

    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion || !visible || samples.length === 0) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSamples();
      if (reducedMotion) draw(0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const img = new Image();
    img.src = src;
    img.decode().then(
      () => {
        image = img;
        resize();
        start();
      },
      () => {
        /* image failed to load — leave the plate blank paper */
      }
    );

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [src, ink, columns]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default HalftonePortrait;
