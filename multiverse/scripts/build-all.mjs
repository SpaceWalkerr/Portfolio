#!/usr/bin/env node
/**
 * Builds the Multiverse hub plus all 8 portfolio universes into one
 * deployable tree:
 *
 *   multiverse/dist/            ← the hub (this app)
 *   multiverse/dist/press/      ← B  (Newspaper & Letterpress)
 *   multiverse/dist/terminal/   ← D  (Neon Dev-Terminal)
 *   multiverse/dist/glass/      ← A  (Glass & Light)
 *   multiverse/dist/blueprint/  ← C  (Blueprint / Patent)
 *   multiverse/dist/case-file/  ← E  (The Case File)
 *   multiverse/dist/field-guide/← F  (The Field Guide)
 *   multiverse/dist/mission-control/ ← G (Mission Control)
 *   multiverse/dist/arcade/     ← H  (The Arcade Cabinet)
 *
 * Each portfolio's vite.config.ts already sets the matching `base`, so no
 * per-app config changes are needed. Usage: npm run build:all
 */
import { execSync } from 'node:child_process'
import { cpSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const hubRoot = join(here, '..')
const repoRoot = join(hubRoot, '..')

const universes = [
  { folder: 'B', base: 'press' },
  { folder: 'D', base: 'terminal' },
  { folder: 'A', base: 'glass' },
  { folder: 'C', base: 'blueprint' },
  { folder: 'E', base: 'case-file' },
  { folder: 'F', base: 'field-guide' },
  { folder: 'G', base: 'mission-control' },
  { folder: 'H', base: 'arcade' },
]

const run = (cmd, cwd) => {
  console.log(`\n▶ ${cmd}  (${cwd})`)
  execSync(cmd, { cwd, stdio: 'inherit' })
}

run('npm run build', hubRoot)

for (const { folder, base } of universes) {
  const appDir = join(repoRoot, folder)
  if (!existsSync(join(appDir, 'node_modules'))) run('npm ci', appDir)
  // `npx vite build` rather than `npm run build`: the portfolios' prebuild
  // hooks reference a removed root-level sync script, and their public/
  // folders already contain the synced shared assets.
  run('npx vite build', appDir)
  cpSync(join(appDir, 'dist'), join(hubRoot, 'dist', base), { recursive: true })
  console.log(`✔ ${folder} → dist/${base}/`)
}

console.log('\n✔ Multiverse assembled in multiverse/dist/')
