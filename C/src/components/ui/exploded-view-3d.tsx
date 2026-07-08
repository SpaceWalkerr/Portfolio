import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ExplodedLayer {
  label: string;
  color: number;
}

interface ExplodedView3DProps {
  layers: ExplodedLayer[];
  className?: string;
}

function makeLabelSprite(text: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const fontSize = 32;
  const pad = 14;
  ctx.font = `600 ${fontSize}px "IBM Plex Mono", monospace`;
  const metrics = ctx.measureText(text);
  canvas.width = Math.ceil(metrics.width) + pad * 2;
  canvas.height = fontSize + pad * 2;
  ctx.font = `600 ${fontSize}px "IBM Plex Mono", monospace`;
  ctx.fillStyle = '#eaf2ff';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, pad, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  // World units per texture pixel — tuned so a ~20-char label reads at
  // roughly half the box width, not larger than the geometry it annotates.
  const scale = 0.0044;
  sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
  return sprite;
}

/**
 * Vanilla Three.js exploded-view: flat translucent layers stacked along Y,
 * each edged in cyanotype line-work with a leader line + canvas-sprite
 * label. Separates on scroll-into-view, orbitable by drag. Deliberately
 * unlit (MeshBasicMaterial) — no lighting rig needed for a line-drawing look.
 */
export default function ExplodedView3D({ layers, className = '' }: ExplodedView3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 7.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const n = layers.length;
    const spacing = 1.05;
    const meshes: THREE.Mesh[] = [];

    layers.forEach((layer, i) => {
      const geo = new THREE.BoxGeometry(3.1, 0.12, 1.9);
      const mat = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: 0.24,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xeaf2ff, transparent: true, opacity: 0.85 }));
      mesh.add(line);

      const leaderGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(1.55, 0, 0),
        new THREE.Vector3(2.35, 0, 0),
      ]);
      const leader = new THREE.Line(leaderGeo, new THREE.LineBasicMaterial({ color: 0xc9a24a, transparent: true, opacity: 0.8 }));
      mesh.add(leader);

      const sprite = makeLabelSprite(`${i + 1} — ${layer.label}`);
      sprite.position.set(2.4, 0, 0);
      mesh.add(sprite);

      mesh.position.y = 0;
      mesh.userData.targetY = (i - (n - 1) / 2) * spacing;
      group.add(mesh);
      meshes.push(mesh);
    });

    let rotY = 0.5;
    let rotX = -0.18;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let explodeWanted = false;
    let explodeProgress = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      mount.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.008;
      rotX = Math.max(-0.55, Math.min(0.55, rotX + dy * 0.006));
    };
    const onPointerUp = () => {
      dragging = false;
    };

    mount.style.touchAction = 'none';
    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const io = new IntersectionObserver(
      ([entry]) => {
        explodeWanted = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    io.observe(mount);

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth;
      height = mount.clientHeight || width * 0.75;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);

      if (!dragging) rotY += dt * 0.05;
      explodeProgress += ((explodeWanted ? 1 : 0) - explodeProgress) * Math.min(1, dt * 2.2);

      meshes.forEach((m) => {
        m.position.y = (m.userData.targetY as number) * explodeProgress;
      });

      group.rotation.y = rotY;
      group.rotation.x = rotX;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      io.disconnect();
      ro.disconnect();
      meshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
        m.children.forEach((child) => {
          if (child instanceof THREE.LineSegments || child instanceof THREE.Line) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
          if (child instanceof THREE.Sprite) {
            child.material.map?.dispose();
            child.material.dispose();
          }
        });
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [layers]);

  return <div ref={mountRef} className={className} role="img" aria-label="Interactive 3D exploded-view diagram — drag to rotate" />;
}
