import { motion } from 'framer-motion';
import { ArcadeSection, SectionHeader, XPBar, arcadeReveal } from './ui/arcade';

const skillCategories = [
  {
    ref: 'STR',
    title: 'Programming Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 88 },
    ],
  },
  {
    ref: 'DEX',
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
    ref: 'CON',
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
    ref: 'INT',
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
    ref: 'WIS',
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
    ref: 'LCK',
    title: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', level: 90 },
      { name: 'Operating Systems', level: 85 },
      { name: 'Computer Networks', level: 85 },
      { name: 'Object Oriented Programming', level: 92 },
    ],
  },
];

const Skills = () => {
  return (
    <ArcadeSection id="skills" deep>
      <SectionHeader world="World 1-3" status="Status: Level Up" headline="Stat Screen" standfirst="Tools and platforms trained in the field, filed by attribute, measured in chunky XP." />

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={arcadeReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="border-t-4 border-ink/50 pt-4"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-display text-[10px] text-gold">{category.ref}</span>
              <h3 className="font-display text-xs text-ink">{category.title}</h3>
            </div>

            <div className="space-y-3.5">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-base text-ink">{skill.name}</span>
                    <span className="font-mono text-sm text-ink-mute">{skill.level}%</span>
                  </div>
                  <div className="mt-1.5">
                    <XPBar level={skill.level} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </ArcadeSection>
  );
};

export default Skills;
