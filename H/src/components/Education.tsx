import { motion } from 'framer-motion';
import { ArcadeSection, SectionHeader, Tag, arcadeReveal } from './ui/arcade';

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
    <ArcadeSection id="education" deep>
      <SectionHeader world="World 1-5" status="Status: Unlocked" headline="Training Grounds" standfirst="The academic ground this cabinet was built on." />

      <div className="space-y-8">
        {records.map((r, i) => (
          <motion.div
            key={r.degree}
            variants={arcadeReveal}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 border-2 border-ink/50 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
          >
            <div>
              <div className="mb-2 font-mono text-sm uppercase text-ink-mute">
                {r.period} &middot; <span className="text-gold">{r.status}</span>
              </div>
              <h3 className="font-display text-xs uppercase leading-relaxed text-ink sm:text-sm">{r.degree}</h3>
              <p className="mt-2 font-mono text-base text-ink-mute">{r.institution}</p>

              {r.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 font-mono text-base leading-relaxed text-ink-mute">
                      <span className="text-gold">&#9654;</span>
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
              <div className="border-2 border-gold px-5 py-3 text-center">
                <div className="font-mono text-sm uppercase text-ink-mute">Score</div>
                <div className="mt-1 font-display text-sm text-gold sm:text-base">{r.score}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ArcadeSection>
  );
};

export default Education;
