# Suraj Nandan — brand kit

One identity, everywhere. Search engines (and AI assistants) decide which "Suraj Nandan"
a page is about by matching the same name, photo, headline, location and links across sites.
Every profile below should read like the same person and link back to **surajnandan.in**.

## The constants

| | |
|---|---|
| **Name** | Suraj Nandan — always both names, always this spelling |
| **Headline** | Full-Stack & AI Engineer |
| **One-liner** | Reliable web products and grounded AI systems, built end to end. |
| **Location** | Kishanganj, India |
| **Website** | https://surajnandan.in (no `www`) |
| **Photo** | `public/profile.webp` — the same photo on every profile |
| **Handles** | GitHub `SpaceWalkerr` · LinkedIn `/in/surajnandan` · LeetCode `SurajNandan` · X `@SurajNandan1625` |

## Bios by length

**160 characters** (GitHub, X, LeetCode):
> Full-stack & AI engineer. Reliable web products and grounded AI systems, built end to end. React · Node · TypeScript · PostgreSQL. surajnandan.in

**LinkedIn headline** (≤220):
> Full-Stack & AI Engineer · Building reliable web products and grounded AI systems end to end · React, Node.js, TypeScript, PostgreSQL · B.Tech CSE, SRM IST '27

**LinkedIn About** (paste as-is):
> I'm a full-stack and AI engineer who likes to own a problem from end to end — the data model, the API, the interface, and the small details in between. What I care about most is building software people can trust: it behaves the same way every time, explains itself, and fails honestly when it has to.
>
> I'm drawn to the hard parts. The rule that has to hold when two requests arrive at the same moment. The AI answer that has to point back to its source. I'd rather make one thing correct than ten things impressive.
>
> A few things I've built:
> • Knot.ai — a spoken AI interview panel whose report can only quote what the candidate actually said
> • Hospitality.ai — an insurance-aware hospital navigator with source-verified policy citations
> • CardBridge — a marketplace whose escrow rules are enforced by PostgreSQL itself
> • A distributed job scheduler with six hand-built scheduling data structures
>
> I keep my fundamentals sharp on LeetCode (875+ problems) and write up what I build, mistakes included.
>
> Case studies and writing: surajnandan.in

## Profile checklist

### LinkedIn — the biggest gap today
Google currently shows your LinkedIn as "Suraj Nandan – Xtin Services" in **Ghaziabad**, while the site says Kishanganj.
- [ ] Headline → the LinkedIn headline above
- [ ] Location → Kishanganj, Bihar, India
- [ ] About → the LinkedIn About above
- [ ] Contact info → Website: `https://surajnandan.in` (type: Portfolio)
- [ ] Featured → add surajnandan.in, the Knot.ai case study and the Hospitality.ai case study
- [ ] Profile photo → the same photo as the site

### GitHub — already consistent
Bio, location and website are right. Two upgrades:
- [ ] Profile README → replace with [`github-profile-README.md`](github-profile-README.md) (keeps the look, adds text Google can read)
- [ ] Pin these six: Knot.ai, Hospitality.ai, CardBridge, Job-Scheduler, GigShield, Portfolio
- [ ] Give each case-study repo a description, topics, and point **Website** at its case study (see below)

### LeetCode and X
- [ ] Bio → the 160-character bio above
- [ ] Website → `https://surajnandan.in`

## Repo descriptions (Settings → About on each repo)

Pointing each repo's **Website** at its case study turns five repos into five links to your site.

| Repo | Description | Website | Topics |
|---|---|---|---|
| Knot.ai | Spoken AI interview panel that adapts to your answers — and a report that can only quote you. Agora voice + Claude, interview control in a deterministic proxy. | https://surajnandan.in/projects/knot-ai | `ai` `voice-ai` `llm` `interview` `typescript` `fastify` `react` |
| Hospitality.ai | Insurance-aware hospital and treatment navigator: policy extraction with source-verified citations, deterministic cost ranking. | https://surajnandan.in/projects/hospitality-ai | `nextjs` `typescript` `llm` `healthcare` `insurance` `zod` |
| CardBridge | Card-discount marketplace with a PostgreSQL-enforced escrow state machine, KYC tiers and Row Level Security. | https://surajnandan.in/projects/cardbridge | `supabase` `postgresql` `row-level-security` `escrow` `react` `typescript` |
| Job-Scheduler | Distributed job scheduler on PostgreSQL — SKIP LOCKED claiming, DAG workflows, retries, leader election, live dashboard. | https://surajnandan.in/projects/job-scheduler | `job-scheduler` `postgresql` `nodejs` `typescript` `algorithms` `distributed-systems` |
| GigShield | Parametric income protection for delivery riders — automatic, weather-triggered payouts. Team build. | https://surajnandan.in/projects/gigshield | `insurtech` `react` `supabase` `parametric-insurance` `hackathon` |

The live demo links stay on each case-study page, one click away.

## Search engines (5 minutes, once)

1. **Vercel → Settings → Domains:** make `surajnandan.in` the primary domain so `www` redirects to it with a permanent 308.
2. **Google Search Console** → add a *Domain* property for `surajnandan.in` (verify with the DNS TXT record) → Sitemaps → submit `https://surajnandan.in/sitemap.xml` → URL Inspection → request indexing for `/` and the five case studies.
3. **Bing Webmaster Tools** → "Import from Google Search Console" (one click; also feeds DuckDuckGo and Copilot).
