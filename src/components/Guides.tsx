import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';
import { guides } from '../data/guides';
import { withBase } from '../lib/utils';

/**
 * Guides & Tools — short, practical resources sold on Gumroad.
 * Set as a row of "classified" cards: image, price, title, blurb and a clear call to action.
 */
const Guides = () => (
  <PressSection id="guides">
    <SectionMasthead
      section="Classifieds"
      name="The Shop"
      headline="Guides & Tools"
      standfirst="Short, practical resources I wrote after running into the problems myself. One small payment, instant download."
    />

    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g, i) => (
        <motion.a
          key={g.slug}
          href={g.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={pressReveal}
          custom={i % 3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="group flex flex-col border-t-2 border-ink pt-4"
        >
          <div className="relative overflow-hidden border border-ink bg-paper-bright">
            <img
              src={withBase(g.image)}
              alt={`${g.title} — cover`}
              width={1000}
              height={563}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute right-0 top-0 bg-oxblood px-3 py-1.5 font-monopress text-[11px] uppercase tracking-[0.14em] text-paper">
              {g.price}
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
            <span>{g.format}</span>
          </div>
          <h3 className="mt-1.5 font-display text-xl font-black uppercase leading-[1.05] tracking-[-0.01em] group-hover:text-oxblood">
            {g.title}
          </h3>
          <p className="mt-2 flex-1 font-editorial text-[15px] leading-snug text-ink-mute">{g.blurb}</p>
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 bg-ink px-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors group-hover:bg-oxblood">
            Get it <ArrowUpRight size={13} />
          </span>
        </motion.a>
      ))}

      {/* Sixth cell — the whole storefront */}
      <motion.a
        href="https://surajnandan.gumroad.com"
        target="_blank"
        rel="noopener noreferrer"
        variants={pressReveal}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="group flex flex-col justify-center border-t-2 border-ink pt-4"
      >
        <div className="flex aspect-[16/9] flex-col items-start justify-center border border-dashed border-ink/50 p-6">
          <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">More on the shelf</span>
          <span className="mt-2 font-display text-2xl font-black uppercase leading-[1.05] group-hover:text-oxblood">
            Browse the whole shop
          </span>
          <span className="mt-3 font-editorial text-[15px] text-ink-mute">New guides and tools land here first.</span>
        </div>
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 border border-ink px-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
          Visit Gumroad <ArrowUpRight size={13} />
        </span>
      </motion.a>
    </div>
  </PressSection>
);

export default Guides;
