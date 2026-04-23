import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import type { CSSProperties } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = '',
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;

        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showAsterisk && isLast ? (
              <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">*</span>
            ) : null}
          </motion.span>
        );
      })}
    </div>
  );
};

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = '',
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((segment) => {
    segment.text.split(' ').forEach((word) => {
      if (word) {
        words.push({ word, className: segment.className });
      }
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word.word}-${i}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${word.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {word.word}
        </motion.span>
      ))}
    </div>
  );
};

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const highlights = ['React • Node • TypeScript', 'AI-Powered Systems', 'Open to Opportunities'];

interface PrismaHeroProps {
  showNav?: boolean;
}

const PrismaHero = ({ showNav = true }: PrismaHeroProps) => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="h-screen min-h-screen w-full">
      <div className="relative h-full w-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />

        {showNav ? (
          <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <div className="flex items-center gap-3 rounded-b-2xl bg-black/90 px-4 py-2 backdrop-blur-md sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="text-[10px] text-[#E1E0CC]/80 transition-colors hover:text-[#E1E0CC] sm:text-xs md:text-sm"
                  onClick={() => scrollToSection(item.href)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 md:px-10 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <motion.p
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#E1E0CC]/70 sm:mb-5 sm:text-sm"
              >
                Full Stack Developer
              </motion.p>

              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[23vw] sm:text-[21vw] md:text-[19vw] lg:text-[17vw] xl:text-[16vw] 2xl:text-[17vw]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="Suraj Nandan" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md text-xs text-[#E1E0CC]/80 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                I build fast, reliable web applications and AI-driven products with a
                strong focus on performance, clean user experience, and practical
                problem solving.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-3"
              >
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-[#E1E0CC] py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                  onClick={() => scrollToSection('#projects')}
                >
                  View my work
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
                  </span>
                </button>

                <a
                  href="/Suraj_Resume.pdf"
                  download="Suraj_Nandan_Resume.pdf"
                  className="inline-flex items-center self-start rounded-full border border-[#E1E0CC]/35 bg-black/30 px-5 py-3 text-sm font-medium text-[#E1E0CC] backdrop-blur-md transition-colors hover:border-[#E1E0CC]/70 hover:bg-black/45 sm:text-base"
                >
                  Download Resume
                </a>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="flex max-w-lg flex-wrap gap-2"
              >
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#E1E0CC]/20 bg-black/25 px-3 py-1.5 text-[11px] font-medium text-[#E1E0CC]/80 backdrop-blur-sm sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
