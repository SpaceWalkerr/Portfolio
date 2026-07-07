import { motion } from 'framer-motion';
import { useState } from 'react';
import Starfield from './Starfield';
import MultiverseLoader from './MultiverseLoader';
import PortalCard from './PortalCard';
import PortalTransition from './PortalTransition';
import { universes } from './universes';
import type { Universe } from './universes';

interface Travel {
  universe: Universe;
  origin: { x: number; y: number };
}

const gridStagger = {
  hidden: {},
  visible: {},
};

const MultiversePage = () => {
  const [ready, setReady] = useState(false);
  const [travel, setTravel] = useState<Travel | null>(null);

  const depart = () => {
    if (!travel) return;
    window.location.assign(travel.universe.href);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-space text-paper">
      <MultiverseLoader onComplete={() => setReady(true)} />
      <Starfield />

      {/* page dives away slightly while a portal opens — cheap motion blur */}
      <motion.main
        id="main-content"
        animate={travel ? { scale: 1.05, filter: 'blur(6px)' } : { scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-10 sm:px-8 sm:py-14"
      >
        {/* ===== masthead ===== */}
        <motion.header
          initial={{ opacity: 0, y: 26 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-monopress text-[10px] uppercase tracking-[0.5em] text-paper/50">
            SN-Multiverse <span className="text-vermilion">//</span> Reality Index — MMXXVI
          </p>
          <h1 className="mt-4 font-display text-[11vw] font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            The Suraj{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(100deg,#8a8478,#E9E4D6 40%,#ffffff 50%,#E9E4D6 60%,#8a8478)',
              }}
            >
              Multiverse
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md font-editorial text-base italic text-paper/65 sm:text-lg">
            One developer. Four realities. Every version of me ships.
          </p>
        </motion.header>

        {/* ===== the reality index ===== */}
        <motion.div
          variants={gridStagger}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          className="mt-10 grid flex-1 grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2"
        >
          {universes.map((u, i) => (
            <PortalCard
              key={u.id}
              universe={u}
              index={i}
              onEnter={(universe, origin) => setTravel({ universe, origin })}
            />
          ))}
        </motion.div>

        {/* ===== colophon ===== */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-paper/10 pt-6 font-monopress text-[9px] uppercase tracking-[0.2em] text-paper/40 sm:flex-row"
        >
          <span>© MMXXVI Suraj Nandan — All Timelines Reserved</span>
          <span>Four dimensions · One person</span>
        </motion.footer>
      </motion.main>

      {travel && <PortalTransition universe={travel.universe} origin={travel.origin} onDone={depart} />}
    </div>
  );
};

export default MultiversePage;
