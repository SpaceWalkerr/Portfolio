import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * TypewriterScene — the loading screen's 3D centerpiece.
 *
 * A vintage mechanical typewriter typing "The Nandan Review" onto the
 * sheet, one character per tick of real load progress. Each keystroke
 * fires the full chain a real machine would: a key dips, a finger dips
 * with it, a typebar swings up out of the basket and strikes the paper,
 * the carriage steps left, and the letter appears at the fixed strike
 * point. The hands are stylized sepia silhouettes (palms, fingers,
 * thumbs, wrists) — graphic, not photoreal, matching the halftone /
 * engraving language used elsewhere on the site.
 *
 * Skips animation for prefers-reduced-motion (renders one static frame
 * with the headline fully typed instead).
 */
interface TypewriterSceneProps {
  width?: number;
  height?: number;
  /** 0–100 */
  progress: number;
  className?: string;
}

const HEADLINE = 'The Nandan Review';
const CHAR_COUNT = HEADLINE.length;

/* ---- paper texture ---- */
const PAGE_TEX_W = 512;
const PAGE_TEX_H = 440;
const TEXT_START_PX = 83;
const TEXT_BASELINE_PX = 258;
const PAGE_FONT = '700 36px "Courier New", Courier, monospace';
const CHAR_PX = 21.6; // Courier advance at 36px

/* ---- world mapping: paper plane is 2.6 world units wide ---- */
const PAPER_W = 2.6;
const PAPER_H = 2.1;
const CHAR_STEP = (CHAR_PX / PAGE_TEX_W) * PAPER_W;
const TEXT_START_LOCAL = -PAPER_W / 2 + (TEXT_START_PX / PAGE_TEX_W) * PAPER_W;
const CARRIAGE_START_X = -TEXT_START_LOCAL; // puts char 0 at the strike point (x = 0)

const drawPage = (ctx: CanvasRenderingContext2D, chars: number) => {
  ctx.clearRect(0, 0, PAGE_TEX_W, PAGE_TEX_H);
  ctx.fillStyle = '#EFEBDF';
  ctx.fillRect(0, 0, PAGE_TEX_W, PAGE_TEX_H);
  // soft edge shading so the sheet doesn't read as a flat sticker
  const edge = ctx.createLinearGradient(0, 0, PAGE_TEX_W, 0);
  edge.addColorStop(0, 'rgba(23,23,26,0.10)');
  edge.addColorStop(0.06, 'rgba(23,23,26,0)');
  edge.addColorStop(0.94, 'rgba(23,23,26,0)');
  edge.addColorStop(1, 'rgba(23,23,26,0.10)');
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, PAGE_TEX_W, PAGE_TEX_H);

  ctx.font = PAGE_FONT;
  ctx.fillStyle = '#17171A';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(HEADLINE.slice(0, chars), TEXT_START_PX, TEXT_BASELINE_PX);

  // the finished headline earns its oxblood rule, like the masthead
  if (chars >= CHAR_COUNT) {
    ctx.fillStyle = '#8A2A2A';
    ctx.fillRect(TEXT_START_PX, TEXT_BASELINE_PX + 18, CHAR_PX * CHAR_COUNT, 7);
  }
};

const makeRibbedTexture = (base: string, stripe: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = stripe;
  for (let x = 0; x < 64; x += 8) ctx.fillRect(x, 0, 3, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 1);
  return texture;
};

const makeGroundTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
  g.addColorStop(0, 'rgba(23,23,26,0.30)');
  g.addColorStop(1, 'rgba(23,23,26,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
};

/* keyboard layout */
const KEY_COLS = 8;
const KEY_ROWS = 3;
const KEY_COUNT = KEY_COLS * KEY_ROWS;

/* hands: 4 fingers + 1 thumb per hand */
const FINGERS_PER_HAND = 5;
const FINGER_COUNT = FINGERS_PER_HAND * 2;

