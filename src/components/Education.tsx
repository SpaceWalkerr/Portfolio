import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'SRM Institute of Science and Technology',
      location: 'Chennai, India',
      period: '2023 - 2027',
      status: 'Currently Pursuing',
      cgpa: '9.50/10.0 CGPA',
      gradient: 'from-cyan-500 to-blue-600',
      highlights: [
        'Active member of Computer Society of India (CSI)',
        'GeeksforGeeks Campus Ambassador (Campus Mantri)',
        'Multiple hackathon and competition participations',
      ],
      coursework: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'Computer Networks',
        'Object Oriented Programming',
        'Database Management Systems',
        'Machine Learning',
      ],
    },
    {
      degree: 'Senior Secondary (Class XII), CBSE - PCM with Computer Science',
      institution: 'Adarsh Jain Dharmic Shiksha Sadan, Najafgarh',
      location: 'New Delhi, India',
      period: '2021 - 2022',
      status: 'Completed',
      cgpa: '87.2%',
      gradient: 'from-blue-500 to-purple-600',
      highlights: [
        'Focused on Physics, Chemistry & Mathematics',
        'Active in science and technology events',
      ],
    },
    {
      degree: 'Secondary (Class X), CBSE',
      institution: 'Bal Mandir Sr. Sec. School',
      location: 'New Delhi, India',
      period: '2019 - 2020',
      status: 'Completed',
      cgpa: '93.6%',
      gradient: 'from-purple-500 to-pink-600',
      highlights: [
        'Scored 93.6% in CBSE board examinations',
        'Built an early foundation in mathematics and science',
      ],
    },
  ];

  return (
    <section
      id="education"
      className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/[0.05] rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-500/[0.04] via-blue-500/[0.03] to-cyan-500/[0.04] rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
              Academic Background
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Education
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
            My academic journey that built the foundation for my career in software development and AI.
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

        {/* Education Cards */}
        <div className="space-y-8 sm:space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.01,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="group relative"
            >
              {/* Enhanced glassmorphism card */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-700/40 group-hover:border-cyan-500/60 transition-all duration-500 shadow-xl shadow-black/30 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 relative overflow-hidden">
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-blue-500/[0.03] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${edu.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700`}></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} blur-lg opacity-70 rounded-xl`}></div>
                        <div className={`relative backdrop-blur-sm bg-gradient-to-br ${edu.gradient} p-3.5 rounded-xl border border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Degree & Institution */}
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-50 transition-colors duration-300 mb-2">
                          {edu.degree}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${edu.gradient} text-white font-semibold text-sm`}>
                            <BookOpen className="w-3.5 h-3.5" />
                            {edu.institution}
                          </span>
                          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="hidden sm:flex items-center gap-2">
                      {edu.status === 'Currently Pursuing' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          {edu.status}
                        </span>
                      )}
                      {edu.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                          <Award className="w-3 h-3" />
                          {edu.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Location & CGPA row */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {edu.location}
                    </span>
                    {edu.cgpa && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
                        <Award className="w-3 h-3" />
                        {edu.cgpa}
                      </span>
                    )}
                    {/* Mobile status badge */}
                    <span className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">
                      {edu.status === 'Currently Pursuing' && <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>}
                      {edu.status}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="relative h-px mb-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm"></div>
                  </div>

                  {/* Grid: Highlights & Coursework */}
                  <div className={`grid ${edu.coursework ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
                    {/* Highlights */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                        Highlights
                      </h4>
                      <ul className="space-y-3">
                        {edu.highlights.map((highlight, hIndex) => (
                          <motion.li
                            key={hIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + hIndex * 0.05 }}
                            className="flex items-start gap-3 text-slate-200 text-sm group/item"
                          >
                            <div className="relative flex-shrink-0 mt-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover/item:shadow-lg group-hover/item:shadow-cyan-400/50 transition-shadow"></div>
                            </div>
                            <span className="group-hover/item:text-white transition-colors">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Coursework */}
                    {edu.coursework && (
                      <div>
                        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                          Key Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, cIndex) => (
                            <motion.span
                              key={cIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.15 + cIndex * 0.04 }}
                              whileHover={{ scale: 1.05 }}
                              className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-slate-700/50 bg-slate-800/40 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 cursor-default"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
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

export default Education;
