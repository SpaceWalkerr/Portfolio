import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Jump to a home-page section from anywhere. On the home page it scrolls;
 * on a sub-page (/projects/…, /blog/…) it routes to "/#id" and Home
 * scrolls there once the section has mounted.
 */
export const useSectionNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      const hash = id.startsWith('#') ? id : `#${id}`;
      if (pathname !== '/') {
        navigate(`/${hash}`);
        return;
      }
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', hash === '#home' ? '/' : `/${hash}`);
    },
    [navigate, pathname]
  );
};
