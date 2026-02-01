import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'AI-Powered Analytics Dashboard',
      description:
        'Real-time analytics platform with machine learning insights and predictive modeling',
      tags: ['React', 'TypeScript', 'Python', 'TensorFlow', 'PostgreSQL'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'E-Commerce Platform',
      description:
        'Full-stack marketplace with payment integration, inventory management, and admin panel',
      tags: ['Next.js', 'Node.js', 'Stripe', 'MongoDB', 'Redis'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Real-Time Collaboration Tool',
      description:
        'WebSocket-based collaborative workspace with live editing and video conferencing',
      tags: ['React', 'WebRTC', 'Socket.io', 'Express', 'PostgreSQL'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Smart Task Manager',
      description:
        'AI-assisted productivity app with natural language processing and task prioritization',
      tags: ['React Native', 'FastAPI', 'OpenAI', 'Supabase'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-pink-500 to-red-600',
    },
    {
      title: 'Developer Portfolio Builder',
      description:
        'SaaS platform for creating professional developer portfolios with customizable templates',
      tags: ['Next.js', 'Tailwind', 'Supabase', 'Stripe'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-red-500 to-orange-600',
    },
    {
      title: 'Blockchain Explorer',
      description:
        'Web3 application for exploring blockchain transactions with real-time data visualization',
      tags: ['React', 'Web3.js', 'Node.js', 'GraphQL', 'MongoDB'],
      liveDemo: '#',
      github: '#',
      gradient: 'from-orange-500 to-yellow-600',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              ></div>

              <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/20">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-20 rounded-bl-full blur-2xl`}></div>

                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 flex-grow relative z-10">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-gray-800/80 text-cyan-400 rounded-full border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 relative z-10">
                  <a
                    href={project.liveDemo}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800/80 text-white font-semibold rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
