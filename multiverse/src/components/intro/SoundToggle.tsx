import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * Ambient sound swell — muted by default, only ever started from the user's
 * click on this toggle (never autoplayed). Synthesized with WebAudio so no
 * audio asset is required; swap for a real ambience file later if desired.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const toggle = () => {
    if (!on) {
      if (!ctxRef.current) {
        const ctx = new AudioContext()
        const gain = ctx.createGain()
        gain.gain.value = 0
        gain.connect(ctx.destination)

        // Deep, slow ocean drone: two detuned low sines + filtered noise wash.
        for (const freq of [54, 81.5]) {
          const osc = ctx.createOscillator()
          osc.type = 'sine'
          osc.frequency.value = freq
          const oscGain = ctx.createGain()
          oscGain.gain.value = 0.05
          osc.connect(oscGain).connect(gain)
          osc.start()
        }
        const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
        const data = noiseBuf.getChannelData(0)
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3
        const noise = ctx.createBufferSource()
        noise.buffer = noiseBuf
        noise.loop = true
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 220
        const noiseGain = ctx.createGain()
        noiseGain.gain.value = 0.04
        noise.connect(filter).connect(noiseGain).connect(gain)
        noise.start()

        ctxRef.current = ctx
        gainRef.current = gain
      }
      void ctxRef.current.resume()
      gainRef.current!.gain.setTargetAtTime(1, ctxRef.current.currentTime, 1.2)
      setOn(true)
    } else {
      const ctx = ctxRef.current
      if (ctx && gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.4)
      }
      setOn(false)
    }
  }

  useEffect(() => {
    return () => {
      void ctxRef.current?.close()
      ctxRef.current = null
    }
  }, [])

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Enable ambient sound'}
      className="absolute bottom-6 left-6 z-20 rounded-full border border-snow/25 p-2.5 text-snow transition-colors duration-200 hover:border-snow/60 hover:text-jellyfish"
    >
      {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  )
}