const TypewriterScene = ({ width = 560, height = 340, progress, className = '' }: TypewriterSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 30);
    camera.position.set(0, 2.1, 9.4);
    camera.lookAt(0, 0.72, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(d: T): T => {
      disposables.push(d);
      return d;
    };

    /* ---------- materials ---------- */
    const bodyMat = track(new THREE.MeshStandardMaterial({ color: 0x1a1a1e, roughness: 0.42, metalness: 0.38 }));
    const bodyDarkMat = track(new THREE.MeshStandardMaterial({ color: 0x121215, roughness: 0.5, metalness: 0.3 }));
    const keyRimMat = track(new THREE.MeshStandardMaterial({ color: 0x232327, roughness: 0.35, metalness: 0.5 }));
    const keyTopMat = track(new THREE.MeshStandardMaterial({ color: 0xefebde, roughness: 0.5, metalness: 0.05 }));
    const platenTexture = track(makeRibbedTexture('#232326', '#2e2e33'));
    const platenMat = track(new THREE.MeshStandardMaterial({ map: platenTexture, roughness: 0.6, metalness: 0.2 }));
    const chromeMat = track(new THREE.MeshStandardMaterial({ color: 0x9a9aa2, roughness: 0.25, metalness: 0.85 }));
    const handMat = track(new THREE.MeshStandardMaterial({ color: 0x5a4234, roughness: 0.85 }));
    const ribbonMat = track(new THREE.MeshStandardMaterial({ color: 0x8a2a2a, roughness: 0.7 }));

    /* ---------- machine body ---------- */
    const machine = new THREE.Group();
    scene.add(machine);

    const baseGeo = track(new THREE.BoxGeometry(4.4, 0.55, 2.7));
    const base = new THREE.Mesh(baseGeo, bodyDarkMat);
    base.position.set(0, -1.0, 0.15);
    machine.add(base);

    const shellGeo = track(new THREE.BoxGeometry(4.0, 0.9, 2.2));
    const shell = new THREE.Mesh(shellGeo, bodyMat);
    shell.position.set(0, -0.35, -0.1);
    machine.add(shell);

    // sloped key deck
    const deckGeo = track(new THREE.BoxGeometry(3.5, 0.28, 1.5));
    const deck = new THREE.Mesh(deckGeo, bodyMat);
    deck.position.set(0, -0.18, 0.95);
    deck.rotation.x = -0.3;
    machine.add(deck);

    // rear tower carrying the basket up toward the platen
    const towerGeo = track(new THREE.BoxGeometry(3.2, 0.85, 1.3));
    const tower = new THREE.Mesh(towerGeo, bodyMat);
    tower.position.set(0, 0.28, -0.45);
    machine.add(tower);

    // ribbon spools
    const spoolGeo = track(new THREE.CylinderGeometry(0.19, 0.19, 0.12, 14));
    for (const sx of [-0.62, 0.62]) {
      const spool = new THREE.Mesh(spoolGeo, [keyRimMat, ribbonMat, keyRimMat]);
      spool.position.set(sx, 0.78, -0.35);
      machine.add(spool);
    }

    /* ---------- keys (instanced, light tops via geometry groups) ---------- */
    const keyGeo = track(new THREE.CylinderGeometry(0.105, 0.125, 0.08, 12));
    const keys = new THREE.InstancedMesh(keyGeo, [keyRimMat, keyTopMat, keyRimMat], KEY_COUNT);
    machine.add(keys);
    const keyBase: { x: number; y: number; z: number }[] = [];
    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) {
        // staggered like a real key bed
        const stagger = (r % 2) * 0.11;
        keyBase.push({
          x: (c - (KEY_COLS - 1) / 2) * 0.34 + stagger,
          y: 0.12 - r * 0.13,
          z: 0.52 + r * 0.3,
        });
      }
    }

    // spacebar
    const spaceGeo = track(new THREE.BoxGeometry(1.6, 0.07, 0.16));
    const spacebar = new THREE.Mesh(spaceGeo, keyRimMat);
    spacebar.position.set(0, -0.28, 1.5);
    machine.add(spacebar);

    /* ---------- typebar basket + striking bar ---------- */
    const fanGeo = track(new THREE.BoxGeometry(0.045, 0.9, 0.045));
    const fan = new THREE.InstancedMesh(fanGeo, chromeMat, 12);
    machine.add(fan);
    {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < 12; i++) {
        const spread = (i / 11 - 0.5) * 1.1;
        dummy.position.set(0, 0.42, 0.08);
        dummy.rotation.set(1.22, 0, spread);
        // offset the bar along its own length so it fans out of the pivot
        dummy.updateMatrix();
        const offset = new THREE.Object3D();
        offset.position.set(0, 0.45, 0);
        offset.updateMatrix();
        dummy.matrix.multiply(offset.matrix);
        fan.setMatrixAt(i, dummy.matrix);
      }
      fan.instanceMatrix.needsUpdate = true;
    }

    const strikerPivot = new THREE.Group();
    strikerPivot.position.set(0, 0.42, 0.08);
    machine.add(strikerPivot);
    const strikerGeo = track(new THREE.BoxGeometry(0.05, 0.95, 0.05));
    const striker = new THREE.Mesh(strikerGeo, chromeMat);
    striker.position.y = 0.475;
    strikerPivot.add(striker);
    strikerPivot.rotation.x = 1.22; // resting in the basket

    /* ---------- carriage: platen + knobs + paper, steps left as it types ---------- */
    const carriage = new THREE.Group();
    carriage.position.set(CARRIAGE_START_X, 0, 0);
    scene.add(carriage);

    const platenGeo = track(new THREE.CylinderGeometry(0.36, 0.36, 4.6, 20));
    platenGeo.rotateZ(Math.PI / 2);
    const platen = new THREE.Mesh(platenGeo, platenMat);
    platen.position.set(0, 1.02, -0.55);
    carriage.add(platen);

    const knobGeo = track(new THREE.CylinderGeometry(0.14, 0.14, 0.22, 12));
    knobGeo.rotateZ(Math.PI / 2);
    for (const kx of [-2.5, 2.5]) {
      const knob = new THREE.Mesh(knobGeo, bodyDarkMat);
      knob.position.set(kx, 1.02, -0.55);
      carriage.add(knob);
    }

    // carriage rail under the platen
    const railGeo = track(new THREE.BoxGeometry(4.8, 0.14, 0.5));
    const rail = new THREE.Mesh(railGeo, bodyDarkMat);
    rail.position.set(0, 0.72, -0.55);
    carriage.add(rail);

    // carriage-return lever, the iconic left-side arm
    const leverArmGeo = track(new THREE.BoxGeometry(0.7, 0.06, 0.06));
    const leverArm = new THREE.Mesh(leverArmGeo, chromeMat);
    leverArm.position.set(-2.65, 1.18, -0.35);
    leverArm.rotation.z = 0.35;
    carriage.add(leverArm);

    /* paper */
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = PAGE_TEX_W;
    pageCanvas.height = PAGE_TEX_H;
    const pageCtx = pageCanvas.getContext('2d')!;
    const pageTexture = track(new THREE.CanvasTexture(pageCanvas));
    pageTexture.colorSpace = THREE.SRGBColorSpace;
    // thin text lines at an angle: mipmapped minification smears them
    pageTexture.generateMipmaps = false;
    pageTexture.minFilter = THREE.LinearFilter;
    const pageMat = track(new THREE.MeshStandardMaterial({ map: pageTexture, roughness: 0.8, side: THREE.DoubleSide }));
    const pageGeo = track(new THREE.PlaneGeometry(PAPER_W, PAPER_H));
    const page = new THREE.Mesh(pageGeo, pageMat);
    page.position.set(0, 1.95, -0.72);
    page.rotation.x = -0.08; // leaning back off the platen
    carriage.add(page);

    const renderPage = (chars: number) => {
      drawPage(pageCtx, chars);
      pageTexture.needsUpdate = true;
    };
    renderPage(0);

    /* ---------- hands ---------- */
    const hands = new THREE.Group();
    scene.add(hands);

    const palmGeo = track(new THREE.BoxGeometry(0.78, 0.17, 0.62));
    const wristGeo = track(new THREE.BoxGeometry(0.52, 0.15, 0.55));
    for (const hx of [-0.95, 0.95]) {
      const palm = new THREE.Mesh(palmGeo, handMat);
      palm.position.set(hx, 0.62, 1.0);
      palm.rotation.x = -0.32;
      hands.add(palm);
      const wrist = new THREE.Mesh(wristGeo, handMat);
      wrist.position.set(hx * 1.12, 0.66, 1.52);
      wrist.rotation.x = 0.28;
      hands.add(wrist);
    }

    const fingerGeo = track(new THREE.CapsuleGeometry(0.062, 0.34, 3, 8));
    const fingers = new THREE.InstancedMesh(fingerGeo, handMat, FINGER_COUNT);
    hands.add(fingers);

    // local x offsets: 4 fingers spread forward, thumb tucked toward center
    const fingerOffsets = [-0.28, -0.1, 0.08, 0.26];

    /* ---------- lights & ground ---------- */
    scene.add(new THREE.AmbientLight(0xfff2e6, 0.62));
    const keyLight = new THREE.DirectionalLight(0xfff2e0, 1.15);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xe8dcc8, 0.35);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const groundTexture = track(makeGroundTexture());
    const groundGeo = track(new THREE.CircleGeometry(3.6, 24));
    const groundMat = track(
      new THREE.MeshBasicMaterial({ map: groundTexture, transparent: true, depthWrite: false })
    );
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.27;
    scene.add(ground);

    /* ---------- animation ---------- */
    const dummy = new THREE.Object3D();
    let raf = 0;
    let lastChars = -1;
    let strikeAt = -1e9;
    let strikeFinger = 0;
    let strikeKey = 0;

    const poseHands = (press: number) => {
      for (let i = 0; i < FINGER_COUNT; i++) {
        const handIdx = i < FINGERS_PER_HAND ? 0 : 1;
        const local = i % FINGERS_PER_HAND;
        const hx = handIdx === 0 ? -0.95 : 0.95;
        const isThumb = local === 4;
        const dip = i === strikeFinger ? press : 0;

        if (isThumb) {
          dummy.position.set(hx + (handIdx === 0 ? 0.42 : -0.42), 0.5, 1.18);
          dummy.rotation.set(-0.9, 0, handIdx === 0 ? -0.5 : 0.5);
        } else {
          dummy.position.set(hx + fingerOffsets[local], 0.48 - dip * 0.22, 0.78 - dip * 0.05);
          dummy.rotation.set(-1.05 + dip * 0.3, 0, 0);
        }
        dummy.updateMatrix();
        fingers.setMatrixAt(i, dummy.matrix);
      }
      fingers.instanceMatrix.needsUpdate = true;
    };

    const poseKeys = (press: number) => {
      for (let i = 0; i < KEY_COUNT; i++) {
        const kb = keyBase[i];
        const dip = i === strikeKey ? press * 0.06 : 0;
        dummy.position.set(kb.x, kb.y - dip, kb.z);
        dummy.rotation.set(0.28, 0, 0); // keys follow the deck slope
        dummy.updateMatrix();
        keys.setMatrixAt(i, dummy.matrix);
      }
      keys.instanceMatrix.needsUpdate = true;
    };

    const renderFrame = () => renderer.render(scene, camera);

    if (reducedMotion) {
      renderPage(CHAR_COUNT);
      carriage.position.x = CARRIAGE_START_X - CHAR_COUNT * CHAR_STEP;
      poseHands(0);
      poseKeys(0);
      renderFrame();
    } else {
      const tick = (time: number) => {
        const t = Math.min(1, Math.max(0, progressRef.current / 100));
        const chars = Math.min(CHAR_COUNT, Math.floor(t * (CHAR_COUNT + 0.999)));

        if (chars !== lastChars) {
          renderPage(chars);
          if (chars > lastChars && lastChars >= 0) {
            strikeAt = time;
            const code = HEADLINE.charCodeAt(chars - 1) || 65;
            strikeFinger = code % FINGER_COUNT;
            strikeKey = (code * 7) % KEY_COUNT;
          }
          lastChars = chars;
        }

        // strike envelope: sharp hit, soft release
        const sAge = time - strikeAt;
        const press = sAge < 90 ? sAge / 90 : Math.max(0, 1 - (sAge - 90) / 130);

        // typebar swings from the basket (1.22 rad) up to the platen (-0.3 rad)
        strikerPivot.rotation.x = 1.22 - press * 1.52;

        // carriage steps left; a hair of recoil on each strike
        carriage.position.x = CARRIAGE_START_X - chars * CHAR_STEP + press * 0.02;

        poseHands(press);
        poseKeys(press);

        // gentle camera sway sells the 3D without stealing attention
        camera.position.x = Math.sin(time * 0.00022) * 0.35;
        camera.lookAt(0, 0.72, 0);

        renderFrame();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      for (const d of disposables) d.dispose();
      container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className={className}
      aria-hidden="true"
    />
  );
};

export default TypewriterScene;
