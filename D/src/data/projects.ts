export type ProjectCategory = 'Full Stack' | 'AI' | 'Web';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  abstract: string;
  tags: string[];
  category: ProjectCategory;
  live: string;
  github?: string;
  sourcePrivate?: boolean;
  /** cosmetic `ls -la` size column, roughly scaled to tag count for flavor */
  size: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: 'cardbridge',
    title: 'cardbridge',
    subtitle: 'Card Discount Marketplace',
    abstract:
      'Escrow-protected transactions, a DB-enforced state machine, KYC verification with tiered limits, dispute resolution, and an admin review panel — secured with Supabase Row Level Security.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Escrow', 'KYC', 'Tailwind'],
    category: 'Full Stack',
    live: 'https://card-bridge.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/CardBridge.git',
    size: '4.2K',
    date: 'Mar 14',
  },
  {
    id: 'internal-gpt',
    title: 'internal-gpt',
    subtitle: 'College RAG Helpdesk',
    abstract:
      'A full-stack RAG helpdesk for colleges. Admins upload institutional documents; students get answers cited strictly from that data, generated via Groq/OpenAI.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Supabase', 'RAG', 'Groq', 'OpenAI'],
    category: 'AI',
    live: 'https://gpt.srmup.in/',
    github: 'https://github.com/SpaceWalkerr/Internal-Gpt.git',
    size: '3.8K',
    date: 'Feb 02',
  },
  {
    id: 'dashboard',
    title: 'dashboard',
    subtitle: 'Analytics & Admin Panel',
    abstract: 'A responsive analytics dashboard with interactive charts, real-time stat cards, and a component-driven UI.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Charts', 'Responsive'],
    category: 'Web',
    live: 'https://dashboard-six-self-74.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/dashboard.git',
    size: '2.1K',
    date: 'Jan 20',
  },
  {
    id: 'gigshield',
    title: 'gigshield',
    subtitle: 'Parametric Income Insurance',
    abstract:
      'An AI-powered parametric income protection platform for gig workers — verified weather, AQI, or outage events trigger automatic, instant payouts. No forms, no claims.',
    tags: ['React', 'Three.js', 'R3F', 'Express', 'Supabase', 'GSAP', 'Framer Motion', 'Leaflet'],
    category: 'Full Stack',
    live: 'https://gig-shield-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GigShield.git',
    size: '5.6K',
    date: 'Apr 09',
  },
  {
    id: 'internx',
    title: 'internx',
    subtitle: 'Internship & Hackathon Hub',
    abstract:
      'An internship and hackathon discovery platform with an SEO-optimized blog, full analytics, and an admin dashboard with auto-cleanup of expired listings.',
    tags: ['React 19', 'Vite', 'Node.js', 'Express', 'Supabase', 'JWT', 'SEO'],
    category: 'Full Stack',
    live: 'https://intern-x-black.vercel.app',
    github: 'https://github.com/SpaceWalkerr/InternX.git',
    size: '4.7K',
    date: 'May 18',
  },
  {
    id: 'nestfinder',
    title: 'nestfinder',
    subtitle: 'Real Estate Platform',
    abstract:
      'A full-stack real estate discovery platform with interactive Leaflet maps, NextAuth, Stripe-powered payments, PDF generation, and AI-assisted features.',
    tags: ['Next.js', 'React', 'Prisma', 'NextAuth', 'Stripe', 'Leaflet', 'Claude AI'],
    category: 'Full Stack',
    live: 'https://nest-finder-topaz.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/NestFinder.git',
    size: '6.3K',
    date: 'Jun 01',
  },
  {
    id: 'skywings',
    title: 'skywings',
    subtitle: 'Airline Reservation System',
    abstract:
      'A full-stack airline booking platform with dynamic flight search, interactive seat selection, and automated PDF boarding pass generation.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'PDF Gen'],
    category: 'Full Stack',
    live: 'https://air-line-reservation-system.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/AirLine-Reservation-System.git',
    size: '3.4K',
    date: 'Jul 22',
  },
  {
    id: 'intelliridex',
    title: 'intelliridex',
    subtitle: 'Autonomous Vehicles Research',
    abstract:
      'Research on autonomous vehicle navigation using deep neural networks — real-time object detection, path planning, and decision-making for self-driving systems.',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision', 'OpenCV'],
    category: 'AI',
    live: 'https://intelli-ride-x.vercel.app/',
    sourcePrivate: true,
    size: '7.9K',
    date: 'Aug 30',
  },
  {
    id: 'sutan-legal',
    title: 'sutan-legal-corp',
    subtitle: 'Legal Services Platform',
    abstract:
      'A scalable legal services platform with dynamic attorney directories, logic-based intake forms, and automated appointment scheduling.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API'],
    category: 'Full Stack',
    live: 'https://sutan-legal-corp.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Sutan-Legal-Corp.git',
    size: '2.9K',
    date: 'Sep 11',
  },
  {
    id: 'luxe',
    title: 'luxe',
    subtitle: 'E-Commerce Platform',
    abstract:
      'A comprehensive e-commerce solution with product catalog management, secure cart functionality, payment gateway integration, and order tracking.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
    category: 'Full Stack',
    live: 'https://e-commerce-platform-eosin-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/E-commerce-platform',
    size: '4.0K',
    date: 'Oct 04',
  },
  {
    id: 'solelux',
    title: 'solelux',
    subtitle: 'Luxury Shoe E-Commerce',
    abstract: 'A cinematic storefront with an admin dashboard and COD / Razorpay / UPI checkout.',
    tags: ['React', 'TypeScript', 'Vite', 'Express', 'Supabase', 'Zustand'],
    category: 'Full Stack',
    live: 'https://shoes-wesite.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Shoes-Wesite',
    size: '3.6K',
    date: 'Nov 17',
  },
  {
    id: 'mausam',
    title: 'mausam',
    subtitle: 'Real-Time Weather Application',
    abstract: 'Live forecasts, maps, and location-based weather alerts.',
    tags: ['React', 'JavaScript', 'Weather API', 'Geolocation'],
    category: 'Web',
    live: 'https://weather-pro-suraj.vercel.app/weather-dashboard',
    github: 'https://github.com/SpaceWalkerr/WeatherPro',
    size: '1.8K',
    date: 'Dec 05',
  },
  {
    id: 'games',
    title: 'classic-games',
    subtitle: 'Sudoku, Tic-Tac-Toe, 2048, Snake',
    abstract: 'Four classic games sharing one logic core and render layer.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Algorithms'],
    category: 'Web',
    live: 'https://games-six-dun.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GAMES',
    size: '2.4K',
    date: 'Dec 22',
  },
  {
    id: 'noctura',
    title: 'city-of-noctura',
    subtitle: 'Interactive Storytelling Experience',
    abstract: 'A branching narrative with atmospheric audio design.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Audio API', 'Story Engine'],
    category: 'Web',
    live: 'https://the-city-of-noctura.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/The-City-of-Noctura-',
    size: '3.1K',
    date: 'Jan 09',
  },
];
