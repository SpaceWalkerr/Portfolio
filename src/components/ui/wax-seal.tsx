import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WaxSeal — "The Press" signature 3D moment.
 *
 * A lit wax medallion with an engraved "SN" face (drawn to a CanvasTexture
 * using the site's own fonts — no separate font-loader module needed).
 * Turns slowly and continuously by default, like a medallion catching the
 * light; call `handle.stamp()` (via `onReady`) to drop it onto the page and
 * seat it with a squash, like a wax seal pressed onto a letter.
 *
 * Pauses off-screen, skips entirely for touch/reduced-motion (a static
 * single frame renders instead so the layout doesn't jump).
 */

export interface WaxSealHandle {
  stamp: () => void;
}

interface WaxSealProps {
  size?: number;
  className?: string;
  /** Called once the scene is ready; call `handle.stamp()` to trigger the drop-and-seal animation. */
  onReady?: (handle: WaxSealHandle) => void;
}

const makeFaceTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Base wax tone (matches oxblood) with a soft radial vignette
  const grad = ctx.createRadialGradient(128, 118, 20, 128, 128, 140);
  grad.addColorStop(0, '#a8402f');
  grad.addColorStop(0.6, '#8a2a2a');
  grad.addColorStop(1, '#6e1f1f');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(128, 128, 124, 0, Math.PI * 2);
  ctx.fill();

  // Engraved ring
  ctx.strokeStyle = 'rgba(233, 228, 214, 0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(128, 128, 100, 0, Math.PI * 2);
  ctx.stroke();

  // Monogram
  ctx.fillStyle = '#E9E4D6';
  ctx.font = '700 92px Georgia, "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SN', 128, 132);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const WaxSeal = ({ size = 96, className = '', onReady }: WaxSealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const scene = new THREE.Scene();
    // Pulled back enough that the medallion sits inside the frame with
    // visible padding — at the original distance the disc overflowed the
    // canvas almost edge-to-edge and read as a flat square, not a coin.
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 10);
    camera.position.set(0, 0.32, 4.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const seal = new THREE.Group();
    const faceTexture = makeFaceTexture();
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x7a2424, roughness: 0.45, metalness: 0.05 });
    const faceMat = new THREE.MeshStandardMaterial({
      map: faceTexture,
      roughness: 0.35,
      metalness: 0.08,
    });
    const backMat = new THREE.MeshStandardMaterial({ color: 0x5c1c1c, roughness: 0.5 });

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1.08, 0.42, 48, 1, false),
      [sideMat, faceMat, backMat]
    );
    // cylinder's "top" cap faces +Y by default; rotate it to face the camera (+Z)
    body.rotation.x = Math.PI / 2;
    seal.add(body);
    scene.add(seal);

    scene.add(new THREE.AmbientLight(0xfff2e6, 0.55));
    const key = new THREE.DirectionalLight(0xfff2e0, 1.1);
    key.position.set(2, 3, 2.5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffe8cf, 0.4);
    rim.position.set(-2, -1, -1.5);
    scene.add(rim);

    // Resting/entry state
    seal.position.y = 0;
    seal.scale.setScalar(1);

    let raf = 0;
    let visible = false;
    let stamping = false;
    let stampStart = 0;
    const STAMP_MS = 620;

    const renderFrame = () => renderer.render(scene, camera);

    const runStamp = () => {
      if (reducedMotion) return;
      stamping = true;
      stampStart = performance.now();
    };

    if (onReady) onReady({ stamp: runStamp });

    const tick = (time: number) => {
      if (!reducedMotion) {
        seal.rotation.y = time * 0.00035;
      }

      if (stamping) {
        const t = Math.min((time - stampStart) / STAMP_MS, 1);
        if (t < 0.55) {
          // fall + spin in from above
          const fallT = t / 0.55;
          const ease = 1 - Math.pow(1 - fallT, 2);
          seal.position.y = (1 - ease) * 2.0;
          seal.scale.setScalar(1);
        } else if (t < 0.75) {
          // impact squash
          const squashT = (t - 0.55) / 0.2;
          seal.position.y = 0;
          seal.scale.set(1 + squashT * 0.12, 1 - squashT * 0.16, 1 + squashT * 0.12);
        } else {
          // settle back to round
          const settleT = (t - 0.75) / 0.25;
          seal.position.y = 0;
          const s = 1 + (1 - settleT) * 0.12 * Math.cos(settleT * Math.PI);
          seal.scale.set(s, 2 - s, s);
        }
        if (t >= 1) {
          stamping = false;
          seal.scale.setScalar(1);
          seal.position.y = 0;
        }
      }

      renderFrame();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || !visible) return;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    if (reducedMotion) {
      renderFrame();
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { threshold: 0.05 }
      );
      io.observe(container);

      return () => {
        io.disconnect();
        stop();
        renderer.dispose();
        faceTexture.dispose();
        sideMat.dispose();
        faceMat.dispose();
        backMat.dispose();
        body.geometry.dispose();
        container.removeChild(renderer.domElement);
      };
    }

    return () => {
      renderer.dispose();
      faceTexture.dispose();
      sideMat.dispose();
      faceMat.dispose();
      backMat.dispose();
      body.geometry.dispose();
      container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={className}
      aria-hidden="true"
    />
  );
};

export default WaxSeal;
