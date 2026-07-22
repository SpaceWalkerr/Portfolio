import { motion, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PressSection, SectionMasthead, PressTag, PressButton, pressReveal } from './ui/press';
import { useTilt3D } from '../hooks/useTilt3D';

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveDemo: string;
  /** Omitted when the repo is private */
  github?: string;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    title: '"CardBridge" — Card Discount Marketplace',
    description:
      'A marketplace that connects requesters who want a specific card discount with cardholders who own that card and fulfill the purchase for a fee. Features escrow-protected transactions, a database-enforced state machine with an immutable event log, KYC verification with tiered transaction limits, dispute resolution, and an admin review panel — all secured with Supabase Row Level Security.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'Escrow', 'KYC', 'Tailwind CSS'],
    liveDemo: 'https://card-bridge.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/CardBridge.git',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"Internal GPT" — College RAG Helpdesk',
    description:
      'A full-stack Retrieval-Augmented Generation (RAG) helpdesk for colleges. Admins upload institutional documents that the backend extracts and chunks, while students and staff ask questions answered strictly from the uploaded data with source citations. Powered by Groq/OpenAI for answer generation with a retrieval layer that is upgradeable to pgvector.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'Supabase', 'RAG', 'Groq', 'OpenAI', 'Tailwind CSS'],
    liveDemo: 'https://gpt.srmup.in/',
    github: 'https://github.com/SpaceWalkerr/Internal-Gpt.git',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fm=webp',
    category: 'AI',
  },
  {
    title: '"Dashboard" — Analytics & Admin Panel',
    description:
      'A modern, responsive analytics dashboard for visualizing key metrics and managing data at a glance. Features interactive charts, data tables, real-time stat cards, and a clean component-driven UI with smooth transitions and a fully responsive layout across all devices.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Charts', 'Dashboard UI', 'Responsive Design'],
    liveDemo: 'https://dashboard-six-self-74.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/dashboard.git',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fm=webp',
    category: 'Web',
  },
  {
    title: '"GigShield" — Parametric Income Insurance',
    description:
      'An AI-powered parametric income protection platform for gig delivery workers. When verified disruptions like heavy rain, hazardous air quality, or platform outages cut into earning hours, GigShield triggers automatic, instant payouts — no forms, no claims processing. Features an immersive 3D landing experience, location-based triggers, and a Supabase-backed Express API.',
    tags: ['React', 'Three.js', 'React Three Fiber', 'Express', 'Supabase', 'GSAP', 'Framer Motion', 'Leaflet'],
    liveDemo: 'https://gig-shield-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GigShield.git',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"InternX" — Internship & Hackathon Hub',
    description:
      'An internship and hackathon discovery platform for Indian students. Aggregates curated internship openings and hackathon listings with search and filters, an SEO-optimized blog with JSON-LD schema, full analytics tracking, and a contact/enquiry system. Includes an admin dashboard for CRUD operations and auto-cleanup of expired listings — backed by a Node.js/Express API and Supabase PostgreSQL.',
    tags: ['React 19', 'Vite', 'Node.js', 'Express', 'Supabase', 'JWT', 'Tailwind CSS', 'SEO'],
    liveDemo: 'https://intern-x-black.vercel.app',
    github: 'https://github.com/SpaceWalkerr/InternX.git',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"NestFinder" — Real Estate Platform',
    description:
      'A full-stack real estate discovery platform built with Next.js, featuring property listings with interactive Leaflet maps, secure authentication via NextAuth, Stripe-powered payments, PDF generation, and AI-assisted features. Data is managed through Prisma ORM with a relational database for efficient property and user management.',
    tags: ['Next.js', 'React', 'Prisma', 'NextAuth', 'Stripe', 'Leaflet', 'Claude AI', 'TypeScript'],
    liveDemo: 'https://nest-finder-topaz.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/NestFinder.git',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"SkyWings" — Airline Reservation System',
    description:
      'A full-stack airline booking platform featuring dynamic flight search, interactive seat selection, and automated PDF boarding pass generation. Built with a secure backend using PostgreSQL and Supabase, including Row Level Security policies and database triggers to manage booking logic and authentication.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'REST API', 'PDF Generation'],
    liveDemo: 'https://air-line-reservation-system.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/AirLine-Reservation-System.git',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"IntelliRideX" — Autonomous Vehicles Research',
    description:
      'Research project focused on autonomous vehicle navigation using deep neural networks. Implementing advanced computer vision and machine learning algorithms to enable real-time object detection, path planning, and decision-making for self-driving systems.',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision', 'Neural Networks', 'OpenCV'],
    liveDemo: 'https://intelli-ride-x.vercel.app/',
    // Repo is private — no public source link
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&fm=webp',
    category: 'AI',
  },
  {
    title: '"Sutan Legal Corp" — Legal Services Platform',
    description:
      'A scalable legal services platform designed with dynamic attorney directories, logic-based intake forms, and automated appointment scheduling. The system uses a well-structured relational database to manage complex legal data relationships efficiently.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API', 'Tailwind CSS'],
    liveDemo: 'https://sutan-legal-corp.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/Sutan-Legal-Corp.git',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"Luxe" — E-Commerce Platform',
    description:
      'A comprehensive full-stack e-commerce solution with product catalog management, secure shopping cart functionality, payment gateway integration, and order tracking. Features an intuitive admin dashboard for inventory management and customer analytics.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'REST API', 'Authentication'],
    liveDemo: 'https://e-commerce-platform-eosin-three.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/E-commerce-platform',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"SoleLux" — Luxury Shoe E-Commerce',
    description:
      'A premium luxury shoe e-commerce platform with a cinematic customer storefront and a modern admin/operator dashboard. Includes catalogue search and filters, cart and wishlist, checkout with delivery/pickup and COD/Razorpay/UPI options, order history, product CRUD, and analytics — backed by an Express API and Supabase PostgreSQL/Auth/Storage.',
    tags: ['React', 'TypeScript', 'Vite', 'Express', 'Supabase', 'Zustand', 'TanStack Query', 'Framer Motion'],
    liveDemo: 'https://shoes-wesite.vercel.app',
    github: 'https://github.com/SpaceWalkerr/Shoes-Wesite.git',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&fm=webp',
    category: 'Full Stack',
  },
  {
    title: '"Mausam" — Real-Time Weather Application',
    description:
      'A real-time weather application that collects and displays live weather data with accurate forecasts, interactive maps, and location-based weather alerts. Features a clean, responsive interface with dynamic weather visualizations and multi-day forecasts.',
    tags: ['React', 'JavaScript', 'Weather API', 'Geolocation', 'REST API', 'CSS3'],
    liveDemo: 'https://weather-pro-suraj.vercel.app/weather-dashboard',
    github: 'https://github.com/SpaceWalkerr/WeatherPro',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80&fm=webp',
    category: 'Web',
  },
  {
    title: '"Classic Games Collection" — Interactive Web Games',
    description:
      'An interactive collection of classic puzzle and strategy games including Sudoku, Tic-Tac-Toe, 2048, and Snake. Built with vanilla JavaScript and modern UI/UX design, featuring smooth animations, score tracking, and responsive gameplay across all devices.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Algorithms', 'Game Logic', 'DOM Manipulation'],
    liveDemo: 'https://games-six-dun.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/GAMES',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&fm=webp',
    category: 'Web',
  },
  {
    title: '"City of Noctura" — Interactive Storytelling Experience',
    description:
      'An immersive interactive storytelling experience set in the mysterious City of Noctura. Features branching narratives, atmospheric sound design, and dynamic character interactions that respond to player choices, creating a unique story experience with every playthrough.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Interactive Design', 'Audio API', 'Story Engine'],
    liveDemo: 'https://the-city-of-noctura.vercel.app/',
    github: 'https://github.com/SpaceWalkerr/The-City-of-Noctura-',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&fm=webp',
    category: 'Web',
  },
];

