import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { BlueprintSection, SheetHeader, DraftButton, draftReveal } from './ui/blueprint';
import { withBase } from '../lib/utils';

interface Cert {
  title: string;
  platform: string;
  year: string;
  category: string;
  url?: string;
  featured?: boolean;
  score?: string;
}

const certifications: Cert[] = [
  // Priority exhibits
  { title: 'Human Computer Interaction', platform: 'NPTEL / IIT Delhi', year: 'Jan–Apr 2025', category: 'Certifications', url: '/certificates/human-computer-interaction-iit.pdf', featured: true, score: '90/100 — Gold Medal' },
  { title: 'Bootcamp on Big Data & Data Science', platform: 'C-DAC, NOIDA & SRM IST', year: 'Jan 2025', category: 'AI/ML', url: '/certificates/bootcamp-big-data-data-science.pdf', featured: true },
  { title: 'Campus Mantri (Campus Ambassador)', platform: 'GeeksforGeeks', year: '2024–2025', category: 'Certifications', url: '/certificates/campus-mantri-ambassador.pdf', featured: true, score: 'Completed 1 Year' },
  { title: 'International Conference on Viksit Bharat 2047', platform: 'Department of Chemistry, SRM IST', year: 'Feb 2025', category: 'Leadership', url: '/certificates/viksit-bharat-2047.pdf', featured: true, score: 'Lead Student Coordinator' },
  { title: 'AI/ML for Geodata Analysis', platform: 'IIRS, ISRO', year: 'Aug 2024', category: 'AI/ML', url: '/certificates/aiml-geodata-analysis.pdf', featured: true },
  { title: 'Brand Revamp (Innovate 2024) — I Position', platform: 'SRM Institute of Science & Technology', year: 'April 2024', category: 'Competitions', url: '/certificates/brand-revamp-innovate-2024.pdf', featured: true, score: 'Winner' },
  { title: 'Generative AI & Prompt Engineering Internship', platform: 'IGDTUW & Sansoftech', year: 'Jun–Jul 2025', category: 'AI/ML', url: '/certificates/generative-ai-prompt-engineering-igdtuw.pdf', featured: true, score: '6-Week Summer Internship' },

  // Programming & Development
  { title: 'Alpha (DSA with Java)', platform: 'Apna College', year: '2024', category: 'Programming', url: '/certificates/alpha-dsa-java.pdf' },
  { title: 'Java (Basic)', platform: 'HackerRank', year: 'Sep 2024', category: 'Programming', url: '/certificates/java-basic-hackerrank.pdf' },
  { title: 'Java Internship', platform: 'Navodita Infotech', year: 'Oct 2024', category: 'Programming', url: '/certificates/java-internship-navodita.pdf' },
  { title: 'Python', platform: 'GUVI', year: 'Oct 2024', category: 'Programming', url: '/certificates/python-guvi.pdf' },
  { title: 'Python (Basic)', platform: 'HackerRank', year: 'Sep 2024', category: 'Programming', url: '/certificates/python-basic-hackerrank.pdf' },
  { title: 'Problem Solving (Basic)', platform: 'HackerRank', year: 'Oct 2024', category: 'Programming', url: '/certificates/problem-solving-basic.pdf' },
  { title: 'Problem Solving (Intermediate)', platform: 'HackerRank', year: 'Oct 2024', category: 'Programming', url: '/certificates/problem-solving-intermediate.pdf' },

  // Web & Full Stack
  { title: 'Full Stack Web Development', platform: 'freeCodeCamp', year: '2023', category: 'Web Development' },
  { title: "MongoDB Developer's Toolkit", platform: 'GeeksforGeeks', year: '2024', category: 'Web Development', url: '/certificates/mongodb-developers-toolkit.pdf' },

  // AI & Machine Learning
  { title: 'ChatGPT for Everyone', platform: 'Learn Prompting', year: 'Feb 2024', category: 'AI/ML' },
  { title: 'AI Builders Lab (Bootcamp)', platform: 'Google for Developers and Hack2skill', year: '2024', category: 'AI/ML', url: '/certificates/ai-builders-lab-bootcamp.pdf' },
  { title: 'SAWIT.AI Learnathon (Generative AI)', platform: 'GUVI / Google for Developers', year: 'Oct 2024', category: 'AI/ML', url: '/certificates/sawit-ai-learnathon.pdf' },

  // Core CS
  { title: 'Core Computer Science Subject for Interview Preparation', platform: 'GeeksforGeeks', year: '2024', category: 'Cloud/DevOps' },
  { title: 'Human Computer Interaction at NPTEL using Adobe Express', platform: 'Adobe / NPTEL', year: '2024', category: 'Certifications', url: '/certificates/human-computer-interaction-nptel-adobe.pdf' },

  // Workshops
  { title: 'Two Days Workshop on ArduBotics', platform: 'SRM Institute of Science & Technology', year: 'February 2024', category: 'Workshops', url: '/certificates/ArduBotics%20Workshop.jpg' },

  // Competitions
  { title: 'Burnout (Innovate 2024) — Participation', platform: 'SRM Institute of Science & Technology', year: 'April 2024', category: 'Competitions', url: '/certificates/BurnOut.jpg' },
  { title: 'Meditech Innovation (Innovate 2024) — III Position', platform: 'SRM IST', year: 'April 2024', category: 'Competitions', url: '/certificates/Meditech.jpg' },
  { title: 'Err Hunt 2.0', platform: 'Computer Society of India (SRMIST)', year: 'August 2024', category: 'Competitions', url: '/certificates/err-hunt-2-0.pdf' },
  { title: 'ERR-Hunt', platform: 'Computer Society of India (SRMIST)', year: 'September 2023', category: 'Competitions', url: '/certificates/err-hunt.pdf' },
  { title: 'Flipkart GRID 6.0 — Software Development Track (Level 1)', platform: 'Flipkart', year: '2024', category: 'Competitions', url: '/certificates/flipkart-grid-6-0.pdf' },
  { title: 'Folonite Winter Internship Contest 2024', platform: 'Folonite', year: '2024', category: 'Competitions', url: '/certificates/folonite-winter-internship-contest.pdf' },
  { title: 'HackFest Delhi/NCR Hackathon', platform: 'GeeksforGeeks', year: '2024', category: 'Competitions', url: '/certificates/hackfest-delhi-ncr.pdf' },
  { title: 'Geeks Challenge 1.0 — NIT Patna', platform: 'GeeksforGeeks', year: 'July 2024', category: 'Competitions', url: '/certificates/geeks-challenge-1-0-nit-patna.pdf' },
  { title: 'Shaastra Programming Contest', platform: 'IIT Madras (Shaastra 2025)', year: '2025', category: 'Competitions', url: '/certificates/shaastra-programming-contest.pdf' },
  { title: 'CodeWizard 25', platform: 'SRM Institute of Science and Technology', year: '2025', category: 'Competitions', url: '/certificates/codewizard-25.pdf' },
  { title: 'TATA Crucible Campus Quiz 2024', platform: 'Tata Group', year: '2024', category: 'Competitions', url: '/certificates/tata-crucible-campus-quiz.pdf' },
  { title: 'TechXNinjas Weekly Contest #11', platform: 'TechXNinjas', year: '2024', category: 'Competitions', url: '/certificates/techxninjas-weekly-contest-11.pdf' },

  // Leadership
  { title: 'Certificate of Appreciation', platform: 'DevTown / MSME', year: 'Aug 2024', category: 'Leadership', url: '/certificates/certificate-appreciation-devtown.pdf' },
  { title: 'Certificate of Appreciation (Volunteering)', platform: 'Gift a Smile Foundation', year: 'March 2025', category: 'Leadership', url: '/certificates/certificate-appreciation-volunteering.pdf' },
  { title: "Global Forum on Gender and Tech in The CSI TechNation'25", platform: 'Computer Society of India (SRMIST)', year: 'February 2025', category: 'Leadership', url: '/certificates/global-forum-gender-tech-csi.pdf' },

  // National Programs
  { title: 'Quiz Programme on National Education Policy 2020', platform: 'SRM Institute of Science and Technology', year: '2024', category: 'National Programs', url: '/certificates/quiz-national-education-policy.pdf' },
  { title: 'National Science Day — 2025', platform: 'Dept. of Science & Technology, Govt. of India', year: 'Feb 2025', category: 'National Programs', url: '/certificates/national-science-day-2025.pdf' },
  { title: 'Wisdom War (National Science Day)', platform: 'SRM IST (Dept. of Chemistry)', year: 'Feb 2024', category: 'National Programs', url: '/certificates/wisdom-war-national-science-day.pdf' },
];

