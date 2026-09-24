/**
 * Long-form case studies, keyed by project slug and rendered on /projects/:slug.
 *
 * Every claim here is taken from the project's own repository (README, docs,
 * migrations, commit history). Drafts stay hidden until `published: true`;
 * append `?preview` to a project URL to read an unpublished draft.
 *
 * Inline text supports [links](url) and `code`.
 */

export interface CaseStudy {
  published: boolean;
  /** One line: what I did, solo or with whom */
  role: string;
  /** Where it was built / for what, and when */
  context: string;
  /** The headline insight — shown as the pull quote */
  thesis: string;
  problem: string[];
  approach: string[];
  /** The request/data path, left to right */
  flow: { label: string; detail: string }[];
  decisions: { title: string; body: string }[];
  /** "Learned the hard way": what broke → what fixed it */
  lessons?: { broke: string; fix: string }[];
  /** Verifiable facts only */
  figures: { value: string; label: string }[];
  limits: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
  'knot-ai': {
    published: true,
    role: 'Solo — design, voice pipeline, interview engine, report grounding',
    context: 'Hackathon build (Echo Sphere × Agora) · Aug–Sep 2026',
    thesis: 'Instruction is not control. The model supplies judgement and phrasing; the server decides what happens.',
    problem: [
      'Interview practice today means reading questions off a screen. Real interviews are spoken, they get harder when you do well, they pin you down when you are vague, and they are run by several people who each want something different and compare notes afterwards.',
      'The obvious build — hand the whole interview to an LLM and ask it nicely — failed in testing. Against an LLM-driven candidate, the interviewer model tunnel-visioned on one topic and escalated difficulty freely, ignoring “adjust by one level” and “cover three areas” the moment they competed with its own instincts.',
    ],
    approach: [
      'I split the job. The model does what only a model can: understand an answer, judge it, and phrase the next question in character. Everything countable became a state machine in an OpenAI-compatible proxy that Agora’s voice engine calls on every turn — difficulty is a streak-based ladder clamped to 1–5, topic coverage rotates on a counter, and the right/partial/wrong verdict is emitted as an out-of-band tag that the proxy speaks itself, so what the candidate hears and what the report tallies can never disagree.',
      'A panel of five personas (technical, hiring manager, stakeholder, product, behavioural) hands off between rounds through a short digest — covered topics, grounded bullets, end difficulty — which is the only thing that crosses into the next interviewer’s prompt. Afterwards, the report can only say what the candidate actually said: every strength and weakness carries a quote, and a verification pass drops any claim whose quote cannot be found in the transcript.',
    ],
    flow: [
      { label: 'Candidate', detail: 'speaks; can barge in' },
      { label: 'Agora', detail: 'ASR · VAD · TTS' },
      { label: 'Knot proxy', detail: 'pre-screen, difficulty ladder, director note' },
      { label: 'Claude', detail: 'judgement + next question' },
      { label: 'SQLite', detail: 'turn log = source of truth' },
    ],
    decisions: [
      {
        title: 'Pose as the LLM',
        body: 'Agora’s engine speaks the OpenAI chat-completions dialect, so the Fastify server exposes `/v1/chat/completions` and owns every turn — re-injecting the persona prompt and a per-turn director note, which also survives Agora truncating history to 32 messages.',
      },
      {
        title: 'Cheap, deterministic pre-screen',
        body: 'Before the model sees a turn, regex checks catch what regex reliably can: answers under 8 words, hedging with no concrete signal, and genuine self-retractions. Any flag forces a narrow follow-up and holds or lowers difficulty.',
      },
      {
        title: 'Fuzzy-but-strict evidence matching',
        body: 'Quotes match on a normalised substring, then an 80% token-overlap fallback against the cited turn — so a lightly paraphrased quote still grounds, but an invented metric or technology does not. The report shows how many claims were cut.',
      },
      {
        title: 'Barge-in at ~160ms',
        body: '`interrupt_duration_ms: 160` with AI VAD and noise suppression, and Claude’s tokens streamed straight to TTS so the interviewer starts speaking before the sentence is finished.',
      },
    ],
    lessons: [
      {
        broke: 'Asking the model to say an exact verdict sentence — it substituted “That’s a solid overview”.',
        fix: 'The model emits a `<right>/<partial>/<wrong>` tag; the proxy speaks the sentence, verbatim by construction.',
      },
      {
        broke: 'The contradiction detector fired on any shared long word — by round three it flagged everything.',
        fix: 'Tightened to a real self-retraction: an “I/we” subject plus topical overlap right after a negation.',
      },
      {
        broke: 'Agora TTS fails silently — the agent joins, reports RUNNING, and never publishes audio.',
        fix: 'A `/health/tts` pre-flight that names the missing credentials, plus an 18-second audio watchdog in the browser.',
      },
    ],
    figures: [
      { value: '5', label: 'interviewer personas' },
      { value: '~160ms', label: 'barge-in threshold' },
      { value: '1–5', label: 'difficulty ladder, ±1 per turn' },
      { value: '0', label: 'report claims without a quote' },
    ],
    limits: [
      'The interview brain is verified against a mocked Agora (`npm run sim`); the live voice path is the thinner-tested surface.',
      'State is single-node — in-memory per round, plus SQLite for the transcript.',
      'Runs on Render’s free plan, which sleeps after ~15 minutes idle; a cold start mid-interview breaks the voice loop.',
    ],
  },

