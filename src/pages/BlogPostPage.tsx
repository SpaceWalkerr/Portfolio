import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Link2, Check, Linkedin, Twitter, Rss } from 'lucide-react';
import { getPostBySlug, posts } from '../data/posts';
import { getProjectBySlug, projects } from '../data/projects';
import { PressTag } from '../components/ui/press';
import PostBody from '../components/PostBody';
import Seo, { SITE_URL } from '../components/Seo';
import NotFound from './NotFound';

/** Share row — plain links, no third-party scripts or trackers. */
const ShareRow = ({ url, title }: { url: string; title: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the other options still work */
    }
  };
  const link =
    'inline-flex items-center gap-1.5 border border-ink/30 px-3 py-2 font-monopress text-[10px] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:border-ink hover:text-ink';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">Pass it on</span>
      <button type="button" onClick={copy} className={link}>
        {copied ? <Check size={13} /> : <Link2 size={13} />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <a
        className={link}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
      >
        <Linkedin size={13} /> LinkedIn
      </a>
      <a
        className={link}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=SurajNandan1625`}
      >
        <Twitter size={13} /> Post
      </a>
      <a className={link} href="/rss.xml" title="Subscribe via RSS">
        <Rss size={13} /> RSS
      </a>
    </div>
  );
};

const BlogPostPage = () => {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  const path = `/blog/${post.slug}`;
  // posts are filed newest-first
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;
  const related =
    (post.relatedProject &&
      (getProjectBySlug(post.relatedProject) ||
        projects.find((p) => p.name === post.relatedProject))) ||
    undefined;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}${path}`,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Person', name: 'Suraj Nandan', url: SITE_URL },
      publisher: { '@type': 'Person', name: 'Suraj Nandan', url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}${path}`,
      keywords: post.tags.join(', '),
      articleSection: post.category,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/#blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${path}` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`${post.title} — Suraj Nandan`}
        description={post.excerpt.slice(0, 200)}
        path={path}
        image={`/og/blog/${post.slug}.png`}
        type="article"
        jsonLd={jsonLd}
      />
      <article className="relative min-h-screen bg-paper text-ink">
        <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-multiply" />
        <div className="relative mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            <Link to="/" className="hover:text-oxblood">Home</Link>
            <span>/</span>
            <Link to="/#blog" className="hover:text-oxblood">Blog</Link>
            <span>/</span>
            <span className="text-ink line-clamp-1">{post.title}</span>
          </nav>

          <div className="border-t-4 border-double border-ink" />
          <div className="flex items-baseline justify-between gap-4 py-2.5 font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="text-oxblood">The Op-Ed</span>
            <span>{post.category}</span>
          </div>
          <div className="border-t border-ink" />

          <div className="mt-6 flex flex-wrap items-center gap-4 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-mute">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 font-editorial text-lg italic leading-relaxed text-ink-mute">
            {post.excerpt}
          </p>

          <div className="mt-6">
            <ShareRow url={`${SITE_URL}${path}`} title={post.title} />
          </div>

          <div className="my-8 border-t-2 border-ink/20" />

          <PostBody content={post.content} />

          <div className="mt-10 border-t border-ink/20 pt-6">
            <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">Filed under</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <PressTag key={tag}>{tag}</PressTag>
              ))}
            </div>
          </div>

          {related && (
            <div className="mt-10 border-t border-ink/20 pt-6">
              <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                Project referenced
              </span>
              <Link
                to={`/projects/${related.slug}`}
                className="mt-2 block font-display text-xl font-black uppercase leading-tight hover:text-oxblood"
              >
                {related.title} →
              </Link>
            </div>
          )}

          {(newer || older) && (
            <nav aria-label="More articles" className="mt-14 grid grid-cols-2 border-y-2 border-ink">
              {older ? (
                <Link to={`/blog/${older.slug}`} className="group border-r border-ink py-5 pr-4 transition-colors hover:text-oxblood">
                  <span className="flex items-center gap-1.5 font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" /> Earlier
                  </span>
                  <span className="mt-1.5 line-clamp-2 block font-display text-sm font-black uppercase leading-tight sm:text-base">
                    {older.title}
                  </span>
                </Link>
              ) : (
                <span className="border-r border-ink" />
              )}
              {newer ? (
                <Link to={`/blog/${newer.slug}`} className="group py-5 pl-4 text-right transition-colors hover:text-oxblood">
                  <span className="flex items-center justify-end gap-1.5 font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    Later <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1.5 line-clamp-2 block font-display text-sm font-black uppercase leading-tight sm:text-base">
                    {newer.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}

          <div className="mt-10">
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink hover:text-oxblood"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
