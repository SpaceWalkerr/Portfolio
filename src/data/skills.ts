/** Skill ledger — levels only decide the Fluent / Proficient / Familiar tier shown on the page. */
export const skillCategories = [
  {
    ref: 'I',
    title: 'Programming Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 88 },
    ],
  },
  {
    ref: 'II',
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Three.js / R3F', level: 78 },
      { name: 'HTML5 & CSS3', level: 95 },
    ],
  },
  {
    ref: 'III',
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'REST API Development', level: 90 },
      { name: 'Prisma ORM', level: 82 },
      { name: 'JWT & Auth', level: 85 },
      { name: 'Stripe / Razorpay', level: 80 },
    ],
  },
  {
    ref: 'IV',
    title: 'Databases & Deployment',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'Supabase', level: 88 },
      { name: 'Vercel', level: 90 },
      { name: 'Render', level: 85 },
      { name: 'Railway', level: 82 },
      { name: 'GoDaddy', level: 80 },
    ],
  },
  {
    ref: 'V',
    title: 'AI / Machine Learning',
    skills: [
      { name: 'RAG Pipelines', level: 82 },
      { name: 'Groq / OpenAI', level: 85 },
      { name: 'Claude API', level: 83 },
      { name: 'Prompt Engineering', level: 86 },
      { name: 'pgvector / Embeddings', level: 78 },
    ],
  },
  {
    ref: 'VI',
    title: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', level: 90 },
      { name: 'Operating Systems', level: 85 },
      { name: 'Computer Networks', level: 85 },
      { name: 'Object Oriented Programming', level: 92 },
    ],
  },
];

