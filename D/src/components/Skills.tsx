import { motion } from 'framer-motion';
import { TerminalSection, SectionHeader, neonReveal } from './ui/terminal';

const skillCategories = [
  {
    ref: 'lang',
    title: 'Programming Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 88 },
    ],
  },
  {
    ref: 'frontend',
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
    ref: 'backend',
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
    ref: 'infra',
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
    ref: 'ai',
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
    ref: 'core',
    title: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', level: 90 },
      { name: 'Operating Systems', level: 85 },
      { name: 'Computer Networks', level: 85 },
      { name: 'Object Oriented Programming', level: 92 },
    ],
  },
];

/** A glowing diagnostic bar — `[████████--] 90%` rendered as smooth motion, not text blocks. */
const DiagBar = ({ level }: { level: number }) => (
  <div className="relative mt-2 h-[6px] w-full bg-white/5">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full bg-neon-cyan-bright shadow-[0_0_10px_rgba(123,240,255,0.7)]"
    />
  </div>
);

const Skills = () => {
  return (
    <TerminalSection id="skills" deep>
      <SectionHeader
        command="npm ls --depth=0"
        headline="dependency_tree"
        standfirst="A tabulated read-out of tools, languages, and disciplines — filed by category, dimensioned by proficiency."
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={neonReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="border-t border-neon-cyan/25 pt-4"
          >
            <div className="mb-4 flex items-baseline gap-2">
              <span className="font-mono text-xs text-neon-pink">./{category.ref}</span>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">{category.title}</h3>
            </div>

            <div className="space-y-3.5">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[13px] text-ink">{skill.name}</span>
                    <span className="font-mono text-[10px] text-ink-mute">{skill.level}%</span>
                  </div>
                  <DiagBar level={skill.level} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </TerminalSection>
  );
};

export default Skills;
