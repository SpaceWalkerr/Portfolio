import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Modal plumbing shared by every dialog on the site:
 * Escape closes, background scroll is locked, focus moves into the dialog,
 * Tab is trapped inside it, and focus returns to the opener on close.
 *
 * Attach the returned ref to the dialog panel (the element with role="dialog").
 */
export const useDialog = <T extends HTMLElement = HTMLDivElement>(open: boolean, onClose: () => void) => {
  const ref = useRef<T>(null);
  // Keep the latest onClose without re-running the effect (callers pass inline arrows)
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Wait a frame so the panel has mounted inside AnimatePresence
    const raf = requestAnimationFrame(() => {
      const panel = ref.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel).focus({ preventScroll: true });
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = ref.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open]);

  return ref;
};
