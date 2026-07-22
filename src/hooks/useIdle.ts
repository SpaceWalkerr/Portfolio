import { useEffect, useState } from 'react';

/**
 * Flips to true once the browser reports idle time (or after `timeout` ms,
 * whichever comes first). Used to defer starting a heavy lazy import until
 * the critical initial paint/script window has settled, rather than firing
 * it at first render — `requestIdleCallback` isn't available in Safari, so
 * this falls back to a short timeout there.
 */
export function useIdle(timeout = 400) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;

    if (ric) {
      const id = ric(() => setIdle(true), { timeout });
      return () => (window as typeof window & { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setIdle(true), timeout);
    return () => window.clearTimeout(id);
  }, [timeout]);

  return idle;
}