const notableAchievements = [
  { title: 'NPTEL Gold Medal', description: 'Secured 90/100 score in Human Computer Interaction' },
  { title: 'Campus Mantri', description: 'GeeksforGeeks Campus Ambassador — completed 1 year' },
  { title: 'Lead Coordinator', description: 'International Conference on Viksit Bharat 2047' },
  { title: 'Innovate Winner', description: 'Won Brand Revamp Competition at Innovate X SRM 2024' },
  { title: 'AI/ML Specialist', description: 'Specialized training from IIRS-ISRO in Geodata Analysis' },
  { title: 'Big Data Bootcamp', description: 'Bootcamp on Big Data & Data Science — C-DAC, NOIDA' },
];

const categories = ['All', 'Featured', 'Programming', 'Web Development', 'AI/ML', 'Cloud/DevOps', 'Certifications', 'Workshops', 'Competitions', 'Leadership', 'National Programs'];

const featuredCerts = certifications.filter((c) => c.featured);
const otherCerts = certifications.filter((c) => !c.featured);

const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const visibleOther = activeFilter === 'All' || activeFilter === 'Featured' ? otherCerts : otherCerts.filter((c) => c.category === activeFilter);

  const showFeatured = activeFilter === 'All' || activeFilter === 'Featured';
  const showOther = activeFilter !== 'Featured' && visibleOther.length > 0;

  return (
    <BlueprintSection id="certifications" deep>
      <SheetHeader
        sheetNo={7}
        sheetTotal={8}
        fig="FIG. 6"
        sectionRef="Sec. F — Exhibits of Record"
        headline="Schedule of Exhibits"
        standfirst="Validated skills and milestones, indexed by category — sixty-plus exhibits in continuous filing since 2023."
      />

      <div className="mb-10 flex flex-wrap gap-2 border-y border-ink/30 py-4">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveFilter(category)}
            className={`px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] transition-colors ${
              activeFilter === category ? 'bg-brass text-blueprint-deep' : 'border border-ink/30 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {showFeatured && (
        <motion.div variants={draftReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="mb-14">
          <h3 className="mb-1 font-sans text-2xl font-bold uppercase tracking-tight text-ink">Priority Exhibits</h3>
          <p className="mb-6 font-mono text-xs text-ink-mute">The highest-impact entries in the record.</p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {notableAchievements.map((item, i) => (
              <div key={item.title} className="flex gap-4 border-t-2 border-ink/60 pt-3">
                <span className="font-mono text-lg text-brass">{`0${i + 1}`}</span>
                <div>
                  <h4 className="font-sans text-sm font-bold uppercase tracking-tight text-ink">{item.title}</h4>
                  <p className="mt-1 font-mono text-[12px] leading-snug text-ink-mute">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 divide-y divide-ink/15 border-y border-ink/30">
            {featuredCerts.map((cert) => (
              <a
                key={cert.title}
                href={withBase(cert.url!)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <span className="font-sans text-[15px] text-ink group-hover:text-brass sm:text-base">{cert.title}</span>
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute">{cert.platform}</span>
                  {cert.score && <span className="ml-2 font-mono text-[9.5px] uppercase tracking-[0.08em] text-brass">{cert.score}</span>}
                </div>
                <span className="flex flex-shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute group-hover:text-ink">
                  {cert.year}
                  <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {showOther && (
        <motion.div variants={draftReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
          <h3 className="mb-6 font-sans text-2xl font-bold uppercase tracking-tight text-ink">
            {activeFilter === 'All' ? 'All Other Entries' : activeFilter}
          </h3>

          <div className="divide-y divide-ink/15 border-y border-ink/30">
            {(showAll ? visibleOther : visibleOther.slice(0, 12)).map((cert) =>
              cert.url ? (
                <a
                  key={cert.title}
                  href={withBase(cert.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-3 py-3 sm:grid-cols-[2.4fr_1fr_auto]"
                >
                  <span className="truncate font-sans text-[14.5px] text-ink group-hover:text-brass">{cert.title}</span>
                  <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute sm:block">{cert.platform}</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute group-hover:text-ink">
                    {cert.year}
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              ) : (
                <div key={cert.title} className="grid grid-cols-[1fr_auto] items-baseline gap-3 py-3 sm:grid-cols-[2.4fr_1fr_auto]">
                  <span className="truncate font-sans text-[14.5px] text-ink-mute">{cert.title}</span>
                  <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute/60 sm:block">{cert.platform}</span>
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute/60">{cert.year}</span>
                </div>
              )
            )}
          </div>

          {visibleOther.length > 12 && (
            <div className="mt-8 flex justify-center">
              <DraftButton variant="outline" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : `View All (${visibleOther.length})`}
              </DraftButton>
            </div>
          )}
        </motion.div>
      )}
    </BlueprintSection>
  );
};

export default Certifications;
