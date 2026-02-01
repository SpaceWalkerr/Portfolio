import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'AWS Certified Solutions Architect',
      platform: 'Amazon Web Services',
      year: '2024',
      icon: '☁️',
    },
    {
      title: 'Meta Front-End Developer Professional',
      platform: 'Meta via Coursera',
      year: '2024',
      icon: '⚛️',
    },
    {
      title: 'Google Cloud Associate Engineer',
      platform: 'Google Cloud',
      year: '2023',
      icon: '🔧',
    },
    {
      title: 'Machine Learning Specialization',
      platform: 'DeepLearning.AI',
      year: '2023',
      icon: '🤖',
    },
    {
      title: 'Full Stack Web Development',
      platform: 'freeCodeCamp',
      year: '2023',
      icon: '💻',
    },
    {
      title: 'Docker Certified Associate',
      platform: 'Docker Inc.',
      year: '2022',
      icon: '🐳',
    },
  ];

  const achievements = [
    '🏆 Won Best Innovation Award at Tech Hackathon 2024',
    '🌟 Contributed to 50+ open-source projects',
    '📝 Published 20+ technical articles',
    '🎓 Mentored 100+ aspiring developers',
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-bl-full blur-xl"></div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white pr-2">
                      {cert.title}
                    </h3>
                    <Award className="text-cyan-400 flex-shrink-0" size={20} />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{cert.platform}</p>
                  <p className="text-cyan-400 text-sm font-semibold">{cert.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            Notable Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 text-gray-300"
              >
                <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                <span>{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
