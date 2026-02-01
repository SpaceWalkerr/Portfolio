import { motion } from 'framer-motion';
import { Code2, Server, Database, Wrench } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Frontend',
      color: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Next.js', level: 80 },
        { name: 'Vue.js', level: 75 },
        { name: 'Redux', level: 85 },
      ],
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Backend',
      color: 'from-blue-500 to-purple-500',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'Express', level: 88 },
        { name: 'FastAPI', level: 80 },
        { name: 'REST APIs', level: 92 },
        { name: 'GraphQL', level: 75 },
      ],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Databases',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 88 },
        { name: 'Supabase', level: 90 },
        { name: 'Redis', level: 75 },
        { name: 'MySQL', level: 82 },
        { name: 'Firebase', level: 80 },
      ],
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Tools & AI',
      color: 'from-pink-500 to-cyan-500',
      skills: [
        { name: 'Git', level: 95 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Machine Learning', level: 70 },
        { name: 'TensorFlow', level: 68 },
        { name: 'OpenAI', level: 85 },
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements with enhanced glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      {/* Additional gradient glow layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/3 via-purple-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/4 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/4 rounded-full blur-3xl"></div>

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
              Technical Expertise
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Skills & Technologies
          </h2>
          
          {/* Futuristic Divider Line */}
          <div className="relative h-px w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm opacity-30"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
              {/* Glassmorphism Card */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-800/40 rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
                
                {/* Glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}></div>

                <div className="relative space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${category.color} bg-opacity-20 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Tags */}
                  <div className="space-y-3">
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
                        className="space-y-1.5 group/skill"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover/skill:text-cyan-400 transition-colors duration-200">
                            {skill.name}
                          </span>
                          <span className="text-xs text-slate-500 group-hover/skill:text-cyan-500 transition-colors duration-200">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 bg-slate-800/50 rounded-full overflow-hidden group-hover/skill:bg-slate-800/70 transition-colors duration-200">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.4 + index * 0.1 + skillIndex * 0.05,
                              duration: 1,
                              ease: [0.25, 0.4, 0.25, 1]
                            }}
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full shadow-sm group-hover/skill:shadow-lg group-hover/skill:shadow-cyan-500/30 transition-shadow duration-200`}
                          />
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
