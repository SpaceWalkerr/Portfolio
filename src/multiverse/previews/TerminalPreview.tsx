import { useEffect, useState } from 'react';

/**
 * U-02 preview — a synthwave cockpit: sun over a scrolling neon grid,
 * scanlines, and a terminal that auto-types its boot sequence on loop.
 */
const LINES = ['> boot suraj.exe', '> reality: NEON', '> ACCESS GRANTED'];
const TYPE_MS = 55;
const LINE_PAUSE_MS = 700;
const LOOP_PAUSE_MS = 2600;

const TerminalPreview = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(LINES.join('\n'));
      return;
    }
    let line = 0;
    let char = 0;
    let out = '';
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (line >= LINES.length) {
        timer = setTimeout(() => {
          line = 0;
          char = 0;
          out = '';
          setText('');
          timer = setTimeout(step, 400);
        }, LOOP_PAUSE_MS);
        return;
      }
      if (char < LINES[line].length) {
        out += LINES[line][char++];
        setText(out);
        timer = setTimeout(step, TYPE_MS);
      } else {
        out += '\n';
        line++;
        char = 0;
        timer = setTimeout(step, LINE_PAUSE_MS);
      }
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0416] font-monopress">
      {/* sun */}
      <div
        className="absolute left-1/2 top-[16%] h-16 w-16 -translate-x-1/2 rounded-full"
        style={{
          background: 'linear-gradient(180deg,#ffd15e,#ff5ea8 55%,#c23fda)',
          boxShadow: '0 0 28px rgba(255,94,168,0.55)',
        }}
      />
      {/* horizon grid, scrolling toward the viewer */}
      <div
        className="animate-mv-grid absolute -inset-x-[30%] bottom-[-10%] h-[55%]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(94,236,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,94,196,0.45) 1px, transparent 1px)',
          backgroundSize: '30px 34px',
          transform: 'perspective(180px) rotateX(62deg)',
          transformOrigin: 'bottom',
          WebkitMaskImage: 'linear-gradient(transparent, #000 45%)',
          maskImage: 'linear-gradient(transparent, #000 45%)',
        }}
      />
      {/* terminal readout */}
      <div className="absolute inset-x-3 top-[38%] rounded border border-[#5eecff]/40 bg-[#0b0416]/80 p-2 text-[8px] leading-[1.7] text-[#7bf0ff] shadow-[0_0_18px_rgba(94,236,255,0.12)]">
        <pre className="whitespace-pre-wrap font-monopress">
          {text}
          <span className="animate-mv-caret inline-block h-[8px] w-[5px] translate-y-[1px] bg-[#7bf0ff]" />
        </pre>
      </div>
      {/* scanlines + CRT vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'repeating-linear-gradient(rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'radial-gradient(80% 80% at 50% 50%, transparent 55%, rgba(4,2,10,0.8))' }}
      />
    </div>
  );
};

export default TerminalPreview;
