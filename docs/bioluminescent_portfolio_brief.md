# Portfolio Design Brief — "The Descent"
### Suraj Nandan · Full Stack Developer & Software Engineer

---

## 0. Concept

The page is a **descent through the water column**. As the visitor scrolls, the background genuinely darkens — from a sunlit surface haze down through the twilight zone into the pitch black of the midnight zone — and at each depth, the one organism that actually lives there switches on and lights that section of content. Depth isn't a gimmick; it's the information architecture. Each creature is chosen because of what it *does*, not just how it looks:

| Depth | Section | Organism | Why this creature |
|---|---|---|---|
| Surface haze | Hero | Ambient marine snow + light shafts | First light, before anything has switched on |
| Epipelagic | About | Firefly swarm | Land-to-sea threshold — fireflies are the one bioluminescent creature people already know, easing the visitor in |
| Mesopelagic (twilight) | Skills | Firefly squid + Lanternfish | Countershading creatures that use light defensively/functionally — maps to "tools you wield" |
| Mesopelagic | Experience | Electric eel | Literal electricity — career = current, voltage, momentum |
| Mesopelagic | Education | Moon jellyfish | Slow, drifting, foundational pulse — the quiet accumulation before the dive gets serious |
| Bathypelagic (midnight) | Projects | Anglerfish | The lure. An anglerfish's entire biology is "attract, then reveal" — exactly what a project gallery should do |
| Bathypelagic | Certifications | Flashlight fish | Bio-photophores that blink in coded patterns — credentials as switched-on proof points |
| Abyssal | Contact | Comb jelly (ctenophore) | The one full-spectrum rainbow moment in the entire site, saved for last as the payoff |

This gives you a justified "signature element": **a cursor-reactive bioluminescence trail** — as the visitor moves their mouse, faint particles disturb and glow briefly, like real plankton reacting to movement in dark water. Used once, well, sitewide — not stacked with other effects.

---

## Tooling — already installed

This build uses two Claude Code skills already installed in this project. Claude Code should use them as follows, not treat this brief as something to implement from scratch by hand:

- **UI UX Pro Max** (`.claude/skills/ui-ux-pro-max`) — run this first, before writing any component, to validate/extend the token system in Section 1 (contrast ratios against `--abyss-black`, spacing scale, responsive breakpoints) and to cross-check each section's layout against real UX patterns. Example:
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "bioluminescent dark portfolio" --design-system --stack react`
  Treat its output as a second-opinion pass on top of this brief's tokens/layout — where they conflict, this brief's choices win (they're derived from the actual reference photography, not a generic palette).

- **21st.dev Magic** (`/ui`, `/21`) — use this to scaffold individual components once the design system above is locked in, one section at a time, referencing the exact section number/name from Section 2 so the generated component matches its assigned creature/accent/behavior. Example:
  `/ui build the Projects section filter tabs described in Section 2 — anglerfish lure motif, active tab lit in --anglerfish-amber, inactive tabs dim until hovered`
  Don't let it free-generate a generic hero/pricing/testimonial pattern; always anchor the prompt to the specific section brief above so the depth-descent narrative survives the generation.

Build order: tokens/system (Section 1) → UI UX Pro Max validation pass → section-by-section component generation via 21st.dev Magic, in the order Hero → About → Skills → Experience → Education → Projects → Certifications → Contact → Footer, so the depth gauge and cursor-trail signature (Section 3) get wired in once, early, and every later section just consumes them.

---

## 1. Design Tokens

### Color
Pull directly from the reference photography rather than a generic dark-mode palette:

```
--abyss-black:      #050910   (base background, near-black navy — not pure #000)
--deep-navy:        #0B1524   (section base at shallower depths)
--surface-haze:     #16283A   (hero gradient top, sunlit particulate water)

