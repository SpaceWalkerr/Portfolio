import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Star, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: '2025',
      title: 'NPTEL Human Computer Interaction',
      organization: 'Gold Medal - 90/100 Score',
      type: 'achievement',
      icon: <Award className="w-5 h-5" />,
      description: 'Secured top position with exceptional performance in HCI course from IIT Delhi',
      achievements: [
        'Gold Medal Achievement',
        'Scored 90/100',
        'IIT Delhi Certification'
      ],
    },
    {
      year: '2025',
      title: 'Lead Student Coordinator',
      organization: 'Viksit Bharat 2047 Conference',
      type: 'achievement',
      icon: <Star className="w-5 h-5" />,
      description: 'Led coordination for international conference at SRM IST',
      achievements: [
        'Leadership Role',
        'International Conference',
        'SRM IST Event'
      ],
    },
    {
      year: '2025',
      title: 'Big Data & Data Science Bootcamp',
      organization: 'C-DAC, NOIDA & SRM IST',
      type: 'education',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'Comprehensive bootcamp on big data technologies and data science',
      achievements: [
        'Big Data Technologies',
        'Data Science Training',
        'Industry Hands-on'
      ],
    },
    {
      year: '2024',
      title: 'Full Stack Developer',
      organization: 'Wealth Shala',
      type: 'work',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Leading financial literacy platform development with React and TypeScript',
      achievements: [
        'Responsive UI Design',
        'Performance Optimization',
        '99.9% Uptime',
        'API Integration'
      ],
      url: 'https://wealthshala.com',
    },
    {
      year: '2024',
      title: 'Won Brand Revamp Competition',
      organization: 'Innovate 2024 - I Position',
      type: 'achievement',
      icon: <Award className="w-5 h-5" />,
      description: 'Secured 1st position in Brand Revamp competition at SRM Innovate 2024',
      achievements: [
        'Competition Winner',
        '1st Position',
        'SRM Innovation Challenge'
      ],
    },
    {
      year: '2024',
      title: 'Campus Mantri - 1 Year Completed',
      organization: 'GeeksforGeeks',
      type: 'achievement',
      icon: <Star className="w-5 h-5" />,
      description: 'Completed 1 year as GeeksforGeeks Campus Ambassador with impactful contributions',
      achievements: [
        'Campus Ambassador',
        '1 Year Service',
        'Community Leadership'
      ],
    },
    {
      year: '2024',
      title: 'AI/ML for Geodata Analysis',
      organization: 'IIRS, ISRO',
      type: 'education',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'Specialized training in AI/ML and Geodata Analysis from Indian Institute of Remote Sensing',
      achievements: [
        'AI/ML Specialization',
        'ISRO Training',
        'Computer Ethics Module'
      ],
    },
    {
      year: '2024',
      title: 'Career Essentials in Generative AI',
      organization: 'Microsoft & LinkedIn',
      type: 'education',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'Comprehensive course on Generative AI fundamentals and applications',
      achievements: [
        'Generative AI Fundamentals',
        'Microsoft Learning',
        'LinkedIn Certification'
      ],
    },
    {
      year: '2024',
      title: 'FutureSkills PRIME Project',
      organization: 'C-DAC, NOIDA & NIELIT',
      type: 'education',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'Advanced bootcamp on emerging technologies through government initiative',
      achievements: [
        'Emerging Tech Training',
        'Industry Skills',
        'Government Partnership'
      ],
    },
    {
      year: '2023',
      title: 'Full Stack Developer',
      organization: 'Xtin Capital',
      type: 'work',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Built scalable APIs and led development team, managed sprint workflows',
      achievements: [
        'Backend Architecture',
        'Team Leadership (3 engineers)',
        '10,000+ Daily Requests',
        'CI/CD Implementation (70% faster)'
      ],
      url: 'https://xtincapital.com',
    },
    {
      year: '2022',
      title: 'Team Leader',
      organization: 'Viral Fission',
      type: 'work',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Managed 20+ ambassadors, improved campaign coordination and performance',
      achievements: [
        'Team Management (20+ people)',
        '60% Coordination Improvement',
        '45% Performance Growth'
      ],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'from-cyan-500 to-blue-500';
      case 'education':
        return 'from-purple-500 to-pink-500';
      case 'achievement':
        return 'from-yellow-400 to-orange-500';
      case 'learning':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="timeline" className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Enhanced background glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/[0.08] to-cyan-500/[0.06] rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-purple-500/[0.07] to-indigo-500/[0.05] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/[0.06] to-blue-500/[0.05] rounded-full blur-3xl"></div>
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mb-16 sm:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
            <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">
              Timeline
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            My Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-6">
            Professional Experience, Education & Major Achievements
          </p>
          
          {/* Futuristic Divider Line */}
          <div className="relative h-px w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm opacity-30"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Enhanced glowing vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5">
            {/* Main line with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600"></div>
            {/* Multiple glow layers for premium effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 blur-[2px] opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 blur-[6px] opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 blur-[12px] opacity-50"></div>
          </div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -60 : 60,
                y: 30,
                scale: 0.92 
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0,
                scale: 1 
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`relative mb-10 sm:mb-12 last:mb-0 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
              }`}
            >
              {/* Enhanced timeline node with better glow */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: index * 0.15 + 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 z-20"
              >
                {/* Animated pulse rings - enhanced */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)}`}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2 + 0.6,
                  }}
                />
                
                {/* Multi-layer glow effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} blur-md opacity-80`}></div>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} blur-lg opacity-60`}></div>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} blur-xl opacity-40`}></div>
                
                {/* Icon container with border */}
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${getTypeColor(event.type)} flex items-center justify-center text-white shadow-2xl border-[3px] border-slate-900 backdrop-blur-sm`}>
                  {event.icon}
                </div>
              </motion.div>

              <div className="ml-20 sm:ml-24 md:ml-0">
                <motion.div
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="backdrop-blur-xl bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 rounded-2xl p-6 sm:p-7 border border-slate-700/40 hover:border-cyan-500/60 transition-all duration-500 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden"
                >
                  {/* Glassmorphism layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent rounded-2xl"></div>
                  
                  {/* Hover glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-blue-500/[0.03] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Enhanced glowing border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 blur-[1px]"></div>
                    <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 blur-[3px]"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Enhanced header with better spacing */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        {/* Glowing icon badge */}
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(event.type)} blur-lg opacity-70 rounded-xl`}></div>
                          <div className={`relative backdrop-blur-sm bg-gradient-to-br ${getTypeColor(event.type)} p-2.5 rounded-xl border border-white/30 shadow-xl`}>
                            <div className="text-white w-5 h-5 flex items-center justify-center">
                              {event.icon}
                            </div>
                          </div>
                        </div>
                        
                        {/* Sparkle indicator for premium feel */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Enhanced year badge */}
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-r ${getTypeColor(event.type)} blur-md opacity-80 rounded-full`}></div>
                        <span className={`relative inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${getTypeColor(event.type)} text-white shadow-xl border border-white/30`}>
                          {event.year}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced title - larger and brighter */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors leading-tight">
                      {event.title}
                    </h3>
                    
                    {/* Company name as gradient pill tag */}
                    <div className="mb-3 inline-block">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-sm rounded-full"></div>
                        <div className="relative px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 backdrop-blur-sm">
                          <p className="text-cyan-300 text-sm font-semibold">
                            {event.organization}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description with better spacing */}
                    <p className="text-slate-300 text-sm md:text-base mb-5 group-hover:text-slate-200 transition-colors leading-relaxed">
                      {event.description}
                    </p>

                    {/* Subtle divider with glow */}
                    <div className="relative h-px mb-5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm"></div>
                    </div>

                    {/* Key Achievements with custom glowing icons */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                        Key Achievements
                      </h4>
                      <ul className="space-y-2.5">
                        {event.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + i * 0.05 }}
                            className="text-slate-200 text-sm flex items-start gap-3 group/item"
                          >
                            {/* Glowing arrow icon */}
                            <div className="relative flex-shrink-0 mt-0.5">
                              <div className="absolute inset-0 bg-cyan-400/50 blur-md rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                              <ChevronRight className="w-4 h-4 text-cyan-400 relative group-hover/item:translate-x-0.5 transition-transform" />
                            </div>
                            <span className="group-hover/item:text-white transition-colors">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Link if available with better styling */}
                    {event.url && (
                      <div className="mt-5 pt-4 border-t border-slate-700/40">
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-all duration-300 font-semibold group/link"
                        >
                          <span>Visit Company</span>
                          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
