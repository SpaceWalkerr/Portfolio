import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';
import { skillCategories } from '../data/skills';
import { usageFor } from '../lib/skillIndex';

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

/** "Filed under React" — every project, role and article that used the chosen skill. */
const SkillDossier = ({ skill, onClose }: { skill: string; onClose: () => void }) => {
  const usage = usageFor(skill);
  const group = (label: string, items: { key: string; title: string; to?: string; href?: string; meta?: string }[]) =>
    items.length > 0 && (
      <div>
        <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
          {label} · {items.length}
        </span>
        <ul className="mt-2 divide-y divide-ink/15 border-t border-ink/30">
          {items.map((item) => (
            <li key={item.key}>
              {item.to ? (
                <Link
                  to={item.to}
                  className="group flex items-baseline justify-between gap-3 py-2.5 font-editorial text-[15px] text-ink hover:text-oxblood"
                >
                  <span>{item.title}</span>
                  <span className="shrink-0 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-faint group-hover:text-oxblood">
                    {item.meta ?? 'Read'} →
                  </span>
                </Link>
              ) : (
                <div className="flex items-baseline justify-between gap-3 py-2.5 font-editorial text-[15px] text-ink">
                  <span>{item.title}</span>
                  {item.meta && (
                    <span className="shrink-0 font-monopress text-[9px] uppercase tracking-[0.12em] text-ink-faint">
                      {item.meta}
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12 border-2 border-ink bg-paper p-5 sm:p-7"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4 border-b-4 border-double border-ink pb-3">
        <div>
          <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-oxblood">Filed under</span>
          <h3 className="mt-1 font-display text-2xl font-black uppercase tracking-[-0.01em] sm:text-3xl">{skill}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
        >
          <X size={16} />
        </button>
      </div>
      <div className="mt-5 grid gap-8 lg:grid-cols-3">
        {group(
          'Projects',
          usage.projects.map((p) => ({ key: p.slug, title: p.name, to: `/projects/${p.slug}`, meta: p.category }))
        )}
        {group(
          'In the field',
          usage.roles.map((r) => ({ key: r.company, title: `${r.role} — ${r.company}`, meta: r.period || 'Freelance' }))
        )}
        {group(
          'Articles',
          usage.posts.map((p) => ({ key: p.slug, title: p.title, to: `/blog/${p.slug}`, meta: p.readTime }))
        )}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const dossierRef = useRef<HTMLDivElement>(null);

  const choose = (skill: string) => {
    setSelected((cur) => (cur === skill ? null : skill));
    // Bring the dossier into view once it has rendered
    requestAnimationFrame(() => dossierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  };

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
                .map((skill) => {
                  const uses = usageFor(skill.name).total;
                  return (
                  <li key={skill.name} className="flex items-baseline gap-2">
                    {uses > 0 ? (
                      <button
                        type="button"
                        onClick={() => choose(skill.name)}
                        aria-pressed={selected === skill.name}
                        title={`See where ${skill.name} was used`}
                        className={`group/skill flex items-baseline gap-1.5 text-left font-editorial text-[14.5px] underline decoration-dotted decoration-ink/30 underline-offset-4 transition-colors hover:text-oxblood hover:decoration-oxblood ${
                          selected === skill.name ? 'text-oxblood decoration-oxblood' : 'text-ink'
                        }`}
                      >
                        {skill.name}
                        <sup className="font-monopress text-[8.5px] not-italic text-ink-faint group-hover/skill:text-oxblood">{uses}</sup>
                      </button>
                    ) : (
                      <span className="font-editorial text-[14.5px] text-ink">{skill.name}</span>
                    )}
                    {/* dot leader, like a classified listing */}
                    <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-ink/35" />
                    <span className="flex items-center gap-2">
                      <span className="font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-mute">
                        {tierFor(skill.level).label}
                      </span>
                      <TierMarks level={skill.level} />
                    </span>
                  </li>
                  );
                })}
            </ul>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 font-editorial text-[13.5px] italic text-ink-mute">
        <ArrowUpRight size={13} className="mr-1 inline" />
        Underlined skills are cross-referenced — pick one to see every project, role and article that used it.
      </p>

      <div ref={dossierRef} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {selected && <SkillDossier key={selected} skill={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </div>
    </PressSection>
  );
};

export default Skills;
