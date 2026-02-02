import { motion } from 'framer-motion';
import { Award, ExternalLink, Trophy, Star } from 'lucide-react';
import { useState } from 'react';

const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const certifications = [
    // Featured/Priority Certificates
    { title: 'Human Computer Interaction', platform: 'NPTEL / IIT Delhi', year: 'Jan-Apr 2025', category: 'Certifications', url: '/certificates/human-computer-interaction-iit.pdf', featured: true, score: '90/100 - Gold Medal' },
    { title: 'Bootcamp on Big Data & Data Science', platform: 'C-DAC, NOIDA & SRM IST', year: 'Jan 2025', category: 'AI/ML', url: '/certificates/bootcamp-big-data-data-science.pdf', featured: true },
    { title: 'Campus Mantri (Campus Ambassador)', platform: 'GeeksforGeeks', year: '2024-2025', category: 'Certifications', url: '/certificates/campus-mantri-ambassador.pdf', featured: true, score: 'Completed 1 Year' },
    { title: 'International Conference on Viksit Bharat 2047', platform: 'Department of Chemistry, SRM IST', year: 'Feb 2025', category: 'Leadership', url: '/certificates/viksit-bharat-2047.pdf', featured: true, score: 'Lead Student Coordinator' },
    { title: 'Career Essentials in Generative AI by Microsoft and LinkedIn', platform: 'Microsoft and LinkedIn', year: 'November 2024', category: 'AI/ML', url: '/certificates/career-essentials-generative-ai.pdf', featured: true },
    { title: 'AI/ML for Geodata Analysis', platform: 'IIRS, ISRO', year: 'Aug 2024', category: 'AI/ML', url: '/certificates/aiml-geodata-analysis.pdf', featured: true, score: 'Computer Ethics, Generative AI' },
    { title: 'Brand Revamp (Innovate 2024) - I Position', platform: 'SRM Institute of Science & Technology', year: 'April 2024', category: 'Competitions', url: '/certificates/brand-revamp-innovate-2024.pdf', featured: true, score: 'Winner' },
    { title: 'FutureSkills PRIME Project', platform: 'NIELIT', year: '2024', category: 'AI/ML', url: '/certificates/futureskills-prime-project.pdf', featured: true },
    { title: 'Generative AI & Computer Ethics', platform: 'IIRS, ISRO', year: '2024', category: 'AI/ML', url: '/certificates/generative-ai-computer-ethics.pdf', featured: true },

    // Programming & Development
    { title: 'Alpha (DSA with Java)', platform: 'Apna College', year: '2024', category: 'Programming', url: '/certificates/alpha-dsa-java.pdf' },
    { title: 'Java (Basic)', platform: 'HackerRank', year: 'Sep 2024', category: 'Programming', url: '/certificates/java-basic-hackerrank.pdf' },
    { title: 'Java Internship', platform: 'Navodita Infotech', year: 'Oct 2024', category: 'Programming', url: '/certificates/java-internship-navodita.pdf' },
    { title: 'Python', platform: 'GUVI', year: 'Oct 2024', category: 'Programming', url: '/certificates/python-guvi.pdf' },
    { title: 'Python (Basic)', platform: 'HackerRank', year: 'Sep 2024', category: 'Programming', url: '/certificates/python-basic-hackerrank.pdf' },
    { title: 'Problem Solving (Basic)', platform: 'HackerRank', year: 'Oct 2024', category: 'Programming', url: '/certificates/problem-solving-basic.pdf' },
    { title: 'Problem Solving (Intermediate)', platform: 'HackerRank', year: 'Oct 2024', category: 'Programming', url: '/certificates/problem-solving-intermediate.pdf' },
    
    // Web & Full Stack
    { title: 'Full Stack Web Development', platform: 'freeCodeCamp', year: '2023', category: 'Web Development', url: '/certificates/fullstack-web-development.pdf' },
    { title: 'MongoDB Developer\'s Toolkit', platform: 'GeeksforGeeks', year: '2024', category: 'Web Development', url: '/certificates/mongodb-developers-toolkit.pdf' },
    
    // AI & Machine Learning (rest)
    { title: 'ChatGPT for Everyone', platform: 'Learn Prompting', year: 'Feb 2024', category: 'AI/ML', url: '/certificates/chatgpt-for-everyone.pdf' },
    { title: 'AI Builders Lab (Bootcamp)', platform: 'Google for Developers and Hack2skill', year: '2024', category: 'AI/ML', url: '/certificates/ai-builders-lab-bootcamp.pdf' },
    { title: 'SAWIT.AI Learnathon (Generative AI)', platform: 'GUVI / Google for Developers', year: 'Oct 2024', category: 'AI/ML', url: '/certificates/sawit-ai-learnathon.pdf' },
    
    // Cloud & DevOps
    { title: 'Core Computer Science Subject for Interview Preparation', platform: 'GeeksforGeeks', year: '2024', category: 'Cloud/DevOps', url: '/certificates/core-cs-interview-preparation.pdf' },
    
    // Certifications & Skill Badges (rest)
    { title: 'Human Computer Interaction at NPTEL using Adobe Express', platform: 'Adobe / NPTEL', year: '2024', category: 'Certifications', url: '/certificates/human-computer-interaction-nptel-adobe.pdf' },
    
    // Workshops & Bootcamps
    { title: 'Two Days Workshop on ArduBotics', platform: 'SRM Institute of Science & Technology', year: 'February 2024', category: 'Workshops', url: '/certificates/workshop-ardubotics.pdf' },
    
    // Competitions & Hackathons (rest)
    { title: 'Burnout (Innovate 2024) - Participation', platform: 'SRM Institute of Science & Technology', year: 'April 2024', category: 'Competitions', url: '/certificates/burnout-innovate-2024.pdf' },
    { title: 'Meditech Innovation (Innovate 2024) - Secured III Position', platform: 'SRM IST', year: 'April 2024', category: 'Competitions', url: '/certificates/meditech-innovation-secured.pdf' },
    { title: 'Meditech Innovation (Innovate 2024) - Confirmed III Position', platform: 'SRM IST', year: 'April 2024', category: 'Competitions', url: '/certificates/meditech-innovation-confirmed.pdf' },
    { title: 'Err Hunt 2.0', platform: 'Computer Society of India (SRMIST)', year: 'August 2024', category: 'Competitions', url: '/certificates/err-hunt-2-0.pdf' },
    { title: 'ERR-Hunt', platform: 'Computer Society of India (SRMIST)', year: 'September 2023', category: 'Competitions', url: '/certificates/err-hunt.pdf' },
    { title: 'Flipkart GRID 6.0 - Software Development Track (Level 1)', platform: 'Flipkart', year: '2024', category: 'Competitions', url: '/certificates/flipkart-grid-6-0.pdf' },
    { title: 'Folonite Winter Internship Contest 2024', platform: 'Folonite', year: '2024', category: 'Competitions', url: '/certificates/folonite-winter-internship-contest.pdf' },
    { title: 'HackFest Delhi/NCR Hackathon', platform: 'GeeksforGeeks', year: '2024', category: 'Competitions', url: '/certificates/hackfest-delhi-ncr.pdf' },
    { title: 'Geeks Challenge 1.0 - NIT Patna', platform: 'GeeksforGeeks', year: 'July 2024', category: 'Competitions', url: '/certificates/geeks-challenge-1-0-nit-patna.pdf' },
    { title: 'Shaastra Programming Contest', platform: 'IIT Madras (Shaastra 2025)', year: '2025', category: 'Competitions', url: '/certificates/shaastra-programming-contest.pdf' },
    { title: 'CodeWizard 25', platform: 'SRM Institute of Science and Technology', year: '2025', category: 'Competitions', url: '/certificates/codewizard-25.pdf' },
    { title: 'TATA Crucible Campus Quiz 2024', platform: 'Tata Group', year: '2024', category: 'Competitions', url: '/certificates/tata-crucible-campus-quiz.pdf' },
    { title: 'TechXNinjas Weekly Contest #11', platform: 'TechXNinjas', year: '2024', category: 'Competitions', url: '/certificates/techxninjas-weekly-contest-11.pdf' },
    
    // Leadership & Community (rest)
    { title: 'Certificate of Appreciation', platform: 'DevTown / MSME', year: 'Aug 2024', category: 'Leadership', url: '/certificates/certificate-appreciation-devtown.pdf' },
    { title: 'Certificate of Appreciation (Volunteering)', platform: 'Gift a Smile Foundation', year: 'March 2025', category: 'Leadership', url: '/certificates/certificate-appreciation-volunteering.pdf' },
    { title: 'Global Forum on Gender and Tech in The CSI TechNation\'25', platform: 'Computer Society of India (SRMIST)', year: 'February 2025', category: 'Leadership', url: '/certificates/global-forum-gender-tech-csi.pdf' },
    
    // National Programs
    { title: 'Quiz Programme on National Education Policy 2020', platform: 'SRM Institute of Science and Technology', year: '2024', category: 'National Programs', url: '/certificates/quiz-national-education-policy.pdf' },
    { title: 'National Science Day - 2025', platform: 'Dept. of Science & Technology, Govt. of India', year: 'Feb 2025', category: 'National Programs', url: '/certificates/national-science-day-2025.pdf' },
    { title: 'Wisdom War (National Science Day)', platform: 'SRM IST (Dept. of Chemistry)', year: 'Feb 2024', category: 'National Programs', url: '/certificates/wisdom-war-national-science-day.pdf' },
  ];

  const featuredCerts = certifications.filter(cert => cert.featured);
  const otherCerts = certifications.filter(cert => !cert.featured);

  const notableAchievements = [
    { icon: '🏆', title: 'NPTEL Gold Medal', description: 'Secured 90/100 score in Human Computer Interaction' },
    { icon: '🎓', title: 'Campus Mantri', description: 'GeeksforGeeks Campus Ambassador - Completed 1 Year' },
    { icon: '🤝', title: 'Lead Coordinator', description: 'International Conference on Viksit Bharat 2047' },
    { icon: '🏅', title: 'Innovate Winner', description: 'Won Brand Revamp Competition at Innovate X SRM 2024' },
    { icon: '🤖', title: 'AI/ML Expert', description: 'Specialized training from IIRS-ISRO in Geodata Analysis' },
    { icon: '📊', title: 'Big Data Master', description: 'Bootcamp on Big Data & Data Science - C-DAC, NOIDA' },
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

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          {['All', 'Featured', 'Programming', 'Web Development', 'AI/ML', 'Cloud/DevOps', 'Certifications', 'Workshops', 'Competitions', 'Leadership', 'National Programs'].map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800/30 backdrop-blur-sm text-slate-300 border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Certificates Section */}
        {(activeFilter === 'All' || activeFilter === 'Featured') && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-16 sm:mb-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Featured Achievements</h3>
              </div>
              <p className="text-slate-400 mb-8">My most impactful certifications and accomplishments</p>

              {/* Featured Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featuredCerts.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/[0.1] to-amber-500/[0.05] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-yellow-400/30 hover:border-yellow-300/60 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-yellow-400/20 group relative overflow-hidden"
                  >
                    {/* Featured Star Badge */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                      <span className="inline-block px-2 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full border border-yellow-300 shadow-lg shadow-yellow-400/50">
                        ⭐ Featured
                      </span>
                    </div>
                    
                    {/* Glassmorphism layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.03] via-transparent to-amber-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Award Icon */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 p-2.5 sm:p-3 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl text-yellow-400 group-hover:from-yellow-500/30 group-hover:to-amber-500/30 group-hover:text-yellow-300 transition-all duration-300 border border-yellow-400/30 group-hover:border-yellow-300/50">
                        <Trophy className="w-full h-full" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-yellow-50 transition-colors line-clamp-2">
                        {cert.title}
                      </h3>

                      {/* Platform */}
                      <p className="text-sm text-slate-400 mb-3 line-clamp-1 group-hover:text-slate-300 transition-colors">
                        {cert.platform}
                      </p>

                      {/* Score/Achievement if available */}
                      {cert.score && (
                        <p className="text-xs text-yellow-300/90 mb-2 font-semibold bg-yellow-400/20 px-2 py-1 rounded-full w-fit border border-yellow-400/30">
                          🎯 {cert.score}
                        </p>
                      )}

                      {/* Year and View Button */}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                          {cert.year}
                        </span>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 rounded-lg border border-yellow-400/30 hover:from-yellow-500/40 hover:to-amber-500/40 hover:text-yellow-200 hover:border-yellow-300/50 transition-all duration-300"
                          >
                            View
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Notable Achievements Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3
              }}
              className="mb-16 sm:mb-24"
            >
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">🎯</span>
                  Notable Achievements
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {notableAchievements.map((achievement, index) => (
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
                    className="backdrop-blur-xl bg-gradient-to-br from-purple-500/[0.08] to-pink-500/[0.05] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-purple-500/20 group relative overflow-hidden"
                  >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] via-transparent to-pink-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl">
                        {achievement.icon}
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
          </>
        )}

        {/* All Other Certifications Section */}
        {(activeFilter === 'All' || (activeFilter !== 'Featured' && activeFilter !== 'All')) && otherCerts.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="mb-12 sm:mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">All Other Certifications</h3>
              </div>

              {/* Certifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {(showAll ? otherCerts : otherCerts.slice(0, 9)).map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1,
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
              {/* Category Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                  {cert.category}
                </span>
              </div>
              
              {/* Glassmorphism layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Award Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 p-2.5 sm:p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-400 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 group-hover:text-cyan-300 transition-all duration-300 border border-cyan-500/30 group-hover:border-cyan-400/50">
                  <Award className="w-full h-full" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors line-clamp-2">
                  {cert.title}
                </h3>

                {/* Platform */}
                <p className="text-sm text-slate-400 mb-3 line-clamp-1 group-hover:text-slate-300 transition-colors">
                  {cert.platform}
                </p>

                {/* Year */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                    {cert.year}
                  </span>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:from-cyan-500/40 hover:to-blue-500/40 hover:text-cyan-200 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button for Other Certs */}
        {otherCerts.length > 9 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12 sm:mt-16"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 text-base font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-transparent shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 transition-all duration-300"
            >
              {showAll ? 'Show Less' : `View All (${otherCerts.length})`}
            </motion.button>
          </motion.div>
        )}
        </motion.div>
        </>
        )}
      </div>
    </section>
  );
};

export default Certifications;
