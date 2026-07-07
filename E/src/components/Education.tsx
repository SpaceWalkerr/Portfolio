import { motion } from 'framer-motion';
import { CaseSection, SectionHeader, Tag, caseReveal } from './ui/casefile';

const records = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology, Chennai',
    period: '2023 — 2027',
    status: 'On File — Active',
    score: '9.50 / 10.0 CGPA',
    highlights: ['CSI member', 'GeeksforGeeks Campus Ambassador ("Campus Mantri")', 'Multiple hackathons'],
    coursework: ['DSA', 'Operating Systems', 'Computer Networks', 'OOP', 'DBMS', 'Machine Learning'],
  },
  {
    degree: 'Senior Secondary (Class XII) — CBSE, PCM + Computer Science',
    institution: 'Adarsh Jain Dharmic Shiksha Sadan, Najafgarh, New Delhi',
    period: '2021 — 2022',
    status: 'On File — Closed',
    score: '87.2%',
    highlights: [],
    coursework: [],
  },
  {
    degree: 'Secondary (Class X) — CBSE',
    institution: 'Bal Mandir Sr. Sec. School, New Delhi',
    period: '2019 — 2020',
    status: 'On File — Closed',
    score: '93.6%',
    highlights: [],
    coursework: [],
  },
];

const Education = () => {
  return (
    <CaseSection id="education" deep>
      <SectionHeader file="File 05 of 08" status="Status: Verified Records" headline="Background Check" standfirst="The academic record this file was compiled against." />

      <div className="space-y-8">
        {records.map((r, i) => (
          <motion.div
            key={r.degree}
            variants={caseReveal}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 border-2 border-ink/30 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
          >
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                {r.period} &middot; <span className="text-blood">{r.status}</span>
              </div>
              <h3 className="font-display text-lg uppercase leading-snug tracking-tight text-ink sm:text-xl">{r.degree}</h3>
              <p className="mt-1 font-mono text-xs text-ink-mute">{r.institution}</p>

              {r.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 font-mono text-[13px] leading-relaxed text-ink-mute">
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
              <div className="border-2 border-blood px-5 py-3 text-center">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute">Score</div>
                <div className="mt-1 font-display text-lg text-blood sm:text-xl">{r.score}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </CaseSection>
  );
};

export default Education;
