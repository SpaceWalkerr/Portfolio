import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, FileText, Award } from 'lucide-react';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';

export interface ExperienceData {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  projectsBuilt?: { name: string; url: string }[];
  /** A verifiable document for this role — e.g. an experience/relieving certificate */
  credential?: { label: string; url: string };
  details: React.ReactNode;
}

const experiences: ExperienceData[] = [
  {
    role: 'Artificial Intelligence Intern',
    company: 'Berry Stenley',
    companyUrl: 'https://www.berrystenley.com',
    period: 'Jun 2026 — Aug 2026',
    description:
      'Engineered and deployed intelligent chatbot systems utilizing Retrieval-Augmented Generation (RAG) and developed full-stack web applications using Lovable AI.',
    highlights: [
      'Engineered and deployed intelligent chatbot systems (gpt.srmup.in, ai.berrystenley.com) utilizing RAG for semantic context retrieval',
      'Implemented a robust document embedding pipeline and vector database storage',
      'Developed full-stack web applications including puja-path.com using Lovable AI, customizing frontend components and integrating Supabase',
      'Built an admin panel featuring Role-Based Access Control (RBAC), user management, and CRUD operations',
      'Integrated Razorpay and PayPal payment gateways encompassing full checkout flows and webhook event handling',
    ],
    technologies: ['React', 'Node.js', 'Lovable AI', 'Supabase', 'RAG', 'Vector Databases', 'Payment Gateways'],
    projectsBuilt: [
      { name: 'GPT SRMUP', url: 'https://gpt.srmup.in' },
      { name: 'AI Berry Stenley', url: 'https://ai.berrystenley.com' },
      { name: 'Puja Path', url: 'https://puja-path.com' },
    ],
    credential: {
      label: 'Experience Certificate',
      url: '/berry-stenley-experience-certificate.pdf',
    },
    details: (
      <div className="space-y-4">
        <p>
          During my internship at Berry Stenley, I spearheaded the development of advanced conversational agents leveraging modern LLMs and vector databases. Our primary objective was to build domain-specific AI assistants that could fetch and process contextual information efficiently without hallucinating.
        </p>
        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">RAG Architecture & Vector Search</h4>
        <p>
          For <a href="https://gpt.srmup.in" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-oxblood">gpt.srmup.in</a> and <a href="https://ai.berrystenley.com" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-oxblood">ai.berrystenley.com</a>, the biggest challenge was ensuring the AI consistently produced contextually accurate answers. I designed a Retrieval-Augmented Generation (RAG) pipeline where every user query passed through a retrieval layer first.
        </p>
        <p>
          I implemented a semantic chunking strategy, dividing documents (PDFs, DOCX, etc.) into overlapping chunks of 400–600 tokens to preserve context spanning multiple paragraphs. These were converted into vector embeddings using OpenAI and stored in PostgreSQL using the <code>pgvector</code> extension. At query time, I utilized an HNSW (Hierarchical Navigable Small World) index for near real-time nearest-neighbor lookup, combined with SQL metadata filtering (like department or category) to narrow down the search space before computing semantic similarity.
        </p>
        <p>
          Instead of sending all retrieved chunks to the LLM, I implemented a reranking step that selected only the highest-confidence context, reducing prompt size, latency, and API costs. Through strict prompt orchestration, the model was instructed to answer strictly from retrieved context, drastically reducing hallucinations.
        </p>

        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">Full Stack Development & Payment Integrity</h4>
        <p>
          Beyond AI, I built platforms like <a href="https://puja-path.com" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-oxblood">puja-path.com</a> utilizing Lovable AI for rapid UI component generation and Supabase for backend services. While Lovable AI accelerated frontend creation, I had to significantly refactor the generated React code to centralize API communication, manage loading states, and handle errors robustly.
        </p>
        <p>
          The backend schema was complex, involving Users, Orders, Bookings, Priests, and Payments, secured by Row Level Security (RLS) policies. Handling payments introduced critical edge cases. For instance, to prevent duplicate bookings on page refreshes, every payment request generated a unique transaction ID before redirecting to the gateway, ensuring idempotent webhook processing.
        </p>
        <p>
          I also implemented background workers to synchronize payment statuses during gateway delays, preventing the frontend from displaying incorrect states. Utilizing Supabase Realtime, users received instant booking confirmations without refreshing, resulting in a production-grade, highly reliable user experience.
        </p>
      </div>
      
    ),
  },
  {
    role: 'Full Stack Developer',
    company: 'Wealth Shala',
    companyUrl: 'https://wealthshala.com',
    period: '2025 — Present',
    description:
      'Architected and developed a responsive financial literacy platform using React and TypeScript, integrating modern UI libraries and smooth animations. Successfully launched the platform to active users while maintaining high reliability and uptime through optimized deployment practices.',
    highlights: [
      'Designed and built responsive UI with React and TypeScript for financial literacy platform',
      'Implemented smooth animations and interactive features using Framer Motion',
      'Deployed and maintained platform with 99.9% uptime using modern DevOps practices',
      'Integrated third-party financial APIs and payment systems',
      'Optimized application performance resulting in 40% faster load times',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
    details: (
      <div className="space-y-4">
        <h4 className="font-bold text-oxblood mt-2 border-b border-ink/10 pb-1">Interactive Financial Dashboards</h4>
        <p>
          My primary responsibility at Wealth Shala was developing interactive dashboards that made financial planning accessible and engaging. Built using React.js, TypeScript, Tailwind CSS, and Chart.js, the platform moved away from static numbers toward real-time exploration. I implemented dynamic line, bar, and doughnut charts where users could hover for exact values, zoom into time ranges (1 Month to 5 Years), and filter dynamically by asset class (Mutual Funds, Stocks, SIPs, Fixed Income).
        </p>
        <p>
          A standout feature was the portfolio allocation visualization—a dynamic doughnut chart that updated instantly as users adjusted their investments, highlighting asset concentration. I also built a financial goal tracker with progress indicators that synced with backend APIs to reflect the latest market data. To ensure the dashboard felt responsive despite heavy datasets, I utilized Framer Motion for smooth chart transitions, lazy loaded heavy components, and aggressively memoized expensive computations to prevent unnecessary re-renders.
        </p>
        
        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">Achieving a 40% Faster Load Time</h4>
        <p>
          Financial applications demand near-instant load times. Initially, the dashboard suffered from network bottlenecks due to simultaneous data fetching and large bundle sizes. I overhauled the architecture by implementing React code-splitting, ensuring only immediately necessary components loaded on the first paint.
        </p>
        <p>
          I centralized data fetching using React Query, completely eliminating duplicate network calls and caching server responses to improve perceived responsiveness. On the backend, instead of sending raw historical datasets, data was aggregated and filtered based on the selected time range before transmission, drastically reducing payload sizes.
        </p>
        <p>
          Coupled with browser caching via Vercel's CDN, converting images to WebP, and utilizing <code>React.memo</code> and <code>useMemo</code> on the client side to avoid recomputing portfolio percentages, the initial dashboard load time decreased by approximately 40%. Time to Interactive improved significantly, giving users a seamless, highly performant experience.
        </p>
      </div>
    ),
  },
  {
    role: 'Full Stack Developer',
    company: 'Xtin Capital',
    companyUrl: 'https://xtincapital.com',
    period: '2025 — Present',
    description:
      'Built the core foundation of the Xtin Capital platform from scratch, developing scalable APIs and client-facing systems. Led a team of developers, managed sprint workflows, and ensured consistent technical delivery across all projects.',
    highlights: [
      'Architected scalable backend infrastructure using Node.js and Express',
      'Developed RESTful APIs handling 10,000+ daily requests',
      'Led a team of 3 developers, managing sprints and code quality standards',
      'Implemented authentication and authorization systems with JWT and OAuth2',
      'Built real-time data visualization dashboards for financial analytics',
      'Built a newsletter system automation that provides daily emails to subscribers',
    ],
    technologies: ['Node.js', 'Express', 'React', 'PostgreSQL', 'GoDaddy', 'Supabase', 'Vercel', 'Render', 'REST APIs'],
    details: (
      <div className="space-y-4">
        <h4 className="font-bold text-oxblood mt-2 border-b border-ink/10 pb-1">Backend Aggregation & Analytics Dashboard</h4>
        <p>
          At Xtin Capital, I built both the frontend dashboards and the backend APIs responsible for transforming raw financial records into actionable insights. The platform processed complex metrics including monthly cash flows, investment summaries, budget utilization, and savings trends.
        </p>
        <p>
          I implemented dynamic cash flow analysis charts (weekly, monthly, quarterly) and category-wise expense tracking (Food, Utilities, Investments) visualized through interactive doughnut charts. To handle the computational load, I optimized our PostgreSQL queries to aggregate data at the database level rather than processing massive arrays in Node.js. By caching frequently accessed summary statistics and centralizing business logic into reusable backend services, I ensured that every dashboard widget displayed highly consistent and synchronized information.
        </p>

        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">Scaling to 10,000+ Daily Requests & Team Leadership</h4>
        <p>
          Serving over 10,000 daily API requests required a hyper-focus on backend efficiency across our Node.js/Express.js stack. I audited database performance, adding precise indexes to heavily queried columns (user IDs, transaction dates) and optimizing complex joins. I also introduced strict API pagination and managed CPU-intensive tasks—like report generation and automated newsletters—asynchronously via background jobs to prevent blocking the main event loop.
        </p>
        <p>
          As a Team Lead overseeing three developers, my hardest sprint involved delivering overlapping features: user onboarding, analytics dashboards, and authentication overhauls. I structured the work into manageable modules based on individual strengths, led daily stand-ups, and strictly enforced a Git feature-branch workflow with thorough code reviews.
        </p>
        <p>
          When a last-minute frontend change broke several API contracts right before deployment, I organized emergency debugging sessions and synchronized API documentation across the team to fix the inconsistencies without delaying the release. This experience solidified my understanding that effective technical leadership is just as much about removing blockers and maintaining clear communication as it is about writing scalable code.
        </p>
      </div>
    ),
  },
  {
    role: 'Team Leader — Ambassador Program',
    company: 'Viral Fission',
    companyUrl: undefined,
    period: '2024 — 2025',
    description:
      'Led and managed a large ambassador team, improving coordination, communication, and campaign performance through structured task management and leadership. Coordinated cross-functional initiatives while maintaining team morale and productivity.',
    highlights: [
      'Managed and coordinated 20+ ambassadors across multiple campaigns',
      'Implemented task management system improving team coordination by 60%',
      'Increased campaign performance metrics by 45% through strategic planning',
      'Conducted training sessions for 50+ team members on campaign best practices',
      'Built and maintained communication channels ensuring transparency and collaboration',
      'Developed performance tracking dashboards for real-time campaign analytics',
    ],
    technologies: ['Leadership', 'Project Management', 'Communication', 'Analytics', 'Strategy'],
    details: (
      <div className="space-y-4">
        <h4 className="font-bold text-oxblood mt-2 border-b border-ink/10 pb-1">Digital Task Management & Role-Based Architecture</h4>
        <p>
          At Viral Fission, I recognized that managing campaign coordinators via WhatsApp and Google Sheets was unscalable. I engineered a centralized, web-based task management platform using React.js and Node.js/Express.js, backed by PostgreSQL. The system utilized a strict role-based access model (Admin, Campaign Manager, Promoter), allowing managers to break campaigns down into granular deliverables—like social media promotion and lead collection—and assign them effectively.
        </p>
        <p>
          To ensure smooth operations across the team of 20+ ambassadors, I integrated real-time WebSocket notifications for instant task updates and automated email alerts for approaching deadlines. Because multiple managers could edit campaigns simultaneously, I implemented optimistic UI updates on the frontend paired with strict backend validation to maintain absolute data consistency.
        </p>

        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">Data-Driven Execution & 45% Performance Increase</h4>
        <p>
          The core objective of these student engagement and brand awareness campaigns was maximizing reach. By transitioning the team to a data-driven platform, we completely eliminated communication delays. Every team member knew their exact priorities and deliverables immediately upon assignment.
        </p>
        <p>
          I developed real-time manager dashboards featuring interactive charts and filtering. Instead of post-campaign autopsies, managers could spot bottlenecks—like delayed approvals or stalled tasks—mid-campaign and redistribute workloads instantly. We also created standardized task templates, drastically reducing the setup time for new regional initiatives.
        </p>
        <p>
          Through this platform, we achieved a measurable 45% increase in core performance metrics. The biggest takeaway from this leadership role was proving that optimizing operational visibility and streamlining processes often drives more success than simply scaling headcount.
        </p>
      </div>
    ),
  },
  {
    role: 'Freelance Full Stack Developer',
    company: 'OrderKaaro',
    companyUrl: 'https://www.orderkaaro.in/',
    period: '',
    description:
      'Engineered and launched a comprehensive e-commerce platform from the ground up, handling everything from frontend user experience to backend processing.',
    highlights: [
      'Architected the entire platform from scratch, focusing on scalable backend systems and an intuitive user interface.',
      'Developed management dashboards for business operations and inventory tracking.',
      'Implemented secure authentication and seamless payment gateway integrations.',
      'Optimized database queries and API endpoints to ensure low latency during peak hours.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'Database', 'Payment Gateways', 'REST APIs'],
    projectsBuilt: [
      { name: 'OrderKaaro', url: 'https://www.orderkaaro.in/' },
    ],
    details: (
      <div className="space-y-4">
        <h4 className="font-bold text-oxblood mt-2 border-b border-ink/10 pb-1">End-to-End E-Commerce Architecture</h4>
        <p>
          Building OrderKaaro from scratch meant architecting a comprehensive ordering platform without relying on existing CMS templates. The system had to seamlessly connect customers, restaurants, admins, and delivery personnel. I designed a highly relational PostgreSQL schema—spanning Users, Menus, Orders, Payments, and Delivery Partners—enforcing strict data integrity via foreign keys and role-based middleware authorization.
        </p>
        <p>
          The checkout flow was particularly complex, requiring dynamic calculations for taxes, delivery charges, discounts, and inventory validation. To prevent partial or corrupt orders, I wrapped the entire checkout and payment processing logic inside transactional database operations. If a payment failed or stock became unavailable mid-checkout, the transaction rolled back atomically. To maintain performance as the data grew, I implemented query indexing, API caching, and cursor-based pagination.
        </p>

        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">Real-Time Delivery Tracking & Transactional Inventory</h4>
        <p>
          The delivery system operated as a state-driven workflow (Order Placed → Preparing → Out for Delivery → Delivered). To keep all stakeholders perfectly synchronized, I implemented WebSockets via Socket.IO. When a delivery agent updated a status, connected customer clients immediately reflected the change without requiring manual polling, drastically reducing API traffic and improving UX.
        </p>
        <p>
          Inventory management was directly tied into this transactional flow. When an order was confirmed, a database transaction automatically reduced inventory counts, utilizing row-level locking to prevent race conditions and overselling during traffic spikes. If stock ran out, the items were automatically flagged and hidden on the frontend.
        </p>
        <p>
          Finally, I built a dedicated admin dashboard generating reports on daily sales, high-velocity items, and replenishment needs—providing restaurant owners with the exact data needed to reduce food waste and optimize purchasing.
        </p>
      </div>
    ),
  },
  {
    role: 'Freelance Full Stack Developer',
    company: 'Shoeniverse Ajmer',
    companyUrl: 'https://www.shoeniverseajmer.com/',
    period: '',
    description:
      'Built a fully functional e-commerce platform dedicated to footwear from the ground up, delivering a seamless shopping experience with robust backend management.',
    highlights: [
      'Developed a responsive e-commerce storefront with a focus on product discovery and user experience.',
      'Designed and implemented a comprehensive admin panel for inventory, order, and customer management.',
      'Integrated payment processing and order confirmation workflows.',
      'Built a performant product catalog with advanced filtering, sorting, and search capabilities.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'Database', 'Tailwind CSS', 'REST APIs'],
    projectsBuilt: [
      { name: 'Shoeniverse Ajmer', url: 'https://www.shoeniverseajmer.com/' },
    ],
    details: (
      <div className="space-y-4">
        <h4 className="font-bold text-oxblood mt-2 border-b border-ink/10 pb-1">Custom Footwear-Specific CMS & RBAC</h4>
        <p>
          Generic e-commerce platforms like Shopify couldn't efficiently support Shoeniverse Ajmer's highly specific operational requirements for seasonal collections, local inventory, and promotions. I developed a bespoke CMS using React.js and Node.js/PostgreSQL with a modular architecture that completely decoupled product management from analytics and promotional engines.
        </p>
        <p>
          Instead of a generic product table, I designed the database around footwear-specific attributes (brand, sole type, style, material). The inventory dashboard automatically highlighted low-stock or slow-moving items, allowing administrators to rapidly deploy dynamic promotional campaigns via a custom engine. These sales could be scheduled by category or date range, eliminating the need to manually update prices for hundreds of SKUs. I also secured the entire system with strict Role-Based Access Control (RBAC), ensuring that inventory managers and support executives had explicitly bounded permissions.
        </p>

        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">Complex Product Variations & Dynamic Filtering</h4>
        <p>
          Footwear variations are notoriously difficult to model, as a single shoe can have dozens of size and color combinations. I implemented a normalized parent-child relational database schema. A parent product held universal data (pricing rules, descriptions), while a Product Variants table stored granular attributes (size, color, exact stock quantity). A single shoe available in three colors and eight sizes was managed as 24 inventory variants under a single listing—drastically simplifying management while providing a clean UX.
        </p>
        <p>
          To support complex consumer searches (e.g., "Men's Black Running Shoes Size 9 under ₹3000"), I implemented dynamic SQL query construction. Rather than building separate endpoints, the backend dynamically constructed queries based on selected filters, relying heavily on indexed columns to maintain sub-second response times as the catalog expanded.
        </p>
        <p>
          On the frontend, these filters updated results instantly via asynchronous API requests without page reloads. Crucially, when a user purchased the last available size of a specific variant, database transactions ensured that exact size was immediately flagged as out-of-stock without affecting the availability of the other 23 variants.
        </p>
      </div>
    ),
  },
  {
    role: 'Freelance Full Stack Developer',
    company: 'S2VESTIS',
    companyUrl: 'https://www.s2vestis.in/',
    period: '',
    description:
      'Designed and built a complete apparel e-commerce platform from scratch for a men\'s and women\'s clothing label, delivering a polished storefront alongside a full inventory and catalog management system.',
    highlights: [
      'Built a responsive storefront with a rotating hero carousel, filterable product gallery, sorting, and infinite scroll.',
      'Developed an admin dashboard with inventory metrics, low-stock alerts, and a dynamic colour/size variant builder.',
      'Implemented JWT authentication over httpOnly cookies with PostgreSQL Row Level Security.',
      'Engineered guest-cart persistence with automatic account merge on login, plus full-text and trigram product search.',
    ],
    technologies: ['React 19', 'TypeScript', 'Redux Toolkit', 'Express 5', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    projectsBuilt: [
      { name: 'S2VESTIS', url: 'https://www.s2vestis.in/' },
    ],
    details: (
      <div className="space-y-4">
        <h4 className="font-bold text-oxblood mt-2 border-b border-ink/10 pb-1">Variant-Driven Catalog & Server-Backed Cart</h4>
        <p>
          S2VESTIS needed a storefront where a single garment could carry many colour and size combinations without turning catalog management into a chore. I modelled the catalog as a parent-child schema in Supabase PostgreSQL: a parent product held shared data — name, description, pricing, imagery — while a variants table stored each colour/size pair with its own stock count and SKU. The admin panel wraps this in a dynamic variant builder, so adding a new colourway generates the full size run in one step, and low-stock alerts surface on the dashboard the moment a variant crosses its threshold.
        </p>
        <p>
          The cart is server-backed rather than a pure client store. Guests build a cart that persists across sessions, and on login it merges into the account cart instead of overwriting it — quantities are reconciled per variant so nothing is silently lost. All customer-facing tables are protected by Row Level Security, and product discovery runs on Postgres full-text and trigram search so partial and misspelled queries still return sensible results.
        </p>

        <h4 className="font-bold text-oxblood mt-6 border-b border-ink/10 pb-1">Storefront Experience & Auth</h4>
        <p>
          The frontend is a React 19 + Vite + TypeScript app with Redux Toolkit managing cart, wishlist, and auth state, and React Router 7 handling navigation. The product gallery combines filtering, sorting, and infinite scroll, backed by a rotating hero carousel and full product pages with image galleries and colour/size selection. Framer Motion drives the transitions so the storefront feels considered rather than templated.
        </p>
        <p>
          Authentication uses JWTs delivered as httpOnly cookies rather than tokens kept in local storage, keeping sessions out of reach of client-side scripts. The Express 5 API handles image uploads through Multer with optional Cloudinary offloading, and the checkout flow is wired end to end as a demo — order capture and confirmation without live payment processing.
        </p>
      </div>
    ),
  },
];

const ExperienceModal = ({
  experience,
  onClose,
}: {
  experience: ExperienceData | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!experience) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [experience, onClose]);

  return (
    <AnimatePresence>
      {experience && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-[60] w-[92%] max-h-[90vh] overflow-y-auto max-w-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="View experience details"
          >
            <div className="relative border-2 border-ink bg-paper-bright p-6 shadow-2xl sm:p-8">
              {/* Masthead bar */}
              <div className="mb-6 flex items-center justify-between border-b-4 border-double border-ink pb-3">
                <span className="font-editorial text-lg italic">Field Report</span>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-2xl font-black uppercase leading-[0.95] tracking-[-0.015em] sm:text-3xl">
                  {experience.role}
                </h3>
                <div className="mt-1 font-editorial text-lg italic text-oxblood">
                  {experience.company}
                </div>
              </div>

              <div className="font-editorial text-[15.5px] leading-relaxed text-ink prose-p:mb-4">
                {experience.details}
              </div>

              {experience.projectsBuilt && experience.projectsBuilt.length > 0 && (
                <div className="mt-8 border-l-2 border-oxblood/30 pl-4">
                  <span className="mb-3 block font-monopress text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    Platforms Built
                  </span>
                  <div className="flex flex-col gap-3">
                    {experience.projectsBuilt.map((project) => (
                      <a
                        key={project.url}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-fit items-center gap-2 border border-ink/20 bg-paper px-4 py-2 font-editorial text-[15px] italic text-oxblood transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {project.name}
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {experience.credential && (
                <div className="mt-8 border-l-2 border-oxblood/30 pl-4">
                  <span className="mb-3 block font-monopress text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    On the Record
                  </span>
                  <a
                    href={experience.credential.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 border border-ink/20 bg-paper px-4 py-2 font-editorial text-[15px] italic text-oxblood transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <Award className="h-4 w-4" />
                    {experience.credential.label}
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                  </a>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-ink/20">
                {experience.technologies.map((tech) => (
                  <PressTag key={tech}>{tech}</PressTag>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);

  return (
    <PressSection id="experience">
      <SectionMasthead
        section="Section C"
        name="The Record"
        headline="Professional Experience"
        standfirst="Dispatches from the field — roles where production systems were built, teams were led, and platforms were delivered."
      />

      <div className="divide-y-2 divide-ink border-y-2 border-ink">
        {experiences.map((exp, index) => (
          <motion.article
            key={exp.company}
            variants={pressReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            onClick={() => setSelectedExperience(exp)}
            className="group grid gap-4 py-8 sm:py-10 lg:grid-cols-[160px_1fr] lg:gap-8 cursor-pointer transition-colors hover:bg-ink/[0.02]"
          >
            {/* Dateline column */}
            <div className="font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <div className="text-oxblood">{exp.period}</div>
              <div className="mt-1">Dispatch {String(index + 1).padStart(2, '0')}</div>
            </div>

            {/* Story */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase leading-[0.95] tracking-[-0.015em] sm:text-3xl transition-colors group-hover:text-oxblood">
                    {exp.role}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-editorial text-lg italic text-oxblood hover:underline"
                      >
                        {exp.company}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="font-editorial text-lg italic text-oxblood">{exp.company}</span>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 bg-paper-bright text-ink/40 transition-colors group-hover:border-oxblood group-hover:bg-oxblood group-hover:text-paper">
                  <FileText className="h-4 w-4" />
                </div>
              </div>

              <p className="mt-4 max-w-3xl font-editorial text-[15px] leading-relaxed text-ink sm:text-base">
                {exp.description}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {exp.highlights.map((point) => (
                  <li key={point} className="flex gap-2.5 font-editorial text-[13.5px] leading-snug text-ink-mute">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-oxblood" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {exp.projectsBuilt && exp.projectsBuilt.length > 0 && (
                <div className="mt-6 border-l-2 border-oxblood/30 pl-4">
                  <span className="mb-2 block font-monopress text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                    Platforms Built
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {exp.projectsBuilt.map((project) => (
                      <a
                        key={project.url}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/link flex items-center gap-1.5 font-editorial text-[15px] italic text-oxblood transition-colors hover:text-ink"
                      >
                        {project.name}
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-[1px] group-hover/link:translate-x-[1px]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {exp.credential && (
                <div className="mt-5">
                  <a
                    href={exp.credential.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/cred inline-flex items-center gap-1.5 border border-ink/25 px-3 py-1.5 font-monopress text-[10px] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:border-ink hover:text-ink"
                  >
                    <Award className="h-3.5 w-3.5" />
                    {exp.credential.label}
                    <ExternalLink className="h-3 w-3 transition-transform group-hover/cred:-translate-y-[1px] group-hover/cred:translate-x-[1px]" />
                  </a>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <PressTag key={tech}>{tech}</PressTag>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <ExperienceModal 
        experience={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </PressSection>
  );
};

export default Experience;
