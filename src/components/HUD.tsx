import { PLANET_POSITIONS } from './SpaceScene';

interface HUDProps {
  scrollProgress: number;
  currentSection: string;
  onNavigate: (section: string) => void;
}

const sections = [
  { id: 'earth', name: 'Education', icon: '🌍', color: 'planet-earth' },
  { id: 'mars', name: 'Certifications', icon: '🔴', color: 'planet-mars' },
  { id: 'venus', name: 'Projects', icon: '🟡', color: 'planet-venus' },
  { id: 'saturn', name: 'About Me', icon: '🪐', color: 'planet-saturn' },
  { id: 'station', name: 'Contact', icon: '📡', color: 'planet-station' },
];

const HUD = ({ scrollProgress, currentSection, onNavigate }: HUDProps) => {
  return (
    <div className="fixed z-40 pointer-events-none">
      {/* Top center - Current destination */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2">
        <div className="glass-panel px-8 py-3 pointer-events-auto">
          <div className="text-center">
            <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest mb-1">
              CURRENT DESTINATION
            </div>
            <div className="font-orbitron text-primary text-lg neon-text-cyan uppercase tracking-wider">
              {currentSection || 'Deep Space'}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2">
        <div className="glass-panel p-4 pointer-events-auto">
          <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest mb-4 text-center">
            NAVIGATION
          </div>
          <div className="space-y-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2 rounded
                  transition-all duration-300 group
                  ${currentSection === section.name 
                    ? 'bg-primary/20 border border-primary' 
                    : 'hover:bg-muted border border-transparent hover:border-primary/50'
                  }
                `}
              >
                <span className="text-lg">{section.icon}</span>
                <span className={`
                  font-orbitron text-xs tracking-wider
                  ${currentSection === section.name ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}
                `}>
                  {section.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Left side - Progress indicator */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2">
        <div className="glass-panel p-4">
          <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest mb-4 text-center">
            JOURNEY
          </div>
          <div className="relative h-64 w-2 bg-muted rounded-full mx-auto">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
            {/* Planet markers */}
            {sections.map((section, index) => {
              const position = (index + 1) / (sections.length + 1);
              return (
                <div
                  key={section.id}
                  className={`
                    absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
                    flex items-center justify-center text-[8px]
                    transition-all duration-300
                    ${scrollProgress >= position 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted'
                    }
                  `}
                  style={{ bottom: `${position * 100}%` }}
                >
                  {section.icon}
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <div className="text-primary font-orbitron text-lg">
              {Math.round(scrollProgress * 100)}%
            </div>
            <div className="text-[10px] text-muted-foreground font-orbitron">
              COMPLETE
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Speed indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <div className="glass-panel px-8 py-3">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground font-orbitron">VELOCITY</div>
              <div className="font-orbitron text-accent text-sm">
                {Math.round(scrollProgress * 9999)} km/s
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground font-orbitron">DISTANCE</div>
              <div className="font-orbitron text-accent text-sm">
                {Math.round(scrollProgress * 1000)} LY
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-[10px] text-muted-foreground font-orbitron">ETA</div>
              <div className="font-orbitron text-neon-green text-sm">
                {scrollProgress >= 0.95 ? 'ARRIVED' : `${Math.round((1 - scrollProgress) * 10)}min`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUD;
