import { projects, type Project } from '../data/projects';
import { posts, type Post } from '../data/posts';
import { experiences, type ExperienceData } from '../data/experience';

/**
 * Maps each skill on the Skills ledger to the tags used across projects,
 * articles and roles, so a reader can click "Supabase" and see where it was used.
 * Keys are skill names from src/data/skills.ts; values are the tags that count.
 */
const aliases: Record<string, string[]> = {
  Java: [],
  TypeScript: ['TypeScript'],
  Python: ['Python'],
  JavaScript: ['JavaScript'],
  'React.js': ['React', 'React 19'],
  'Next.js': ['Next.js', 'NextAuth'],
  'Tailwind CSS': ['Tailwind CSS', 'Tailwind'],
  'Framer Motion': ['Framer Motion'],
  'Three.js / R3F': ['Three.js', 'R3F', 'React Three Fiber'],
  'HTML5 & CSS3': ['HTML5', 'CSS', 'CSS3'],
  'Node.js': ['Node.js'],
  'Express.js': ['Express', 'Express 5'],
  'REST API Development': ['REST API', 'REST APIs'],
  'Prisma ORM': ['Prisma'],
  'JWT & Auth': ['JWT', 'Authentication', 'NextAuth', 'RBAC'],
  'Stripe / Razorpay': ['Stripe', 'Razorpay', 'PayPal', 'Payment Gateways'],
  PostgreSQL: ['PostgreSQL'],
  Supabase: ['Supabase', 'Row Level Security', 'RLS'],
  Vercel: ['Vercel'],
  Render: ['Render'],
  GoDaddy: ['GoDaddy'],
  'RAG Pipelines': ['RAG'],
  'Groq / OpenAI': ['Groq', 'OpenAI'],
  'Claude API': ['Claude API', 'Claude AI'],
  'pgvector / Embeddings': ['Vector Databases', 'RAG'],
  'Data Structures & Algorithms': ['Algorithms', 'DAG Scheduling'],
};

export interface SkillUsage {
  projects: Project[];
  roles: ExperienceData[];
  posts: Post[];
  total: number;
}

const cache = new Map<string, SkillUsage>();

export const usageFor = (skill: string): SkillUsage => {
  const hit = cache.get(skill);
  if (hit) return hit;
  const tags = new Set((aliases[skill] ?? []).map((t) => t.toLowerCase()));
  const uses = (list: string[]) => list.some((t) => tags.has(t.toLowerCase()));
  const usage = {
    projects: projects.filter((p) => uses(p.tags)),
    roles: experiences.filter((e) => uses(e.technologies)),
    posts: posts.filter((p) => uses(p.tags)),
    total: 0,
  };
  usage.total = usage.projects.length + usage.roles.length + usage.posts.length;
  cache.set(skill, usage);
  return usage;
};
