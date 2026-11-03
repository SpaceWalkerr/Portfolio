import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROFILES } from '../../data/site';
import type { SceneProps } from './types';

const ELSEWHERE = [
  { label: 'Fiverr', href: PROFILES.fiverr },
  { label: 'Gumroad', href: PROFILES.gumroad },
  { label: 'DEV', href: PROFILES.devto },
  { label: 'YouTube', href: PROFILES.youtube },
];

/** The closing beat: where to take it from here. */
const NextScene = ({ local }: SceneProps) => {
  const opacity = useTransform(local, [0.2, 0.4], [0, 1]);
  const y = useTransform(local, [0.2, 0.4], [24, 0]);
  return (
    <motion.div style={{ opacity, y }} className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-7 px-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/#services"
          className="bg-oxblood px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-[#f3ede1] transition-colors hover:bg-[#f3ede1] hover:text-[#0e0d0b]"
        >
          Hire me
        </Link>
        <Link
          to="/#contact"
          className="border border-[#f3ede1]/60 px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-[#f3ede1] transition-colors hover:bg-[#f3ede1] hover:text-[#0e0d0b]"
        >
          Get in touch
        </Link>
        <Link
          to="/"
          className="px-3 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-[#f3ede1]/70 underline decoration-vermilion decoration-2 underline-offset-4 transition-colors hover:text-[#f3ede1]"
        >
          Read the full site
        </Link>
      </div>
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {ELSEWHERE.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-monopress text-[10px] uppercase tracking-[0.16em] text-[#f3ede1]/55 transition-colors hover:text-vermilion"
            >
              {l.label} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NextScene;
