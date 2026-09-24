export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  /** Derived from the word count — see withReadTime below */
  readTime: string;
  tags: string[];
  /** Slug of the related project, if any */
  relatedProject?: string;
}

const rawPosts: Omit<Post, 'readTime'>[] = [
  {
    slug: 'building-cardbridge',
    title: 'Building CardBridge: An Escrow-Powered Card Discount Marketplace',
    excerpt:
      'How I built a card-discount marketplace where the rules live in Postgres: a trigger-enforced escrow state machine, an immutable event log, KYC tiers, and Row Level Security on every table.',
    content: `You see a great discount on something you want, but it only applies to a card you don't own. Someone else owns that card and would happily make the purchase for you for a small fee. The hard part isn't the idea, it's trust: the requester needs to know the product will arrive, the cardholder needs to know they'll be paid, and the platform needs a record of every step. CardBridge is my attempt at that marketplace.

The decision that shaped everything was to put the business rules in the database rather than in the React app. A transaction moves through MATCHED, FUNDED, PURCHASED, SHIPPED, DELIVERED and finally RELEASED, with CANCELLED, DISPUTED and REFUNDED as the exits. Every change goes through a transition_transaction function, and a BEFORE UPDATE trigger checks it against a map of legal transitions, the caller's role and the transaction's invariants before stamping the timestamp. An AFTER UPDATE trigger then writes an immutable event log, keeps the original request's status in sync and credits the user's tier. A buggy or malicious client simply can't skip a step, because Postgres refuses it.

Access control works the same way. Only Supabase's public anon key ships to the browser, and Row Level Security is enabled on every table, so each user can only read and change the transactions they're part of. A guard trigger stops people from promoting their own profile privileges, public-safe views expose only what the browse feed needs, and matching has database-level guards too: you can't accept your own request, and the escrow amount is computed on insert rather than trusted from the client.

Trust is layered on top. Users move through a KYC lifecycle of UNVERIFIED, PENDING, VERIFIED or REJECTED, with documents in a private storage bucket, and tiered transaction limits are enforced in both the UI and the database. To be clear about the prototype: the KYC provider and the escrow layer are stubbed. The lifecycle, limits and state machine are real; money and identity checks don't touch a live provider yet.

When something goes wrong, either party can open a dispute from MATCHED onwards, with optional evidence uploaded to its own private bucket. A dispute freezes escrow, since every automatic action skips DISPUTED transactions, and an admin panel gated by RLS lets a moderator release the funds, refund them, or ask for more information. Timeouts are checked when a transaction page loads and by a scheduled Edge Function, so abandoned transactions don't sit in limbo.

Postgres taught me a few things along the way. You can't use a new enum value in the same transaction that adds it, so adding MATCHED and SHIPPED needed its own migration that commits before the state machine. The SELECT and UPDATE policies on requests and transactions referenced each other and recursed, which I broke with SECURITY DEFINER helper functions. The whole schema ended up as fourteen ordered migrations, including those fixes.

What's missing is just as clear. There's no automated test suite yet, and the next thing I'd add is tests that fire concurrent transitions at the RPC to prove it holds under race conditions, followed by real payment and KYC providers. But the core lesson already landed: when money moves, the database should be the referee.`,
    date: '2026-08-09',
    category: 'Full Stack',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Escrow'],
    relatedProject: 'CardBridge',
  },
  {
    slug: 'rag-helpdesk-internal-gpt',
    title: 'How I Built a RAG Helpdesk for My College',
    excerpt:
      'A deep dive into building Internal GPT — a Retrieval-Augmented Generation system that answers questions strictly from institutional documents with source citations.',
    content: `Internal GPT is a full-stack Retrieval-Augmented Generation helpdesk that I built specifically for college environments. The core idea is elegant in its simplicity: administrators upload institutional documents, and students and staff can ask natural language questions that are answered strictly from that data, complete with source citations. Every answer is grounded in the uploaded material, so there is no risk of the AI hallucinating policies that do not exist.

The system works in two distinct phases. First, when a document is uploaded, the backend extracts the text content and splits it into semantically meaningful chunks. Each chunk is then converted into a vector embedding using an embedding model, and these embeddings are stored alongside the original text. When a user asks a question, that question is also embedded, and we perform a vector similarity search to find the most relevant document chunks. This retrieval step is crucial because it constrains the AI to only consider information that actually exists in the knowledge base.

The second phase is generation. The retrieved chunks are injected into a carefully crafted prompt that instructs the AI model to answer based solely on the provided context. If the context does not contain sufficient information to answer the question, the model is instructed to say so explicitly rather than making something up. This is one of the most important prompt engineering lessons I learned: you must give the AI a graceful way to say "I don't know." Without that explicit instruction, models tend to produce plausible-sounding but completely fabricated answers, which is unacceptable in an institutional setting.

On the frontend, I used React with Vite for fast development and hot module reloading. The backend is a Node.js and Express API that handles document upload, text extraction, chunking, embedding, and search. For the initial version, I used Supabase for authentication and storage, with the embeddings stored in a simple table. However, I designed the retrieval layer with a clean abstraction so it can be upgraded to pgvector for production-scale deployments without changing any other part of the system.

One of the trickiest aspects was handling document formats. PDFs, Word documents, and plain text files all require different extraction pipelines, and some documents have complex layouts that confuse naive extraction algorithms. I implemented a fallback strategy where if the primary extraction method fails, the system tries alternative approaches before reporting an error to the user.

Building this system taught me that production RAG is as much about retrieval quality as it is about generation quality. A perfect language model is useless if it is searching through bad data. I spent significant effort on chunking strategies, overlap sizes, and embedding model selection. The difference between a good retrieval system and a great one is the difference between answers that are merely relevant and answers that are precisely correct.`,
    date: '2025-05-20',
    category: 'AI',
    tags: ['React', 'Node.js', 'RAG', 'Groq', 'OpenAI', 'Supabase', 'AI'],
    relatedProject: 'Internal GPT',
  },
  {
    slug: 'gigshield-parametric-insurance',
    title: 'GigShield: Parametric Income Insurance for Gig Workers',
    excerpt:
      "What our team of three built for delivery riders who lose a day's pay to rain or bad air — and the trigger engine, payout lifecycle and fraud checks I worked on.",
    content: `Delivery riders in India are paid weekly and live on thin cash buffers. One day of heavy rain, a hazardous AQI reading or a platform outage can wipe out a day or two of income, and traditional insurance, with its paperwork, adjusters and reimbursement weeks later, doesn't fit a loss that small and that sudden. GigShield was our answer: a parametric income-protection platform built by a team of three, with Rishabh and Abhinav.

Parametric cover pays a fixed amount when an objective, external signal crosses a threshold, rather than reimbursing a loss after someone proves it. We priced it the way riders think about money, weekly: Basic at 79 rupees, Standard at 129 and Pro at 179, each with its own daily payout cap and covered hours. The product deliberately covers lost earning hours only, not health, accidents or vehicles.

My main piece was the trigger engine. It covers seven kinds of disruption, including heavy rain, heatwaves, AQI spikes, platform outages, curfews, local strikes and zone closures, and rather than a bare yes or no, each trigger gets a confidence score. That score starts from a base value per trigger type, rises with how reliable the weather data was, and falls for riders with a higher risk profile, ending up labelled Strong, Normal or Weak. Weather comes from Open-Meteo with a 2.5-second timeout and an automatic fallback to wttr.in, so one flaky API can't quietly stop the engine. Cooldown and de-duplication windows stop a single storm from firing again and again, and every trigger is written to an audit trail that syncs to the backend.

I also built the payout side. A claim moves through a visible lifecycle, pending verification, verified, processing and settled, and riders get a downloadable receipt generated with jsPDF, with their payout history loaded from the backend. In this build, payouts are simulated; there's no real payment rail connected.

For fraud, Rishabh and I built a liveness check on risky sessions. The app asks for a random hand gesture, and MediaPipe's hand-landmark model classifies it in the browser from the positions of the fingertips. I built the admin operations and fraud-review screens around it, plus role-based route protection so riders and admins only reach their own views. Riders also get a weather radar map built with Leaflet, and the landing page uses React Three Fiber for its 3D scene. Rishabh and Abhinav built most of the authentication, the Express server and the Groq-powered help chat.

Looking back, two things stand out. First, the cooldown and de-duplication state lives in the browser's storage, which is fine for a demo but belongs on the server in anything real. Second, our trigger thresholds are reasonable guesses; calibrating them properly would need historical weather and earnings data we didn't have. What I'd keep is the core idea: for someone paid weekly, the most useful insurance is the kind that pays without being asked.`,
    date: '2026-04-17',
    category: 'Full Stack',
    tags: ['React', 'Three.js', 'R3F', 'Express', 'Supabase', 'Leaflet', 'MediaPipe'],
    relatedProject: 'GigShield',
  },
  {
    slug: 'internx-hub-platform',
    title: 'Building InternX: An Internship & Hackathon Hub for Indian Students',
    excerpt:
      'How I built a platform that aggregates internship openings and hackathon listings for Indian students, featuring an admin dashboard, SEO optimization, and automated cleanup.',
    content: `InternX is a discovery platform that I built to solve a problem I experienced firsthand as a student: finding relevant internship opportunities and hackathon events is incredibly difficult. The information exists, but it is scattered across hundreds of college notice boards, social media posts, and word-of-mouth channels. I wanted to create a single, reliable, and well-organized resource that Indian students could check daily to find opportunities that matched their interests and skills.

The platform aggregates curated internship openings and hackathon listings with full-text search and detailed filters. Students can filter by location, field, duration, stipend, and more. Each listing includes all the essential information: application deadlines, eligibility criteria, application links, and direct contact information when available. I also built an SEO-optimized blog section with JSON-LD structured data markup, which helps individual listings appear in Google search results with rich snippets.

One of the most technically interesting features is the automated cleanup system. Internship listings expire, hackathon dates pass, and stale content frustrates users. The admin dashboard includes a scheduled job that automatically archives or removes expired listings. But I did not want to simply delete them, because historical data has value for analytics. So I implemented a soft-delete system with a configurable grace period, after which expired listings are permanently removed from search results but retained in a historical archive for trend analysis.

The admin dashboard itself supports full CRUD operations for all content types. Admins can create, edit, and delete listings, manage user accounts, and view analytics dashboards showing usage patterns. Authentication is handled with JWT tokens, and the admin interface is protected by role-based access control.

On the technical side, the frontend uses React 19 with Vite for optimal performance. The backend is a Node.js and Express API with Supabase PostgreSQL for data storage. The API is designed with a clean separation of concerns, with dedicated routes for listings, blog posts, user management, and analytics.

Building InternX taught me about the challenges of maintaining data quality in a user-generated content system. Even with admin moderation, listings can contain errors, broken links, or outdated information. I implemented a reporting system that allows users to flag problematic listings, and the admin dashboard prioritizes these flags for review. This community-driven quality control mechanism has been essential for maintaining trust in the platform.

I also learned a great deal about SEO optimization for dynamic content. Each listing page needs unique meta tags, Open Graph images, and structured data. I built a dynamic SEO metadata generator that constructs appropriate tags based on the listing type, location, and other attributes. The result is that InternX listings consistently rank well in search results for relevant queries.`,
    date: '2025-03-01',
    category: 'Full Stack',
    tags: ['React 19', 'Vite', 'Node.js', 'Express', 'Supabase', 'SEO', 'JWT'],
    relatedProject: 'InternX',
  },
  {
    slug: 'nestfinder-real-estate',
    title: 'NestFinder: A Full-Stack Real Estate Platform with AI Features',
    excerpt:
      'Building a comprehensive real estate discovery platform with interactive maps, Stripe payments, and Claude AI integration — all powered by Next.js and Prisma.',
    content: `NestFinder is a comprehensive real estate discovery platform that I built to explore the full capabilities of the Next.js ecosystem. The platform features interactive property maps, secure authentication, payment processing, and AI-assisted features, all backed by a robust relational database managed through Prisma ORM.

I chose Next.js for this project because real estate platforms have unique rendering requirements. Listing pages need to be statically generated for fast initial loads and SEO, while search results need server-side rendering to handle dynamic query parameters. Individual property pages can be statically generated at build time, but the search functionality requires real-time database queries. Next.js hybrid rendering model allows me to use both approaches within the same application, with the framework automatically choosing the right rendering strategy for each page.

The interactive maps are powered by Leaflet, which I chose over Google Maps because of its lower cost and greater flexibility. Each property listing includes a map view showing the property location along with nearby amenities like schools, hospitals, and public transit stations. I built a custom clustering algorithm that groups nearby properties when the map is zoomed out, then splits them into individual markers as the user zooms in. This was necessary because displaying thousands of markers simultaneously would overwhelm the browser.

Payment processing goes through Stripe, which handles premium listing placements and featured property promotions. Property owners can purchase various listing packages that give their properties enhanced visibility. The Stripe integration includes webhook handling for asynchronous payment events, which required careful consideration of idempotency to prevent duplicate processing.

Claude AI integration was one of the most exciting features. When a property owner creates a listing, they can optionally use AI to generate a compelling property description. The AI takes raw data about the property, such as the number of bedrooms, square footage, and key features, and generates a natural language description that highlights the property's best attributes. I also implemented an AI-powered search recommendation system that suggests properties based on the user's browsing history and saved searches.

Prisma ORM manages the database schema and provides type-safe database access. The schema includes models for users, properties, listings, bookings, payments, and reviews, all with appropriate relations and constraints. Prisma migrations handle schema changes smoothly, and the generated TypeScript types eliminate an entire class of runtime errors.

One of the biggest challenges was optimizing map performance. Loading hundreds of property markers simultaneously caused significant frame drops. I solved this by implementing viewport-based loading, where only properties visible in the current map view are fetched and rendered. As the user pans or zooms, new data is fetched dynamically with debouncing to prevent excessive API calls.`,
    date: '2025-02-15',
    category: 'Full Stack',
    tags: ['Next.js', 'React', 'Prisma', 'NextAuth', 'Stripe', 'Leaflet', 'Claude AI'],
    relatedProject: 'NestFinder',
  },
  {
    slug: 'skywings-airline-reservation',
    title: 'SkyWings: Building an Airline Reservation System from Scratch',
    excerpt:
      'A deep dive into building a full-stack airline booking platform with dynamic flight search, interactive seat selection, and automated PDF boarding pass generation.',
    content: `SkyWings is a full-stack airline booking platform that I built to explore the complexities of transaction processing, seat inventory management, and document generation. Building an airline reservation system from scratch is a humbling experience because it forces you to confront every edge case in transaction processing. Double-booking is simply not an option, and the system must handle concurrent requests from multiple users trying to book the same seats simultaneously.

The heart of the system is the database schema. I used PostgreSQL with Supabase, which provides Row Level Security and database triggers that enforce business rules at the data layer rather than relying on application code to behave correctly. The seating system uses a combination of explicit row-level locks and optimistic concurrency control. When a user begins the booking flow, the selected seats are temporarily held with a configurable timeout. If the booking is not completed within that window, the seats are automatically released. This prevents users from blocking seats indefinitely while they decide.

The seat selection interface was one of the most interesting UI challenges. An airplane seat map is a complex grid with irregular geometry. Aisles split the cabin, some rows have missing seats, and exit rows have different spacing. I built a data-driven seat map renderer that takes a configuration object describing the aircraft layout and generates the interactive map dynamically. This means the same component can render a Boeing 737, an Airbus A320, or any other configuration without code changes.

PDF boarding pass generation was another technically interesting component. When a booking is confirmed, the system generates a PDF boarding pass with a unique QR code, passenger details, flight information, and seat assignment. I used a server-side PDF generation library that takes structured data and produces a print-ready document. The QR code encodes the booking reference and a cryptographic signature that can be verified at the gate.

The flight search functionality required careful indexing and query optimization. Users search by origin, destination, date, and passenger count. The database needs to find available flights, check seat availability across multiple fare classes, and return results quickly. I created composite indexes on the most common query patterns and used database views to precompute availability summaries.

Building SkyWings taught me about the importance of transactional integrity in a system where money and customer experience are at stake. A booking system cannot afford to be eventually consistent. It must be strongly consistent, because the cost of a double-booking error is not just a technical bug but a real customer who shows up at the airport with no seat. I implemented comprehensive integration tests that simulate concurrent booking attempts and verify that the system maintains correctness under load. These tests caught several subtle race conditions that would have been extremely difficult to debug in production.`,
    date: '2025-01-20',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'PDF Generation'],
    relatedProject: 'SkyWings',
  },
  {
    slug: 'intelliridex-autonomous-vehicles',
    title: 'Researching Autonomous Vehicle Navigation with Deep Neural Networks',
    excerpt:
      'My research project on autonomous vehicle navigation using deep neural networks — implementing computer vision and ML algorithms for real-time object detection and path planning.',
    content: `IntelliRideX is a research project focused on autonomous vehicle navigation that I undertook to deeply understand the practical challenges of deploying deep neural networks in safety-critical real-time systems. While much of the public discussion around autonomous vehicles focuses on the impressive capabilities of large models, I was more interested in the engineering challenges of making these systems reliable, fast, and efficient enough to operate in real vehicles.

The core technical approach uses Python and TensorFlow to build a perception pipeline that processes camera input through a convolutional neural network for object detection. The network identifies vehicles, pedestrians, cyclists, traffic signs, and other relevant objects in each frame. But detection alone is not sufficient for navigation. The system must also predict the future trajectories of detected objects, plan a safe path through the environment, and generate control commands for steering, acceleration, and braking.

Path planning was the most challenging component conceptually. The vehicle needs to navigate from its current position to a destination while avoiding obstacles and obeying traffic rules. I implemented a hierarchical planning system with three levels: global route planning using a road network graph, local trajectory optimization that considers nearby obstacles, and reactive control for immediate hazards. Each level operates at a different time scale, with the lower levels reacting faster but considering less information.

One of the key insights from this project was the importance of simulation for testing. Real-world testing of autonomous vehicles is expensive, slow, and potentially dangerous. I built a simulation environment using CARLA, an open-source autonomous driving simulator, that allows me to test the perception and planning pipeline in a variety of scenarios without putting anyone at risk. The simulator provides photorealistic rendering, configurable weather conditions, and programmable traffic scenarios.

Real-time processing is the dominant constraint in autonomous vehicle systems. The entire pipeline from camera input to steering decision must complete in milliseconds. I spent significant effort optimizing the model architecture, using techniques like model quantization, pruning, and TensorFlow Lite for edge deployment. The goal was to achieve acceptable accuracy while meeting the strict latency requirements of real-time control.

This project is ongoing, and I have several directions for future work. I plan to implement sensor fusion that combines camera data with LiDAR and radar inputs, which should improve detection accuracy in adverse weather conditions. I also want to test the system on physical scale models, which would provide more realistic validation than simulation alone. The gap between simulation and reality is one of the fundamental challenges in autonomous vehicle research, and closing that gap requires real-world testing.`,
    date: '2024-12-10',
    category: 'AI',
    tags: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision', 'OpenCV'],
    relatedProject: 'IntelliRideX',
  },
  {
    slug: 'solelux-ecommerce',
    title: 'SoleLux: Building a Premium Luxury Shoe E-Commerce Platform',
    excerpt:
      'How I built a luxury e-commerce platform with a cinematic storefront, admin dashboard, and multiple payment options including Razorpay and COD.',
    content: `SoleLux is a premium luxury shoe e-commerce platform that I built to explore the full complexity of modern e-commerce systems. The platform includes a cinematic customer storefront, a comprehensive admin dashboard, and support for multiple payment methods including credit cards, Razorpay, UPI, and cash on delivery.

I chose React with TypeScript and Vite for the frontend because I wanted the development experience to be fast and the codebase to be maintainable over time. TypeScript catches a significant class of bugs at compile time that would otherwise appear as runtime errors in production. For state management, I used Zustand for client-side state and TanStack Query for server state caching. This separation is important because client state and server state have fundamentally different requirements. Client state like UI toggles and form inputs needs immediate updates, while server state like product listings and user profiles benefits from caching, background refetching, and optimistic updates.

The e-commerce architecture required careful consideration of the checkout flow. A typical e-commerce checkout has multiple steps: cart review, shipping information, payment method selection, and order confirmation. Each step has validation requirements, and users should be able to navigate back and forth without losing their data. I implemented a multi-step form with persistent state and per-step validation. The form data is stored in Zustand, so navigating between steps is instant and does not require server roundtrips.

Payment integration was the most technically demanding part. Razorpay's SDK requires careful handling of the payment lifecycle: initiating the payment, handling the callback, and verifying the payment signature on the server side to prevent tampering. The cash on delivery option adds another layer of complexity because it requires a different order fulfillment workflow. I built a payment service abstraction that unifies these different payment methods behind a common interface, so the rest of the application does not need to know which payment method was used.

The admin dashboard supports product CRUD operations, order management, customer management, and analytics. The product management interface includes image upload with automatic resizing and optimization, inventory tracking with low-stock alerts, and bulk editing capabilities. The order management interface provides a pipeline view showing orders in various stages from pending to shipped to delivered, with drag-and-drop status updates.

Building SoleLux taught me about the importance of handling payment webhooks correctly. Payment providers send asynchronous notifications about payment events, and these webhooks must be processed reliably even if the application is restarted or experiences errors. I implemented a webhook processing system with idempotency keys, retry logic with exponential backoff, and a dead letter queue for events that cannot be processed after multiple attempts. This ensures that no payment event is ever lost, and no payment is ever processed twice.

The analytics dashboard provides insights into sales trends, popular products, customer demographics, and conversion rates. I built this using materialized views in PostgreSQL that are refreshed periodically, providing fast queries even over large datasets without impacting the performance of the transactional database.`,
    date: '2024-11-05',
    category: 'Full Stack',
    tags: ['React', 'TypeScript', 'Vite', 'Express', 'Supabase', 'Zustand', 'TanStack Query'],
    relatedProject: 'SoleLux',
  },
  {
    slug: 'mausam-weather-app',
    title: 'Mausam: Building a Real-Time Weather Application',
    excerpt:
      'A look at building a real-time weather app with live data, interactive maps, and location-based alerts — all in a clean, responsive interface.',
    content: `Mausam is a real-time weather application that I built to master the art of presenting complex data in an intuitive interface. Weather data is inherently multidimensional: temperature, humidity, wind speed, UV index, precipitation probability, atmospheric pressure, and more. Presenting all of this information without overwhelming the user was the primary design challenge.

My design philosophy was progressive disclosure. The main screen shows the most important information prominently: current temperature, an icon representing the current conditions, and a brief text description. Users can then drill down into more detailed views for hourly forecasts, weekly outlooks, wind maps, and precipitation charts. This approach ensures that casual users get the information they need at a glance, while weather enthusiasts can access all the data they want.

The application pulls data from multiple weather APIs to ensure reliability and accuracy. If one API is down or returning stale data, the system automatically falls back to another provider. This required building an abstraction layer that normalizes data from different sources into a common format. Each API has slightly different field names, units, and data structures, and normalizing them was more work than I initially anticipated.

Geolocation is a core feature. When a user first opens the app, they are prompted to allow location access. If they grant it, the app automatically shows weather for their current location with a smooth transition animation. Users can also search for any city worldwide and save their favorite locations for quick access.

The interactive weather map was built using Leaflet with multiple tile layers. Users can toggle between different map views: temperature, precipitation, wind speed, cloud cover, and satellite imagery. Each layer uses color coding to represent data values, with a legend explaining the color scale. The maps load data dynamically based on the current viewport, so panning and zooming trigger new data requests.

Dynamic weather visualizations were one of the most fun parts to build. The background of the app changes based on current conditions: a sunny day shows a bright blue gradient with animated sun rays, a rainy day shows dark clouds with falling raindrop animations, and a snowy day shows a white gradient with falling snowflakes. These visualizations are created with CSS animations and canvas elements, so they are performant and battery-friendly on mobile devices.

Working with multiple weather APIs taught me important lessons about data normalization, rate limiting, and graceful degradation. Some APIs have strict rate limits that require careful request throttling, while others have reliability issues that require timeout handling and retry logic. I implemented a circuit breaker pattern that temporarily stops sending requests to an API that is experiencing errors, preventing cascading failures and giving the service time to recover.

The responsive design was particularly important for this application because weather is inherently a mobile use case. People check the weather on their phones throughout the day. I designed the layout mobile-first, with the desktop version adding additional columns and larger visualizations when screen real estate allows.`,
    date: '2024-10-01',
    category: 'Web',
    tags: ['React', 'JavaScript', 'Weather API', 'Geolocation', 'REST API'],
    relatedProject: 'Mausam',
  },
  {
    slug: 'press-design-system',
    title: 'Designing "The Press": A Newspaper-Themed Design System',
    excerpt:
      'Behind the scenes of the design system powering this portfolio — brutalist punch meets newspaper soul with atelier polish.',
    content: `This portfolio is built on "The Press," a design system that I created from scratch to express a specific aesthetic vision: the authority and permanence of print media translated into the interactive medium of the web. The name is deliberate. A newspaper press is mechanical, precise, and industrial. It stamps ink onto paper with force and intention. I wanted every interaction on this site to feel the same way: deliberate, considered, and permanent.

The design principles that guide "The Press" are deceptively simple but rigorously applied. First, ink on paper. Everything should feel printed. Colors are muted and natural, never glowing or fluorescent. Borders are hard and sharp, never rounded. Shadows are sharp and dark, cast by a light source that never moves. This creates a tactile quality that digital interfaces rarely achieve. When you move your cursor across the page, the magnetic cursor responds like a steel ball bearing rolling across newsprint.

Second, typographic hierarchy. Every font serves a distinct purpose with no overlap. Archivo Variable is used exclusively for display headlines. Its heavy weight and tight letter-spacing command attention. Newsreader Variable handles all body text, with its elegant serifs and comfortable reading rhythm. Space Mono is reserved for metadata, labels, and code snippets, its monospaced precision signaling that these are technical details, not narrative content. By strictly enforcing these roles, the typography becomes invisible, users absorb the content without ever thinking about the typeface.

Third, the grid is law but not prison. Layouts follow a strict column grid that creates visual rhythm and consistency across sections. But the grid flexes at breakpoints like a newspaper that reformats for different editions. A desktop visitor sees a three-column layout that mirrors a broadsheet newspaper, while a mobile visitor sees a single column that reads like a pocket edition. The underlying grid system ensures that elements align vertically across the page, creating the satisfying visual harmony that print designers have perfected over centuries.

The component library includes several key primitives. PressSection provides the paper background with the subtle noise texture overlay that gives each page a printed feel. SectionMasthead handles the section headers with animated rule draws that simulate a printing press stamping down the section title. PressTag and PressButton provide consistent interactive elements with the design system's characteristic hard borders and monospaced labels.

The motion design follows the same philosophy. Animations are not decorative. They serve a purpose: revealing content in a sequence that guides attention and creates narrative flow. The pressReveal animation variant staggers content with a subtle upward motion, like sheets of paper being fed through a press. The SectionMasthead animations draw rules across the page horizontally, simulating the mechanical action of a printing press.

I chose a newspaper theme for this portfolio because a developer portfolio is fundamentally a professional document. It is a record of work, a demonstration of capability, and a statement of professional identity. By treating it as a newspaper, every project becomes a front-page story, every certification becomes an archive entry, every skill becomes a classified listing. The format elevates the content, signaling that this is serious work presented with intentionality and craft.

Building "The Press" taught me that a design system is not just a collection of components but a coherent philosophy expressed through consistent decisions. Every color, every spacing unit, every animation curve was chosen deliberately and documented explicitly. The result is a portfolio that feels complete and intentional, not assembled from disparate pieces.`,
    date: '2025-06-01',
    category: 'Design',
    tags: ['Design System', 'CSS', 'Tailwind', 'Typography', 'Framer Motion'],
  },
];

/** ~220 words a minute — a typical adult reading speed for technical prose. */
const WORDS_PER_MINUTE = 220;

const withReadTime = (post: Omit<Post, 'readTime'>): Post => {
  const words = post.content.trim().split(/\s+/).length;
  return { ...post, readTime: `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min` };
};

// Newest first — the blog grid, RSS feed and earlier/later links all rely on this order
export const posts: Post[] = rawPosts.map(withReadTime).sort((a, b) => b.date.localeCompare(a.date));

export const postCategories = [
  'All',
  'Full Stack',
  'AI',
  'Web',
  'Design',
];

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
