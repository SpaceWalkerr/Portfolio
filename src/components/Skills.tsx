import { motion } from 'framer-motion';
import { Code2, Globe, Server, Database, GraduationCap } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Programming Languages',
      color: 'from-blue-600 via-cyan-500 to-teal-500',
      borderColor: 'border-blue-500/50',
      glowColor: 'shadow-blue-500/20',
      hoverGlow: 'group-hover:shadow-blue-500/30',
      skills: [
        { name: 'Java', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'JavaScript', level: 88 },
      ],
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Frontend Development',
      color: 'from-violet-600 via-purple-500 to-fuchsia-500',
      borderColor: 'border-violet-500/50',
      glowColor: 'shadow-violet-500/20',
      hoverGlow: 'group-hover:shadow-violet-500/30',
      skills: [
        { name: 'React.js', level: 90 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
      ],
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Backend Development',
      color: 'from-emerald-600 via-green-500 to-teal-500',
      borderColor: 'border-emerald-500/50',
      glowColor: 'shadow-emerald-500/20',
      hoverGlow: 'group-hover:shadow-emerald-500/30',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 88 },
        { name: 'REST API Development', level: 90 },
      ],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Databases & Deployment',
      color: 'from-orange-600 via-amber-500 to-yellow-500',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/20',
      hoverGlow: 'group-hover:shadow-orange-500/30',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'Supabase', level: 88 },
        { name: 'Vercel', level: 90 },
        { name: 'Render', level: 85 },
        { name: 'GoDaddy', level: 80 },
      ],
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Core Computer Science',
      color: 'from-rose-600 via-pink-500 to-red-500',
      borderColor: 'border-rose-500/50',
      glowColor: 'shadow-rose-500/20',
      hoverGlow: 'group-hover:shadow-rose-500/30',
      skills: [
        { name: 'Data Structures & Algorithms', level: 90 },
        { name: 'Operating Systems', level: 85 },
        { name: 'Computer Networks', level: 85 },
        { name: 'Object Oriented Programming', level: 92 },
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Enhanced Background Gradient Layers */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gradient-radial from-blue-600/8 via-cyan-500/4 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-gradient-radial from-violet-600/8 via-purple-500/4 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-emerald-600/6 via-teal-500/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-gradient-radial from-rose-600/7 via-pink-500/4 to-transparent rounded-full blur-3xl"></div>
      </div>

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
            <div className="h-px w-12 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent"></div>
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
              Technical Expertise
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-6">
            Skills & Technologies
          </h2>
          
          {/* Enhanced Divider Line */}
          <div className="relative h-px w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-md opacity-40"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-400/60"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-cyan-400/60"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-400/60"></div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: 0.2 + index * 0.1,
                duration: 0.7,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="group relative cursor-pointer"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
              }}
            >
              {/* Premium Glassmorphism Card */}
              <div className={`relative backdrop-blur-xl bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-slate-800/60 rounded-2xl p-6 sm:p-8 border ${category.borderColor} transition-all duration-500 h-full shadow-xl ${category.glowColor} ${category.hoverGlow} group-hover:border-opacity-80`}>
                
                {/* Multi-layer Inner Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none"></div>
                
                {/* Outer Glow on Hover */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 -z-10`}></div>

                <div className="relative space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className={`relative p-3.5 bg-gradient-to-br ${category.color} rounded-xl text-white group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      {/* Icon glow */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}></div>
                      <div className="relative z-10">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, ${category.color.replace('from-', 'rgb(59 130 246)').replace('via-', 'rgb(6 182 212)').replace('to-', 'rgb(20 184 166)')})` }}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Progress Bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          delay: 0.3 + index * 0.1 + skillIndex * 0.05,
                          duration: 0.5,
                          ease: [0.25, 0.4, 0.25, 1]
                        }}
                        className="space-y-2 group/skill"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-200 group-hover/skill:text-white transition-colors duration-300">
                            {skill.name}
                          </span>
                          <span className={`text-xs font-bold text-slate-400 group-hover/skill:bg-gradient-to-r group-hover/skill:${category.color} group-hover/skill:bg-clip-text group-hover/skill:text-transparent transition-all duration-300`}>
                            {skill.level}%
                          </span>
                        </div>
                        {/* Enhanced Progress Bar */}
                        <div className="relative h-2 bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.4 + index * 0.1 + skillIndex * 0.05,
                              duration: 1.2,
                              ease: [0.25, 0.4, 0.25, 1]
                            }}
                            className={`relative h-full bg-gradient-to-r ${category.color} rounded-full`}
                          >
                            {/* Progress bar glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-50 blur-md`}></div>
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover/skill:animate-[shimmer_2s_ease-in-out_infinite]"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
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

export default Skills;
