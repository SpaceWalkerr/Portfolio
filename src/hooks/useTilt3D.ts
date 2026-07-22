import { useEffect, useRef } from 'react';
import { useSpring } from 'framer-motion';
import type { MouseEvent } from 'react';

/**
 * useTilt3D — the "hold a printed page" effect.
 *
 * Tracks the cursor within a bounding element and returns spring-eased
 * rotateX/rotateY motion values (for a `perspective` + `transform-style:
 * preserve-3d` wrapper) plus optional glare-position values for a light
 * sheen overlay. No-ops on touch devices and prefers-reduced-motion.
 */
interface Tilt3DOptions {
  /** Max rotation in degrees at the element's edge. */
  max?: number;
  /** Whether to also track a glare highlight position. */
  glare?: boolean;
}

export function useTilt3D({ max = 8, glare = false }: Tilt3DOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);

  const rotateX = useSpring(0, { stiffness: 220, damping: 22, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22, mass: 0.6 });
  const glareX = useSpring(50, { stiffness: 220, damping: 26 });
  const glareY = useSpring(50, { stiffness: 220, damping: 26 });
  const glareOpacity = useSpring(0, { stiffness: 260, damping: 28 });

  useEffect(() => {
    enabled.current =
      window.matchMedia('(pointer: fine) and (hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!enabled.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * max * 2);
    rotateY.set((px - 0.5) * max * 2);
    if (glare) {
      glareX.set(px * 100);
      glareY.set(py * 100);
      glareOpacity.set(0.16);
    }
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return { ref, rotateX, rotateY, glareX, glareY, glareOpacity, onMouseMove, onMouseLeave };
}
