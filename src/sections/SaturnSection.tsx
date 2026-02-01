interface SaturnSectionProps {
  isActive: boolean;
}

const aboutData = {
  name: "Commander [Your Name]",
  title: "Full-Stack Developer & Space Enthusiast",
  bio: "Navigating the vast universe of code, I craft digital experiences that push the boundaries of what's possible. With a passion for clean architecture and innovative solutions, I transform complex problems into elegant applications.",
  skills: [
    { name: "Frontend", items: ["React", "Vue", "TypeScript", "Tailwind"] },
    { name: "Backend", items: ["Node.js", "Python", "Go", "PostgreSQL"] },
    { name: "DevOps", items: ["Docker", "K8s", "AWS", "CI/CD"] },
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Coffee Consumed", value: "∞" },
  ],
  // TODO: Replace with your actual data
};

const SaturnSection = ({ isActive }: SaturnSectionProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-end pointer-events-none">
      <div className="mr-8 md:mr-16 max-w-lg pointer-events-auto">
        {/* Section header */}
        <div className="mb-6 text-right animate-slide-in-right">
          <div className="flex items-center gap-4 justify-end mb-2">
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest">
                PLANET SATURN
              </div>
              <h2 className="font-orbitron text-3xl md:text-4xl text-planet-saturn">
                About Me
              </h2>
            </div>
            <span className="text-4xl">🪐</span>
          </div>
          <div className="h-px w-32 bg-gradient-to-l from-planet-saturn to-transparent mt-2 ml-auto" />
        </div>

        {/* Profile hologram card */}
        <div 
          className="glass-panel-strong p-6 relative overflow-hidden animate-scale-in hologram"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Avatar placeholder */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-planet-saturn to-accent flex items-center justify-center text-4xl shrink-0">
              👨‍🚀
            </div>
            <div>
              <h3 className="font-orbitron text-xl text-foreground mb-1">
                {aboutData.name}
              </h3>
              <p className="text-sm text-planet-saturn font-medium">
                {aboutData.title}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {aboutData.bio}
          </p>

          {/* Skills */}
          <div className="space-y-3 mb-6">
            {aboutData.skills.map((skillGroup, index) => (
              <div 
                key={index}
                className="animate-slide-in-right"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="text-[10px] text-muted-foreground font-orbitron mb-1">
                  {skillGroup.name}
                </div>
                <div className="flex flex-wrap gap-1">
                  {skillGroup.items.map((skill, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-muted text-foreground rounded font-exo
                                 hover:bg-planet-saturn/20 hover:text-planet-saturn transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-between border-t border-border pt-4">
            {aboutData.stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="font-orbitron text-2xl text-planet-saturn">
                  {stat.value}
                </div>
                <div className="text-[10px] text-muted-foreground font-orbitron">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-planet-saturn/50" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-planet-saturn/50" />
        </div>

        {/* Decorative element */}
        <div className="mt-6 flex items-center gap-2 text-muted-foreground text-xs font-orbitron justify-end animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <span>PROFILE SCAN COMPLETE</span>
          <div className="w-2 h-2 rounded-full bg-planet-saturn animate-glow-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SaturnSection;
