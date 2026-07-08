import { motion } from 'framer-motion';
import { HardDrive } from 'lucide-react';
import { TerminalSection, SectionHeader, NeonTag, neonReveal } from './ui/terminal';

const partitions = [
  {
    mount: '/srm/btech',
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology, Chennai',
    period: '2023 — 2027',
    status: 'MOUNTED (active)',
    score: '9.50 / 10.0 CGPA',
    highlights: ['CSI member', 'GeeksforGeeks Campus Ambassador ("Campus Mantri")', 'Multiple hackathons'],
    coursework: ['DSA', 'Operating Systems', 'Computer Networks', 'OOP', 'DBMS', 'Machine Learning'],
  },
  {
    mount: '/school/xii',
    degree: 'Senior Secondary (Class XII) — CBSE, PCM + Computer Science',
    institution: 'Adarsh Jain Dharmic Shiksha Sadan, Najafgarh, New Delhi',
    period: '2021 — 2022',
    status: 'ARCHIVED',
    score: '87.2%',
    highlights: [],
    coursework: [],
  },
  {
    mount: '/school/x',
    degree: 'Secondary (Class X) — CBSE',
    institution: 'Bal Mandir Sr. Sec. School, New Delhi',
    period: '2019 — 2020',
    status: 'ARCHIVED',
    score: '93.6%',
    highlights: [],
    coursework: [],
  },
];

const Education = () => {
  return (
    <TerminalSection id="education" deep>
      <SectionHeader
        command="lsblk --credentials"
        headline="boot_partitions"
        standfirst="The academic disk this filing was compiled on."
      />

      <div className="space-y-8">
        {partitions.map((p, i) => (
          <motion.div
            key={p.degree}
            variants={neonReveal}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 border border-neon-cyan/20 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
          >
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neon-cyan-bright">
                <HardDrive size={13} />
                <span>{p.mount}</span>
                <span className="text-ink-mute">&middot; {p.period}</span>
              </div>
              <h3 className="font-display text-base font-bold uppercase leading-snug tracking-wide text-ink sm:text-lg">
                {p.degree}
              </h3>
              <p className="mt-1 font-mono text-xs text-ink-mute">{p.institution}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neon-pink">{p.status}</p>

              {p.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 font-mono text-[13px] leading-relaxed text-ink-mute">
                      <span className="text-neon-cyan-bright">+</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {p.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.coursework.map((c) => (
                    <NeonTag key={c}>{c}</NeonTag>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start justify-start sm:items-center sm:justify-end">
              <div className="border border-neon-pink/50 px-5 py-3 text-center shadow-[0_0_16px_rgba(255,94,168,0.15)]">
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-neon-cyan-bright">score</div>
                <div className="mt-1 font-display text-lg font-bold text-neon-pink sm:text-xl">{p.score}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </TerminalSection>
  );
};

export default Education;
