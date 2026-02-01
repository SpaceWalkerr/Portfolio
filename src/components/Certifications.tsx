import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'AWS Certified Solutions Architect',
      platform: 'Amazon Web Services',
      year: '2024',
      icon: '☁️',
      category: 'Cloud',
    },
    {
      title: 'Meta Front-End Developer Professional',
      platform: 'Meta via Coursera',
      year: '2024',
      icon: '⚛️',
      category: 'Web Development',
    },
    {
      title: 'Google Cloud Associate Engineer',
      platform: 'Google Cloud',
      year: '2023',
      icon: '🔧',
      category: 'Cloud',
    },
    {
      title: 'Machine Learning Specialization',
      platform: 'DeepLearning.AI',
      year: '2023',
      icon: '🤖',
      category: 'AI / ML',
    },
    {
      title: 'Full Stack Web Development',
      platform: 'freeCodeCamp',
      year: '2023',
      icon: '💻',
      category: 'Web Development',
    },
    {
      title: 'Docker Certified Associate',
      platform: 'Docker Inc.',
      year: '2022',
      icon: '🐳',
      category: 'DevOps',
    },
  ];

  const achievements = [
    {
      title: 'Hackathon Winner',
      description: 'Won Best Innovation Award at Tech Hackathon 2024',
      icon: '🏆',
    },
    {
      title: 'Open Source Contributor',
      description: 'Contributed to 50+ open-source projects on GitHub',
      icon: '🌟',
    },
    {
      title: 'Technical Writer',
      description: 'Published 20+ technical articles and tutorials',
      icon: '📝',
    },
    {
      title: 'Community Mentor',
      description: 'Mentored 100+ aspiring developers and students',
      icon: '🎓',
    },
  ];

  return (
    <section 
      id="certifications" 
      className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements - subtle gradient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.08] rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/[0.06] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-[450px] h-[450px] bg-purple-500/[0.07] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-500/[0.06] rounded-full blur-3xl"></div>
      
      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/[0.04] via-purple-500/[0.03] to-blue-500/[0.04] rounded-full blur-3xl"></div>
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
              Credentials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Certifications & Achievements
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mb-6">
            Validated skills and milestones showcasing continuous learning and professional development.
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

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
              className="backdrop-blur-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden"
            >
              {/* Category Tag */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 blur-md rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Tag */}
                  <span className="relative block px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md bg-cyan-500/20 border border-cyan-400/30 rounded-full group-hover:bg-cyan-500/30 group-hover:border-cyan-400/50 group-hover:text-cyan-200 transition-all duration-300 whitespace-nowrap">
                    {cert.category}
                  </span>
                </div>
              </div>
              
              {/* Glassmorphism layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Soft glow border effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl border border-cyan-400/30 blur-sm"></div>
                <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 blur-md"></div>
              </div>
              
              {/* Background glow orb */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                {/* Icon/Badge with background */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative backdrop-blur-sm bg-white/5 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                    <span className="text-2xl sm:text-3xl block group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {cert.icon}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Title and Badge */}
                  <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-cyan-50 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="relative">
                        <Award className="text-cyan-400 group-hover:text-cyan-300 transition-colors relative z-10" size={18} />
                        <div className="absolute inset-0 bg-cyan-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Platform */}
                  <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-3 group-hover:text-slate-300 transition-colors">
                    {cert.platform}
                  </p>
                  
                  {/* Year with divider */}
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent group-hover:from-cyan-400/60 transition-colors"></div>
                    <span className="text-cyan-400 text-sm font-semibold px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/40 transition-colors">
                      {cert.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notable Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }}
        >
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">🎯</span>
              Notable Achievements
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                className="backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-purple-400/40 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-purple-500/20 group relative overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-pink-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Soft glow border effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl border border-purple-400/20 blur-sm"></div>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-3 sm:mb-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative backdrop-blur-sm bg-white/5 p-1.5 sm:p-2 rounded-lg border border-white/10 group-hover:border-purple-400/30 transition-colors inline-block">
                        <span className="text-xl sm:text-2xl block group-hover:scale-110 transition-transform duration-300">
                          {achievement.icon}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-purple-50 transition-colors">
                    {achievement.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
