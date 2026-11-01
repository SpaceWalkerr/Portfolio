import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';
import { services, tierNames } from '../data/services';
import { PROFILES } from '../data/site';

/**
 * Hire Me — the services offered on Fiverr, set as classified ads:
 * a ruled box per service with its three price tiers.
 */
const Services = () => (
  <PressSection id="services">
    <SectionMasthead
      section="Classifieds"
      name="Services Offered"
      headline="Hire Me"
      standfirst="Fixed-scope jobs with the price up front, ordered through Fiverr. For anything bigger, write to me directly."
    />

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <motion.a
          key={s.slug}
          href={PROFILES.fiverr}
          target="_blank"
          rel="noopener noreferrer"
          variants={pressReveal}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="group flex flex-col border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper"
        >
          <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-oxblood group-hover:text-vermilion">
            No. {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 font-display text-xl font-black uppercase leading-[1.05] tracking-[-0.01em]">
            {s.title}
          </h3>
          <p className="mt-3 flex-1 font-editorial text-[14.5px] leading-snug text-ink-mute group-hover:text-paper/80">
            {s.blurb}
          </p>

          <dl className="mt-5 grid grid-cols-3 border-y border-ink/30 group-hover:border-paper/40">
            {s.tiers.map((price, t) => (
              <div key={tierNames[t]} className={`py-3 ${t > 0 ? 'border-l border-ink/30 pl-3 group-hover:border-paper/40' : ''}`}>
                <dt className="font-monopress text-[8.5px] uppercase tracking-[0.14em] text-ink-mute group-hover:text-paper/70">
                  {tierNames[t]}
                </dt>
                <dd className="mt-1 font-display text-2xl font-black leading-none">${price}</dd>
              </div>
            ))}
          </dl>

          <span className="mt-5 inline-flex items-center gap-1.5 font-monopress text-[10px] uppercase tracking-[0.16em]">
            Order on Fiverr <ArrowUpRight size={13} />
          </span>
        </motion.a>
      ))}
    </div>

    <motion.div
      variants={pressReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/30 pt-6"
    >
      <p className="max-w-xl font-editorial text-[15px] italic text-ink-mute">
        Prefer to talk first? Tell me what you need and I'll say honestly whether I'm the right person for it.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="mailto:surajnandan78@gmail.com?subject=Project%20enquiry"
          className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <Mail size={13} /> Email me
        </a>
        <a
          href={PROFILES.fiverr}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-oxblood"
        >
          Fiverr profile <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.div>
  </PressSection>
);

export default Services;
