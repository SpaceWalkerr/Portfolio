/**
 * ─────────────────────────────────────────────────────────────────────────
 * SITE CONTENT — single source of truth. All real data for Suraj Nandan,
 * extracted from the production portfolio. Copy voice stays plain (brief §4).
 * ─────────────────────────────────────────────────────────────────────────
 */

export const PROFILE = {
  name: "Suraj Nandan",
  role: "Full Stack Developer & Software Engineer",
  website: "https://surajnandan.in",
  tagline:
    "I build full-stack web applications end to end — from data models and APIs to the interfaces people actually use, increasingly at the seam where web meets AI.",
  email: "surajnandan78@gmail.com",
  phone: "+91 6203484989",
  location: "Kishanganj, Bihar, India",
  availability: "Available remotely",
  // Two résumés live in /public.
  resumes: [
    { label: "Full résumé", href: "/Suraj_Resume.pdf" },
    { label: "One-page", href: "/Suraj_Resume_1Page.pdf" },
  ],
  socials: [
    { label: "GitHub", handle: "@SpaceWalkerr", href: "https://github.com/SpaceWalkerr" },
    { label: "LinkedIn", handle: "@surajnandan", href: "https://www.linkedin.com/in/surajnandan/" },
    { label: "LeetCode", handle: "@SurajNandan", href: "https://leetcode.com/u/SurajNandan/" },
    { label: "Twitter / X", handle: "@SurajNandan1625", href: "https://x.com/SurajNandan1625" },
    { label: "Email", handle: "surajnandan78@gmail.com", href: "mailto:surajnandan78@gmail.com" },
  ],
};

/** EmailJS — client-side keys are public by design (same as production). */
export const EMAILJS = {
  serviceId: "service_tmmpyud",
  templateId: "template_75e58ah",
  publicKey: "my_dIqRX5ixRlREAC",
  toEmail: "surajnandan78@gmail.com",
};

export const ABOUT = {
  bio: [
    "I'm a full-stack developer who turns complex challenges into elegant, user-focused solutions. My work bridges modern web technologies and AI, building applications that are both powerful and intuitive.",
    "Problem-solving is at the heart of what I do — optimizing performance, architecting scalable systems, and shipping features with a commitment to clean, maintainable code.",
    "I believe in continuous learning: beyond writing code I contribute to open-source and stay engaged with the developer community.",
  ],
  stats: [
    { value: 3, suffix: "+", label: "Years building" },
    { value: 20, suffix: "+", label: "Projects shipped" },
    { value: 20, suffix: "+", label: "Technologies" },
  ],
};

/**
 * Skills split across the two mesopelagic creatures (brief: Skills).
 * Lanternfish half = "what I build with"; firefly-squid half = "APIs & data".
 * Percentages intentionally dropped — dots over progress bars (brief §2).
 */
export const SKILLS = {
  lantern: [
    { group: "Languages", items: ["Java", "TypeScript", "Python", "JavaScript"] },
    { group: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js / R3F", "HTML5 & CSS3"] },
    { group: "Core CS", items: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "OOP"] },
  ],
  squid: [
    { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Prisma ORM", "JWT & Auth", "Stripe / Razorpay"] },
    { group: "Databases & Deployment", items: ["PostgreSQL", "Supabase", "Vercel", "Render", "Railway", "GoDaddy"] },
    { group: "AI / ML", items: ["RAG Pipelines", "Groq / OpenAI", "Claude API", "Prompt Engineering", "pgvector / Embeddings"] },
  ],
};

export interface Role {
  company: string;
  companyUrl?: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  tech: string[];
}

export const EXPERIENCE: Role[] = [
  {
    company: "Wealth Shala",
    companyUrl: "https://wealthshala.com",
    title: "Full Stack Developer",
    period: "2025 — Present",
    location: "Remote",
    summary:
      "Architected and shipped a responsive financial-literacy platform in React and TypeScript, live to active users with high reliability.",
    bullets: [
      "Built responsive UI with React + TypeScript for a financial-literacy platform.",
      "Implemented smooth animations and interactive features with Framer Motion.",
      "Deployed and maintained the platform at 99.9% uptime with modern DevOps.",
      "Integrated third-party financial APIs and payment systems.",
      "Cut load times ~40% through targeted performance optimization.",
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "REST APIs"],
  },
  {
    company: "Xtin Capital",
    companyUrl: "https://xtincapital.com",
    title: "Full Stack Developer",
    period: "2025 — Present",
    location: "Remote",
    summary:
      "Built the Xtin Capital platform from scratch — scalable APIs and client-facing systems — while leading a small team and owning delivery.",
    bullets: [
      "Architected scalable backend infrastructure with Node.js and Express.",
      "Developed RESTful APIs handling 10,000+ daily requests.",
      "Led a team of 3, managing sprints and code-quality standards.",
      "Implemented JWT + OAuth2 authentication and authorization.",
      "Built real-time data-visualization dashboards for financial analytics.",
      "Automated a newsletter system delivering daily emails to subscribers.",
    ],
    tech: ["Node.js", "Express", "React", "PostgreSQL", "Supabase", "Vercel", "Render", "GoDaddy"],
  },
  {
    company: "Viral Fission",
    title: "Team Leader — Ambassador Program",
    period: "2024 — 2025",
    location: "Remote",
    summary:
      "Led a large ambassador team, improving coordination and campaign performance through structured task management and leadership.",
    bullets: [
      "Managed and coordinated 20+ ambassadors across multiple campaigns.",
      "Introduced a task-management system that improved coordination ~60%.",
      "Lifted campaign performance metrics ~45% through strategic planning.",
      "Ran training sessions for 50+ members on campaign best practices.",
      "Built communication channels ensuring transparency and collaboration.",
    ],
    tech: ["Leadership", "Project Management", "Communication", "Analytics", "Strategy"],
  },
];

export interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
  status: string;
  score?: string;
  detail: string;
}

