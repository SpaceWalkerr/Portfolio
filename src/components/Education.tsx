import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';

const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology',
    location: 'Chennai, India',
    period: '2023 — 2027',
    status: 'Currently Pursuing',
    cgpa: '9.50 / 10.0 CGPA',
    highlights: [
      'Active member of Computer Society of India (CSI)',
      'GeeksforGeeks Campus Ambassador (Campus Mantri)',
      'Multiple hackathon and competition participations',
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Object Oriented Programming',
      'Database Management Systems',
      'Machine Learning',
    ],
  },
  {
    degree: 'Senior Secondary (Class XII), CBSE — PCM with Computer Science',
    institution: 'Adarsh Jain Dharmic Shiksha Sadan, Najafgarh',
    location: 'New Delhi, India',
    period: '2021 — 2022',
    status: 'Completed',
    cgpa: '87.2%',
    highlights: [
      'Focused on Physics, Chemistry & Mathematics',
      'Active in science and technology events',
    ],
    coursework: undefined,
  },
  {
    degree: 'Secondary (Class X), CBSE',
    institution: 'Bal Mandir Sr. Sec. School',
    location: 'New Delhi, India',
    period: '2019 — 2020',
    status: 'Completed',
    cgpa: '93.6%',
    highlights: [
      'Scored 93.6% in CBSE board examinations',
      'Built an early foundation in mathematics and science',
    ],
    coursework: undefined,
  },
];

const Education = () => {
  return (
    <PressSection id="education" className="bg-paper-bright">
      <SectionMasthead
        section="Section D"
        name="The Ledger"
        headline="Education"
        standfirst="The academic record — degrees, marks, and coursework, filed in order of most recent."
      />

      <div className="space-y-8 sm:space-y-10">
        {education.map((edu, index) => (
          <motion.article
            key={edu.degree}
            variants={pressReveal}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="border border-ink"
          >
            {/* Ledger header row */}
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink bg-ink px-5 py-2.5 text-paper sm:px-7">
              <span className="font-monopress text-[10px] uppercase tracking-[0.18em]">
                {edu.period}
              </span>
              <span className="font-monopress text-[10px] uppercase tracking-[0.18em] text-paper/70">
                {edu.status === 'Currently Pursuing' ? '● In Progress' : '✓ Completed'}
              </span>
            </div>

            <div className="p-5 sm:p-7">
              <h3 className="font-display text-xl font-black uppercase leading-[1.05] tracking-[-0.01em] sm:text-2xl">
                {edu.degree}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-editorial text-[15px] italic text-ink-mute">
                <span className="text-oxblood not-italic font-monopress text-[11px] uppercase tracking-[0.1em]">
                  {edu.institution}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {edu.location}
                </span>
                {edu.cgpa && <span>{edu.cgpa}</span>}
              </div>

              <div className={`mt-5 grid gap-6 ${edu.coursework ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
                <div>
                  <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    Highlights
                  </span>
                  <ul className="mt-2.5 space-y-2">
                    {edu.highlights.map((point) => (
                      <li key={point} className="flex gap-2.5 font-editorial text-[13.5px] leading-snug text-ink">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 bg-oxblood" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {edu.coursework && (
                  <div>
                    <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                      Key Coursework
                    </span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <PressTag key={course}>{course}</PressTag>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </PressSection>
  );
};

export default Education;
