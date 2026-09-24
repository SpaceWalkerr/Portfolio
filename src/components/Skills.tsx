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

/**
 * Percentages invite the wrong question ("why only 88%?"). Group by how the
 * tool is actually used instead — the levels above only decide the tier.
 */
const tiers = [
  { key: 'fluent', label: 'Fluent', note: 'Daily driver — shipped to production', min: 88 },
  { key: 'proficient', label: 'Proficient', note: 'Built real features with it', min: 82 },
  { key: 'familiar', label: 'Familiar', note: 'Working knowledge, growing', min: 0 },
] as const;

const tierFor = (level: number) => tiers.find((t) => level >= t.min) ?? tiers[tiers.length - 1];

/** Filled marks for the tier — a printer's rating, not a progress bar. */
const TierMarks = ({ level }: { level: number }) => {
  const filled = 3 - tiers.indexOf(tierFor(level));
  return (
    <span aria-hidden="true" className="flex gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className={`h-[7px] w-[7px] ${i < filled ? 'bg-ink' : 'border border-ink/35'}`} />
      ))}
    </span>
  );
};

const Skills = () => {
  return (
    <PressSection id="skills" className="bg-paper-bright">
      <SectionMasthead
        section="Section B"
        name="Classified"
        headline="Skills &amp; Technologies"
        standfirst="A tabulated listing of tools, languages, and disciplines — filed by category, graded by how they're used."
      />

      {/* Key to the ratings */}
      <dl className="mb-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-ink py-4">
        {tiers.map((t) => (
          <div key={t.key} className="flex items-center gap-3">
            <TierMarks level={t.min} />
            <dt className="font-monopress text-[10px] uppercase tracking-[0.16em] text-ink">{t.label}</dt>
            <dd className="font-editorial text-[13px] italic text-ink-mute">{t.note}</dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={pressReveal}
            custom={index % 3}
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

            <ul className="space-y-2.5">
              {[...category.skills]
                .sort((a, b) => b.level - a.level)
                .map((skill) => (
                  <li key={skill.name} className="flex items-baseline gap-2">
                    <span className="font-editorial text-[14.5px] text-ink">{skill.name}</span>
                    {/* dot leader, like a classified listing */}
                    <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-ink/35" />
                    <span className="flex items-center gap-2">
                      <span className="font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-mute">
                        {tierFor(skill.level).label}
                      </span>
                      <TierMarks level={skill.level} />
                    </span>
                  </li>
                ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </PressSection>
  );
};

export default Skills;
