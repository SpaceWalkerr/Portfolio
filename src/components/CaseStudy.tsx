import { Fragment } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import type { CaseStudy as CaseStudyData } from '../data/caseStudies';
import { renderInline } from '../lib/inline';

/** A case study set as a newspaper feature: brief, approach, diagram, decisions, lessons, figures, limits. */

const Section = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
  <section className="mt-14">
    <div className="flex items-baseline gap-3 border-t-2 border-ink pt-3">
      <span className="font-editorial text-lg italic text-oxblood">{n}.</span>
      <h2 className="font-display text-xl font-black uppercase tracking-[-0.01em] sm:text-2xl">{title}</h2>
    </div>
    <div className="mt-5">{children}</div>
  </section>
);

const Prose = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="max-w-3xl space-y-4 font-editorial text-[16.5px] leading-relaxed text-ink">
    {paragraphs.map((p, i) => (
      <p key={i}>{renderInline(p)}</p>
    ))}
  </div>
);

const CaseStudy = ({ study, preview }: { study: CaseStudyData; preview: boolean }) => (
  <div className="mt-14">
    {preview && !study.published && (
      <p className="mb-8 border-2 border-dashed border-oxblood px-4 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-oxblood">
        Draft case study — only visible with ?preview. Set <code>published: true</code> in src/data/caseStudies.ts to go live.
      </p>
    )}

    {/* Byline strip */}
    <dl className="grid gap-px border-y-4 border-double border-ink bg-ink/20 sm:grid-cols-[1.6fr_1fr]">
      <div className="bg-paper py-3 sm:pr-5">
        <dt className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">My role</dt>
        <dd className="mt-1 font-editorial text-[15px] text-ink">{study.role}</dd>
      </div>
      <div className="bg-paper py-3 sm:pl-5">
        <dt className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">Built for</dt>
        <dd className="mt-1 font-editorial text-[15px] text-ink">{study.context}</dd>
      </div>
    </dl>

    <blockquote className="mt-10 border-l-2 border-oxblood py-1 pl-6">
      <p className="font-editorial text-2xl italic leading-snug text-ink sm:text-3xl">“{renderInline(study.thesis)}”</p>
    </blockquote>

    <Section n="I" title="The Brief">
      <Prose paragraphs={study.problem} />
    </Section>

    <Section n="II" title="The Approach">
      <Prose paragraphs={study.approach} />
    </Section>

    <Section n="III" title="How It Works">
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {study.flow.map((step, i) => (
          <Fragment key={step.label}>
            <li className="flex-1 border-2 border-ink bg-paper-bright p-3">
              <span className="font-monopress text-[9px] uppercase tracking-[0.16em] text-oxblood">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-1 block font-display text-sm font-black uppercase leading-tight">{step.label}</span>
              <span className="mt-1 block font-editorial text-[13px] italic leading-snug text-ink-mute">{step.detail}</span>
            </li>
            {i < study.flow.length - 1 && (
              <li aria-hidden="true" className="flex justify-center text-ink-mute">
                <ArrowRight size={16} className="hidden md:block" />
                <ArrowDown size={16} className="md:hidden" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </Section>

    <Section n="IV" title="Key Decisions">
      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {study.decisions.map((d) => (
          <div key={d.title} className="border-t border-ink/30 pt-3">
            <h3 className="font-display text-base font-bold uppercase tracking-[0.01em]">{d.title}</h3>
            <p className="mt-2 font-editorial text-[15px] leading-relaxed text-ink-mute">{renderInline(d.body)}</p>
          </div>
        ))}
      </div>
    </Section>

    {study.lessons && study.lessons.length > 0 && (
      <Section n="V" title="Learned the Hard Way">
        <div className="divide-y divide-ink/20 border-y border-ink">
          {study.lessons.map((l) => (
            <div key={l.broke} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-8">
              <p className="font-editorial text-[15px] leading-relaxed text-ink">
                <span className="mr-2 font-monopress text-[9px] uppercase tracking-[0.16em] text-oxblood">Broke</span>
                {renderInline(l.broke)}
              </p>
              <p className="font-editorial text-[15px] leading-relaxed text-ink-mute">
                <span className="mr-2 font-monopress text-[9px] uppercase tracking-[0.16em] text-ink">Fixed</span>
                {renderInline(l.fix)}
              </p>
            </div>
          ))}
        </div>
      </Section>
    )}

    <section className="mt-14 grid grid-cols-2 border-2 border-ink lg:grid-cols-4">
      {study.figures.map((f, i) => (
        <div
          key={f.label}
          className={`p-5 ${i % 2 === 0 ? 'border-r border-ink' : ''} ${i < 2 ? 'border-b border-ink lg:border-b-0' : ''} ${
            i === 1 ? 'lg:border-r' : ''
          }`}
        >
          <div className="font-display text-3xl font-black tracking-[-0.02em] sm:text-4xl">{f.value}</div>
          <div className="mt-1.5 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-mute">{f.label}</div>
        </div>
      ))}
    </section>

    <section className="mt-10">
      <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">Known limits — stated plainly</span>
      <ul className="mt-3 space-y-2">
        {study.limits.map((l) => (
          <li key={l} className="flex gap-2.5 font-editorial text-[14.5px] leading-snug text-ink-mute">
            <span className="mt-2 h-1 w-1 flex-shrink-0 bg-oxblood" />
            <span>{renderInline(l)}</span>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default CaseStudy;
