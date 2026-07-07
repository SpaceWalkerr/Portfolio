import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MarineSnow } from '../hub/MarineSnow'
import { OWNER_NAME } from '../../data/universes'

// TODO: replace with real photos — drop the three candids into
// /public/assets/photos/ as about-office.webp, about-nature.webp,
// about-casual.webp and they will render automatically.
const photos = [
  { src: '/assets/photos/about-office.webp', label: 'At the desk', alt: 'Suraj working at his office desk' },
  { src: '/assets/photos/about-nature.webp', label: 'Off the grid', alt: 'Suraj outdoors in nature' },
  { src: '/assets/photos/about-casual.webp', label: 'Off duty', alt: 'Casual photo of Suraj' },
]

export function About() {
  return (
    <main className="relative h-full overflow-y-auto bg-void">
      <MarineSnow density={0.6} />
      <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-snow uppercase transition-colors duration-200 hover:text-jellyfish"
        >
          <ArrowLeft size={14} /> Back to the Multiverse
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display mt-10 text-4xl tracking-tight text-jellyfish md:text-5xl">
            Behind the code
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-snow">
            {OWNER_NAME} — full-stack developer. Eight portfolios, one person:
            each universe in the multiverse is the same body of work told in a
            different visual language, built end-to-end as its own app.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {photos.map((p) => (
              <figure key={p.src} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-lg border border-snow/15 bg-abyss">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                    onError={(e) => {
                      // placeholder until real photos are supplied
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <figcaption className="mt-2 text-[11px] tracking-[0.2em] text-snow/70 uppercase">
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
