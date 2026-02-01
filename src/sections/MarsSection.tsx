interface MarsSectionProps {
  isActive: boolean;
}

const certifications = [
  {
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    icon: "☁️",
    // TODO: Replace with your actual certifications
  },
  {
    name: "Google Cloud Professional",
    issuer: "Google",
    year: "2022",
    icon: "🌐",
  },
  {
    name: "Kubernetes Administrator",
    issuer: "CNCF",
    year: "2022",
    icon: "⚙️",
  },
  {
    name: "React Advanced Patterns",
    issuer: "Frontend Masters",
    year: "2023",
    icon: "⚛️",
  },
];

const MarsSection = ({ isActive }: MarsSectionProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-end pointer-events-none">
      <div className="mr-8 md:mr-16 max-w-xl pointer-events-auto">
        {/* Section header */}
        <div className="mb-6 text-right animate-slide-in-right">
          <div className="flex items-center gap-4 justify-end mb-2">
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest">
                PLANET MARS
              </div>
              <h2 className="font-orbitron text-3xl md:text-4xl text-planet-mars">
                Certifications
              </h2>
            </div>
            <span className="text-4xl">🔴</span>
          </div>
          <div className="h-px w-32 bg-gradient-to-l from-planet-mars to-transparent mt-2 ml-auto" />
        </div>

        {/* Certification badges - orbiting style grid */}
        <div className="grid grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative animate-scale-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div 
                className="glass-panel-strong p-4 text-center transition-all duration-300 
                           hover:scale-105 hover:border-planet-mars cursor-pointer
                           float"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="text-3xl mb-2">{cert.icon}</div>
                <h3 className="font-orbitron text-sm text-foreground mb-1 line-clamp-2">
                  {cert.name}
                </h3>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                <div className="mt-2 text-[10px] text-planet-mars font-orbitron">
                  {cert.year}
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{ boxShadow: '0 0 30px hsl(var(--planet-mars) / 0.5)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-6 flex items-center gap-2 text-muted-foreground text-xs font-orbitron justify-end animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <span>HOVER BADGES FOR DETAILS</span>
          <div className="w-2 h-2 rounded-full bg-planet-mars animate-glow-pulse" />
        </div>
      </div>
    </div>
  );
};

export default MarsSection;
