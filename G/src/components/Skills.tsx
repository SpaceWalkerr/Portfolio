import { motion } from 'framer-motion';
import { MissionSection, SectionHeader, missionReveal } from './ui/mission';

const skillCategories = [
  {
    ref: 'SYS-01',
    title: 'Programming Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 88 },
    ],
  },
  {
    ref: 'SYS-02',
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
    ref: 'SYS-03',
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
    ref: 'SYS-04',
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
    ref: 'SYS-05',
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
    ref: 'SYS-06',
    title: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', level: 90 },
      { name: 'Operating Systems', level: 85 },
      { name: 'Computer Networks', level: 85 },
      { name: 'Object Oriented Programming', level: 92 },
    ],
  },
];

/** A telemetry diagnostic bar — the same visual language as the hero counters. */
const DiagBar = ({ level }: { level: number }) => (
  <div className="relative mt-2 h-[6px] w-full bg-white/5">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full bg-amber shadow-[0_0_8px_rgba(255,176,32,0.6)]"
    />
  </div>
);

const Skills = () => {
  return (
    <MissionSection id="skills" deep>
      <SectionHeader log="Mission Log 03" status="Status: All Systems Go" headline="Onboard Systems" standfirst="Tools and platforms verified pre-flight, filed by subsystem, rated by diagnostic strength." />

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={missionReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="border-t border-ink/20 pt-4"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <span className="font-mono text-xs text-amber">{category.ref}</span>
              <h3 className="font-display text-sm text-ink">{category.title}</h3>
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
    </MissionSection>
  );
};

export default Skills;
