import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import { posts } from '../data/posts';
import { PressTag, PressButton } from '../components/ui/press';
import Seo, { SITE_URL } from '../components/Seo';

const ProjectPage = () => {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);
  const [imgSrc, setImgSrc] = useState(project?.image ?? '');

  useEffect(() => {
    window.scrollTo(0, 0);
    setImgSrc(project?.image ?? '');
  }, [slug, project]);

  if (!project) return <Navigate to="/" replace />;

  const relatedPost = posts.find((p) => p.relatedProject === project.name);
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
              alt={project.name}
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

          <div className="mt-14">
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
