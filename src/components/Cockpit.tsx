import { useState, useEffect } from 'react';

interface CockpitProps {
  onLaunch: () => void;
  isLaunched: boolean;
}

const Cockpit = ({ onLaunch, isLaunched }: CockpitProps) => {
  const [systemsReady, setSystemsReady] = useState(false);
  const [bootSequence, setBootSequence] = useState<string[]>([]);

  useEffect(() => {
    // Simulate boot sequence
    const messages = [
      '> Initializing navigation systems...',
      '> Loading star charts...',
      '> Calibrating thrusters...',
      '> Life support: ONLINE',
      '> All systems nominal.',
      '> Ready for launch, Commander.',
    ];

    messages.forEach((msg, i) => {
      setTimeout(() => {
        setBootSequence(prev => [...prev, msg]);
        if (i === messages.length - 1) {
          setSystemsReady(true);
        }
      }, 500 + i * 400);
    });
  }, []);

  if (isLaunched) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Cockpit frame overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top HUD bar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent">
          <div className="flex justify-between items-start px-8 pt-4">
            <div className="glass-panel px-6 py-2">
              <span className="font-orbitron text-xs text-primary tracking-widest">
                STELLAR NAVIGATOR v2.0
              </span>
            </div>
            <div className="glass-panel px-6 py-2 flex gap-6">
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground font-orbitron">FUEL</div>
                <div className="text-primary font-orbitron text-sm neon-text-cyan">100%</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground font-orbitron">O2</div>
                <div className="text-neon-green font-orbitron text-sm">OPTIMAL</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground font-orbitron">SHIELDS</div>
                <div className="text-neon-gold font-orbitron text-sm">ACTIVE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        {/* Side panels */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-32">
          <div className="h-full flex flex-col justify-center gap-4 pl-4">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i}
                className="h-16 w-20 glass-panel flex items-center justify-center"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div 
                  className={`w-3 h-3 rounded-full ${
                    i <= bootSequence.length / 2 ? 'bg-neon-green animate-glow-pulse' : 'bg-muted'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-1/4 bottom-1/4 w-32">
          <div className="h-full flex flex-col justify-center gap-4 pr-4 items-end">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i}
                className="h-16 w-20 glass-panel flex items-center justify-center"
              >
                <div className="w-full h-2 bg-muted mx-2 rounded overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ 
                      width: bootSequence.length > i ? '100%' : '0%',
                      transitionDelay: `${i * 0.3}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 text-center max-w-3xl px-8">
        {/* Boot sequence terminal */}
        <div className="glass-panel-strong p-6 mb-8 text-left font-mono text-sm">
          <div className="text-primary mb-2 font-orbitron text-xs tracking-wider">
            // SYSTEM BOOT SEQUENCE
          </div>
          <div className="space-y-1 h-36 overflow-hidden">
            {bootSequence.map((msg, i) => (
              <div 
                key={i} 
                className="text-foreground/80 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {msg}
              </div>
            ))}
          </div>
        </div>

        {/* Welcome message */}
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-4 neon-text-cyan">
          Welcome, Commander
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-exo">
          Destination: <span className="text-secondary neon-text-magenta">Experience Galaxy</span>
        </p>
        <p className="text-muted-foreground mb-12 font-exo">
          Prepare for an interstellar journey through my portfolio
        </p>

        {/* Launch button */}
        <button
          onClick={onLaunch}
          disabled={!systemsReady}
          className={`
            cockpit-button text-xl
            ${!systemsReady ? 'opacity-50 cursor-not-allowed' : 'animate-glow-pulse'}
          `}
        >
          {systemsReady ? '⚡ INITIATE LAUNCH ⚡' : 'SYSTEMS LOADING...'}
        </button>

        {/* Decorative corners */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />
      </div>
    </div>
  );
};

export default Cockpit;
