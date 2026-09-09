import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, X, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PressSection, SectionMasthead, PressTag, pressReveal } from './ui/press';
import { posts, postCategories } from '../data/posts';
import type { Post } from '../data/posts';
import PostBody from './PostBody';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts =
    activeFilter === 'All'
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  useEffect(() => {
    if (!selectedPost) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPost]);

  const handleCardClick = (e: React.MouseEvent, post: Post) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    setSelectedPost(post);
  };

  return (
    <PressSection id="blog" className="bg-paper-bright">
      <SectionMasthead
        section="Section H"
        name="The Op-Ed"
        headline="Articles &amp; Insights"
        standfirst="Case studies, technical deep-dives, and reflections on building software — filed by the author."
      />

      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2 border-y border-ink py-4">
        {postCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveFilter(category);
              setVisibleCount(6);
            }}
            className={`px-3.5 py-1.5 font-monopress text-[9.5px] uppercase tracking-[0.14em] transition-colors ${
              activeFilter === category
                ? 'bg-ink text-paper'
                : 'border border-ink/30 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, index) => (
          <motion.article
            key={post.slug}
            variants={pressReveal}
            custom={index % 3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="group relative flex cursor-pointer flex-col border-t-2 border-ink pt-4"
          >
            {/* Stretched link — real URL, opens the modal on a plain click */}
            <Link
              to={`/blog/${post.slug}`}
              onClick={(e) => handleCardClick(e, post)}
              data-cursor="hover"
              aria-label={`Read article: ${post.title}`}
              className="absolute inset-0 z-20"
            />

            {/* Meta row */}
            <div className="mb-3 flex items-center gap-3 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-mute">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            {/* Category badge */}
            <span className="mb-2 inline-block w-fit border border-ink/30 px-2 py-0.5 font-monopress text-[8px] uppercase tracking-[0.12em] text-ink-mute">
              {post.category}
            </span>

            {/* Title */}
            <h3 className="font-display text-lg font-black uppercase leading-[1.05] tracking-[-0.01em] group-hover:text-oxblood sm:text-xl">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-2 flex-grow font-editorial text-[13.5px] leading-relaxed text-ink-mute line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <PressTag key={tag}>{tag}</PressTag>
              ))}
            </div>

            {/* Read more indicator */}
            <p className="mt-3 font-monopress text-[9px] uppercase tracking-[0.14em] text-oxblood group-hover:underline">
              Read full article →
            </p>
          </motion.article>
        ))}
      </div>

      {/* Show more button */}
      {visibleCount < filteredPosts.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="border border-ink px-6 py-3 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Load More Articles ({filteredPosts.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* ===== Post Detail Modal ===== */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 z-50 flex flex-col border-2 border-ink bg-paper shadow-2xl sm:inset-8 md:inset-12 lg:inset-x-[10%] lg:inset-y-10"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="post-modal-title"
            >
              {/* Masthead */}
              <div className="flex items-center justify-between border-b-4 border-double border-ink bg-paper px-5 py-2.5 sm:px-8">
                <span className="font-editorial text-base italic">The Op-Ed</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  aria-label="Close"
                  className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-5 py-8 sm:px-8 sm:py-10">
                  {/* Meta */}
                  <div className="mb-6 flex flex-wrap items-center gap-4 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-mute">
                    <span className="border border-ink/30 px-2 py-0.5 text-ink">
                      {selectedPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {selectedPost.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    id="post-modal-title"
                    className="font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl lg:text-5xl"
                  >
                    {selectedPost.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-4 font-editorial text-lg italic leading-relaxed text-ink-mute">
                    {selectedPost.excerpt}
                  </p>

                  {/* Open full page */}
                  <div className="mt-4">
                    <Link
                      to={`/blog/${selectedPost.slug}`}
                      className="inline-flex items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute underline decoration-ink/30 underline-offset-4 transition-colors hover:text-oxblood hover:decoration-oxblood"
                    >
                      <FileText size={13} />
                      Open full page — surajnandan.in/blog/{selectedPost.slug}
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="my-8 border-t-2 border-ink/20" />

                  {/* Content */}
                  <PostBody content={selectedPost.content} />

                  {/* Tags */}
                  <div className="mt-10 border-t border-ink/20 pt-6">
                    <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                      Filed under
                    </span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <PressTag key={tag}>{tag}</PressTag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PressSection>
  );
};

export default Blog;
