export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  /** Slug of the related project, if any */
  relatedProject?: string;
}

export const posts: Post[] = [
  {
    slug: 'building-cardbridge',
    title: 'Building CardBridge: An Escrow-Powered Card Discount Marketplace',
    excerpt:
      'How I built a secure marketplace connecting discount-seekers with cardholders, featuring escrow-protected transactions, a database-enforced state machine, and Supabase Row Level Security.',
    content: `CardBridge is a marketplace that solves a simple problem: you want a specific credit card discount, but you don't own that card. Someone else does — and they're willing to fulfill the purchase for a fee.

The challenge was building trust. How do you ensure the cardholder gets paid and the requester gets their purchase? The answer was an escrow system with a database-enforced state machine.

## Architecture

The backend is built on Supabase with PostgreSQL, using Row Level Security to ensure users can only access their own transactions. The state machine tracks each transaction through: Pending → Funded → In Progress → Completed → Disbursed, with an immutable event log for audit trails.

## Key Features

- **Escrow-protected transactions**: Funds are held securely until both parties fulfil their obligations
- **KYC verification**: Tiered transaction limits based on identity verification level
- **Dispute resolution**: Admin review panel for handling conflicts
- **Immutable event log**: Every state change is recorded for transparency

## Lessons Learned

Building CardBridge taught me the importance of thorough state machine design. Every possible edge case — from partial refunds to dispute escalations — needed to be anticipated and encoded in the database logic.`,
    date: '2025-06-15',
    category: 'Full Stack',
    readTime: '5 min',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Escrow'],
    relatedProject: 'CardBridge',
  },
  {
    slug: 'rag-helpdesk-internal-gpt',
    title: 'How I Built a RAG Helpdesk for My College',
    excerpt:
      'A deep dive into building Internal GPT — a Retrieval-Augmented Generation system that answers questions strictly from institutional documents with source citations.',
    content: `Internal GPT is a full-stack RAG helpdesk built for colleges. The core idea: admins upload institutional documents, and students/staff ask questions that are answered strictly from that data — with source citations.

## How RAG Works Here

The system uses a two-step approach:
1. **Retrieval**: User queries are embedded and matched against document chunks using vector similarity search
2. **Generation**: The retrieved context is fed to Groq/OpenAI to generate a grounded answer

## Architecture

The frontend is built with React and Vite, while the backend uses Node.js and Express. Supabase handles authentication and storage. The retrieval layer is designed to be upgradeable to pgvector for production-scale deployments.

## Key Takeaways

Building a production RAG system requires careful prompt engineering to prevent hallucinations. Every answer must cite its source, and the system must gracefully handle queries where no relevant document exists.`,
    date: '2025-05-20',
    category: 'AI',
    readTime: '6 min',
    tags: ['React', 'Node.js', 'RAG', 'Groq', 'OpenAI', 'Supabase', 'AI'],
    relatedProject: 'Internal GPT',
  },
  {
    slug: 'gigshield-parametric-insurance',
    title: 'GigShield: Parametric Income Insurance for Gig Workers',
    excerpt:
      'Building an AI-powered platform that automatically triggers payouts for gig workers when disruptions like heavy rain or hazardous air quality cut into their earning hours.',
    content: `GigShield is an AI-powered parametric income protection platform for gig delivery workers. When verified disruptions — heavy rain, hazardous air quality, platform outages — cut into earning hours, GigShield triggers automatic instant payouts.

## The Innovation

Traditional insurance requires claims processing. GigShield is parametric: payouts are triggered automatically based on verifiable data (weather APIs, air quality indices, platform status), with no forms required.

## Tech Stack

The immersive 3D landing experience is built with Three.js and React Three Fiber. The backend uses Express with Supabase for data storage. Location-based triggers use Leaflet for geofencing.

## Impact

This is insurance reimagined for the gig economy — fast, automatic, and fair. The platform demonstrates how combining AI with parametric models can create safety nets for vulnerable workers.`,
    date: '2025-04-10',
    category: 'Full Stack',
    readTime: '7 min',
    tags: ['React', 'Three.js', 'R3F', 'Express', 'Supabase', 'AI', 'Leaflet'],
    relatedProject: 'GigShield',
  },
  {
    slug: 'internx-hub-platform',
    title: 'Building InternX: An Internship & Hackathon Hub for Indian Students',
    excerpt:
      'How I built a platform that aggregates internship openings and hackathon listings for Indian students, featuring an admin dashboard, SEO optimization, and automated cleanup.',
    content: `InternX is a discovery platform for Indian students, aggregating curated internship openings and hackathon listings. The goal was to create a single go-to resource for students looking for opportunities.

## Features

The platform includes search and filters, an SEO-optimized blog with JSON-LD schema, full analytics tracking, and a contact/enquiry system. The admin dashboard supports CRUD operations and auto-cleanup of expired listings.

## Technical Architecture

Built with React 19 and Vite on the frontend, with a Node.js/Express API and Supabase PostgreSQL backend. JWT handles authentication for the admin panel.

## What I Learned

SEO optimization for a dynamic job board taught me about structured data, server-side rendering strategies, and the importance of clean URL structures for discoverability.`,
    date: '2025-03-01',
    category: 'Full Stack',
    readTime: '5 min',
    tags: ['React 19', 'Vite', 'Node.js', 'Express', 'Supabase', 'SEO', 'JWT'],
    relatedProject: 'InternX',
  },
  {
    slug: 'nestfinder-real-estate',
    title: 'NestFinder: A Full-Stack Real Estate Platform with AI Features',
    excerpt:
      'Building a comprehensive real estate discovery platform with interactive maps, Stripe payments, and Claude AI integration — all powered by Next.js and Prisma.',
    content: `NestFinder is a full-stack real estate discovery platform built with Next.js. It features property listings with interactive Leaflet maps, secure authentication via NextAuth, Stripe-powered payments, PDF generation, and AI-assisted features.

## Why Next.js?

Next.js was the natural choice for a real estate platform because of its hybrid rendering capabilities — static pages for listings, server-side rendering for search results, and client-side interactivity for maps.

## Key Integrations

Stripe handles payment processing for premium listings and featured properties. Claude AI assists with property descriptions and search recommendations. Prisma ORM manages the relational database for efficient property and user management.

## Challenges

Mapping thousands of properties efficiently required careful optimization of map tile loading and clustering algorithms. The Leaflet integration with React required custom hooks for lifecycle management.`,
    date: '2025-02-15',
    category: 'Full Stack',
    readTime: '6 min',
    tags: ['Next.js', 'React', 'Prisma', 'NextAuth', 'Stripe', 'Leaflet', 'Claude AI'],
    relatedProject: 'NestFinder',
  },
  {
    slug: 'skywings-airline-reservation',
    title: 'SkyWings: Building an Airline Reservation System from Scratch',
    excerpt:
      'A deep dive into building a full-stack airline booking platform with dynamic flight search, interactive seat selection, and automated PDF boarding pass generation.',
    content: `SkyWings is a full-stack airline booking platform featuring dynamic flight search, interactive seat selection, and automated PDF boarding pass generation.

## System Design

The booking system uses PostgreSQL with Supabase, including Row Level Security policies and database triggers to manage booking logic and authentication. The seat selection system required careful database design to prevent double-booking.

## Key Features

- Dynamic flight search with date-based pricing
- Interactive seat map with real-time availability
- Automated PDF boarding pass generation
- Secure payment processing

## Database Design

The most interesting challenge was designing a database schema that could handle booking logic, seat availability, and pricing rules simultaneously. Database triggers enforce business rules at the data layer.`,
    date: '2025-01-20',
    category: 'Full Stack',
    readTime: '5 min',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'PDF Generation'],
    relatedProject: 'SkyWings',
  },
  {
    slug: 'intelliridex-autonomous-vehicles',
    title: 'Researching Autonomous Vehicle Navigation with Deep Neural Networks',
    excerpt:
      'My research project on autonomous vehicle navigation using deep neural networks — implementing computer vision and ML algorithms for real-time object detection and path planning.',
    content: `IntelliRideX is a research project focused on autonomous vehicle navigation using deep neural networks. The project implements advanced computer vision and machine learning algorithms for real-time object detection, path planning, and decision-making.

## Technical Approach

Using Python and TensorFlow, the system processes camera input through a convolutional neural network for object detection. Path planning uses reinforcement learning to optimize navigation decisions.

## Challenges

Real-time processing is the biggest challenge in autonomous vehicle systems. The pipeline from camera input to steering decision must complete in milliseconds. We optimized the model architecture and used TensorFlow Lite for edge deployment.

## Future Work

The project is ongoing, with plans to implement more sophisticated sensor fusion (combining camera, LiDAR, and radar data) and test on physical scale models.`,
    date: '2024-12-10',
    category: 'AI',
    readTime: '8 min',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision', 'OpenCV'],
    relatedProject: 'IntelliRideX',
  },
  {
    slug: 'solelux-ecommerce',
    title: 'SoleLux: Building a Premium Luxury Shoe E-Commerce Platform',
    excerpt:
      'How I built a luxury e-commerce platform with a cinematic storefront, admin dashboard, and multiple payment options including Razorpay and COD.',
    content: `SoleLux is a premium luxury shoe e-commerce platform with a cinematic customer storefront and a modern admin/operator dashboard. The platform includes catalogue search and filters, cart and wishlist, checkout with delivery/pickup and COD/Razorpay/UPI options, order history, product CRUD, and analytics.

## Tech Stack

Built with React and TypeScript using Vite, with Zustand for state management and TanStack Query for server state. The backend is an Express API backed by Supabase PostgreSQL for data, Auth for authentication, and Storage for images.

## E-Commerce Architecture

Building a production e-commerce system required careful consideration of state management (Zustand for client state, TanStack Query for server cache), checkout flow (multi-step with validation), and payment integration (Razorpay SDK with webhook verification).

## Admin Dashboard

The admin panel supports product CRUD, order management, analytics dashboards, and customer management — all secured behind authentication.`,
    date: '2024-11-05',
    category: 'Full Stack',
    readTime: '7 min',
    tags: ['React', 'TypeScript', 'Vite', 'Express', 'Supabase', 'Zustand', 'TanStack Query'],
    relatedProject: 'SoleLux',
  },
  {
    slug: 'mausam-weather-app',
    title: 'Mausam: Building a Real-Time Weather Application',
    excerpt:
      'A look at building a real-time weather app with live data, interactive maps, and location-based alerts — all in a clean, responsive interface.',
    content: `Mausam is a real-time weather application that collects and displays live weather data with accurate forecasts, interactive maps, and location-based weather alerts.

## Design Philosophy

The goal was simplicity and clarity. Weather data is inherently complex — temperature, humidity, wind speed, UV index, precipitation — and presenting it in an intuitive way was the primary design challenge.

## Technical Highlights

- Real-time weather data from public APIs
- Geolocation for automatic local weather
- Interactive maps showing weather patterns
- Dynamic weather visualizations that change with conditions
- Multi-day forecasts with hourly breakdowns

## What I Learned

Working with multiple weather APIs taught me about data normalization, rate limiting, and graceful degradation when API calls fail.`,
    date: '2024-10-01',
    category: 'Web',
    readTime: '4 min',
    tags: ['React', 'JavaScript', 'Weather API', 'Geolocation', 'REST API'],
    relatedProject: 'Mausam',
  },
  {
    slug: 'press-design-system',
    title: 'Designing "The Press": A Newspaper-Themed Design System',
    excerpt:
      'Behind the scenes of the design system powering this portfolio — brutalist punch meets newspaper soul with atelier polish.',
    content: 'This portfolio is built on "The Press" design system — a set of principles and components that create a consistent newspaper/broadsheet reading experience.\n\n## Design Principles\n\n1. **Ink on paper**: Everything should feel printed. Colours are muted, borders are hard, and shadows are sharp.\n2. **Typographic hierarchy**: Archivo for display headlines, Newsreader for body text, Space Mono for metadata — each font serves a distinct purpose.\n3. **The grid is law**: Layouts follow a strict grid, but the grid flexes at breakpoints like a newspaper that reformats for different editions.\n\n## Key Components\n\n- PressSection: A newspaper page with paper texture overlay\n- SectionMasthead: Section headers with animated rule draws\n- PressTag: Monospaced bordered tags\n- PressButton: Ink slab buttons\n- pressReveal: Animation variants for staggered content reveals\n\n## Why a Newspaper Theme?\n\nA developer portfolio is a professional document. By treating it as a newspaper, we elevate the content — every project is a front-page story, every certification is an archive entry, every skill is a classified listing.',
    date: '2025-06-01',
    category: 'Design',
    readTime: '4 min',
    tags: ['Design System', 'CSS', 'Tailwind', 'Typography', 'Framer Motion'],
  },
];

export const postCategories = [
  'All',
  'Full Stack',
  'AI',
  'Web',
  'Design',
];

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

