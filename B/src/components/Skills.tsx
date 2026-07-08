import { motion } from 'framer-motion';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';

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

const Skills = () => {
  return (
    <PressSection id="skills" className="bg-paper-bright">
      <SectionMasthead
        section="Section B"
        name="Classified"
        headline="Skills &amp; Technologies"
        standfirst="A tabulated listing of tools, languages, and disciplines — filed by category, rated by proficiency."
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={pressReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="border-t-2 border-ink pt-4"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-editorial text-lg italic text-oxblood">{category.ref}.</span>
              <h3 className="font-display text-base font-bold uppercase tracking-[-0.01em]">
                {category.title}
              </h3>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-editorial text-[14.5px] text-ink">{skill.name}</span>
                    <span className="font-monopress text-[10px] text-ink-mute">{skill.level}%</span>
                  </div>
                  {/* Ledger fill bar — an embossed ink block, not a flat glowing gradient */}
                  <div
                    className="mt-2 h-[6px] w-full bg-ink/10"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(23,23,26,0.14)' }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-ink"
                      style={{
                        boxShadow:
                          '0 2px 2px rgba(23,23,26,0.35), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.25)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </PressSection>
  );
};

export default Skills;
