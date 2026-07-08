/**
 * Resolve the bioluminescence loops/posters by basename. Vite fingerprints and
 * URL-rewrites everything matched by import.meta.glob, so sections just ask for
 * `getVideo("anglerfish")` without knowing the built path.
 */
const videos = import.meta.glob("../assets/bioluminescence/videos/*.mp4", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const images = import.meta.glob("../assets/bioluminescence/images/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

function byBasename(map: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [path, url] of Object.entries(map)) {
    const base = path.split("/").pop()!.replace(/\.(mp4|jpg)$/, "");
    out[base] = url;
  }
  return out;
}

const VIDEOS = byBasename(videos);
const IMAGES = byBasename(images);

export const getVideo = (name: string): string | undefined => VIDEOS[name];
export const getPoster = (name: string): string | undefined => IMAGES[name];
