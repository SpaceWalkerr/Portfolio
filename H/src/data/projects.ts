export type ProjectCategory = 'Full Stack' | 'AI' | 'Web';

export interface Project {
  id: string;
  level: string;
  title: string;
  subtitle: string;
  abstract: string;
  tags: string[];
  category: ProjectCategory;
  live: string;
  github?: string;
  sourcePrivate?: boolean;
  stars: number;
}

export const projects: Project[] = [
  {
    id: 'cardbridge',
    level: 'LEVEL 01',
    title: 'CardBridge',
    subtitle: 'Card Discount Marketplace',
    abstract:
      'Escrow-protected transactions, a DB-enforced state machine, KYC verification with tiered limits, dispute resolution, and an admin review panel — secured with Supabase Row Level Security.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Escrow', 'KYC'],
    category: 'Full Stack',
    live: 'https://card-bridge.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/CardBridge.git',
    stars: 3,
  },
  {
    id: 'internal-gpt',
    level: 'LEVEL 02',
    title: 'Internal GPT',
    subtitle: 'College RAG Helpdesk',
    abstract:
      'A full-stack RAG helpdesk for colleges. Admins upload institutional documents; students get answers cited strictly from that data, generated via Groq/OpenAI.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Supabase', 'RAG', 'Groq'],
    category: 'AI',
    live: 'https://gpt.srmup.in/',
    github: 'https://github.com/SpaceWalkerr/Internal-Gpt.git',
    stars: 3,
  },
  {
    id: 'dashboard',
    level: 'LEVEL 03',
    title: 'Dashboard',
    subtitle: 'Analytics & Admin Panel',
    abstract: 'A responsive analytics dashboard with interactive charts, real-time stat cards, and a component-driven UI.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Charts'],
    category: 'Web',
    live: 'https://dashboard-six-self-74.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/dashboard.git',
    stars: 2,
  },
  {
    id: 'gigshield',
    level: 'LEVEL 04',
    title: 'GigShield',
    subtitle: 'Parametric Income Insurance',
    abstract:
      'An AI-powered parametric income protection platform for gig workers — verified weather, AQI, or outage events trigger automatic, instant payouts. No forms, no claims.',
    tags: ['React', 'Three.js', 'Express', 'Supabase', 'GSAP', 'Leaflet'],
    category: 'Full Stack',
    live: 'https://gig-shield-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GigShield.git',
    stars: 3,
  },
  {
    id: 'internx',
    level: 'LEVEL 05',
    title: 'InternX',
    subtitle: 'Internship & Hackathon Hub',
    abstract:
      'An internship and hackathon discovery platform with an SEO-optimized blog, full analytics, and an admin dashboard with auto-cleanup of expired listings.',
    tags: ['React 19', 'Vite', 'Node.js', 'Express', 'Supabase', 'SEO'],
    category: 'Full Stack',
    live: 'https://intern-x-black.vercel.app',
    github: 'https://github.com/SpaceWalkerr/InternX.git',
    stars: 3,
  },
  {
    id: 'nestfinder',
    level: 'LEVEL 06',
    title: 'NestFinder',
    subtitle: 'Real Estate Platform',
    abstract:
      'A full-stack real estate discovery platform with interactive Leaflet maps, NextAuth, Stripe-powered payments, PDF generation, and AI-assisted features.',
    tags: ['Next.js', 'React', 'Prisma', 'NextAuth', 'Stripe', 'Claude AI'],
    category: 'Full Stack',
    live: 'https://nest-finder-topaz.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/NestFinder.git',
    stars: 3,
  },
  {
    id: 'skywings',
    level: 'LEVEL 07',
    title: 'SkyWings',
    subtitle: 'Airline Reservation System',
    abstract:
      'A full-stack airline booking platform with dynamic flight search, interactive seat selection, and automated PDF boarding pass generation.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase'],
    category: 'Full Stack',
    live: 'https://air-line-reservation-system.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/AirLine-Reservation-System.git',
    stars: 2,
  },
  {
    id: 'intelliridex',
    level: 'LEVEL 08',
    title: 'IntelliRideX',
    subtitle: 'Autonomous Vehicles Research',
    abstract:
      'Research on autonomous vehicle navigation using deep neural networks — real-time object detection, path planning, and decision-making for self-driving systems.',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'OpenCV'],
    category: 'AI',
    live: 'https://intelli-ride-x.vercel.app/',
    sourcePrivate: true,
    stars: 3,
  },
  {
    id: 'sutan-legal',
    level: 'LEVEL 09',
    title: 'Sutan Legal Corp',
    subtitle: 'Legal Services Platform',
    abstract:
      'A scalable legal services platform with dynamic attorney directories, logic-based intake forms, and automated appointment scheduling.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    category: 'Full Stack',
    live: 'https://sutan-legal-corp.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Sutan-Legal-Corp.git',
    stars: 2,
  },
  {
    id: 'luxe',
    level: 'LEVEL 10',
    title: 'Luxe',
    subtitle: 'E-Commerce Platform',
    abstract:
      'A comprehensive e-commerce solution with product catalog management, secure cart functionality, payment gateway integration, and order tracking.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
    category: 'Full Stack',
    live: 'https://e-commerce-platform-eosin-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/E-commerce-platform',
    stars: 2,
  },
  {
    id: 'solelux',
    level: 'LEVEL 11',
    title: 'SoleLux',
    subtitle: 'Luxury Shoe E-Commerce',
    abstract: 'A cinematic storefront with an admin dashboard and COD / Razorpay / UPI checkout.',
    tags: ['React', 'TypeScript', 'Vite', 'Supabase', 'Zustand'],
    category: 'Full Stack',
    live: 'https://shoes-wesite.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Shoes-Wesite',
    stars: 3,
  },
  {
    id: 'mausam',
    level: 'LEVEL 12',
    title: 'Mausam',
    subtitle: 'Real-Time Weather Application',
    abstract: 'Live forecasts, maps, and location-based weather alerts.',
    tags: ['React', 'JavaScript', 'Weather API', 'Geolocation'],
    category: 'Web',
    live: 'https://weather-pro-suraj.vercel.app/weather-dashboard',
    github: 'https://github.com/SpaceWalkerr/WeatherPro',
    stars: 2,
  },
  {
    id: 'games',
    level: 'LEVEL 13',
    title: 'Classic Games Collection',
    subtitle: 'Sudoku, Tic-Tac-Toe, 2048, Snake',
    abstract: 'Four classic games sharing one logic core and render layer.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Algorithms'],
    category: 'Web',
    live: 'https://games-six-dun.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GAMES',
    stars: 3,
  },
  {
    id: 'noctura',
    level: 'LEVEL 14',
    title: 'City of Noctura',
    subtitle: 'Interactive Storytelling Experience',
    abstract: 'A branching narrative with atmospheric audio design.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Audio API'],
    category: 'Web',
    live: 'https://the-city-of-noctura.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/The-City-of-Noctura-',
    stars: 3,
  },
];
