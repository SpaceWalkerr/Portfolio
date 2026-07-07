import { motion } from 'framer-motion';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';
import useCountUp from '../hooks/useCountUp';

const traits = ['Problem Solver', 'Fast Learner', 'Team Player', 'AI Enthusiast'];

const marginalia = [
  { title: 'Clean Code', description: 'Maintainable & scalable, set in a firm hand.' },
  { title: 'Innovation', description: 'Cutting-edge tech, adopted early and used well.' },
  { title: 'Performance', description: 'Fast & efficient — every millisecond accounted for.' },
];

const About = () => {
  const years = useCountUp(3, 1600);
  const projects = useCountUp(20, 2000);
  const technologies = useCountUp(20, 2000);
  const certifications = useCountUp(60, 2400);

  const figures = [
    { hook: years, suffix: '+', label: 'Years Writing Software' },
    { hook: projects, suffix: '+', label: 'Projects Shipped' },
    { hook: technologies, suffix: '+', label: 'Technologies In Use' },
    { hook: certifications, suffix: '+', label: 'Credentials On File' },
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
              'm a full-stack developer who loves turning complex challenges into elegant,
              user-focused solutions. My work bridges modern web technologies and AI, creating
              applications that are both powerful and intuitive.
            </p>
            <p>
              Problem-solving is at the heart of what I do. Whether it's optimizing performance,
              architecting scalable systems, or implementing cutting-edge features, I approach
              each challenge with curiosity and a commitment to clean, maintainable code.
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
              I believe in continuous learning and staying ahead of the curve. Beyond writing
              code, I contribute to open-source projects and engage with the developer community,
              always seeking to grow and share knowledge along the way.
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
              Available — Remote
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
