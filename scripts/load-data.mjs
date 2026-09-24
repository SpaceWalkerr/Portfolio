/**
 * Loads the site's TypeScript data modules (src/data/*) from plain Node build
 * scripts, by bundling them on the fly with esbuild (already a Vite dependency).
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

export const root = path.resolve(fileURLToPath(import.meta.url), '../..');

export async function loadData() {
  const entry = `
    export { projects } from './src/data/projects';
    export { posts } from './src/data/posts';
    export { experiences } from './src/data/experience';
    export { education } from './src/data/education';
    export { skillCategories } from './src/data/skills';
    export { certifications, notableAchievements } from './src/data/certifications';
    export { LOCATION } from './src/data/site';
  `;
  const out = await build({
    stdin: { contents: entry, resolveDir: root, loader: 'ts' },
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    logLevel: 'silent',
  });
  return import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
}
