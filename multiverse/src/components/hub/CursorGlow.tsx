import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Custom hub cursor: a small glowing particle that trails the pointer.
 * Skipped entirely for touch devices and reduced-motion users (the native
 * cursor is restored via CSS in those cases too).
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const dot = dotRef.current
    const trail = trailRef.current
    if (!dot || !trail) return

    let tx = -100
    let ty = -100
    let x = -100
    let y = -100
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      dot.style.transform = `translate(${tx - 3}px, ${ty - 3}px)`
    }
    const tick = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      trail.style.transform = `translate(${x - 14}px, ${y - 14}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-7 w-7 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(234,246,255,0.16) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-jellyfish"
        style={{ boxShadow: '0 0 8px 2px rgba(234,246,255,0.55)' }}
      />
    </>
  )
}