export const EDUCATION: Education[] = [
  {
    school: "SRM Institute of Science and Technology",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2023 — 2027",
    location: "Chennai, India",
    status: "Currently pursuing",
    score: "9.50 / 10.0 CGPA",
    detail:
      "Active in the Computer Society of India and GeeksforGeeks Campus Ambassador (Campus Mantri). Coursework across DSA, Operating Systems, Computer Networks, DBMS, OOP, and Machine Learning.",
  },
  {
    school: "Adarsh Jain Dharmic Shiksha Sadan, Najafgarh",
    degree: "Senior Secondary (Class XII), CBSE — PCM + Computer Science",
    period: "2021 — 2022",
    location: "New Delhi, India",
    status: "Completed",
    score: "87.2%",
    detail: "Focused on Physics, Chemistry & Mathematics; active in science and technology events.",
  },
  {
    school: "Bal Mandir Sr. Sec. School",
    degree: "Secondary (Class X), CBSE",
    period: "2019 — 2020",
    location: "New Delhi, India",
    status: "Completed",
    score: "93.6%",
    detail: "Built an early foundation in mathematics and science.",
  },
];

export type ProjectCategory = "Full Stack" | "AI" | "Web";

export interface Project {
  title: string;
  category: ProjectCategory;
  blurb: string;
  description: string;
  stack: string[];
  demo?: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "CardBridge — Card Discount Marketplace",
    category: "Full Stack",
    blurb: "Escrow-protected marketplace matching card-discount requesters with cardholders.",
    description:
      "A marketplace connecting requesters who want a specific card discount with cardholders who fulfill the purchase for a fee. Features escrow-protected transactions, a database-enforced state machine with an immutable event log, KYC verification with tiered limits, dispute resolution, and an admin review panel — all secured with Supabase Row Level Security.",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Escrow", "KYC", "Tailwind CSS"],
    demo: "https://card-bridge.vercel.app/",
    github: "https://github.com/SpaceWalkerr/CardBridge.git",
  },
  {
    title: "Internal GPT — College RAG Helpdesk",
    category: "AI",
    blurb: "RAG helpdesk answering strictly from uploaded institutional docs, with citations.",
    description:
      "A full-stack Retrieval-Augmented Generation helpdesk for colleges. Admins upload institutional documents that the backend extracts and chunks; students and staff ask questions answered strictly from the uploaded data with source citations. Powered by Groq/OpenAI with a retrieval layer upgradeable to pgvector.",
    stack: ["React", "Vite", "Node.js", "Express", "Supabase", "RAG", "Groq", "OpenAI"],
    demo: "https://gpt.srmup.in/",
    github: "https://github.com/SpaceWalkerr/Internal-Gpt.git",
  },
  {
    title: "Dashboard — Analytics & Admin Panel",
    category: "Web",
    blurb: "Responsive analytics dashboard with interactive charts and data tables.",
    description:
      "A modern, responsive analytics dashboard for visualizing key metrics and managing data at a glance. Interactive charts, data tables, real-time stat cards, and a clean component-driven UI with smooth transitions across all devices.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Charts", "Responsive Design"],
    demo: "https://dashboard-six-self-74.vercel.app/",
    github: "https://github.com/SpaceWalkerr/dashboard.git",
  },
  {
    title: "GigShield — Parametric Income Insurance",
    category: "Full Stack",
    blurb: "AI-driven parametric income protection for gig workers, with a 3D landing.",
    description:
      "An AI-powered parametric income-protection platform for gig delivery workers. When verified disruptions like heavy rain, hazardous air, or platform outages cut earning hours, GigShield triggers instant automatic payouts — no forms, no claims. Features an immersive 3D landing, location-based triggers, and a Supabase-backed Express API.",
    stack: ["React", "Three.js", "React Three Fiber", "Express", "Supabase", "GSAP", "Framer Motion", "Leaflet"],
    demo: "https://gig-shield-three.vercel.app/",
    github: "https://github.com/SpaceWalkerr/GigShield.git",
  },
  {
    title: "InternX — Internship & Hackathon Hub",
    category: "Full Stack",
    blurb: "Discovery platform aggregating internships and hackathons for Indian students.",
    description:
      "An internship and hackathon discovery platform for Indian students. Aggregates curated listings with search and filters, an SEO-optimized blog with JSON-LD, analytics, and an enquiry system. Includes an admin dashboard for CRUD and auto-cleanup of expired listings — backed by a Node/Express API and Supabase PostgreSQL.",
    stack: ["React 19", "Vite", "Node.js", "Express", "Supabase", "JWT", "Tailwind CSS", "SEO"],
    demo: "https://intern-x-black.vercel.app",
    github: "https://github.com/SpaceWalkerr/InternX.git",
  },
  {
    title: "NestFinder — Real Estate Platform",
    category: "Full Stack",
    blurb: "Next.js property platform with maps, auth, Stripe payments, and AI features.",
    description:
      "A full-stack real estate discovery platform built with Next.js — property listings with interactive Leaflet maps, secure NextAuth authentication, Stripe payments, PDF generation, and AI-assisted features. Data managed through Prisma ORM over a relational database.",
    stack: ["Next.js", "React", "Prisma", "NextAuth", "Stripe", "Leaflet", "Claude AI", "TypeScript"],
    demo: "https://nest-finder-topaz.vercel.app/",
    github: "https://github.com/SpaceWalkerr/NestFinder.git",
  },
  {
    title: "SkyWings — Airline Reservation System",
    category: "Full Stack",
    blurb: "Flight booking with seat selection and automated PDF boarding passes.",
    description:
      "A full-stack airline booking platform with dynamic flight search, interactive seat selection, and automated PDF boarding-pass generation. Built on PostgreSQL and Supabase with Row Level Security and database triggers managing booking logic and authentication.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Supabase", "REST API", "PDF Generation"],
    demo: "https://air-line-reservation-system.vercel.app/",
    github: "https://github.com/SpaceWalkerr/AirLine-Reservation-System.git",
  },
  {
    title: "IntelliRideX — Autonomous Vehicles Research",
    category: "AI",
    blurb: "Autonomous-vehicle navigation research using deep neural networks.",
    description:
      "Research on autonomous-vehicle navigation using deep neural networks — computer vision and ML for real-time object detection, path planning, and decision-making for self-driving systems.",
    stack: ["Python", "TensorFlow", "Deep Learning", "Computer Vision", "Neural Networks", "OpenCV"],
    demo: "https://intelli-ride-x.vercel.app/",
    github: "https://github.com/SpaceWalkerr/IntelliRideX.git",
  },
  {
    title: "Sutan Legal Corp — Legal Services Platform",
    category: "Full Stack",
    blurb: "Attorney directory with logic-based intake and appointment scheduling.",
    description:
      "A scalable legal-services platform with dynamic attorney directories, logic-based intake forms, and automated appointment scheduling, over a well-structured relational database managing complex legal data relationships.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "REST API", "Tailwind CSS"],
    demo: "https://sutan-legal-corp.vercel.app/",
    github: "https://github.com/SpaceWalkerr/Sutan-Legal-Corp.git",
  },
  {
    title: "Luxe — E-Commerce Platform",
    category: "Full Stack",
    blurb: "Full-stack storefront with catalog, cart, payments, and an admin panel.",
    description:
      "A comprehensive full-stack e-commerce solution — product catalog management, secure cart, payment-gateway integration, and order tracking, with an admin dashboard for inventory and customer analytics.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Stripe", "REST API", "Auth"],
    demo: "https://e-commerce-platform-eosin-three.vercel.app/",
    github: "https://github.com/SpaceWalkerr/E-commerce-platform",
  },
  {
    title: "SoleLux — Luxury Shoe E-Commerce",
    category: "Full Stack",
    blurb: "Cinematic shoe storefront plus an operator dashboard, cart, and checkout.",
    description:
      "A premium luxury-shoe e-commerce platform with a cinematic storefront and a modern operator dashboard. Catalogue search and filters, cart and wishlist, checkout with delivery/pickup and COD/Razorpay/UPI, order history, product CRUD, and analytics — backed by an Express API and Supabase.",
    stack: ["React", "TypeScript", "Vite", "Express", "Supabase", "Zustand", "TanStack Query", "Framer Motion"],
    demo: "https://shoes-wesite.vercel.app",
    github: "https://github.com/SpaceWalkerr/Shoes-Wesite.git",
  },
  {
    title: "Mausam — Real-Time Weather App",
    category: "Web",
    blurb: "Live weather with forecasts, interactive maps, and location alerts.",
    description:
      "A real-time weather application with live data, accurate forecasts, interactive maps, and location-based alerts. Clean, responsive interface with dynamic visualizations and multi-day forecasts.",
    stack: ["React", "JavaScript", "Weather API", "Geolocation", "REST API", "CSS3"],
    demo: "https://weather-pro-suraj.vercel.app/weather-dashboard",
    github: "https://github.com/SpaceWalkerr/WeatherPro",
  },
  {
    title: "Classic Games Collection",
    category: "Web",
    blurb: "Sudoku, Tic-Tac-Toe, 2048, and Snake in vanilla JavaScript.",
    description:
      "An interactive collection of classic puzzle and strategy games — Sudoku, Tic-Tac-Toe, 2048, and Snake — built with vanilla JavaScript, featuring smooth animations, score tracking, and responsive gameplay.",
    stack: ["JavaScript", "HTML5", "CSS3", "Algorithms", "Game Logic", "DOM"],
    demo: "https://games-six-dun.vercel.app/",
    github: "https://github.com/SpaceWalkerr/GAMES",
  },
  {
    title: "City of Noctura — Interactive Story",
    category: "Web",
    blurb: "Branching interactive-fiction experience with atmospheric sound.",
    description:
      "An immersive interactive storytelling experience set in the City of Noctura — branching narratives, atmospheric sound design, and dynamic character interactions that respond to player choices for a unique playthrough every time.",
    stack: ["JavaScript", "HTML5", "CSS3", "Interactive Design", "Audio API", "Story Engine"],
    demo: "https://the-city-of-noctura.vercel.app/",
    github: "https://github.com/SpaceWalkerr/The-City-of-Noctura-",
  },
];

