import { motion } from 'framer-motion';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';
import useCountUp from '../hooks/useCountUp';
import { certifications } from '../data/certifications';
import { yearsBuilding } from '../data/site';

const traits = ['Problem Solver', 'Fast Learner', 'Team Player', 'AI Enthusiast'];

const marginalia = [
  { title: 'Grounded AI', description: 'Answers cite their sources — retrieval first, generation second.' },
  { title: 'Correct by Construction', description: 'Transactions, state machines and RLS enforce the rules, not good intentions.' },
  { title: 'Fast by Default', description: 'Code-split, cached, measured — every millisecond accounted for.' },
];

const About = () => {
  const years = useCountUp(yearsBuilding(), 1600);
  const projects = useCountUp(20, 2000);
  const technologies = useCountUp(20, 2000);
  const credentials = useCountUp(certifications.length, 2400);

  const figures = [
    { hook: years, suffix: '+', label: 'Years Building Software' },
    { hook: projects, suffix: '+', label: 'Projects Shipped' },
    { hook: technologies, suffix: '+', label: 'Technologies In Use' },
    { hook: credentials, suffix: '', label: 'Credentials On File' },
  ];

  return (
    <PressSection id="about">
      <SectionMasthead
        section="Section A"
        name="The Profile"
        headline="About the Author"
        standfirst="Get to know the developer behind the masthead."
      />

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-0">
        {/* ===== The story ===== */}
        <motion.div
          variants={pressReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:pr-12"
        >
          <div className="space-y-6 font-editorial text-[15.5px] leading-relaxed text-ink sm:text-[17px]">
            <p>
              <span className="float-left pr-2 pt-1 font-editorial text-[3.4rem] font-bold leading-[0.65] text-oxblood">
                I
              </span>
              'm a full-stack developer who builds products end to end — from the database
              schema to the last animation frame. Most of my recent work sits where the web
              meets AI: retrieval-augmented assistants, voice interfaces, and tools that turn
              messy documents into answers you can trust.
            </p>
            <p>
              At Berry Stenley I shipped RAG chatbots on pgvector with HNSW search and a
              reranking step that kept answers grounded in their sources. At Xtin Capital I built
              the platform's APIs from scratch — 10,000+ requests a day — and led a team of three
              through sprint delivery. Along the way I've wired up Razorpay and PayPal with
              idempotent webhooks, because payments are where “mostly works” isn't good enough.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-oxblood py-1 pl-6">
              <p className="font-editorial text-xl italic leading-snug text-ink sm:text-2xl">
                “Passionate about building intelligent systems that solve real-world problems.”
              </p>
              <cite className="mt-3 block font-monopress text-[10px] uppercase not-italic tracking-[0.2em] text-ink-mute">
                — The Author
              </cite>
            </blockquote>

            <p>
              I'm in my final year of B.Tech CSE at SRM Institute of Science and Technology
              (9.5 CGPA), and I write up what I learn in the Op-Ed below — case studies of the
              systems I've built, and the mistakes that shaped them.
            </p>
          </div>

          {/* Traits */}
          <div className="mt-8 flex flex-wrap gap-2">
            {traits.map((tag) => (
              <PressTag key={tag}>{tag}</PressTag>
            ))}
          </div>
        </motion.div>

        {/* ===== At a glance (sidebar) ===== */}
        <motion.aside
          variants={pressReveal}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="lg:border-l lg:border-ink lg:pl-10"
        >
          <div className="flex items-baseline justify-between border-b border-ink pb-2.5">
            <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
              At a Glance
            </span>
            <span className="flex items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-oxblood">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-oxblood" />
              Open to Work
            </span>
          </div>

          {/* By the numbers */}
          <div className="mt-6 grid grid-cols-2 border border-ink">
            {figures.map((fig, i) => (
              <div
                key={fig.label}
                ref={fig.hook.ref}
                className={`p-5 ${i % 2 === 0 ? 'border-r border-ink' : ''} ${
                  i < 2 ? 'border-b border-ink' : ''
                }`}
              >
                <div className="font-display text-4xl font-black tracking-[-0.02em] sm:text-5xl">
                  {fig.hook.count}
                  <span className="text-oxblood">{fig.suffix}</span>
                </div>
                <div className="mt-1.5 font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                  {fig.label}
                </div>
              </div>
            ))}
          </div>

          {/* Marginalia */}
          <div className="mt-8">
            <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
              Marginalia
            </span>
            <div className="mt-3 divide-y divide-ink/15 border-y border-ink/30">
              {marginalia.map((item, i) => (
                <div key={item.title} className="flex items-baseline gap-4 py-3.5">
                  <span className="font-monopress text-[10px] text-oxblood">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-[0.04em]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 font-editorial text-[13px] italic text-ink-mute">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </PressSection>
  );
};

export default About;
