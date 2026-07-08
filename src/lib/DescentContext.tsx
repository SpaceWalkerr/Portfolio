import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SECTIONS, MAX_DEPTH } from "./sections";

interface DescentState {
  /** Overall page scroll progress [0..1]. */
  scrollFraction: number;
  /** Index into SECTIONS of the section currently occupying the viewport. */
  activeIndex: number;
  /**
   * Depth in metres, derived from the viewport centre's position within the
   * real section boxes (not uniform scroll fraction) so the readout stays
   * aligned to each section's depth marker even when sections differ wildly
   * in height.
   */
  depth: number;
}

const DescentContext = createContext<DescentState>({
  scrollFraction: 0,
  activeIndex: 0,
  depth: 0,
});

export function useDescent() {
  return useContext(DescentContext);
}

/** Convenience: the active section's accent rgb triple, for canvas/glow use. */
export function useActiveAccentRgb(): [number, number, number] {
  const { activeIndex } = useDescent();
  return SECTIONS[activeIndex]?.accentRgb ?? [232, 244, 255];
}

export function DescentProvider({ children }: { children: ReactNode }) {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [depth, setDepth] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Scroll fraction + real-position depth, rAF-throttled.
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const scrollTop = doc.scrollTop;
        setScrollFraction(max > 0 ? scrollTop / max : 0);

        // Depth from the viewport centre's position within the section boxes.
        const anchor = scrollTop + doc.clientHeight / 2;
        const nodes = document.querySelectorAll<HTMLElement>("[data-section-index]");
        let d = 0;
        for (let i = 0; i < nodes.length; i++) {
          const el = nodes[i];
          const idx = Number(el.dataset.sectionIndex);
          const top = el.getBoundingClientRect().top + scrollTop;
          const h = el.offsetHeight;
          const from = SECTIONS[idx]?.depth ?? 0;
          const to = SECTIONS[idx + 1]?.depth ?? MAX_DEPTH;
          if (anchor < top) {
            d = idx === 0 ? 0 : from;
            break;
          }
          if (anchor <= top + h) {
            const t = h > 0 ? (anchor - top) / h : 0;
            d = from + (to - from) * t;
            break;
          }
          d = from; // past this section; last write wins for the footer tail
        }
        setDepth(Math.round(d));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        // Reset the ref, or the throttle guard stays "armed" with a dead id
        // after a remount (e.g. StrictMode) and blocks every future update.
        rafRef.current = null;
      }
    };
  }, []);

  // Active section via IntersectionObserver — whichever crosses viewport centre.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.sectionIndex,
            );
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    const nodes = document.querySelectorAll<HTMLElement>("[data-section-index]");
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const value = useMemo(
    () => ({ scrollFraction, activeIndex, depth }),
    [scrollFraction, activeIndex, depth],
  );

  return (
    <DescentContext.Provider value={value}>{children}</DescentContext.Provider>
  );
}