--eel-teal:         #35E8B8   (Electric Eel — Experience accent)
--flashlight-pink:  #F23FA0   (Flashlight Fish — Certifications accent)
--flashlight-cyan:  #3FE0F2   (Flashlight Fish — Certifications secondary)
--anglerfish-amber: #FFB347   (Anglerfish lure — Projects accent, primary CTA color)
--jelly-white:      #E8F4FF   (Moon Jellyfish — Education, soft bioluminescent white-blue)
--firefly-gold:     #F2D675   (Firefly swarm — About accent)
--comb-spectrum:    linear-gradient(90deg, #6BC1FF, #7BE0A0, #F2D675, #FF8A65, #C77DFF)
                     (Comb Jelly — Contact, the one rainbow moment)

--text-primary:     #EAF2F6
--text-muted:       #7C93A3
```

Rule: **one accent color per section, at full saturation only on the signature element of that section** (a heading underline, an icon glow, a border). Everything else in that section stays desaturated navy/white. This is what keeps 8 different creatures from turning into a color soup.

### Typography
Avoid the templated serif-display/warm-sans pairing. Given the deep-sea + engineering brief, pair a **technical monospace** (for the "instrument readout" feel — depth gauges, coordinates, code) with a **quiet, slightly condensed grotesk** for actual reading:

- **Display / depth markers / section eyebrows:** `JetBrains Mono` or `IBM Plex Mono` — used for things like `— 200M —` depth readouts, project index numbers, timestamps. This is where "numbered markers" are actually justified: you're descending through real depth, so a running depth counter in the corner is information, not decoration.
- **Headings:** `General Sans` or `Söhne` — condensed, high-contrast weight jump (Light → Bold), no italics.
- **Body:** `Inter` or `IBM Plex Sans` at a slightly desaturated `--text-muted`, generous line-height (1.7) since it's sitting on a dark background.

### Layout Concept
Single continuous scroll, full-bleed video/image loop as the background of each section (your animated loops), with a **live depth gauge** pinned to the left edge of the viewport (replaces the generic scroll-progress bar) — e.g. `SURFACE → 12M → 340M → 1,000M → 4,000M` ticking down as you scroll, doubling as your existing `ScrollProgress.tsx`.

```
┌─────────────────────────────────────┐
│ ░ nav (glass, ultra-thin border)    │
├─┬───────────────────────────────────┤
│d│                                   │
│e│      HERO                        │
│p│      ambient loop bg              │
│t│      name / role / CTA            │
│h│                                   │
├─┼───────────────────────────────────┤
│g│      ABOUT                        │
│a│      firefly loop bg (dimmed 70%) │
│u│      bio text · stat counters     │
│g│      lit in --firefly-gold        │
│e│                                   │
├─┼───────────────────────────────────┤
│ │      SKILLS                       │
│ │      lanternfish + firefly squid  │
│ │      loops, split by category     │
├─┼───────────────────────────────────┤
│ │      EXPERIENCE                   │
│ │      electric eel loop, timeline  │
│ │      lit in --eel-teal            │
├─┼───────────────────────────────────┤
│ │      EDUCATION                    │
│ │      moon jellyfish loop (slow)   │
│ │      lit in --jelly-white         │
├─┼───────────────────────────────────┤
│ │      PROJECTS                     │
│ │      anglerfish loop, lure = CTA  │
│ │      lit in --anglerfish-amber    │
├─┼───────────────────────────────────┤
│ │      CERTIFICATIONS               │
│ │      flashlight fish loop         │
│ │      badges "blink" on in coded   │
│ │      sequence (--flashlight-*)    │
├─┼───────────────────────────────────┤
│ │      CONTACT                      │
│ │      comb jelly loop — full       │
│ │      rainbow signature moment     │
└─┴───────────────────────────────────┘
```

---

## 2. Section-by-Section Direction

### Hero
Full-bleed loop of the ambient marine-snow/light-shaft footage at ~30% opacity behind a still-darker gradient, so text stays legible. Word-by-word pull-up animation (keep your existing `prisma-hero.tsx` mechanic) for:

> **Suraj Nandan**
> Full Stack Developer

Depth gauge reads `SURFACE — 0M` in the corner, monospace, small, quiet. Two CTAs: "View Projects" (scrolls to Projects, styled in anglerfish-amber to foreshadow) and "Resume" (opens your existing `ResumeModal.tsx`).

**Signature interaction:** cursor movement leaves a 400ms-decay trail of tiny glowing dots — disturbed bioluminescent plankton. Implement once, reuse the same particle system (color-shifted per section) throughout rather than building a new effect per section.

### About
Firefly loop dimmed to near-silhouette, treeline barely visible at the bottom edge — this is the one section where the background isn't underwater, marking the surface-to-sea threshold. Stat counters (3+ years, 20+ projects, 20+ technologies) rendered as small glowing points that "ignite" on scroll-into-view, echoing the fireflies themselves.

### Skills
Split two ways to use both mesopelagic creatures meaningfully: **Languages/Frontend** categories sit against the lanternfish loop (rows of small steady photophore lights = a grid of skill badges, each with a small dot indicator instead of a progress bar — more honest and more in-theme than a percentage bar anyway), **Backend/Databases/AI** sit against the firefly squid loop (the squid's pixel-like glow pattern is a nice motif for API/data skills specifically).

### Experience
Electric eel loop as background, teal current-lines animate very subtly along the timeline connector itself (`Experience.tsx`), as if the timeline *is* the eel's electric pathway. Each role card's left border lights up in `--eel-teal` on scroll-into-view.

### Education
Moon jellyfish loop, deliberately the slowest and calmest section — long, slow drift, minimal motion, generous whitespace. This is a good place to let the design breathe after Skills/Experience.

### Projects
This is your hero moment for the "lure" metaphor: the anglerfish's illicium (the glowing lure) becomes the literal visual anchor for the category filter tabs — the active filter tab is the one lit lure; the others sit dim until hovered, exactly like an anglerfish only the lure is visible in the dark. Project cards keep your existing modal + live-demo/GitHub link pattern; on hover, a card's edge lights up in amber like something drawn toward the light.

### Certifications
Flashlight fish loop. Each certificate badge is a small dot that switches on in sequence as the section scrolls into view (staggered ~80ms per badge) — mimicking the fish's actual blink-communication behavior. Featured certificates (Gold Medal NPTEL, Campus Mantri, etc.) get the pink/cyan two-tone glow; the rest stay a single steady cyan.

### Contact
Comb jelly loop, full rainbow spectrum — the one section allowed to use `--comb-spectrum` as a gradient (on the form's focus states and submit button only). This is your "one real risk": everywhere else is disciplined single-accent-per-section; here, for the final impression, the whole spectrum shows up at once, same as the ctenophore itself only revealing its iridescence when it moves.

### Footer
Return to near-total black, single line of text, no loop — the abyssal floor. Quiet close.

---

## 3. Motion Rules

- Each section's video loop sits at low opacity (20–35%) behind a solid gradient overlay so text never fights the footage — the loop is atmosphere, not content.
- Loops should use `prefers-reduced-motion` fallbacks to static stills (you already have the PNGs for exactly this).
- Keep Framer Motion `whileInView` triggers subtle: fade + 12px rise, not scale or rotate. You already have this instinct in your codebase — extend it, don't reinvent it.
- The cursor-trail signature effect should be the *only* thing that's genuinely playful; every other transition stays restrained.

## 4. Copy Voice
Keep the existing factual, plain register from your README (it's already good — specific numbers, real company names, no filler adjectives). Avoid theme-bleed into the copy itself: no "dive into my projects" puns. The visuals carry the ocean metaphor; the words stay direct and professional.

## 5. Technical Notes (matches your existing stack)
- React 18 + TypeScript + Vite + Tailwind — no changes needed to your stack.
- Depth gauge = extend `ScrollProgress.tsx` to also compute a "depth" label from scroll percentage against a fixed depth table.
- Cursor trail = a lightweight canvas or absolutely-positioned div pool (20–30 particles, recycled), not a heavy WebGL layer — keep bundle size sane.
- Background loops: your animated videos, compressed to WebM/MP4 ≤2–3MB each, `muted loop playsinline`, with the corresponding PNG as `poster`.
- Accent colors as CSS custom properties scoped per `<section>` so each component only ever reaches for `var(--accent)` — makes the eight-creature system maintainable instead of hardcoded hex scattered everywhere.

---

## 6. What NOT to do
- Don't use all eight accent colors on one screen at once — one per section, full stop, until Contact.
- Don't add numbered "01/02/03" markers to Projects or Skills — those aren't sequences. The depth gauge is your one legitimate numbered/ordered device; don't duplicate it elsewhere.
- Don't let the loops autoplay above 35% opacity — legibility over spectacle.
- Don't reuse the cursor-trail idea as a second signature effect elsewhere (e.g. don't also add particle bursts on button clicks) — one bold move, executed well, beats several small ones.
