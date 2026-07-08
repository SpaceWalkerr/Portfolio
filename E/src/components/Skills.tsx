import { motion } from 'framer-motion';
import { CaseSection, SectionHeader, caseReveal } from './ui/casefile';

const skillCategories = [
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

/** An evidence-strength meter — a typewriter-ticked bar, not a glowing gradient. */
const EvidenceBar = ({ level }: { level: number }) => (
  <div className="relative mt-2 h-[7px] w-full bg-ink/10">
    <div className="absolute inset-0 flex justify-between px-px">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="h-full w-px bg-paper-deep" />
      ))}
    </div>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
      className="relative h-full bg-blood"
    />
  </div>
);

const Skills = () => {
  return (
    <CaseSection id="skills" deep>
      <SectionHeader file="File 03 of 08" status="Status: Verified" headline="Modus Operandi" standfirst="Tools and methods observed in the field, filed by category, rated by strength of evidence." />

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={caseReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="border-t-2 border-ink/60 pt-4"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-display text-sm text-blood">{category.ref}.</span>
              <h3 className="font-display text-base uppercase tracking-tight text-ink">{category.title}</h3>
            </div>

            <div className="space-y-3.5">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[13px] text-ink">{skill.name}</span>
                    <span className="font-mono text-[10px] text-ink-mute">{skill.level}%</span>
                  </div>
                  <EvidenceBar level={skill.level} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </CaseSection>
  );
};

export default Skills;