  cardbridge: {
    published: true,
    role: 'Solo — schema, Row Level Security, state machine, React front end',
    context: 'Personal project · Jun–Aug 2026',
    thesis: 'When money moves, the rules belong in the database — not in whichever client happens to call it.',
    problem: [
      'You find a great card discount on something you want, but you don’t own that card. Someone else does and would buy it for you for a fee — but neither of you can trust the other with the money.',
      'That makes CardBridge a trust problem more than a UI problem: requesters need to know they will get the product, cardholders need to know they will be paid, and the platform needs every transition to be auditable.',
    ],
    approach: [
      'I put the business rules in Postgres. A transaction moves through `MATCHED → FUNDED → PURCHASED → SHIPPED → DELIVERED → RELEASED` (plus `CANCELLED`, `DISPUTED` and `REFUNDED`), and a BEFORE-UPDATE trigger checks every change against a legal-transition map, the caller’s role and the invariants before it is allowed. An AFTER-UPDATE trigger writes an immutable event log, syncs the request’s status and credits the user’s tier.',
      'Trust is layered on top: a KYC lifecycle (`UNVERIFIED → PENDING → VERIFIED/REJECTED`) with private document storage, tiered transaction limits enforced in both the UI and the database, disputes that freeze escrow, and an admin panel gated by RLS that resolves them by release, refund or a request for more information.',
    ],
    flow: [
      { label: 'Requester', detail: 'posts a request, funds escrow' },
      { label: 'Matching', detail: 'OPEN requests × cardholder’s cards' },
      { label: 'State machine', detail: 'Postgres triggers + RPC' },
      { label: 'Event log', detail: 'immutable, per transition' },
      { label: 'Realtime', detail: 'notifications to both sides' },
    ],
    decisions: [
      {
        title: 'The database is the referee',
        body: 'Transitions go through a `transition_transaction` RPC and are validated by triggers, so a buggy or malicious client cannot skip a state, self-deal, or exceed a tier cap — the database refuses.',
      },
      {
        title: 'RLS on every table',
        body: 'Only the anon key ships to the browser; Row Level Security scopes every read and write to the people in a transaction. A guard trigger blocks users from promoting their own profile privileges.',
      },
      {
        title: 'Timeouts on two clocks',
        body: 'A configurable timeout policy runs on page load and on a scheduled Edge Function (`escrow-timeout-sweep`), and disputed transactions are skipped by every automatic action.',
      },
      {
        title: 'Fourteen ordered migrations',
        body: 'The whole schema — enums, RLS, views, state machine, storage buckets, reviews and notifications — lives as versioned SQL, including the fixes (an enum cast, and breaking an RLS recursion between requests and transactions).',
      },
    ],
    lessons: [
      {
        broke: 'Postgres can’t use a new enum value in the same transaction that adds it.',
        fix: 'Adding `MATCHED` and `SHIPPED` got its own migration that must commit before the state machine’s.',
      },
      {
        broke: 'The SELECT/UPDATE policies on requests and transactions referenced each other and recursed.',
        fix: 'Broke the cycle with `SECURITY DEFINER` helper functions.',
      },
    ],
    figures: [
      { value: '6', label: 'steps from match to release' },
      { value: '14', label: 'SQL migrations' },
      { value: '3', label: 'private storage buckets' },
      { value: '6', label: 'build phases, feature-complete' },
    ],
    limits: [
      'Escrow and KYC are stubbed integrations — the lifecycle is real, the payment and identity providers are not.',
      'There is no automated test suite in the repository yet.',
      'The first admin must be set by hand in SQL; there is deliberately no UI for self-promotion.',
    ],
  },

