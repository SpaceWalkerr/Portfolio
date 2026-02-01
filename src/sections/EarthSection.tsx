interface EarthSectionProps {
  isActive: boolean;
}

const educationData = [
  {
    degree: "Master's in Computer Science",
    institution: "Stellar University",
    year: "2020 - 2022",
    description: "Specialized in AI and Machine Learning. Graduated with honors.",
    // TODO: Replace with your actual education data
  },
  {
    degree: "Bachelor's in Software Engineering",
    institution: "Cosmic Institute of Technology",
    year: "2016 - 2020",
    description: "Focus on full-stack development and distributed systems.",
    // TODO: Replace with your actual education data
  },
];

const EarthSection = ({ isActive }: EarthSectionProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-start pointer-events-none">
      <div className="ml-8 md:ml-16 max-w-xl pointer-events-auto">
        {/* Section header */}
        <div className="mb-6 animate-slide-in-left">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">🌍</span>
            <div>
              <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest">
                PLANET EARTH
              </div>
              <h2 className="font-orbitron text-3xl md:text-4xl text-planet-earth neon-text-cyan">
                Education
              </h2>
            </div>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-planet-earth to-transparent mt-2" />
        </div>

        {/* Education cards */}
        <div className="space-y-4">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="planet-card hologram animate-slide-in-left"
              style={{ 
                animationDelay: `${0.2 + index * 0.15}s`,
                borderLeftColor: 'hsl(var(--planet-earth))'
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-orbitron text-lg text-foreground">
                  {edu.degree}
                </h3>
                <span className="text-xs text-planet-earth font-orbitron bg-planet-earth/10 px-2 py-1 rounded">
                  {edu.year}
                </span>
              </div>
              <p className="text-sm text-primary font-medium mb-2">
                {edu.institution}
              </p>
              <p className="text-sm text-muted-foreground">
                {edu.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-6 flex items-center gap-2 text-muted-foreground text-xs font-orbitron animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="w-2 h-2 rounded-full bg-planet-earth animate-glow-pulse" />
          <span>SCROLL TO CONTINUE JOURNEY</span>
        </div>
      </div>
    </div>
  );
};

export default EarthSection;
