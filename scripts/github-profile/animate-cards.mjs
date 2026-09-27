/**
 * Turns the project clippings that have a live-site clip (public/clips/*.mp4)
 * into animated GIFs: the clip plays, in greyscale, inside the card's frame.
 *
 *   node scripts/github-profile/animate-cards.mjs <cards-dir>
 *
 * Run cards.mjs into the same directory first (it writes boxes.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { root } from '../load-data.mjs';

const dir = path.resolve(process.argv[2] ?? path.join(root, 'docs/brand/cards'));
const boxes = JSON.parse(fs.readFileSync(path.join(dir, 'boxes.json'), 'utf8'));
const FPS = 12;
const SCALE = 1; // the cards render at 2x; GIFs are 1x to stay light (a README shows them at ~415px anyway)

for (const [slug, b] of Object.entries(boxes)) {
  const clip = path.join(root, 'public', 'clips', `${slug}.mp4`);
  if (!fs.existsSync(clip)) continue;
  // Inside the 2px border
  const x = Math.round((b.x + 2) * SCALE), y = Math.round((b.y + 2) * SCALE);
  const w = Math.round((b.width - 4) * SCALE), h = Math.round((b.height - 4) * SCALE);
  const out = path.join(dir, `${slug}.gif`);
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-loop', '1', '-i', path.join(dir, `${slug}.png`),
    '-i', clip,
    '-filter_complex', [
      `[0:v]scale=${600 * SCALE}:-1,format=rgb24[card]`,
      `[1:v]fps=${FPS},scale=${w}:-2,crop=${w}:${h}:0:0,hue=s=0,eq=contrast=1.06[clip]`,
      `[card][clip]overlay=${x}:${y}:shortest=1,split[a][b]`,
      `[a]palettegen=max_colors=128:stats_mode=diff[p]`,
      `[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle`,
    ].join(';'),
    '-loop', '0', out,
  ]);
  console.log(`animated: ${slug}.gif (${Math.round(fs.statSync(out).size / 1024)} KB)`);
}
