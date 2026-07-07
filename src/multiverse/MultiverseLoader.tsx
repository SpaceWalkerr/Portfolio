import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { sound } from './sound';

/**
 * MultiverseLoader — the cinematic gate.
 *
 * Scattered particles converge to spell "SURAJ" (targets sampled from a
 * rasterized text mask), hold as the phase text advances —
 * "Initializing Suraj Universe…" → "Detecting Realities…" →
 * "Choose Your Dimension" — then burst outward into the starfield as the
 * gate lifts.
 *
 * Fast paths: ?noload (dev/screenshots) and prefers-reduced-motion skip
 * the sequence; a repeat visit in the same session plays a 1s short cut.
 */
interface MultiverseLoaderProps {
  onComplete: () => void;
}

const PHASES = ['Initializing Suraj Universe…', 'Detecting Realities…', 'Choose Your Dimension'];
const ASSEMBLE_MS = 1500;
const HOLD_UNTIL_MS = 2700;
const BURST_MS = 600;
const TOTAL_MS = HOLD_UNTIL_MS + BURST_MS;

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  delay: number;
  vx: number;
  vy: number;
  r: number;
}

const sampleTextTargets = (width: number, height: number): { x: number; y: number }[] => {
  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const ctx = off.getContext('2d', { willReadFrequently: true })!;
  const fontSize = Math.min(180, width / 4.4);
  ctx.font = `900 ${fontSize}px "Archivo Variable", Archivo, "Arial Black", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText('SURAJ', width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const targets: { x: number; y: number }[] = [];
  const stride = Math.max(4, Math.round(fontSize / 34));
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      if (data[(y * width + x) * 4 + 3] > 128) targets.push({ x, y });
    }
  }
  return targets;
};

const MultiverseLoader = ({ onComplete }: MultiverseLoaderProps) => {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<'full' | 'short' | 'skip'>('full');

  // decide the path once, before first paint
  if (typeof window !== 'undefined' && modeRef.current === 'full') {
    if (
      window.location.search.includes('noload') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      modeRef.current = 'skip';
    } else if (sessionStorage.getItem('sn-multiverse-visited')) {
      modeRef.current = 'short';
    }
  }

  useEffect(() => {
    sessionStorage.setItem('sn-multiverse-visited', '1');
    const mode = modeRef.current;

    if (mode === 'skip') {
      setVisible(false);
      onComplete();
      return;
    }

    if (mode === 'short') {
      setPhase(2);
      const t = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1000);
      return () => clearTimeout(t);
    }

    /* ---- full cinematic ---- */
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let cancelled = false;
    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // The text mask MUST wait for the display font: sampling at mount races
    // the webfont load and rasterizes a fallback (verified — the particles
    // converged into a shapeless band instead of the name).
    const boot = async () => {
      try {
        await document.fonts.load('900 180px "Archivo Variable"');
      } catch {
        /* fall back to whatever is available — still renders letterforms */
      }
      if (cancelled) return;

      const targets = sampleTextTargets(width, height);
      const particles: Particle[] = targets.map((t) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(width, height) * (0.4 + Math.random() * 0.5);
        return {
          x: width / 2 + Math.cos(angle) * dist,
          y: height / 2 + Math.sin(angle) * dist,
          tx: t.x,
          ty: t.y,
          delay: Math.random() * 500,
          vx: (Math.random() - 0.5) * 7,
          vy: (Math.random() - 0.5) * 7,
          r: 0.8 + Math.random() * 1.1,
        };
      });

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#E9E4D6';

        for (const p of particles) {
          let x: number;
          let y: number;
          let alpha: number;

          if (elapsed < HOLD_UNTIL_MS) {
            const t = Math.min(1, Math.max(0, (elapsed - p.delay) / ASSEMBLE_MS));
            const e = easeOut(t);
            x = p.x + (p.tx - p.x) * e;
            y = p.y + (p.ty - p.y) * e;
            alpha = 0.25 + 0.75 * e;
          } else {
            // burst outward as the gate lifts
            const t = (elapsed - HOLD_UNTIL_MS) / BURST_MS;
            x = p.tx + p.vx * t * 60;
            y = p.ty + p.vy * t * 60;
            alpha = Math.max(0, 1 - t);
          }

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (elapsed < TOTAL_MS) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      timers.push(setTimeout(() => setPhase(1), 1300));
      timers.push(setTimeout(() => setPhase(2), 2300));
      timers.push(
        setTimeout(() => {
          sound.play('loader-complete');
          setVisible(false);
          onComplete();
        }, TOTAL_MS)
      );
    };
    boot();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      for (const t of timers) clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[220] flex select-none flex-col items-center justify-center bg-[#05060a]"
        >
          <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

          <div className="absolute bottom-[14vh] flex flex-col items-center gap-4 px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="font-monopress text-[11px] uppercase tracking-[0.5em] text-[#E9E4D6]/80"
              >
                {PHASES[phase]}
              </motion.p>
            </AnimatePresence>

            <div className="h-px w-40 overflow-hidden bg-[#E9E4D6]/10">
              <motion.div
                className="h-full bg-[#E9E4D6]/70"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: TOTAL_MS / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MultiverseLoader;
