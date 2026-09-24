import { useEffect, useState } from 'react';

/**
 * Tracks which home-page section sits under a reading line ~40% down the
 * viewport. IntersectionObserver instead of a scroll handler, so nothing
 * runs per scroll frame. Sections below the fold are lazy-loaded, so a
 * MutationObserver picks them up as they mount.
 */
export const useActiveSection = (ids: readonly string[], enabled = true) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!enabled) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -59% 0px' }
    );

    const watched = new Set<Element>();
    const attach = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && !watched.has(el)) {
          watched.add(el);
          io.observe(el);
        }
      }
    };
    attach();

    const root = document.getElementById('main-content') ?? document.body;
    const mo = new MutationObserver(attach);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [ids, enabled]);

  return active;
};
