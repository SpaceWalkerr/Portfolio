import { motion } from 'framer-motion';
import { MissionSection, SectionHeader, Tag, missionReveal } from './ui/mission';

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
    <MissionSection id="education" deep>
      <SectionHeader log="Mission Log 05" status="Status: Verified" headline="Training Record" standfirst="The academic ground this mission was launched from." />

      <div className="space-y-8">
        {records.map((r, i) => (
          <motion.div
            key={r.degree}
            variants={missionReveal}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 border border-ink/20 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
          >
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                {r.period} &middot; <span className="text-amber">{r.status}</span>
              </div>
              <h3 className="font-display text-base leading-snug text-ink sm:text-lg">{r.degree}</h3>
              <p className="mt-1 font-mono text-xs text-ink-mute">{r.institution}</p>

              {r.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 font-mono text-[13px] leading-relaxed text-ink-mute">
                      <span className="text-amber">▸</span>
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
              <div className="border border-amber px-5 py-3 text-center">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute">Score</div>
                <div className="mt-1 font-display text-lg text-amber sm:text-xl">{r.score}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </MissionSection>
  );
};

export default Education;
