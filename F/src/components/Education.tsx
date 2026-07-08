import { motion } from 'framer-motion';
import { FieldSection, SectionHeader, Tag, fieldReveal } from './ui/fieldguide';

const records = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology, Chennai',
    period: '2023 — 2027',
    status: 'In Progress',
    score: '9.50 / 10.0 CGPA',
    highlights: ['CSI member', 'GeeksforGeeks Campus Ambassador ("Campus Mantri")', 'Multiple hackathons'],
    coursework: ['DSA', 'Operating Systems', 'Computer Networks', 'OOP', 'DBMS', 'Machine Learning'],
  },
  {
    degree: 'Senior Secondary (Class XII) — CBSE, PCM + Computer Science',
    institution: 'Adarsh Jain Dharmic Shiksha Sadan, Najafgarh, New Delhi',
    period: '2021 — 2022',
    status: 'Completed',
    score: '87.2%',
    highlights: [],
    coursework: [],
  },
  {
    degree: 'Secondary (Class X) — CBSE',
    institution: 'Bal Mandir Sr. Sec. School, New Delhi',
    period: '2019 — 2020',
    status: 'Completed',
    score: '93.6%',
    highlights: [],
    coursework: [],
  },
];

const Education = () => {
  return (
    <FieldSection id="education" deep>
      <SectionHeader plate="Plate No. 5" collected="Training Record" headline="Credentials &amp; Training" standfirst="The academic ground this field guide was compiled on." />

      <div className="space-y-8">
        {records.map((r, i) => (
          <motion.div
            key={r.degree}
            variants={fieldReveal}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 border border-ink/40 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
          >
            <div>
              <div className="mb-2 font-serif text-[12px] italic text-ink-mute">
                {r.period} &middot; <span className="text-forest">{r.status}</span>
              </div>
              <h3 className="font-display text-lg italic leading-snug text-ink sm:text-xl">{r.degree}</h3>
              <p className="mt-1 font-serif text-[13px] text-ink-mute">{r.institution}</p>

              {r.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 font-serif text-[14px] leading-relaxed text-ink-mute">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-mute" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {r.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.coursework.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start justify-start sm:items-center sm:justify-end">
              <div className="border border-forest px-5 py-3 text-center">
                <div className="font-serif text-[10px] uppercase tracking-[0.08em] text-ink-mute">Score</div>
                <div className="mt-1 font-display text-lg italic text-forest sm:text-xl">{r.score}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </FieldSection>
  );
};

export default Education;
