import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Newspaper, FileText, Mail } from 'lucide-react';
import Seo from '../components/Seo';

const links = [
  { to: '/#projects', label: 'Front Page — Projects', Icon: Newspaper },
  { to: '/#blog', label: 'The Op-Ed — Articles', Icon: FileText },
  { to: '/#experience', label: 'The Record — Experience', Icon: Newspaper },
  { to: '/#contact', label: 'Write to the Editor', Icon: Mail },
];

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title="Page Not Found (404) — Suraj Nandan"
        description="This page has gone to press elsewhere. Return to the front page of Suraj Nandan's portfolio."
        path="/404"
        noindex
      />
      <div className="relative flex min-h-screen items-center justify-center bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-2xl px-5 py-28 sm:px-8">
          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">Stop Press</span>
            <span>Edition Not Found</span>
          </div>
          <div className="border-t border-ink" />

          <p className="mt-10 font-monopress text-[11px] uppercase tracking-[0.3em] text-ink-mute">
            Error 404
          </p>
          <h1 className="mt-3 font-display text-6xl font-black uppercase leading-[0.85] tracking-[-0.02em] sm:text-8xl">
            Off the
            <br />
            Record
          </h1>
          <p className="mt-6 max-w-lg font-editorial text-lg italic leading-relaxed text-ink-mute">
            The story you asked for isn't in this edition — the link may be mistyped, or the piece
            was pulled before it went to print.
          </p>

          <div className="mt-10 border-y border-ink/20 py-2">
            <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-faint">
              Continue reading
            </span>
          </div>
          <ul className="mt-4 divide-y divide-ink/10">
            {links.map(({ to, label, Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex items-center gap-3 py-3 font-monopress text-[11px] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:text-oxblood"
                >
                  <Icon size={14} />
                  <span>{label}</span>
                  <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-ink px-6 py-3 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <ArrowLeft size={14} /> Back to the Front Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
