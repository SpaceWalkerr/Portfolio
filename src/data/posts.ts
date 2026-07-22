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
    content: `CardBridge is a marketplace that I built to solve a surprisingly common problem: you see a great credit card discount on a product you want to buy, but you do not personally own that specific card. Someone else does own it, and they are willing to make the purchase on your behalf for a small fee. The challenge then becomes one of trust. How do you ensure the cardholder actually gets paid for their trouble, and how does the requester know they will not get cheated out of their money? These are the fundamental questions that drove every architectural decision in CardBridge.

The core solution I arrived at is an escrow system backed by a database-enforced state machine. When a requester finds a cardholder willing to help, they deposit the funds into an escrow account. The system then tracks the transaction through a series of discrete, immutable states: Pending, Funded, In Progress, Completed, and finally Disbursed. Each state transition is logged in an immutable event table, creating a complete audit trail that either party can inspect at any time. This means there is never any ambiguity about where a transaction stands.

The backend is built on Supabase with PostgreSQL, and I made extensive use of Row Level Security policies. RLS ensures that users can only access transactions they are directly involved in, which is critical for a marketplace handling financial data. The state machine itself is encoded in database triggers and check constraints, so no application code can accidentally violate the business logic. Even if a bug slips through in the frontend or API layer, the database will refuse to move a transaction into an invalid state.

KYC verification was another important layer. I implemented tiered transaction limits based on identity verification level. A user who has only verified their email can transact small amounts, while fully verified users with uploaded identification documents can handle higher-value transactions. This creates a trust gradient that protects the platform while remaining accessible to new users.

I also built a dispute resolution system with an admin review panel. If something goes wrong with a transaction, either party can escalate it. The admin panel shows the complete event log for that transaction, along with any messages exchanged, allowing a human moderator to make an informed decision. This was surprisingly complex to implement because I had to handle edge cases like partial refunds, where the escrow system needs to release only a portion of the held funds while keeping the rest locked.

Building CardBridge taught me the absolute importance of thorough state machine design. Every possible edge case, from a cardholder backing out after funds are deposited to a requester claiming they never received the product, had to be anticipated and encoded in the database logic. I spent as much time writing tests for the state machine as I did building the rest of the application, and that investment paid off when I found several race conditions that would have been catastrophic in production. The lesson is clear: when money is involved, your data layer needs to be mathematically provable.`,
    date: '2025-06-15',
    category: 'Full Stack',
    readTime: '12 min',
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
    readTime: '14 min',
    tags: ['React', 'Node.js', 'RAG', 'Groq', 'OpenAI', 'Supabase', 'AI'],
    relatedProject: 'Internal GPT',
  },
  {
    slug: 'gigshield-parametric-insurance',
    title: 'GigShield: Parametric Income Insurance for Gig Workers',
    excerpt:
      'Building an AI-powered platform that automatically triggers payouts for gig workers when disruptions like heavy rain or hazardous air quality cut into their earning hours.',
    content: `GigShield is an AI-powered parametric income protection platform that I built for gig delivery workers, who are among the most vulnerable participants in the modern economy. When verified disruptions like heavy rain, hazardous air quality, or platform outages cut into their earning hours, GigShield triggers automatic, instant payouts. No forms, no claims processing, no waiting on hold with an insurance agent. The entire process is automated from detection to disbursement.

The key innovation here is the parametric model. Traditional insurance requires you to file a claim, provide evidence, wait for an adjuster, and eventually receive a payout weeks later. For a gig worker who needs tonight's dinner money to pay for tomorrow's expenses, that timeline is completely unusable. Parametric insurance flips the model: instead of reimbursing actual losses after they occur, it pays out a predetermined amount when a specific triggering event is verified. In GigShield's case, the triggers are objective, verifiable data points: rainfall measured by weather APIs, air quality indices from government sensors, and platform status from uptime monitors.

When I was designing the system, I had to think carefully about what constitutes a valid trigger. A light drizzle should not trigger a payout, but a monsoon downpour that makes delivery impossible should. I worked with historical weather data to calibrate the thresholds, and I built a weighted scoring system that considers both the severity and duration of the disruption. A two-hour window of heavy rain triggers a partial payout, while an entire day of hazardous air quality triggers the maximum benefit.

The immersive 3D landing experience was built with Three.js and React Three Fiber. This was not just for visual appeal, although it does look striking. I wanted visitors to immediately understand the problem GigShield solves. The 3D visualization shows a delivery worker navigating a cityscape that dynamically changes with weather conditions, making the value proposition visceral rather than abstract.

The backend uses Express with Supabase for data storage, and location-based triggers use Leaflet for geofencing. When a gig worker registers, they specify their delivery area. The system continuously monitors weather and air quality data for that geographic zone. If conditions cross the threshold, the payout is automatically initiated through the payment processor.

Building GigShield taught me about the intersection of fintech, insurtech, and social impact. Technology can create safety nets for workers who fall through the cracks of traditional systems. The parametric model is not just more efficient, it is fundamentally more fair because it eliminates the human bias and administrative friction that often prevents legitimate claims from being paid. I believe this approach could be extended to many other domains where vulnerable workers need protection.`,
    date: '2025-04-10',
    category: 'Full Stack',
    readTime: '13 min',
    tags: ['React', 'Three.js', 'R3F', 'Express', 'Supabase', 'AI', 'Leaflet'],
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
    readTime: '13 min',
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
    readTime: '14 min',
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
    readTime: '13 min',
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
    readTime: '15 min',
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
    readTime: '14 min',
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
    readTime: '12 min',
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
    readTime: '11 min',
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
