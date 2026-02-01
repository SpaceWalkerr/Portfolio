import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Code } from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: '2024',
      title: 'Senior Full Stack Developer',
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
    <section id="timeline" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              <div className="flex items-center md:justify-center mb-4">
                <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${getTypeColor(event.type)} flex items-center justify-center text-white shadow-lg z-10`}>
                  {event.icon}
                </div>
              </div>

              <div className={`ml-24 md:ml-0 ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}`}>
                <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3 bg-gradient-to-r ${getTypeColor(event.type)} text-white`}>
                    {event.year}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 mb-4">{event.description}</p>

                  <ul className="space-y-2">
                    {event.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-gray-300 text-sm flex items-start gap-2"
                      >
                        <span className="text-cyan-400 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
