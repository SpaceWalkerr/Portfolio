import { motion } from 'framer-motion';
import { BlueprintSection, SheetHeader, DraftTag, draftReveal } from './ui/blueprint';

const records = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology, Chennai',
    period: '2023 — 2027',
    status: 'Currently Pursuing',
    score: '9.50 / 10.0 CGPA',
    highlights: [
      'CSI member',
      'GeeksforGeeks Campus Ambassador ("Campus Mantri")',
      'Multiple hackathons',
    ],
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
    <BlueprintSection id="education" deep>
      <SheetHeader
        sheetNo={5}
        sheetTotal={8}
        fig="FIG. 4"
        sectionRef="Sec. D — Credentials Record"
        headline="Prior Art &amp; Education"
        standfirst="The academic record this filing builds on."
      />

      <div className="space-y-8">
        {records.map((r, i) => (
          <motion.div
            key={r.degree}
            variants={draftReveal}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 border border-ink/30 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
          >
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-pale">
                {r.period} &middot; {r.status}
              </div>
              <h3 className="font-sans text-lg font-bold uppercase leading-snug tracking-tight text-ink sm:text-xl">
                {r.degree}
              </h3>
              <p className="mt-1 font-mono text-xs text-ink-mute">{r.institution}</p>

              {r.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {r.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 font-sans text-[13.5px] leading-relaxed text-ink-mute">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-mute" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {r.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.coursework.map((c) => (
                    <DraftTag key={c}>{c}</DraftTag>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start justify-start sm:items-center sm:justify-end">
              <div className="border-2 border-brass px-5 py-3 text-center">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-pale">Score</div>
                <div className="mt-1 font-mono text-lg font-bold text-brass sm:text-xl">{r.score}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </BlueprintSection>
  );
};

export default Education;