  'hospitality-ai': {
    published: true,
    role: 'Solo — product, design system, AI services, matching engine, tests',
    context: 'GE HealthCare Precision Care Challenge 2026 · Aug–Sep 2026',
    thesis: 'Let the model read the policy. Never let it do the arithmetic on somebody’s hospital bill.',
    problem: [
      'During a medical emergency, nobody has time to read forty pages of insurance clauses — yet those clauses decide what a family pays. The worst surprise in the Indian market is proportionate deduction: pick a room over the policy’s cap and every associated charge is scaled down, often costing far more than the room difference itself.',
      'An AI that summarises a policy is easy to build and dangerous to trust. The product had to be decision support that can prove every statement, and that says plainly what it doesn’t know.',
    ],
    approach: [
      'Three components, each doing only what it should. A policy agent extracts the document into a validated schema with `messages.parse()` and Zod; the document goes in with line numbers, and every claim comes back with a verbatim quote and a line range that is re-verified against the source and stamped exact, fuzzy or unverified — the UI renders all three differently.',
      'The hospital and room matching engine is deterministic TypeScript: room fit, proportionate deduction, sub-limits, co-pay, deductibles, out-of-network haircuts and the sum insured, ranked by a fixed weighted formula whose full breakdown is shown under “Why this rank”. The model only narrates the result, streamed in behind a list that has already painted. A four-stage journey copilot (admission → investigation → procedure → recovery) surfaces policy-grounded guidance, like the 48-hour pre-authorisation window, while the patient can still act on it.',
    ],
    flow: [
      { label: 'Policy PDF', detail: 'rebuilt line by line from glyphs' },
      { label: 'Policy agent', detail: 'Zod-validated extraction + quotes' },
      { label: 'Verifier', detail: 'exact / fuzzy / unverified' },
      { label: 'Matching engine', detail: 'deterministic cost + rank' },
      { label: 'Copilot', detail: 'stage guidance, streamed' },
    ],
    decisions: [
      {
        title: 'Semantic extraction, deterministic money',
        body: 'Clauses like co-pay ordering and scheme exclusivity are semantic, so extraction is delegated to the model. Resolved caps (1% of ₹5,00,000 → ₹5,000/day) and every rupee of the bill are computed in code.',
      },
      {
        title: 'Gaps, not guesses',
        body: 'Anything the document doesn’t say goes into a visible gaps list instead of being filled with what is “usually” true. A non-dismissible disclosure sits on every screen.',
      },
      {
        title: 'One stream, two payloads',
        body: 'Newline-delimited JSON carries the structured ranking and the narration’s token deltas in one response, flushed on animation frames so the screen stays calm.',
      },
      {
        title: 'Works with no key at all',
        body: 'Without an API key the app runs end to end in Demo Mode on pre-authored extractions of three sample policies — and still runs every citation through the same verifier.',
      },
    ],
    figures: [
      { value: '3', label: 'AI components' },
      { value: '91', label: 'Playwright runs, desktop + phone' },
      { value: 'WCAG 2.2 AA', label: 'axe scans, light and dark' },
      { value: '14', label: 'hospitals in the synthetic dataset' },
    ],
    limits: [
      'Everything is synthetic — the policies, the 14 Bengaluru hospitals and their tariffs are invented.',
      'Scanned PDFs are not read (no OCR); distances are straight-line, not drive time.',
      'Rate limits are per instance unless Redis is configured.',
    ],
  },

  'job-scheduler': {
    published: true,
    role: 'Solo — backend, scheduling algorithms, dashboard, tests',
    context: 'Personal project · Jul–Sep 2026',
    thesis: 'The most important line of code is a carefully worded `FOR UPDATE SKIP LOCKED`.',
    problem: [
      'A job scheduler has one promise that matters more than every feature: a job must never run twice by accident, and it must never be lost when a worker dies halfway through.',
      'Most tutorials reach for Redis or a broker. I wanted to see how far correctness could go on the one dependency the system already needed — Postgres — and where the database genuinely runs out of expressiveness.',
    ],
    approach: [
      'Claiming is a single `UPDATE … WHERE id IN (SELECT … FOR UPDATE OF j SKIP LOCKED)`: many workers poll the same queue, each locks rows the others aren’t touching, and dependency gating happens in the same statement. Per-queue concurrency is a hard bound across the fleet — the count and the claim share one transaction behind a per-queue advisory lock — and a Postgres advisory lock elects a single scheduler leader, with automatic failover when the leader’s connection drops.',
      'Where SQL can’t express the decision, six structures are implemented by hand and wired into the running scheduler: a binary min-heap for cross-queue priority dispatch, Kahn’s algorithm for DAG execution plans, three-colour DFS to reject dependency cycles, union-find for independent job clusters, a min-heap delay queue for retries, and Deficit Round Robin so one saturated queue can’t starve the rest.',
    ],
    flow: [
      { label: 'API', detail: 'Express · JWT · project RBAC' },
      { label: 'Postgres', detail: 'jobs table, SKIP LOCKED claim' },
      { label: 'Workers', detail: 'min-heap dispatch, heartbeats' },
      { label: 'Scheduler', detail: 'leader-elected tick, cron, reaper' },
      { label: 'Dashboard', detail: 'WebSocket push + polling fallback' },
    ],
    decisions: [
      {
        title: 'Postgres over a broker',
        body: 'One dependency instead of two. The trade-off is a latency floor from polling and the jobs table as the throughput ceiling — acceptable at this scale, with `LISTEN/NOTIFY` as the next step.',
      },
      {
        title: 'Lock only what you claim',
        body: 'The claim uses `FOR UPDATE OF j`, not a plain `FOR UPDATE`: it joins each job’s dependency only to read it, and locking those rows too would let two jobs that share a dependency block each other’s claims for no reason.',
      },
      {
        title: 'At-least-once, honestly',
        body: 'If a worker dies, the reaper requeues after the heartbeat timeout, so a job can run twice in a crash. Exactly-once isn’t achievable in general; handlers are expected to be idempotent.',
      },
      {
        title: 'A push that carries no data',
        body: 'WebSocket events are just “go refresh jobs/queues/workers”. The client re-fetches through the authenticated REST routes, so the socket never duplicates per-row access checks — and polling stays on as a fallback.',
      },
    ],
    figures: [
      { value: '0', label: 'double-claims — 300 jobs, 10 concurrent claimers' },
      { value: '6', label: 'data structures, from scratch' },
      { value: '156', label: 'algorithm unit tests' },
      { value: '<1s', label: 'dashboard updates via WebSocket' },
    ],
    limits: [
      'Polling sets a latency floor; `LISTEN/NOTIFY` would remove idle polls at larger scale.',
      'Guarantees are at-least-once — job handlers must be idempotent.',
    ],
  },

