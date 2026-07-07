#!/usr/bin/env node
/**
 * Builds the multiverse landing page (this root project) plus every
 * standalone universe app (A through H — each its own Vite project with
 * its own package.json), then stitches their dist/ outputs into this
 * root's dist/ at the subpath each universe is served from:
 *
 *   dist/                    → landing page ("/")
 *   dist/glass/               → Universe 03, Glass & Light ("/glass")
 *   dist/press/               → Universe 01, Newspaper & Letterpress ("/press")
 *   dist/blueprint/           → Universe 04, Blueprint / Patent ("/blueprint")
 *   dist/terminal/            → Universe 02, Neon Dev-Terminal ("/terminal")
 *   dist/case-file/           → Universe 05, The Case File ("/case-file")
 *   dist/field-guide/         → Universe 06, The Field Guide ("/field-guide")
 *   dist/mission-control/     → Universe 07, Mission Control ("/mission-control")
 *   dist/arcade/              → Universe 08, The Arcade Cabinet ("/arcade")
 *
 * Each sub-app's vite.config.ts sets `base` to match its subpath, so its
 * built asset URLs already carry the right prefix (e.g. /blueprint/assets/…).
 * The result is a single static dist/ folder deployable as one site —
 * no cross-project rewrites or proxying required.
 */
import { execSync } from 'node:child_process';
import { cpSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const apps = [
  { dir: 'A', mount: 'glass', label: 'Glass & Light (U-03)' },
  { dir: 'B', mount: 'press', label: 'Newspaper & Letterpress (U-01)' },
  { dir: 'C', mount: 'blueprint', label: 'Blueprint / Patent (U-04)' },
  { dir: 'D', mount: 'terminal', label: 'Neon Dev-Terminal (U-02)' },
  { dir: 'E', mount: 'case-file', label: 'The Case File (U-05)' },
  { dir: 'F', mount: 'field-guide', label: 'The Field Guide (U-06)' },
  { dir: 'G', mount: 'mission-control', label: 'Mission Control (U-07)' },
  { dir: 'H', mount: 'arcade', label: 'The Arcade Cabinet (U-08)' },
];

function run(cmd, cwd) {
  console.log(`\n> [${cwd}] ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

console.log('=== Building landing page (root) ===');
run('npm run build', root);

for (const app of apps) {
  const appDir = path.join(root, app.dir);
  console.log(`\n=== Building ${app.label} ===`);
  run('npm run build', appDir);

  const src = path.join(appDir, 'dist');
  const dest = path.join(root, 'dist', app.mount);
  if (!existsSync(src)) {
    throw new Error(`Expected build output at ${src}, but it doesn't exist.`);
  }
  rmSync(dest, { recursive: true, force: true });
  cpSync(src, dest, { recursive: true });
  console.log(`Copied ${src} -> ${dest}`);
}

console.log('\n=== Combined build complete: ./dist ===');
console.log('  /            -> dist/index.html (landing page)');
console.log('  /glass       -> dist/glass/index.html');
console.log('  /press       -> dist/press/index.html');
console.log('  /blueprint   -> dist/blueprint/index.html');
console.log('  /terminal    -> dist/terminal/index.html');
console.log('  /case-file   -> dist/case-file/index.html');
console.log('  /field-guide -> dist/field-guide/index.html');
console.log('  /mission-control -> dist/mission-control/index.html');
console.log('  /arcade      -> dist/arcade/index.html');
