import { useEffect } from 'react';

export const SITE_URL = 'https://surajnandan.in';
const DEFAULT_TITLE = 'Suraj Nandan | Full Stack Developer & Software Engineer Portfolio';
const DEFAULT_DESCRIPTION =
  'Suraj Nandan — Full Stack Developer & Software Engineer. Expert in React, Node.js, TypeScript, Python, Java, AI & Machine Learning. View projects, experience, skills, and certifications. Based in India.';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/projects/knot-ai" */
  path: string;
  image?: string;
  /** og:type — "article" for blog posts, "website" otherwise */
  type?: 'website' | 'article';
  /** Emit a noindex robots directive (e.g. the 404 page) */
  noindex?: boolean;
  /** One or more JSON-LD objects to inject for this route */
  jsonLd?: Record<string, unknown>[];
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Client-side <head> manager for standalone routes. Sets title/description/canonical/OG
 * and injects route-scoped JSON-LD, restoring the site defaults on unmount so the
 * home page keeps its statically-rendered metadata. The build's prerender pass
 * captures the resolved <head> into per-route static HTML.
 */
const Seo = ({ title, description, path, image, type = 'website', noindex = false, jsonLd = [] }: SeoProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const ogImage = image
      ? image.startsWith('http')
        ? image
        : `${SITE_URL}${image}`
      : `${SITE_URL}/og-image.png`;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : DEFAULT_ROBOTS);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const prevCanonical = canonical.href;
    canonical.href = url;

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    // Project screenshots are 1280x800; generated /og/* cards and the default og-image.png are 1200x630
    const isScreenshot = Boolean(image) && !image!.startsWith('/og/');
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', isScreenshot ? '1280' : '1200');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', isScreenshot ? '800' : '630');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    const nodes = jsonLd.map((obj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'route';
      script.textContent = JSON.stringify(obj);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('meta[name="description"]', 'name', 'description', DEFAULT_DESCRIPTION);
      setMeta('meta[name="robots"]', 'name', 'robots', DEFAULT_ROBOTS);
      setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
      setMeta('meta[property="og:image"]', 'property', 'og:image', `${SITE_URL}/og-image.png`);
      setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
      setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
      if (canonical) canonical.href = prevCanonical || `${SITE_URL}/`;
      nodes.forEach((n) => n.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, noindex, JSON.stringify(jsonLd)]);

  return null;
};

export default Seo;