const filters = ['All', 'Web', 'AI', 'Full Stack'];

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

/** A story card that tilts in 3D toward the cursor with a glare sweep — like picking up a printed card. */
const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => {
  const tilt = useTilt3D({ max: 6, glare: true });

  return (
    <motion.div
      ref={tilt.ref}
      variants={pressReveal}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transformPerspective: 1000, rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      className="group relative flex cursor-pointer flex-col border-t-2 border-ink pt-4"
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      data-cursor="hover"
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      {/* Glare sweep — a light sheen that follows the cursor, like glossy card stock */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: tilt.glareOpacity,
          background: useMotionTemplate`radial-gradient(220px circle at ${tilt.glareX}% ${tilt.glareY}%, white, transparent 70%)`,
        }}
      />

      <div className="relative mb-4 aspect-[4/3] overflow-hidden border border-ink">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
        <span className="absolute left-0 top-0 bg-ink px-2 py-1 font-monopress text-[9px] uppercase tracking-[0.14em] text-paper">
          {project.category}
        </span>
      </div>

      <h3 className="font-display text-lg font-black uppercase leading-[1.05] tracking-[-0.01em] group-hover:text-oxblood sm:text-xl">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 font-editorial text-[13.5px] leading-relaxed text-ink-mute">
        {project.description}
      </p>
      <p className="mt-2 font-monopress text-[9px] uppercase tracking-[0.14em] text-oxblood">
        Continued inside →
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <PressTag key={tag}>{tag}</PressTag>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <PressSection id="projects">
      <SectionMasthead
        section="Section E"
        name="Front Page"
        headline="Featured Projects"
        standfirst="A collection of recent work — web applications, AI integrations, and full-stack platforms, filed by desk."
      />

      {/* Filter — desk selector */}
      <div className="mb-10 flex flex-wrap gap-2 border-y border-ink py-4">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 font-monopress text-[10px] uppercase tracking-[0.16em] transition-colors ${
              activeFilter === filter
                ? 'bg-ink text-paper'
                : 'border border-ink/30 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Story grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ===== Detail modal: "Special Edition" broadsheet ===== */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 z-50 overflow-y-auto border-2 border-ink bg-paper-bright shadow-2xl sm:inset-8 md:inset-16 lg:inset-x-[12%] lg:inset-y-12"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              {/* Masthead bar */}
              <div className="flex items-center justify-between border-b-4 border-double border-ink bg-paper px-5 py-2.5 sm:px-8">
                <span className="font-editorial text-base italic">Special Edition</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                  className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative h-52 overflow-hidden border-b border-ink sm:h-72">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  decoding="async"
                  className="h-full w-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <span className="mb-3 inline-block bg-oxblood px-2.5 py-1 font-monopress text-[10px] uppercase tracking-[0.14em] text-paper">
                    {selectedProject.category}
                  </span>
                  <h3
                    id="project-modal-title"
                    className="font-display text-2xl font-black uppercase leading-[0.95] text-paper sm:text-4xl"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-8">
                <p className="max-w-3xl font-editorial text-[15px] leading-relaxed text-ink sm:text-base">
                  {selectedProject.description}
                </p>

                <div className="mt-7">
                  <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    Tech Stack
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <PressTag key={tag}>{tag}</PressTag>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PressButton href={selectedProject.liveDemo} className="flex-1">
                    <ExternalLink size={15} />
                    Live Demo
                  </PressButton>
                  {selectedProject.github ? (
                    <PressButton href={selectedProject.github} variant="outline" className="flex-1">
                      <Github size={15} />
                      View Source
                    </PressButton>
                  ) : (
                    <span className="flex flex-1 items-center justify-center gap-2 border border-ink/25 px-5 py-3 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                      Source — Private Repo
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PressSection>
  );
};

export default Projects;
