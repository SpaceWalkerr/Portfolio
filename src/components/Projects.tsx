import { motion, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { ExternalLink, Github, X, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PressSection, SectionMasthead, PressTag, PressButton, pressReveal } from './ui/press';
import { useTilt3D } from '../hooks/useTilt3D';
import { projects, projectCategories, type Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

/** A story card that tilts in 3D toward the cursor with a glare sweep — like picking up a printed card. */
const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => {
  const tilt = useTilt3D({ max: 6, glare: true });
  const [imgSrc, setImgSrc] = useState(project.image);

  const handleCardClick = (e: React.MouseEvent) => {
    // Let new-tab / new-window intents fall through to a real navigation
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    onSelect(project);
  };

  return (
    <motion.div
      ref={tilt.ref}
      variants={pressReveal}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transformPerspective: 1000, rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      className="group relative flex flex-col border-t-2 border-ink pt-4"
    >
      {/* Stretched link — real URL for crawlers / new-tab, opens the modal on a plain click */}
      <Link
        to={`/projects/${project.slug}`}
        onClick={handleCardClick}
        data-cursor="hover"
        aria-label={`View details for ${project.title}`}
        className="absolute inset-0 z-20 cursor-pointer"
      />

      {/* Glare sweep — a light sheen that follows the cursor, like glossy card stock */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: tilt.glareOpacity,
          background: useMotionTemplate`radial-gradient(220px circle at ${tilt.glareX}% ${tilt.glareY}%, white, transparent 70%)`,
        }}
      />

      <div className="relative mb-4 aspect-[4/3] overflow-hidden border border-ink">
        <img
          src={imgSrc}
          onError={() => {
            if (imgSrc !== project.fallbackImage) setImgSrc(project.fallbackImage);
          }}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
        <span className="absolute left-0 top-0 bg-ink px-2 py-1 font-monopress text-[9px] uppercase tracking-[0.14em] text-paper">
          {project.category}
        </span>
      </div>

      <h3 className="font-display text-lg font-black uppercase leading-[1.05] tracking-[-0.01em] group-hover:text-oxblood sm:text-xl">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 font-editorial text-[13.5px] leading-relaxed text-ink-mute">
        {project.description}
      </p>
      <p className="mt-2 font-monopress text-[9px] uppercase tracking-[0.14em] text-oxblood">
        Continued inside →
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <PressTag key={tag}>{tag}</PressTag>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (!selectedProject) return;
    setModalImg(selectedProject.image);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <PressSection id="projects">
      <SectionMasthead
        section="Section E"
        name="Front Page"
        headline="Featured Projects"
        standfirst="A collection of recent work — web applications, AI integrations, and full-stack platforms, filed by desk."
      />

      {/* Filter — desk selector */}
      <div className="mb-10 flex flex-wrap gap-2 border-y border-ink py-4">
        {projectCategories.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 font-monopress text-[10px] uppercase tracking-[0.16em] transition-colors ${
              activeFilter === filter
                ? 'bg-ink text-paper'
                : 'border border-ink/30 text-ink-mute hover:border-ink hover:text-ink'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Story grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ===== Detail modal: "Special Edition" broadsheet ===== */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 z-50 overflow-y-auto border-2 border-ink bg-paper-bright shadow-2xl sm:inset-8 md:inset-16 lg:inset-x-[12%] lg:inset-y-12"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              {/* Masthead bar */}
              <div className="flex items-center justify-between border-b-4 border-double border-ink bg-paper px-5 py-2.5 sm:px-8">
                <span className="font-editorial text-base italic">Special Edition</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close"
                  className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative h-52 overflow-hidden border-b border-ink sm:h-72">
                <img
                  src={modalImg}
                  onError={() => {
                    if (modalImg !== selectedProject.fallbackImage) setModalImg(selectedProject.fallbackImage);
                  }}
                  alt={selectedProject.title}
                  decoding="async"
                  className="h-full w-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <span className="mb-3 inline-block bg-oxblood px-2.5 py-1 font-monopress text-[10px] uppercase tracking-[0.14em] text-paper">
                    {selectedProject.category}
                  </span>
                  <h3
                    id="project-modal-title"
                    className="font-display text-2xl font-black uppercase leading-[0.95] text-paper sm:text-4xl"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-8">
                <p className="max-w-3xl font-editorial text-[15px] leading-relaxed text-ink sm:text-base">
                  {selectedProject.description}
                </p>

                <div className="mt-7">
                  <span className="font-monopress text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                    Tech Stack
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <PressTag key={tag}>{tag}</PressTag>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PressButton href={selectedProject.liveDemo} className="flex-1">
                    <ExternalLink size={15} />
                    Live Demo
                  </PressButton>
                  {selectedProject.github ? (
                    <PressButton href={selectedProject.github} variant="outline" className="flex-1">
                      <Github size={15} />
                      View Source
                    </PressButton>
                  ) : (
                    <span className="flex flex-1 items-center justify-center gap-2 border border-ink/25 px-5 py-3 font-monopress text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                      Source — Private Repo
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <Link
                    to={`/projects/${selectedProject.slug}`}
                    className="inline-flex items-center gap-2 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute underline decoration-ink/30 underline-offset-4 transition-colors hover:text-oxblood hover:decoration-oxblood"
                  >
                    <FileText size={13} />
                    Open full page — surajnandan.in/projects/{selectedProject.slug}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PressSection>
  );
};

export default Projects;
