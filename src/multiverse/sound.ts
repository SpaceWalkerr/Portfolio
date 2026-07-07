/**
 * Sound-effect architecture for the multiverse.
 *
 * No audio ships yet (loading pages should never autoplay sound), but every
 * interaction already calls through this registry — so wiring real effects
 * later is: register('portal-open', buffer) and flip `muted`.
 */
type SoundName = 'portal-open' | 'portal-hover' | 'loader-complete' | 'reality-denied';

class SoundRegistry {
  private context: AudioContext | null = null;
  private buffers = new Map<SoundName, AudioBuffer>();
  muted = true;

  async register(name: SoundName, url: string) {
    this.context ??= new AudioContext();
    const data = await (await fetch(url)).arrayBuffer();
    this.buffers.set(name, await this.context.decodeAudioData(data));
  }

  play(name: SoundName) {
    if (this.muted || !this.context) return;
    const buffer = this.buffers.get(name);
    if (!buffer) return;
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    source.start();
  }
}

export const sound = new SoundRegistry();
