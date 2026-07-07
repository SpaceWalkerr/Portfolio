import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Flake {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  alpha: number
}

/**
 * Canvas marine-snow particle field. Particle count adapts to
 * navigator.hardwareConcurrency and drops further if measured FPS dips,
 * per the performance budget (never tank frame rate to keep particles).
 */
export function MarineSnow({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cores = navigator.hardwareConcurrency ?? 4
    let target = Math.round(Math.min(140, cores * 18) * density)
    if (reduced) target = Math.min(target, 30)

    let flakes: Flake[] = []
    let raf = 0
    let width = 0
    let height = 0

    const spawn = (randomY: boolean): Flake => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -4,
      r: 0.4 + Math.random() * 1.6,
      speed: 0.06 + Math.random() * 0.22,
      drift: (Math.random() - 0.5) * 0.08,
      // spec: #8FB8C9 at 4–10% opacity
      alpha: 0.04 + Math.random() * 0.06,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    flakes = Array.from({ length: target }, () => spawn(true))

    // Simple FPS check: if a frame regularly takes >22ms, shed particles.
    let lastTime = performance.now()
    let slowFrames = 0

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      if (dt > 22 && dt < 200) {
        slowFrames += 1
        if (slowFrames > 60 && flakes.length > 24) {
          flakes.length = Math.floor(flakes.length * 0.75)
          slowFrames = 0
        }
      }

      ctx.clearRect(0, 0, width, height)
      for (const f of flakes) {
        if (!reduced) {
          f.y += f.speed * (dt / 16.7)
          f.x += f.drift * (dt / 16.7)
          if (f.y > height + 4) Object.assign(f, spawn(false))
          if (f.x < -4) f.x = width + 4
          if (f.x > width + 4) f.x = -4
        }
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(143, 184, 201, ${f.alpha})`
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density, reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
