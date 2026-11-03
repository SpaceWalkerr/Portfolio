import { Link } from 'react-router-dom';
import { journeyChapters } from '../data/journey';

/** Reduced-motion version of the film: the same six chapters as a plain, readable page — no scroll-driven motion. */
const StaticJourney = () => (
  <div className="min-h-screen bg-[#0e0d0b] px-6 py-10 text-[#f3ede1]">
    <div className="mx-auto max-w-2xl">
      <Link to="/" className="font-monopress text-[11px] uppercase tracking-[0.18em] text-[#f3ede1]/80 hover:text-vermilion">
        ← Skip to site
      </Link>
      <ol className="mt-10 space-y-12">
        {journeyChapters.map((c, i) => (
          <li key={c.id}>
            <p className="font-monopress text-[11px] uppercase tracking-[0.3em] text-vermilion">
              {String(i + 1).padStart(2, '0')} · {c.kicker}
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{c.title}</h2>
            <p className="mt-3 font-editorial text-lg italic text-[#f3ede1]/70">{c.line}</p>
          </li>
        ))}
      </ol>
      <div className="mt-14 flex flex-wrap gap-3">
        <Link to="/#services" className="bg-oxblood px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em]">
          Hire me
        </Link>
        <Link to="/#contact" className="border border-[#f3ede1]/60 px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em]">
          Get in touch
        </Link>
        <Link to="/" className="px-3 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] underline decoration-vermilion decoration-2 underline-offset-4">
          Read the full site
        </Link>
      </div>
    </div>
  </div>
);

export default StaticJourney;