export const PROJECT_FILTERS = ["All", "Full Stack", "AI", "Web"] as const;

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  featured?: boolean;
  score?: string;
}

/** Full credential library — featured first, then the rest. */
export const CERTIFICATIONS: Certification[] = [
  { title: "Human Computer Interaction", issuer: "NPTEL / IIT Delhi", year: "Jan–Apr 2025", url: "/certificates/human-computer-interaction-iit.pdf", featured: true, score: "90/100 — Gold Medal" },
  { title: "Bootcamp on Big Data & Data Science", issuer: "C-DAC NOIDA & SRM IST", year: "Jan 2025", url: "/certificates/bootcamp-big-data-data-science.pdf", featured: true },
  { title: "Campus Mantri (Campus Ambassador)", issuer: "GeeksforGeeks", year: "2024–2025", url: "/certificates/campus-mantri-ambassador.pdf", featured: true, score: "Completed 1 Year" },
  { title: "Intl. Conference on Viksit Bharat 2047", issuer: "Dept. of Chemistry, SRM IST", year: "Feb 2025", url: "/certificates/viksit-bharat-2047.pdf", featured: true, score: "Lead Student Coordinator" },
  { title: "AI/ML for Geodata Analysis", issuer: "IIRS, ISRO", year: "Aug 2024", url: "/certificates/aiml-geodata-analysis.pdf", featured: true, score: "Computer Ethics, Generative AI" },
  { title: "Brand Revamp (Innovate 2024) — I Position", issuer: "SRM IST", year: "Apr 2024", url: "/certificates/brand-revamp-innovate-2024.pdf", featured: true, score: "Winner" },
  { title: "Generative AI & Prompt Engineering Internship", issuer: "IGDTUW & Sansoftech", year: "Jun–Jul 2025", url: "/certificates/generative-ai-prompt-engineering-igdtuw.pdf", featured: true, score: "6-Week Internship" },

  { title: "Alpha (DSA with Java)", issuer: "Apna College", year: "2024", url: "/certificates/alpha-dsa-java.pdf" },
  { title: "Java (Basic)", issuer: "HackerRank", year: "Sep 2024", url: "/certificates/java-basic-hackerrank.pdf" },
  { title: "Java Internship", issuer: "Navodita Infotech", year: "Oct 2024", url: "/certificates/java-internship-navodita.pdf" },
  { title: "Python", issuer: "GUVI", year: "Oct 2024", url: "/certificates/python-guvi.pdf" },
  { title: "Python (Basic)", issuer: "HackerRank", year: "Sep 2024", url: "/certificates/python-basic-hackerrank.pdf" },
  { title: "Problem Solving (Basic)", issuer: "HackerRank", year: "Oct 2024", url: "/certificates/problem-solving-basic.pdf" },
  { title: "Problem Solving (Intermediate)", issuer: "HackerRank", year: "Oct 2024", url: "/certificates/problem-solving-intermediate.pdf" },
  { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", year: "2024", url: "/certificates/career-essentials-generative-ai.pdf" },
  { title: "Human Computer Interaction (Adobe Express)", issuer: "Adobe / NPTEL", year: "2024", url: "/certificates/human-computer-interaction-nptel-adobe.pdf" },
  { title: "Two-Day Workshop on ArduBotics", issuer: "SRM IST", year: "Feb 2024", url: "/certificates/ArduBotics Workshop.jpg" },
  { title: "Err Hunt 2.0", issuer: "Computer Society of India, SRMIST", year: "Aug 2024", url: "/certificates/Err HUnt 2.0.pdf" },
  { title: "ERR-Hunt", issuer: "Computer Society of India, SRMIST", year: "Sep 2023", url: "/certificates/Err Hunt.pdf" },
  { title: "Flipkart GRID 6.0 — Software Track (L1)", issuer: "Flipkart", year: "2024", url: "/certificates/Flipkart Grid 6.0.pdf" },
  { title: "Folonite Winter Internship Contest 2024", issuer: "Folonite", year: "2024", url: "/certificates/Folonite Winter Internship.pdf" },
  { title: "HackFest Delhi/NCR Hackathon", issuer: "GeeksforGeeks", year: "2024", url: "/certificates/HackFest.pdf" },
  { title: "Geeks Challenge 1.0 — NIT Patna", issuer: "GeeksforGeeks", year: "Jul 2024", url: "/certificates/Nit Patna Challenge .pdf" },
  { title: "Shaastra Programming Contest", issuer: "IIT Madras (Shaastra 2025)", year: "2025", url: "/certificates/Shastra 2025.pdf" },
  { title: "CodeWizard 25", issuer: "SRM IST", year: "2025", url: "/certificates/CodeWizards.pdf" },
  { title: "TATA Crucible Campus Quiz 2024", issuer: "Tata Group", year: "2024", url: "/certificates/Tata Crucible.pdf" },
  { title: "TechXNinjas Weekly Contest #11", issuer: "TechXNinjas", year: "2024", url: "/certificates/TechXNinja.pdf" },
  { title: "Hack2skill Certificate", issuer: "Hack2skill", year: "2024", url: "/certificates/Hack2skill-Certificate.pdf" },
  { title: "MongoDB Certificate", issuer: "MongoDB", year: "2024", url: "/certificates/MongoDB Certificate.pdf" },
  { title: "Certificate of Appreciation", issuer: "DevTown / MSME", year: "Aug 2024", url: "/certificates/msme.pdf" },
  { title: "CSI Certificate of Participation", issuer: "Computer Society of India, SRMIST", year: "2024", url: "/certificates/CSI Certificate of Participation-Suraj Nandan.pdf" },
  { title: "Gift a Smile — Volunteering", issuer: "Gift a Smile Foundation", year: "Mar 2025", url: "/certificates/Suraj Nandan   GAS Certificate.pdf" },
  { title: "Swaiti Aithon", issuer: "Swaiti", year: "2024", url: "/certificates/Swaiti Aithon.pdf" },
  { title: "BurnOut (Innovate 2024)", issuer: "SRM IST", year: "Apr 2024", url: "/certificates/BurnOut.jpg" },
  { title: "Meditech Innovation (Innovate 2024)", issuer: "SRM IST", year: "Apr 2024", url: "/certificates/Meditech.jpg" },
  { title: "Quiz on National Education Policy 2020", issuer: "SRM IST", year: "2024", url: "/certificates/quiz-national-education-policy.pdf" },
  { title: "National Science Day — 2025", issuer: "Dept. of Science & Technology, Govt. of India", year: "Feb 2025", url: "/certificates/ national-science-day-2025.pdf" },
  { title: "Wisdom War (National Science Day)", issuer: "SRM IST (Dept. of Chemistry)", year: "Feb 2024", url: "/certificates/wisdom-war-national-science-day.pdf" },
];
