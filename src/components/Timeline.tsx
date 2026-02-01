import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Code } from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
      organization: 'Tech Innovations Inc.',
      type: 'work',
      icon: <Briefcase className="w-5 h-5" />,
      description:
        'Leading development of enterprise-scale applications with modern tech stack',
      achievements: [
        'Architected microservices infrastructure',
        'Improved app performance by 60%',
        'Led team of 5 developers',
      ],
    },
    {
      year: '2023',
      title: 'AI & Machine Learning Exploration',
      organization: 'DeepLearning.AI & Stanford Online',
      type: 'learning',
      icon: <Rocket className="w-5 h-5" />,
      description:
        'Deep dive into artificial intelligence and building ML-powered applications',
      achievements: [
        'Completed ML specialization',
        'Built 3 AI-powered projects',
        'Published research on ML optimization',
      ],
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      organization: 'Digital Solutions Agency',
      type: 'work',
      icon: <Code className="w-5 h-5" />,
      description:
        'Developed scalable web applications and RESTful APIs for various clients',
      achievements: [
        'Delivered 15+ production projects',
        'Implemented CI/CD pipelines',
        'Mentored junior developers',
      ],
    },
    {
      year: '2021',
      title: 'Computer Science Degree',
      organization: 'University of Technology',
      type: 'education',
      icon: <GraduationCap className="w-5 h-5" />,
      description:
        'Graduated with honors, specializing in software engineering and algorithms',
      achievements: [
        'GPA: 3.8/4.0',
        'Dean\'s List 4 semesters',
        'Led university coding club',
      ],
    },
    {
      year: '2020',
      title: 'Started Web Development Journey',
      organization: 'Self-Learning & Online Platforms',
      type: 'learning',
      icon: <Rocket className="w-5 h-5" />,
      description:
        'Began learning web technologies and building first projects',
      achievements: [
        'Completed 10+ online courses',
        'Built personal portfolio',
        'Won first hackathon',
      ],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'from-cyan-500 to-blue-500';
      case 'education':
        return 'from-purple-500 to-pink-500';
      case 'learning':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="timeline" className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorative elements - enhanced subtle glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/[0.06] rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[550px] h-[550px] bg-cyan-500/[0.05] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-indigo-500/[0.04] rounded-full blur-3xl"></div>
      
      {/* Central ambient glow following timeline */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-2 h-[calc(100%-10rem)] bg-gradient-to-b from-cyan-400/[0.08] via-blue-400/[0.06] to-purple-400/[0.08] blur-[80px]"></div>
      
      {/* Large atmospheric gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.02] to-cyan-500/[0.03] rounded-full blur-3xl"></div>
      
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-slate-950/20"></div>

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
            Experience & Learning Path
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
          {/* Vertical timeline line with glow */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
            {/* Main gradient line */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-70"></div>
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 blur-md opacity-50"></div>
            {/* Inner bright glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-400 blur-sm opacity-60"></div>
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
              {/* Timeline node/icon with pulse animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: index * 0.2 + 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 z-20"
              >
                {/* Animated pulse rings */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} opacity-40`}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.1, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} opacity-30`}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3 + 0.5,
                  }}
                />
                
                {/* Static glow effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} opacity-70 blur-lg`}></div>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} opacity-50 blur-xl`}></div>
                
                {/* Icon container */}
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${getTypeColor(event.type)} flex items-center justify-center text-white shadow-2xl border-4 border-slate-950 backdrop-blur-sm`}>
                  {event.icon}
                </div>
              </motion.div>

              <div className="ml-20 sm:ml-24 md:ml-0">
                <motion.div
                  whileHover={{ 
                    y: -8,
                    scale: 1.015,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="backdrop-blur-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-white/10 hover:border-blue-400/60 transition-all duration-500 ease-out shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-blue-500/30 group relative overflow-hidden"
                >
                  {/* Background glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Soft glow border effect - enhanced on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-3xl border border-blue-400/40 blur-sm"></div>
                    <div className="absolute inset-0 rounded-3xl border border-blue-400/30 blur-md"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Header section with icon and year */}
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {/* Type icon badge */}
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(event.type)} blur-lg opacity-60 rounded-xl`}></div>
                        <div className={`relative backdrop-blur-sm bg-gradient-to-br ${getTypeColor(event.type)} bg-opacity-20 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/20 shadow-lg`}>
                          <div className="text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                            {event.icon}
                          </div>
                        </div>
                      </div>
                      
                      {/* Year badge */}
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-r ${getTypeColor(event.type)} blur-lg opacity-70 rounded-full`}></div>
                        <span className={`relative inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r ${getTypeColor(event.type)} text-white shadow-xl border border-white/20`}>
                          {event.year}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-50 transition-colors leading-tight">
                      {event.title}
                    </h3>
                    
                    {/* Organization/Context */}
                    <div className="mb-2 sm:mb-3">
                      <p className="text-cyan-400 text-xs sm:text-sm font-semibold group-hover:text-cyan-300 transition-colors">
                        {event.organization}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 group-hover:text-slate-300 transition-colors leading-relaxed">
                      {event.description}
                    </p>

                    {/* Divider */}
                    <div className="relative h-px mb-3 sm:mb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
                    </div>

                    {/* Achievements list */}
                    <ul className="space-y-2">
                      {event.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-slate-300 text-sm flex items-start gap-2 group-hover:text-slate-200 transition-colors"
                        >
                          <span className="text-blue-400 mt-1 text-base group-hover:text-blue-300 transition-colors">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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
