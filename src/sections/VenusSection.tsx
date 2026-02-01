import { useState } from 'react';

interface VenusSectionProps {
  isActive: boolean;
}

const projects = [
  {
    title: "Quantum Dashboard",
    description: "Real-time analytics platform with AI-powered insights and predictive modeling.",
    tech: ["React", "TypeScript", "D3.js", "Python"],
    image: "🚀",
    // TODO: Replace with your actual projects
  },
  {
    title: "Neural Commerce",
    description: "E-commerce platform with personalized recommendations using machine learning.",
    tech: ["Next.js", "Node.js", "TensorFlow", "PostgreSQL"],
    image: "🧠",
  },
  {
    title: "Stellar CMS",
    description: "Headless content management system with real-time collaboration features.",
    tech: ["Vue.js", "GraphQL", "MongoDB", "WebSockets"],
    image: "✨",
  },
];

const VenusSection = ({ isActive }: VenusSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-start pointer-events-none">
      <div className="ml-8 md:ml-16 max-w-2xl pointer-events-auto">
        {/* Section header */}
        <div className="mb-6 animate-slide-in-left">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">🟡</span>
            <div>
              <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest">
                PLANET VENUS
              </div>
              <h2 className="font-orbitron text-3xl md:text-4xl text-planet-venus neon-text-gold">
                Projects
              </h2>
            </div>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-planet-venus to-transparent mt-2" />
        </div>

        {/* Project screens */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 w-64 cursor-pointer transition-all duration-300
                animate-fade-in
                ${selectedProject === index ? 'scale-105' : 'hover:scale-102'}
              `}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
            >
              <div 
                className={`
                  glass-panel-strong p-6 h-full transition-all duration-300
                  ${selectedProject === index ? 'border-planet-venus' : ''}
                `}
                style={{
                  boxShadow: selectedProject === index 
                    ? '0 0 30px hsl(var(--planet-venus) / 0.5)' 
                    : 'none'
                }}
              >
                {/* Project icon */}
                <div className="text-5xl mb-4 text-center">{project.image}</div>
                
                {/* Project title */}
                <h3 className="font-orbitron text-lg text-foreground mb-2 text-center">
                  {project.title}
                </h3>
                
                {/* Description - shown when selected */}
                <div className={`
                  transition-all duration-300 overflow-hidden
                  ${selectedProject === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-[10px] px-2 py-1 bg-planet-venus/20 text-planet-venus rounded font-orbitron"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Click hint */}
                <div className={`
                  text-center text-[10px] text-muted-foreground font-orbitron mt-4
                  transition-opacity duration-300
                  ${selectedProject === index ? 'opacity-0' : 'opacity-100'}
                `}>
                  TAP TO EXPAND
                </div>

                {/* Hologram scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <div className="w-full h-full" style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-4 flex items-center gap-2 text-muted-foreground text-xs font-orbitron animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="w-2 h-2 rounded-full bg-planet-venus animate-glow-pulse" />
          <span>SELECT A PROJECT FOR DETAILS</span>
        </div>
      </div>
    </div>
  );
};

export default VenusSection;
