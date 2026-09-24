import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug, projects } from '../data/projects';
import { posts } from '../data/posts';
import { PressTag, PressButton } from '../components/ui/press';
import Seo, { SITE_URL } from '../components/Seo';
import NotFound from './NotFound';
import CaseStudy from '../components/CaseStudy';
import { getCaseStudy } from '../data/caseStudies';

const ProjectPage = () => {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);
  const { search } = useLocation();
  const preview = new URLSearchParams(search).has('preview');
  const study = getCaseStudy(slug);
  const showStudy = Boolean(study && (study.published || preview));
  const [imgSrc, setImgSrc] = useState(project?.image ?? '');

  useEffect(() => {
    window.scrollTo(0, 0);
    setImgSrc(project?.image ?? '');
  }, [slug, project]);

  if (!project) return <NotFound />;

  const relatedPost = posts.find((p) => p.relatedProject === project.name);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const path = `/projects/${project.slug}`;
  const repo = project.github?.replace(/\.git$/, '');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.name,
      headline: project.title,
      description: project.description,
      url: `${SITE_URL}${path}`,
      image: `${SITE_URL}${project.image}`,
      author: { '@type': 'Person', name: 'Suraj Nandan', url: SITE_URL },
      keywords: project.tags.join(', '),
      ...(repo ? { codeRepository: repo } : {}),
      sameAs: [project.liveDemo, ...(repo ? [repo] : [])],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
        { '@type': 'ListItem', position: 3, name: project.name, item: `${SITE_URL}${path}` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`${project.name} — Suraj Nandan`}
        description={project.description.slice(0, 200)}
        path={path}
        image={project.image}
        jsonLd={jsonLd}
      />
      <article className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            <Link to="/" className="hover:text-oxblood">Home</Link>
            <span>/</span>
            <Link to="/#projects" className="hover:text-oxblood">Projects</Link>
            <span>/</span>
            <span className="text-ink">{project.name}</span>
          </nav>

          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">Special Edition</span>
            <span>{project.category}</span>
          </div>
          <div className="border-t border-ink" />

          <h1 className="mt-8 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.02em] sm:text-6xl">
            {project.title}
          </h1>

          <div className="mt-8 overflow-hidden border-2 border-ink">
            <img
              src={imgSrc}
              onError={() => {
                if (imgSrc !== project.fallbackImage) setImgSrc(project.fallbackImage);
              }}
              alt={`Screenshot of ${project.name}`}
              width={1280}
              height={800}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          <p className="mt-8 max-w-3xl font-editorial text-lg leading-relaxed text-ink">
            {project.description}
          </p>

          <div className="mt-8">
            <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">Tech Stack</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <PressTag key={t}>{t}</PressTag>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PressButton href={project.liveDemo} className="flex-1">
              <ExternalLink size={15} /> Live Demo
            </PressButton>
            {project.github && (
              <PressButton href={project.github} variant="outline" className="flex-1">
                <Github size={15} /> View Source
              </PressButton>
            )}
          </div>

          {showStudy && study && <CaseStudy study={study} preview={preview} />}

          {relatedPost && (
            <div className="mt-12 border-t border-ink/20 pt-6">
              <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                Related reading
              </span>
              <Link
                to={`/blog/${relatedPost.slug}`}
                className="mt-2 block font-display text-xl font-black uppercase leading-tight hover:text-oxblood"
              >
                {relatedPost.title} →
              </Link>
            </div>
          )}

          {/* Keep reading — the next story in the edition */}
          <nav aria-label="More projects" className="mt-14 grid grid-cols-2 border-y-2 border-ink">
            <Link
              to={`/projects/${prev.slug}`}
              className="group border-r border-ink py-5 pr-4 transition-colors hover:text-oxblood"
            >
              <span className="flex items-center gap-1.5 font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" /> Previous
              </span>
              <span className="mt-1.5 block font-display text-base font-black uppercase leading-tight sm:text-lg">
                {prev.name}
              </span>
            </Link>
            <Link
              to={`/projects/${next.slug}`}
              className="group py-5 pl-4 text-right transition-colors hover:text-oxblood"
            >
              <span className="flex items-center justify-end gap-1.5 font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                Next <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1.5 block font-display text-base font-black uppercase leading-tight sm:text-lg">
                {next.name}
              </span>
            </Link>
          </nav>

          <div className="mt-10">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink hover:text-oxblood"
            >
              <ArrowLeft size={14} /> Back to all projects
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProjectPage;
