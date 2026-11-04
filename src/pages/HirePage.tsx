import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import Seo, { SITE_URL } from '../components/Seo';
import { PERSON } from '../lib/schema';
import { services, tierNames } from '../data/services';
import { PROFILES } from '../data/site';

const PATH = '/hire';

/** /hire — the freelance services as an indexable page, with Service + price structured data. */
const HirePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = [
    ...services.map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.title,
      description: s.blurb,
      url: `${SITE_URL}${PATH}`,
      serviceType: s.title,
      areaServed: 'Worldwide',
      provider: PERSON,
      offers: s.tiers.map((price, i) => ({
        '@type': 'Offer',
        name: `${s.title} — ${tierNames[i]}`,
        price,
        priceCurrency: 'USD',
        url: PROFILES.fiverr,
      })),
    })),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Hire', item: `${SITE_URL}${PATH}` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title="Hire Suraj Nandan — Freelance Full-Stack & AI Developer"
        description="Hire a freelance full-stack and AI developer: React and Node web apps, RAG chatbots on your documents, e-commerce stores and bug fixes, from $15."
        path={PATH}
        jsonLd={jsonLd}
      />
      <article className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            <Link to="/" className="hover:text-oxblood">Home</Link>
            <span>/</span>
            <span className="text-ink">Hire</span>
          </nav>
          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">Classifieds</span>
            <span>Hire Me</span>
          </div>
          <div className="border-t border-ink" />

          <h1 className="mt-8 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
            Hire a Full-Stack &amp; AI Developer
          </h1>
          <p className="mt-4 max-w-2xl font-editorial text-lg italic text-ink-mute">
            Fixed-scope jobs, delivered end to end: built, deployed and handed over. Orders go through Fiverr; for bigger work, email me.
          </p>

          <div className="mt-10 divide-y divide-ink/20 border-y border-ink/30">
            {services.map((s) => (
              <section key={s.slug} className="py-6">
                <h2 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.01em] sm:text-2xl">{s.title}</h2>
                <p className="mt-2 max-w-2xl font-editorial text-[15.5px] leading-relaxed text-ink-mute">{s.blurb}</p>
                <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-monopress text-[11px] uppercase tracking-[0.14em]">
                  {s.tiers.map((price, i) => (
                    <div key={tierNames[i]} className="flex gap-2">
                      <dt className="text-ink-mute">{tierNames[i]}</dt>
                      <dd className="text-oxblood">${price}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={PROFILES.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-oxblood"
            >
              Order on Fiverr <ArrowUpRight size={13} />
            </a>
            <a
              href="mailto:surajnandan78@gmail.com?subject=Project%20enquiry"
              className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <Mail size={13} /> Email me
            </a>
          </div>
          <p className="mt-6 font-editorial text-[15px] text-ink-mute">
            See the work first: <Link to="/#projects" className="text-oxblood underline underline-offset-4">projects and case studies</Link>.
          </p>

          <div className="mt-14">
            <Link to="/" className="inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink hover:text-oxblood">
              <ArrowLeft size={14} /> Back to the front page
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default HirePage;
