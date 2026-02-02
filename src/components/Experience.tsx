import { motion } from 'framer-motion';
import { Briefcase,ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'Wealth Shala',
      companyUrl: 'https://wealthshala.com',
      period: '2025 - Present',
      description:
        'Architected and developed a responsive financial literacy platform using React and TypeScript, integrating modern UI libraries and smooth animations. Successfully launched the platform to active users while maintaining high reliability and uptime through optimized deployment practices.',
      highlights: [
        'Designed and built responsive UI with React and TypeScript for financial literacy platform',
        'Implemented smooth animations and interactive features using Framer Motion',
        'Deployed and maintained platform with 99.9% uptime using modern DevOps practices',
        'Integrated third-party financial APIs and payment systems',
        'Optimized application performance resulting in 40% faster load times',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      role: 'Full Stack Developer',
      company: 'Xtin Capital',
      companyUrl: 'https://xtincapital.com',
      period: '2025 - Present',
      description:
        'Built the core foundation of the Xtin Capital platform from scratch, developing scalable APIs and client-facing systems. Led a team of developers, managed sprint workflows, and ensured consistent technical delivery across all projects.',
      highlights: [
        'Architected scalable backend infrastructure using Node.js and Express',
        'Developed RESTful APIs handling 10,000+ daily requests',
        'Led a team of 3 developers, managing sprints and code quality standards',
        'Implemented authentication and authorization systems with JWT and OAuth2',
        'Built real-time data visualization dashboards for financial analytics',
        'Established CI/CD pipelines reducing deployment time by 70%',
      ],
      technologies: ['Node.js', 'Express', 'React', 'PostgreSQL','GoDaddy','Supabase', 'Vercel', 'Render', 'REST APIs'],
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      role: 'Team Leader',
      company: 'Viral Fission',
      period: '2024 - 2025',
      description:
        'Led and managed a large ambassador team, improving coordination, communication, and campaign performance through structured task management and leadership. Coordinated cross-functional initiatives while maintaining team morale and productivity.',
      highlights: [
        'Managed and coordinated 20+ ambassadors across multiple campaigns',
        'Implemented task management system improving team coordination by 60%',
        'Increased campaign performance metrics by 45% through strategic planning',
        'Conducted training sessions for 50+ team members on campaign best practices',
        'Built and maintained communication channels ensuring transparency and collaboration',
        'Developed performance tracking dashboards for real-time campaign analytics',
      ],
      technologies: ['Leadership', 'Project Management', 'Communication', 'Analytics', 'Strategy'],
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <section 
      id="experience" 
      className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Enhanced background glows for depth */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/[0.08] to-blue-500/[0.06] rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-blue-500/[0.07] to-purple-500/[0.05] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/[0.06] to-cyan-500/[0.05] rounded-full blur-3xl"></div>
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)]"></div>

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
              Career Journey
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
            Professional roles where I built production systems, led teams, and delivered high-impact platforms. 
            Each experience has shaped my expertise and vision for creating exceptional software.
          </p>
          
          {/* Futuristic Divider Line */}
          <div className="relative h-px w-full max-w-md mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm opacity-30"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          </div>
        </motion.div>

        {/* Experience Cards without Timeline */}
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -8,
                scale: 1.01,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
              className="group relative"
            >
              {/* Enhanced glassmorphism card */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-700/40 group-hover:border-cyan-500/60 transition-all duration-500 shadow-xl shadow-black/30 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 relative overflow-hidden">
                    {/* Glassmorphism layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent rounded-2xl"></div>
                    
                    {/* Hover glow effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-blue-500/[0.03] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700`}></div>
                    
                    {/* Enhanced glowing border on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 blur-[1px]"></div>
                      <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 blur-[3px]"></div>
                    </div>

                    <div className="relative z-10">
                      {/* Enhanced Header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Enhanced glowing icon badge */}
                          <div className="relative flex-shrink-0">
                            <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} blur-lg opacity-70 rounded-xl`}></div>
                            <div className={`relative backdrop-blur-sm bg-gradient-to-br ${exp.gradient} p-3.5 rounded-xl border border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          
                          {/* Title & Company */}
                          <div className="flex-1">
                            {/* Role title - larger and brighter with sparkle */}
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-50 transition-colors duration-300">
                                {exp.role}
                              </h3>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                              {/* Company name as gradient pill tag */}
                              <div className="relative inline-block">
                                <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} blur-sm rounded-full opacity-60`}></div>
                                {exp.companyUrl ? (
                                  <a
                                    href={exp.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${exp.gradient} bg-opacity-20 border border-current backdrop-blur-sm hover:bg-opacity-30 hover:shadow-lg transition-all duration-300 group/link`}
                                    style={{
                                      color: exp.gradient.includes('cyan') ? '#06b6d4' : exp.gradient.includes('blue') ? '#3b82f6' : '#a855f7'
                                    }}
                                  >
                                    <span className="font-semibold text-sm">{exp.company}</span>
                                    <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                                  </a>
                                ) : (
                                  <div className={`relative px-4 py-1.5 rounded-full bg-gradient-to-r ${exp.gradient} bg-opacity-20 border border-current backdrop-blur-sm`}>
                                    <span className="font-semibold text-sm">{exp.company}</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Period - smaller and muted */}
                              <span className="text-xs text-slate-500 font-medium">
                                {exp.period}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-base mb-6 leading-relaxed group-hover:text-slate-200 transition-colors">
                        {exp.description}
                      </p>

                      {/* Subtle divider with glow */}
                      <div className="relative h-px mb-6 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm"></div>
                      </div>

                      {/* Key Achievements with custom glowing icons */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                          Key Achievements
                        </h4>
                        <ul className="space-y-3">
                          {exp.highlights.map((highlight, hIndex) => (
                            <motion.li
                              key={hIndex}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.15 + hIndex * 0.05 }}
                              className="flex items-start gap-3 text-slate-200 text-sm group/item"
                            >
                              {/* Glowing arrow icon */}
                              <div className="relative flex-shrink-0 mt-0.5">
                                <div className="absolute inset-0 bg-cyan-400/50 blur-md rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                <ChevronRight className="w-4 h-4 text-cyan-400 relative group-hover/item:translate-x-0.5 transition-transform" />
                              </div>
                              <span className="group-hover/item:text-white transition-colors">{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Enhanced Technologies & Skills tags */}
                      <div>
                        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                          Technologies & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, tIndex) => (
                            <motion.span
                              key={tIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.15 + tIndex * 0.04 }}
                              whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                              }}
                              className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300 cursor-default overflow-hidden`}
                            >
                              {/* Gradient background */}
                              <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-10 group-hover:opacity-15 transition-opacity`}></div>
                              
                              {/* Hover glow */}
                              <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-0 hover:opacity-30 blur-sm transition-opacity duration-300`}></div>
                              
                              <span className="relative text-slate-300 group-hover:text-cyan-300 transition-colors">
                                {tech}
                              </span>
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
