# Journey mode — plan

Branch: `journey-mode`. The normal site ("The Nandan Review") is untouched; Journey is an optional cinematic view at `/journey`.

## Format (decided)
Cinematic **scroll film**: a pinned full-screen stage; scrolling drives a master timeline (scrubbed), chapter by chapter. An "Auto-play" button advances the scroll for hands-free viewing. Always-visible "Skip to site" and Esc to exit.

## Defaults (change if you disagree)
- Audio: none by default; optional sound toggle (typewriter clicks / soft ambient) added in the polish phase, off until the visitor enables it.
- Look: dark cinematic stage (ink background, paper text, oxblood accent) so it feels distinct from the paper site while reusing the same fonts and tokens.
- Mobile: vertical layout, same scroll mechanics. `prefers-reduced-motion`: static chapter-by-chapter fallback.

## Chapters
0. Cold open — typewriter types the name, pulls back to a title card.
1. 2023: first line of code — terminal, Kishanganj / SRM, timeline spine starts drawing.
2. Learning in public — DEV posts, YouTube, the book *Unscrolled* stacking up.
3. Things I built — per-project scenes using `public/clips`; architecture/pipeline diagrams that build themselves.
4. Work — experience as a path with milestones; numbers count up.
5. Now & next — services, Gumroad, Fiverr, final Hire me / Contact call-to-action.

## Architecture
- `src/journey/` — `Journey.tsx` (stage + scroll driver), `chapters/*.tsx`, `useJourneyProgress.ts`, `ProgressRail.tsx`.
- `src/data/journey.ts` — story beats, narration, timing only. Facts come from `projects.ts`, `posts.ts`, `site.ts`, experience data.
- Lazy route `/journey` in `App.tsx`; entry points: hero button, navbar, command palette.
- Framer Motion (`useScroll`/`useTransform`) + existing Three.js; no new heavy deps.

## Phases
1. Skeleton: route, pinned stage, scroll progress, chapter rail, entry buttons.
2. Chapters 0–2.
3. Chapters 3–4 (project and experience scenes).
4. Chapter 5, mobile, reduced motion, optional sound, polish.

Verify each phase with puppeteer screenshots (see memory: verify-webgl-intro).
