export interface ProjectPart {
  label: string;
  note: string;
}

export type ProjectCategory = 'Full Stack' | 'AI' | 'Web';

export interface Project {
  id: string;
  fig: string;
  title: string;
  subtitle: string;
  abstract: string;
  tags: string[];
  category: ProjectCategory;
  live: string;
  github?: string;
  sourcePrivate?: boolean;
  /** Gets the full interactive 3D exploded-view treatment instead of the static schematic */
  exploded?: boolean;
  parts: ProjectPart[];
}

export const projects: Project[] = [
  {
    id: 'cardbridge',
    fig: 'FIG. 5.1',
    title: 'CardBridge',
    subtitle: 'Card Discount Marketplace',
    abstract:
      'Escrow-protected transactions, a DB-enforced state machine, KYC verification with tiered limits, dispute resolution, and an admin review panel — secured with Supabase Row Level Security.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'Escrow', 'KYC', 'Tailwind CSS'],
    category: 'Full Stack',
    live: 'https://card-bridge.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/CardBridge.git',
    exploded: true,
    parts: [
      { label: 'ESCROW ENGINE', note: 'holds funds until fulfillment is confirmed by both parties' },
      { label: 'STATE MACHINE', note: 'DB-enforced transaction states with an immutable event log' },
      { label: 'KYC GATE', note: 'tiered verification unlocking higher transaction limits' },
      { label: 'RLS PERIMETER', note: 'Supabase Row Level Security scoping every query' },
    ],
  },
  {
    id: 'internal-gpt',
    fig: 'FIG. 5.2',
    title: 'Internal GPT',
    subtitle: 'College RAG Helpdesk',
    abstract:
      'A full-stack RAG helpdesk for colleges. Admins upload institutional documents; students get answers cited strictly from that data, generated via Groq/OpenAI.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Supabase', 'RAG', 'Groq', 'OpenAI', 'Tailwind CSS'],
    category: 'AI',
    live: 'https://gpt.srmup.in/',
    github: 'https://github.com/SpaceWalkerr/Internal-Gpt.git',
    parts: [
      { label: 'INGESTION PIPELINE', note: 'uploaded documents extracted and chunked' },
      { label: 'RETRIEVAL LAYER', note: 'matches queries to source passages before generation' },
      { label: 'GENERATION ENGINE', note: 'Groq/OpenAI drafts answers grounded in retrieved text' },
      { label: 'CITATION TRACE', note: 'every answer links back to its source document' },
    ],
  },
  {
    id: 'dashboard',
    fig: 'FIG. 5.3',
    title: 'Dashboard',
    subtitle: 'Analytics & Admin Panel',
    abstract: 'A responsive analytics dashboard with interactive charts, real-time stat cards, and a component-driven UI.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Charts', 'Dashboard UI', 'Responsive Design'],
    category: 'Web',
    live: 'https://dashboard-six-self-74.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/dashboard.git',
    parts: [
      { label: 'STAT CARDS', note: 'real-time key-metric tiles' },
      { label: 'CHART MODULE', note: 'interactive data visualization' },
      { label: 'RESPONSIVE GRID', note: 'layout re-flows across breakpoints' },
    ],
  },
  {
    id: 'gigshield',
    fig: 'FIG. 5.4',
    title: 'GigShield',
    subtitle: 'Parametric Income Insurance',
    abstract:
      'An AI-powered parametric income protection platform for gig workers — verified weather, AQI, or outage events trigger automatic, instant payouts. No forms, no claims.',
    tags: ['React', 'Three.js', 'React Three Fiber', 'Express', 'Supabase', 'GSAP', 'Framer Motion', 'Leaflet'],
    category: 'Full Stack',
    live: 'https://gig-shield-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GigShield.git',
    exploded: true,
    parts: [
      { label: 'TRIGGER ENGINE', note: 'weather/AQI/outage feeds evaluated against payout thresholds' },
      { label: 'PARAMETRIC PAYOUT', note: 'instant, claims-free disbursement on verified trigger' },
      { label: 'GEO LAYER', note: 'Leaflet-based location verification' },
      { label: 'IMMERSIVE FRONT-END', note: 'Three.js / R3F landing experience' },
    ],
  },
  {
    id: 'internx',
    fig: 'FIG. 5.5',
    title: 'InternX',
    subtitle: 'Internship & Hackathon Hub',
    abstract:
      'An internship and hackathon discovery platform with an SEO-optimized blog, full analytics, and an admin dashboard with auto-cleanup of expired listings.',
    tags: ['React 19', 'Vite', 'Node.js', 'Express', 'Supabase', 'JWT', 'Tailwind CSS', 'SEO'],
    category: 'Full Stack',
    live: 'https://intern-x-black.vercel.app',
    github: 'https://github.com/SpaceWalkerr/InternX.git',
    parts: [
      { label: 'AGGREGATOR CORE', note: 'curated listings with search and filters' },
      { label: 'SEO BLOG', note: 'JSON-LD structured content for discovery' },
      { label: 'ADMIN CRUD', note: 'auto-cleanup of expired listings' },
      { label: 'ANALYTICS TAP', note: 'full usage tracking' },
    ],
  },
  {
    id: 'nestfinder',
    fig: 'FIG. 5.6',
    title: 'NestFinder',
    subtitle: 'Real Estate Platform',
    abstract:
      'A full-stack real estate discovery platform with interactive Leaflet maps, NextAuth, Stripe-powered payments, PDF generation, and AI-assisted features.',
    tags: ['Next.js', 'React', 'Prisma', 'NextAuth', 'Stripe', 'Leaflet', 'Claude AI', 'TypeScript'],
    category: 'Full Stack',
    live: 'https://nest-finder-topaz.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/NestFinder.git',
    exploded: true,
    parts: [
      { label: 'LISTING ENGINE', note: 'Prisma-modeled property inventory' },
      { label: 'MAP LAYER', note: 'interactive Leaflet discovery' },
      { label: 'AUTH & PAYMENTS', note: 'NextAuth sessions, Stripe checkout' },
      { label: 'AI ASSIST', note: 'Claude-assisted listing features' },
      { label: 'DOCUMENT GEN', note: 'automated PDF generation' },
    ],
  },
  {
    id: 'skywings',
    fig: 'FIG. 5.7',
    title: 'SkyWings',
    subtitle: 'Airline Reservation System',
    abstract:
      'A full-stack airline booking platform with dynamic flight search, interactive seat selection, and automated PDF boarding pass generation.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'REST API', 'PDF Generation'],
    category: 'Full Stack',
    live: 'https://air-line-reservation-system.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/AirLine-Reservation-System.git',
    parts: [
      { label: 'SEAT MAP', note: 'dynamic seat selection engine' },
      { label: 'BOOKING LOGIC', note: 'DB triggers enforcing reservation integrity' },
      { label: 'RLS PERIMETER', note: 'Row Level Security on passenger data' },
      { label: 'BOARDING PASS GEN', note: 'automated PDF issuance' },
    ],
  },
  {
    id: 'intelliridex',
    fig: 'FIG. 5.8',
    title: 'IntelliRideX',
    subtitle: 'Autonomous Vehicles Research',
    abstract:
      'Research on autonomous vehicle navigation using deep neural networks — real-time object detection, path planning, and decision-making for self-driving systems.',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision', 'Neural Networks', 'OpenCV'],
    category: 'AI',
    live: 'https://intelli-ride-x.vercel.app/',
    sourcePrivate: true,
    parts: [
      { label: 'PERCEPTION NET', note: 'real-time object detection via CNN' },
      { label: 'PATH PLANNER', note: 'decision-making for navigation' },
      { label: 'VISION PIPELINE', note: 'OpenCV pre-processing' },
    ],
  },
  {
    id: 'sutan-legal',
    fig: 'FIG. 5.9',
    title: 'Sutan Legal Corp',
    subtitle: 'Legal Services Platform',
    abstract:
      'A scalable legal services platform with dynamic attorney directories, logic-based intake forms, and automated appointment scheduling.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API', 'Tailwind CSS'],
    category: 'Full Stack',
    live: 'https://sutan-legal-corp.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Sutan-Legal-Corp.git',
    parts: [
      { label: 'DIRECTORY ENGINE', note: 'attorney search and profile records' },
      { label: 'INTAKE LOGIC', note: 'conditional client intake forms' },
      { label: 'SCHEDULER', note: 'automated appointment booking' },
    ],
  },
  {
    id: 'luxe',
    fig: 'FIG. 5.10',
    title: 'Luxe',
    subtitle: 'E-Commerce Platform',
    abstract:
      'A comprehensive e-commerce solution with product catalog management, secure cart functionality, payment gateway integration, and order tracking.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'REST API', 'Authentication'],
    category: 'Full Stack',
    live: 'https://e-commerce-platform-eosin-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/E-commerce-platform',
    parts: [
      { label: 'CATALOG & CART', note: 'product browsing and cart state' },
      { label: 'PAYMENT GATEWAY', note: 'Stripe-backed checkout' },
      { label: 'ADMIN DASHBOARD', note: 'inventory management' },
    ],
  },
  {
    id: 'solelux',
    fig: 'FIG. 5.11',
    title: 'SoleLux',
    subtitle: 'Luxury Shoe E-Commerce',
    abstract: 'A cinematic storefront with an admin dashboard and COD / Razorpay / UPI checkout.',
    tags: ['React', 'TypeScript', 'Vite', 'Express', 'Supabase', 'Zustand', 'TanStack Query', 'Framer Motion'],
    category: 'Full Stack',
    live: 'https://shoes-wesite.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Shoes-Wesite',
    parts: [
      { label: 'STOREFRONT', note: 'cinematic Framer Motion presentation' },
      { label: 'STATE LAYER', note: 'Zustand + TanStack Query' },
      { label: 'CHECKOUT', note: 'COD / Razorpay / UPI' },
      { label: 'ADMIN PANEL', note: 'inventory and order management' },
    ],
  },
  {
    id: 'mausam',
    fig: 'FIG. 5.12',
    title: 'Mausam',
    subtitle: 'Real-Time Weather Application',
    abstract: 'Live forecasts, maps, and location-based weather alerts.',
    tags: ['React', 'JavaScript', 'Weather API', 'Geolocation', 'REST API', 'CSS3'],
    category: 'Web',
    live: 'https://weather-pro-suraj.vercel.app/weather-dashboard',
    github: 'https://github.com/SpaceWalkerr/WeatherPro',
    parts: [
      { label: 'FORECAST FEED', note: 'live weather API integration' },
      { label: 'GEO LOCATOR', note: 'location-based alerts' },
      { label: 'MAP OVERLAY', note: 'visual forecast layer' },
    ],
  },
  {
    id: 'games',
    fig: 'FIG. 5.13',
    title: 'Classic Games Collection',
    subtitle: 'Sudoku, Tic-Tac-Toe, 2048, Snake',
    abstract: 'Four classic games sharing one logic core and render layer.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Algorithms', 'Game Logic', 'DOM Manipulation'],
    category: 'Web',
    live: 'https://games-six-dun.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GAMES',
    parts: [
      { label: 'GAME ENGINE', note: 'shared logic core across four games' },
      { label: 'RENDER LAYER', note: 'DOM-driven board rendering' },
      { label: 'INPUT HANDLER', note: 'keyboard / touch controls' },
    ],
  },
  {
    id: 'noctura',
    fig: 'FIG. 5.14',
    title: 'City of Noctura',
    subtitle: 'Interactive Storytelling Experience',
    abstract: 'A branching narrative with atmospheric audio design.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Interactive Design', 'Audio API', 'Story Engine'],
    category: 'Web',
    live: 'https://the-city-of-noctura.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/The-City-of-Noctura-',
    parts: [
      { label: 'STORY ENGINE', note: 'branching narrative state graph' },
      { label: 'AUDIO LAYER', note: 'Web Audio API atmosphere' },
      { label: 'SCENE RENDER', note: 'atmospheric visual transitions' },
    ],
  },
];