  gigshield: {
    published: true,
    role: 'Team of three — I built the trigger engine, payout lifecycle and receipts, the rider dashboard, admin and fraud-review screens, role-based routing and the 3D landing; the liveness check with Rishabh',
    context: 'Team hackathon build · Mar–Jun 2026',
    thesis: 'For a worker paid weekly, a claim that settles next month is no claim at all.',
    problem: [
      'India’s delivery riders earn weekly on thin cash buffers. One day of heavy rain, a hazardous AQI reading or a platform outage can wipe out a day or two of income — and traditional insurance, built around documents, adjusters and reimbursement weeks later, doesn’t fit a loss that small and that sudden.',
      'Parametric cover fits better: pay a set amount when an objective, external signal crosses a threshold. The hard part is trusting the signal and stopping the same disruption from paying out twice.',
    ],
    approach: [
      'Riders pick a weekly plan (Basic ₹79, Standard ₹129, Pro ₹179) with a daily payout cap and covered hours. A trigger engine watches for disruptions — heavy rain, heatwave, AQI spikes, platform outages, curfews, strikes and zone closures — and scores each with a confidence value built from a per-trigger base, weather-source reliability and the rider’s risk level.',
      'Weather is read from Open-Meteo with an automatic fallback to wttr.in, and confidence rises when more sources agree. Cooldown and de-duplication windows stop one event from firing repeatedly, every trigger is written to an audit trail synced to the backend, and claims move through a visible lifecycle — pending verification → verified → processing → settled — with fraud checks and a liveness check on risky sessions. That check asks for a random hand gesture, which MediaPipe’s hand-landmark model classifies right in the browser.',
    ],
    flow: [
      { label: 'Weather & status', detail: 'Open-Meteo, wttr.in fallback' },
      { label: 'Trigger engine', detail: 'confidence, cooldown, de-dup' },
      { label: 'Fraud checks', detail: 'anomaly review, liveness gesture' },
      { label: 'Payout lifecycle', detail: 'pending → settled' },
      { label: 'Dashboards', detail: 'rider + admin views' },
    ],
    decisions: [
      {
        title: 'Weekly, not monthly',
        body: 'Premiums, caps and covered hours are all weekly, because that’s how riders are paid and how they think about money.',
      },
      {
        title: 'Confidence over a yes/no',
        body: 'Each trigger carries a Strong / Normal / Weak confidence label instead of a bare boolean, so admins can see how much the system trusted the signal behind a payout.',
      },
      {
        title: 'Two weather sources',
        body: 'A 2.5-second timeout on Open-Meteo falls back to wttr.in, so one flaky API can’t silently stop the engine.',
      },
      {
        title: 'Income only',
        body: 'The product deliberately covers lost earning hours and nothing else — no health, life, accident or vehicle cover.',
      },
    ],
    figures: [
      { value: '7', label: 'disruption triggers' },
      { value: '₹79', label: 'weekly entry plan' },
      { value: '4', label: 'claim lifecycle stages' },
      { value: '3', label: 'person team' },
    ],
    limits: [
      'Payouts and parts of the fraud workflow are simulated — no real payment rail is connected.',
      'Trigger cooldown and de-duplication state lives in the browser’s storage, not on the server.',
    ],
  },
};

export const getCaseStudy = (slug: string) => caseStudies[slug];
