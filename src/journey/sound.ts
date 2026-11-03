/**
 * Optional film sound — tiny synthesized clicks (no audio files, nothing loads until the
 * visitor turns it on). Off by default; the preference is remembered per browser.
 */
const KEY = 'journey-sound';
let ctx: AudioContext | null = null;
let enabled = false;
try {
  enabled = localStorage.getItem(KEY) === '1';
} catch {
  /* storage unavailable */
}

const getCtx = () => {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
};

function blip(freq: number, ms: number, gain: number, type: OscillatorType) {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ms / 1000);
  osc.connect(g).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + ms / 1000);
}

export const sound = {
  isOn: () => enabled,
  set(on: boolean) {
    enabled = on;
    try {
      localStorage.setItem(KEY, on ? '1' : '0');
    } catch {
      /* storage unavailable */
    }
    if (on) {
      getCtx();
      blip(660, 120, 0.05, 'sine');
    }
  },
  /** A typewriter key */
  tick: () => blip(1700 + Math.random() * 500, 28, 0.025, 'square'),
  /** Chapter change */
  chime: () => blip(330, 380, 0.05, 'sine'),
};
