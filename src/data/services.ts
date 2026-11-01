/** Fixed-scope services sold through Fiverr — rendered by the Services ("Hire Me") section. */
export interface Service {
  slug: string;
  title: string;
  blurb: string;
  /** Basic / Standard / Premium prices in USD, as listed on Fiverr */
  tiers: [number, number, number];
}

export const services: Service[] = [
  {
    slug: 'full-stack-web-app',
    title: 'Full-Stack Web App',
    blurb: 'React, Node and PostgreSQL built end to end: sign-in, API, database and a responsive front end, deployed and handed over.',
    tiers: [80, 250, 600],
  },
  {
    slug: 'ai-rag-chatbot',
    title: 'AI Chatbot on Your Documents',
    blurb: 'A RAG chatbot that answers only from your files and cites its sources: ingestion, vector search and a clean chat interface.',
    tiers: [60, 180, 400],
  },
  {
    slug: 'custom-e-commerce',
    title: 'Custom E-Commerce Store',
    blurb: 'Catalogue, variants, cart, payments and an admin panel, built the way I built OrderKaaro, Shoeniverse and S2VESTIS.',
    tiers: [120, 300, 650],
  },
  {
    slug: 'bug-fixes',
    title: 'Bug Fixes & Small Features',
    blurb: 'Stuck on a bug or a half-finished feature? I find the cause, fix it properly and tell you what went wrong.',
    tiers: [15, 40, 90],
  },
];

export const tierNames = ['Basic', 'Standard', 'Premium'] as const;
