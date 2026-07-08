import { useState } from "react";
import { SECTIONS } from "../lib/sections";
import { useDescent } from "../lib/DescentContext";
import { PROFILE } from "../data/content";

const NAV_ITEMS = SECTIONS.filter((s) => s.id !== "hero");

/**
 * Glass top nav with an ultra-thin border (brief layout). The link matching the
 * active section lights in that section's accent — the nav quietly participates
 * in the descent rather than staying static.
 */
export default function Nav() {
  const { activeIndex } = useDescent();
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/[0.06] bg-abyss-black/40 px-6 py-4 backdrop-blur-md md:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-sm font-medium tracking-tight text-text-primary"
        >
          {PROFILE.name}
          <span className="ml-2 align-middle text-[0.6rem] text-text-muted">
            ↓ the descent
          </span>
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((s) => {
            const isActive = SECTIONS[activeIndex]?.id === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className="readout transition-colors"
                  style={{ color: isActive ? "var(--accent)" : undefined }}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
          <li>
            <button onClick={() => go("versions")} className="readout transition-colors">
              Versions
            </button>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="readout md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-b border-white/[0.06] bg-abyss-black/95 px-6 py-4 md:hidden">
          {NAV_ITEMS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                className="block w-full py-2 text-left font-display text-lg text-text-primary"
              >
                {s.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => go("versions")}
              className="block w-full py-2 text-left font-display text-lg text-text-primary"
            >
              Versions
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
