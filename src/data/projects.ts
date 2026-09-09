export interface Project {
  /** URL slug — powers /projects/:slug */
  slug: string;
  /** Short label used in the command palette and breadcrumbs */
  name: string;
  title: string;
  description: string;
  tags: string[];
  liveDemo: string;
  /** Omitted when the repo is private */
  github?: string;
  /** Primary card image — an auto-generated screenshot under /shots when available */
  image: string;
  /** Shown if `image` fails to load (screenshot not generated yet / live site down) */
  fallbackImage: string;
  category: string;
}

export const projects: Project[] = [
  {
    slug: 'knot-ai',
    name: 'Knot.ai',
    title: '"Knot.ai" — Adaptive AI Interview Panel',
    description:
      'A spoken interview platform where a panel of five AI personas holds real-time voice conversations that adapt to every answer, hand off between rounds without repeating themselves, and produce an evidence-grounded report that can only quote statements verified against the transcript. Interview flow is driven by deterministic proxy state machines rather than prompt instructions alone, with a streak-based difficulty ladder, shared context digests between rounds, fuzzy-matched evidence verification, and interruptible barge-in voice at roughly 160ms.',
    tags: ['React', 'Vite', 'Zustand', 'Fastify', 'TypeScript', 'SQLite', 'Agora Voice AI', 'Claude API'],
    liveDemo: 'https://knot-ai.onrender.com/',
    github: 'https://github.com/SpaceWalkerr/Knot.ai.git',
    image: '/shots/knot-ai.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80&fm=webp',
    category: 'AI',
  },
  {
    slug: 'hospitality-ai',
    name: 'Hospitality.ai',
    title: '"Hospitality.ai" — Insurance-Aware Care Navigator',
    description:
      'An insurance-aware hospital and treatment navigation system built for the GE HealthCare Precision Care Challenge 2026. It parses health-insurance policy documents into normalized structures, explains coverage in plain language with source-traceable citations tagged exact, fuzzy, or unverified, ranks hospitals and room categories against policy terms using a deterministic weighted score with a full audit trail, and guides users through admission, investigation, procedure, and recovery with policy-grounded assistance. Runs offline in a demo mode with pre-authored extractions when no API key is set.',
    tags: ['Next.js', 'TypeScript', 'Claude API', 'Zod', 'unpdf', 'PostCSS', 'RAG'],
    liveDemo: 'https://hospitality-ai-virid.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Hospitality.ai.git',
    image: '/shots/hospitality-ai.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80&fm=webp',
    category: 'AI',
  },
  {
    slug: 'cardbridge',
    name: 'CardBridge',
    title: '"CardBridge" — Card Discount Marketplace',
    description:
      'A marketplace that connects requesters who want a specific card discount with cardholders who own that card and fulfill the purchase for a fee. Features escrow-protected transactions, a database-enforced state machine with an immutable event log, KYC verification with tiered transaction limits, dispute resolution, and an admin review panel — all secured with Supabase Row Level Security.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'Escrow', 'KYC', 'Tailwind CSS'],
    liveDemo: 'https://card-bridge.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/CardBridge.git',
    image: '/shots/cardbridge.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'internal-gpt',
    name: 'Internal GPT',
    title: '"Internal GPT" — College RAG Helpdesk',
    description:
      'A full-stack Retrieval-Augmented Generation (RAG) helpdesk for colleges. Admins upload institutional documents that the backend extracts and chunks, while students and staff ask questions answered strictly from the uploaded data with source citations. Powered by Groq/OpenAI for answer generation with a retrieval layer that is upgradeable to pgvector.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Supabase', 'RAG', 'Groq', 'OpenAI', 'Tailwind CSS'],
    liveDemo: 'https://gpt.srmup.in/',
    github: 'https://github.com/SpaceWalkerr/Internal-Gpt.git',
    image: '/shots/internal-gpt.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fm=webp',
    category: 'AI',
  },
  {
    slug: 'ai-academy',
    name: 'AI Academy',
    title: '"AI Academy" — Premium Resource Platform',
    description:
      'An educational platform built with Lovable AI\'s component-based architecture. Features a comprehensive admin dashboard with secure user management and Role-Based Access Control (RBAC). Integrated mock payment flows via Razorpay and PayPal to securely gate premium AI resource packages and startup blueprints behind a verified transaction wall.',
    tags: ['React', 'Lovable AI', 'Supabase', 'Razorpay', 'PayPal', 'RBAC', 'Tailwind CSS'],
    liveDemo: 'https://ai-acedemy.vercel.app/',
    image: '/shots/ai-academy.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'dashboard',
    name: 'Dashboard',
    title: '"Dashboard" — Analytics & Admin Panel',
    description:
      'A modern, responsive analytics dashboard for visualizing key metrics and managing data at a glance. Features interactive charts, data tables, real-time stat cards, and a clean component-driven UI with smooth transitions and a fully responsive layout across all devices.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Charts', 'Dashboard UI', 'Responsive Design'],
    liveDemo: 'https://dashboard-six-self-74.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/dashboard.git',
    image: '/shots/dashboard.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fm=webp',
    category: 'Web',
  },
  {
    slug: 'gigshield',
    name: 'GigShield',
    title: '"GigShield" — Parametric Income Insurance',
    description:
      'An AI-powered parametric income protection platform for gig delivery workers. When verified disruptions like heavy rain, hazardous air quality, or platform outages cut into earning hours, GigShield triggers automatic, instant payouts — no forms, no claims processing. Features an immersive 3D landing experience, location-based triggers, and a Supabase-backed Express API.',
    tags: ['React', 'Three.js', 'React Three Fiber', 'Express', 'Supabase', 'GSAP', 'Framer Motion', 'Leaflet'],
    liveDemo: 'https://gig-shield-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GigShield.git',
    image: '/shots/gigshield.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'internx',
    name: 'InternX',
    title: '"InternX" — Internship & Hackathon Hub',
    description:
      'An internship and hackathon discovery platform for Indian students. Aggregates curated internship openings and hackathon listings with search and filters, an SEO-optimized blog with JSON-LD schema, full analytics tracking, and a contact/enquiry system. Includes an admin dashboard for CRUD operations and auto-cleanup of expired listings — backed by a Node.js/Express API and Supabase PostgreSQL.',
    tags: ['React 19', 'Vite', 'Node.js', 'Express', 'Supabase', 'JWT', 'Tailwind CSS', 'SEO'],
    liveDemo: 'https://intern-x-black.vercel.app',
    github: 'https://github.com/SpaceWalkerr/InternX.git',
    image: '/shots/internx.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'nestfinder',
    name: 'NestFinder',
    title: '"NestFinder" — Real Estate Platform',
    description:
      'A full-stack real estate discovery platform built with Next.js, featuring property listings with interactive Leaflet maps, secure authentication via NextAuth, Stripe-powered payments, PDF generation, and AI-assisted features. Data is managed through Prisma ORM with a relational database for efficient property and user management.',
    tags: ['Next.js', 'React', 'Prisma', 'NextAuth', 'Stripe', 'Leaflet', 'Claude AI', 'TypeScript'],
    liveDemo: 'https://nest-finder-topaz.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/NestFinder.git',
    image: '/shots/nestfinder.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'skywings',
    name: 'SkyWings',
    title: '"SkyWings" — Airline Reservation System',
    description:
      'A full-stack airline booking platform featuring dynamic flight search, interactive seat selection, and automated PDF boarding pass generation. Built with a secure backend using PostgreSQL and Supabase, including Row Level Security policies and database triggers to manage booking logic and authentication.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'REST API', 'PDF Generation'],
    liveDemo: 'https://air-line-reservation-system.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/AirLine-Reservation-System.git',
    image: '/shots/skywings.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'intelliridex',
    name: 'IntelliRideX',
    title: '"IntelliRideX" — Autonomous Vehicles Research',
    description:
      'Research project focused on autonomous vehicle navigation using deep neural networks. Implementing advanced computer vision and machine learning algorithms to enable real-time object detection, path planning, and decision-making for self-driving systems.',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision', 'Neural Networks', 'OpenCV'],
    liveDemo: 'https://intelli-ride-x.vercel.app/',
    // Repo is private — no public source link
    image: '/shots/intelliridex.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&fm=webp',
    category: 'AI',
  },
  {
    slug: 'sutan-legal-corp',
    name: 'Sutan Legal Corp',
    title: '"Sutan Legal Corp" — Legal Services Platform',
    description:
      'A scalable legal services platform designed with dynamic attorney directories, logic-based intake forms, and automated appointment scheduling. The system uses a well-structured relational database to manage complex legal data relationships efficiently.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API', 'Tailwind CSS'],
    liveDemo: 'https://sutan-legal-corp.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Sutan-Legal-Corp.git',
    image: '/shots/sutan-legal-corp.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'luxe',
    name: 'Luxe',
    title: '"Luxe" — E-Commerce Platform',
    description:
      'A comprehensive full-stack e-commerce solution with product catalog management, secure shopping cart functionality, payment gateway integration, and order tracking. Features an intuitive admin dashboard for inventory management and customer analytics.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'REST API', 'Authentication'],
    liveDemo: 'https://e-commerce-platform-eosin-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/E-commerce-platform',
    image: '/shots/luxe.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'solelux',
    name: 'SoleLux',
    title: '"SoleLux" — Luxury Shoe E-Commerce',
    description:
      'A premium luxury shoe e-commerce platform with a cinematic customer storefront and a modern admin/operator dashboard. Includes catalogue search and filters, cart and wishlist, checkout with delivery/pickup and COD/Razorpay/UPI options, order history, product CRUD, and analytics — backed by an Express API and Supabase PostgreSQL/Auth/Storage.',
    tags: ['React', 'TypeScript', 'Vite', 'Express', 'Supabase', 'Zustand', 'TanStack Query', 'Framer Motion'],
    liveDemo: 'https://shoes-wesite.vercel.app',
    github: 'https://github.com/SpaceWalkerr/Shoes-Wesite.git',
    image: '/shots/solelux.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    slug: 'mausam',
    name: 'Mausam',
    title: '"Mausam" — Real-Time Weather Application',
    description:
      'A real-time weather application that collects and displays live weather data with accurate forecasts, interactive maps, and location-based weather alerts. Features a clean, responsive interface with dynamic weather visualizations and multi-day forecasts.',
    tags: ['React', 'JavaScript', 'Weather API', 'Geolocation', 'REST API', 'CSS3'],
    liveDemo: 'https://weather-pro-suraj.vercel.app/weather-dashboard',
    github: 'https://github.com/SpaceWalkerr/WeatherPro',
    image: '/shots/mausam.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80&fm=webp',
    category: 'Web',
  },
  {
    slug: 'classic-games',
    name: 'Classic Games Collection',
    title: '"Classic Games Collection" — Interactive Web Games',
    description:
      'An interactive collection of classic puzzle and strategy games including Sudoku, Tic-Tac-Toe, 2048, and Snake. Built with vanilla JavaScript and modern UI/UX design, featuring smooth animations, score tracking, and responsive gameplay across all devices.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Algorithms', 'Game Logic', 'DOM Manipulation'],
    liveDemo: 'https://games-six-dun.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GAMES',
    image: '/shots/classic-games.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&fm=webp',
    category: 'Web',
  },
  {
    slug: 'city-of-noctura',
    name: 'City of Noctura',
    title: '"City of Noctura" — Interactive Storytelling Experience',
    description:
      'An immersive interactive storytelling experience set in the mysterious City of Noctura. Features branching narratives, atmospheric sound design, and dynamic character interactions that respond to player choices, creating a unique story experience with every playthrough.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Interactive Design', 'Audio API', 'Story Engine'],
    liveDemo: 'https://the-city-of-noctura.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/The-City-of-Noctura-',
    image: '/shots/city-of-noctura.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&fm=webp',
    category: 'Web',
  },
];

export const projectCategories = ['All', 'Web', 'AI', 'Full Stack'];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
