import { motion } from 'framer-motion';
import { Code2, Sparkles, Rocket, Award, Zap, Target } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Years Experience', value: '3+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies', value: '20+' },
  ];

  const highlights = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: 'Clean Code',
      description: 'Maintainable & scalable',
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Innovation',
      description: 'Cutting-edge tech',
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: 'Performance',
      description: 'Fast & efficient',
    },
  ];

  return (
    <section 
      id="about" 
      className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

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
              Get to know me
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Me
          </h2>
          
          {/* Futuristic Divider Line */}
          <div className="relative h-px w-full max-w-md">
            {/* Main gradient line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm opacity-30"></div>
            {/* Accent dots */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            className="space-y-8"
          >
            <div className="space-y-8 text-slate-300 leading-relaxed">
              <p className="text-lg sm:text-xl text-slate-200">
                I'm a full-stack developer who loves turning complex challenges into elegant, 
                user-focused solutions. My work bridges modern web technologies and AI, creating 
                applications that are both powerful and intuitive.
              </p>
              <p className="text-base sm:text-lg">
                Problem-solving is at the heart of what I do. Whether it's optimizing performance, 
                architecting scalable systems, or implementing cutting-edge features, I approach 
                each challenge with curiosity and a commitment to clean, maintainable code.
              </p>
              <p className="text-base sm:text-lg">
                I believe in continuous learning and staying ahead of the curve. Beyond writing 
                code, I contribute to open-source projects and engage with the developer community, 
                always seeking to grow and share knowledge along the way.
              </p>
            </div>

            {/* Highlight Tags/Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: 0.5,
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="flex flex-wrap gap-3"
            >
              {[
                'Problem Solver',
                'Fast Learner',
                'Team Player',
                'AI Enthusiast',
              ].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: 0.4 + index * 0.15,
                    duration: 0.6,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg text-cyan-400">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Decorative Profile Highlight Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.9,
              delay: 0.3,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            className="relative"
          >
            <motion.div 
              className="sticky top-8"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Main Glassmorphism Card */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-800/40 rounded-3xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-cyan-500/10 transition-shadow duration-500">
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
                
                {/* Soft border glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
                
                <div className="relative space-y-6">
                  {/* Profile Header */}
                  <div className="space-y-4 pb-6 border-b border-slate-700/50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white">
                          Full Stack Developer
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">Available Remotely</span>
                        </div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      "Passionate about building intelligent systems that solve real-world problems"
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          delay: 0.5 + index * 0.1,
                          duration: 0.6,
                          ease: [0.25, 0.4, 0.25, 1]
                        }}
                        className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                      >
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-400">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

                  {/* Key Strengths */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-cyan-400" />
                      Key Strengths
                    </h3>
                    <div className="space-y-3">
                      {[
                        { icon: <Zap className="w-4 h-4" />, text: 'Fast Learner & Adaptable' },
                        { icon: <Target className="w-4 h-4" />, text: 'Problem Solver' },
                        { icon: <Rocket className="w-4 h-4" />, text: 'Team Player' },
                      ].map((strength, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ 
                            delay: 0.7 + index * 0.1,
                            duration: 0.5,
                            ease: [0.25, 0.4, 0.25, 1]
                          }}
                          className="flex items-center gap-3 text-slate-300"
                        >
                          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                            {strength.icon}
                          </div>
                          <span className="text-sm">{strength.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Divider - Remove old availability badge since we have it in header */}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Stat Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: '50+', label: 'Projects Built' },
              { value: '20+', label: 'Technologies Used' },
              { value: '10+', label: 'Certifications Earned' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: 0.4 + index * 0.15,
                  duration: 0.6,
                  ease: [0.25, 0.4, 0.25, 1]
                }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-800/40 rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="relative text-center space-y-2">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-base text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
