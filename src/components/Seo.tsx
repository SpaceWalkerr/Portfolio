import { useEffect } from 'react';

export const SITE_URL = 'https://surajnandan.in';
const DEFAULT_TITLE = 'Suraj Nandan | Full Stack Developer & Software Engineer Portfolio';
const DEFAULT_DESCRIPTION =
  'Suraj Nandan — Full Stack Developer & Software Engineer. Expert in React, Node.js, TypeScript, Python, Java, AI & Machine Learning. View projects, experience, skills, and certifications. Based in India.';

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/projects/knot-ai" */
  path: string;
  image?: string;
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
 * home page keeps its statically-rendered metadata.
 */
const Seo = ({ title, description, path, image, jsonLd = [] }: SeoProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const ogImage = image
      ? image.startsWith('http')
        ? image
        : `${SITE_URL}${image}`
      : `${SITE_URL}/og-image.png`;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);

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
      if (canonical) canonical.href = prevCanonical || `${SITE_URL}/`;
      nodes.forEach((n) => n.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, JSON.stringify(jsonLd)]);

  return null;
};

export default Seo;
