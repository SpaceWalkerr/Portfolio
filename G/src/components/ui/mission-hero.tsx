import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDownRight, Download } from 'lucide-react';
import { ResumeModal } from '../ResumeModal';
import { MissionButton, Readout, missionEase } from './mission';

interface MissionHeroProps {
  introDone?: boolean;
}

const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: missionEase },
  }),
};

/** T-minus countdown before the console comes online — gates the rest of the hero. */
const useCountdown = (active: boolean) => {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? 0 : 3);
  const [done, setDone] = useState(reduceMotion);

  useEffect(() => {
    if (!active || reduceMotion) return;
    if (count <= 0) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 500);
    return () => clearTimeout(t);
  }, [active, count, reduceMotion]);

  return { count, done };
};

const MissionHero = ({ introDone = true }: MissionHeroProps) => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const { count, done } = useCountdown(introDone);

  const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-void text-ink">
      <div className="starfield pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-28 sm:px-8">
        {!done && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-amber">T-Minus</span>
            <span className="mt-4 font-display text-6xl text-ink sm:text-8xl">{count > 0 ? `0${count}` : 'GO'}</span>
          </motion.div>
        )}

        {done && (
          <>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-ink/25 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute sm:grid-cols-4"
            >
              <div>
                <span className="block text-ink-mute/70">Mission</span>
                <span className="text-ink">SN-2026</span>
              </div>
              <div>
                <span className="block text-ink-mute/70">Callsign</span>
                <span className="text-ink">S. Nandan</span>
              </div>
              <div>
                <span className="block text-ink-mute/70">Launch Site</span>
                <span className="text-ink">Chennai, IN</span>
              </div>
              <div>
                <span className="block text-ink-mute/70">Status</span>
                <span className="text-amber">Nominal</span>
              </div>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="mt-10 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-amber">Mission Control</p>
              <h1 className="mt-5 font-display text-4xl uppercase leading-[1.15] text-ink sm:text-6xl lg:text-7xl">Suraj Nandan</h1>
              <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-relaxed text-ink-mute sm:text-[15px]">
                &ldquo;Passionate about building intelligent systems that solve real-world problems.&rdquo; A full-stack
                developer bridging modern web technologies and AI — flight data logged below.
              </p>
            </motion.div>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-wrap justify-center gap-4">
              <MissionButton onClick={scrollToProjects} variant="solid">
                View Mission Log <ArrowDownRight size={15} />
              </MissionButton>
              <MissionButton onClick={() => setResumeOpen(true)} variant="outline">
                Flight Manifest <Download size={15} />
              </MissionButton>
            </motion.div>

            <motion.dl
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-14 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/20 pt-6 text-center sm:grid-cols-4"
            >
              <Readout target={3} suffix="+" label="Years Active" active={done} />
              <Readout target={20} suffix="+" label="Missions Flown" active={done} />
              <Readout target={20} suffix="+" label="Systems Known" active={done} />
              <Readout target={60} suffix="+" label="Certifications" active={done} />
            </motion.dl>
          </>
        )}
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default MissionHero;
