export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Prefixes a root-relative public-asset path with the app's base path
 * (e.g. "/arcade/") so links to files in `public/` still resolve when
 * this app is served from a subpath instead of the domain root.
 */
export function withBase(assetPath: string): string {
  return `${import.meta.env.BASE_URL}${assetPath.replace(/^\//, '')}`;
}
