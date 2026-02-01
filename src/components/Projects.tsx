import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: 'AI-Powered Analytics Dashboard',
      description:
        'Real-time analytics platform with machine learning insights and predictive modeling',
      tags: ['React', 'TypeScript', 'Python', 'TensorFlow', 'PostgreSQL'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-cyan-500 to-blue-600',
      category: 'AI',
    },
    {
      title: 'E-Commerce Platform',
      description:
        'Full-stack marketplace with payment integration, inventory management, and admin panel',
      tags: ['Next.js', 'Node.js', 'Stripe', 'MongoDB', 'Redis'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-blue-500 to-purple-600',
      category: 'Full Stack',
    },
    {
      title: 'Real-Time Collaboration Tool',
      description:
        'WebSocket-based collaborative workspace with live editing and video conferencing',
      tags: ['React', 'WebRTC', 'Socket.io', 'Express', 'PostgreSQL'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-purple-500 to-pink-600',
      category: 'Web',
    },
    {
      title: 'Smart Task Manager',
      description:
        'AI-assisted productivity app with natural language processing and task prioritization',
      tags: ['React Native', 'FastAPI', 'OpenAI', 'Supabase'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-pink-500 to-red-600',
      category: 'AI',
    },
    {
      title: 'Developer Portfolio Builder',
      description:
        'SaaS platform for creating professional developer portfolios with customizable templates',
      tags: ['Next.js', 'Tailwind', 'Supabase', 'Stripe'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-red-500 to-orange-600',
      category: 'Web',
    },
    {
      title: 'Blockchain Explorer',
      description:
        'Web3 application for exploring blockchain transactions with real-time data visualization',
      tags: ['React', 'Web3.js', 'Node.js', 'GraphQL', 'MongoDB'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-orange-500 to-yellow-600',
      category: 'Full Stack',
    },
  ];

  const filters = ['All', 'Web', 'AI', 'Full Stack'];
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements with enhanced glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/3 via-blue-500/3 to-cyan-500/3 rounded-full blur-3xl"></div>
      
      {/* Additional soft gradient layers for depth */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/4 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-500/3 rounded-full blur-3xl"></div>
      <div className="absolute top-2/3 left-0 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-t from-cyan-500/2 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mb-6">
            A collection of my recent work showcasing web applications, AI integrations, 
            and full-stack development projects.
          </p>
          
          {/* Futuristic Divider Line */}
          <div className="relative h-px w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm opacity-30"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800/30 backdrop-blur-sm text-slate-300 border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: 0.1 + index * 0.1,
                duration: 0.7,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
              }}
              className="group relative cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300 -z-10`}></div>

              {/* Glassmorphism Card */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Gradient Thumbnail Area */}
                <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-2xl">
                  {/* Background gradient with zoom effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 ease-out group-hover:scale-110`}></div>
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 group-hover:bg-slate-950/30"></div>
                  
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  
                  {/* Animated accent glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-400 mb-4 flex-grow line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-800/40 backdrop-blur-sm text-slate-300 rounded-full border border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {/* Primary Button - Live Demo */}
                    <a
                      href={project.liveDemo}
                      className="group/btn flex-1 relative flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/40 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:via-blue-500 before:to-purple-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                        Live Demo
                      </span>
                      {/* Soft glow */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity duration-300"></div>
                    </a>
                    
                    {/* Secondary Button - GitHub */}
                    <a
                      href={project.github}
                      className="group/github relative flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/30 backdrop-blur-md text-white text-sm font-semibold rounded-xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/50 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/10 before:to-blue-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                    >
                      <Github size={16} className="relative z-10 group-hover/github:rotate-12 transition-transform duration-300" />
                      {/* Border glow */}
                      <div className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover/github:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-sm"></div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
