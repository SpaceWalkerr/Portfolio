import { useEffect, useRef } from 'react';

/**
 * MagneticCursor — "The Press" pointer.
 *
 * A trailing ink ring that snaps toward interactive elements (a, button,
 * [data-cursor="hover"]) with a magnetic pull, and morphs to frame them.
 * Desktop fine-pointer only; leaves touch and reduced-motion users on the
 * native cursor entirely.
 */

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]';

const MagneticCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.body.classList.add('press-cursor-active');

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pointer };
    // Store the hovered *element*, not its rect — the rect is re-read every
    // frame below so the ring stays correct across scroll, layout shifts,
    // and elements that disappear via keyboard actions (e.g. Escape closing
    // a modal) rather than a mouse leaving them.
    let hoveredEl: Element | null = null;
    let raf = 0;
    let visible = false;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      ring.style.opacity = next ? '1' : '0';
      dot.style.opacity = next ? '1' : '0';
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      setVisible(true);
      hoveredEl = (e.target as Element | null)?.closest(HOVER_SELECTOR) ?? null;
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      // Dot: tight, near-instant tracking.
      dot.style.transform = `translate3d(${pointer.x - 3}px, ${pointer.y - 3}px, 0)`;

      if (hoveredEl && !hoveredEl.isConnected) hoveredEl = null;
      const rect = hoveredEl ? hoveredEl.getBoundingClientRect() : null;

      if (rect) {
        // Magnetic pull: ring eases toward the element's center and frames it.
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const w = rect.width + 14;
        const h = rect.height + 14;
        ringPos.x += (cx - ringPos.x) * 0.22;
        ringPos.y += (cy - ringPos.y) * 0.22;
        ring.style.width = `${w}px`;
        ring.style.height = `${h}px`;
        ring.style.borderRadius = '2px';
        ring.style.transform = `translate3d(${ringPos.x - w / 2}px, ${ringPos.y - h / 2}px, 0)`;
      } else {
        ringPos.x += (pointer.x - ringPos.x) * 0.18;
        ringPos.y += (pointer.y - ringPos.y) * 0.18;
        ring.style.width = '28px';
        ring.style.height = '28px';
        ring.style.borderRadius = '9999px';
        ring.style.transform = `translate3d(${ringPos.x - 14}px, ${ringPos.y - 14}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove('press-cursor-active');
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/*
        Blend base is white, not ink: mix-blend-difference inverts whatever
        is underneath, so white guarantees high contrast on both the paper
        and ink sections. Using the actual ink color here would nearly
        vanish against the paper background.
      */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] border border-white opacity-0 mix-blend-difference transition-[border-radius] duration-150"
        style={{ willChange: 'transform, width, height' }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 rounded-full bg-white opacity-0 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default MagneticCursor;
