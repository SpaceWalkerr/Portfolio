import React, { useEffect, useRef } from 'react';
import { Code, Palette, Zap } from 'lucide-react';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { icon: Code, title: 'Development', description: 'Full-stack development with modern technologies' },
    { icon: Palette, title: 'Design', description: 'UI/UX design with attention to detail' },
    { icon: Zap, title: 'Performance', description: 'Optimized solutions for maximum impact' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div ref={aboutRef} className="opacity-0 transform translate-y-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate developer who loves creating beautiful, functional digital experiences. 
              With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Developer workspace"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Crafting Digital Excellence
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating 
                responsive, user-friendly applications that solve real-world problems. My approach 
                combines technical expertise with creative problem-solving.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I believe in continuous learning and staying up-to-date with the latest technologies 
                to deliver cutting-edge solutions that exceed expectations.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <skill.icon size={32} className="text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{skill.title}</h4>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;