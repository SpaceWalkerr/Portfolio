import { useState } from 'react';

interface ContactSectionProps {
  isActive: boolean;
}

const ContactSection = ({ isActive }: ContactSectionProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // TODO: Implement actual form submission
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 2000);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
      <div className="max-w-xl w-full mx-8 pointer-events-auto">
        {/* Section header */}
        <div className="mb-6 text-center animate-fade-in">
          <div className="flex items-center gap-4 justify-center mb-2">
            <span className="text-4xl">📡</span>
            <div>
              <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest">
                DEEP SPACE STATION
              </div>
              <h2 className="font-orbitron text-3xl md:text-4xl text-primary neon-text-cyan">
                Contact
              </h2>
            </div>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mt-2 mx-auto" />
        </div>

        {/* Transmission console */}
        <div 
          className="glass-panel-strong p-6 relative overflow-hidden animate-scale-in"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Console header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-neon-gold" />
              <div className="w-3 h-3 rounded-full bg-neon-green" />
            </div>
            <div className="font-orbitron text-xs text-muted-foreground tracking-widest flex-1 text-center">
              INTERSTELLAR TRANSMISSION CONSOLE
            </div>
            <div className={`w-2 h-2 rounded-full ${sent ? 'bg-neon-green' : 'bg-primary'} animate-glow-pulse`} />
          </div>

          {/* Status messages */}
          {sent && (
            <div className="mb-4 p-3 bg-neon-green/10 border border-neon-green rounded text-center animate-fade-in">
              <div className="font-orbitron text-neon-green text-sm">
                ✓ TRANSMISSION SENT SUCCESSFULLY
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Message received at Deep Space Station Alpha
              </div>
            </div>
          )}

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <label className="block text-[10px] text-muted-foreground font-orbitron tracking-widest mb-2">
                SENDER IDENTIFICATION
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="transmission-input"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              <label className="block text-[10px] text-muted-foreground font-orbitron tracking-widest mb-2">
                RETURN FREQUENCY
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="transmission-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
              <label className="block text-[10px] text-muted-foreground font-orbitron tracking-widest mb-2">
                MESSAGE PAYLOAD
              </label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="transmission-input min-h-[120px] resize-none"
                placeholder="Compose your message..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="cockpit-button w-full animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  TRANSMITTING...
                </span>
              ) : (
                '📤 TRANSMIT MESSAGE'
              )}
            </button>
          </form>

          {/* Social links */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-[10px] text-muted-foreground font-orbitron tracking-widest text-center mb-4">
              ALTERNATIVE FREQUENCIES
            </div>
            <div className="flex justify-center gap-4">
              {/* TODO: Replace with your actual social links */}
              {[
                { icon: '💼', label: 'LinkedIn', url: '#' },
                { icon: '🐙', label: 'GitHub', url: '#' },
                { icon: '📧', label: 'Email', url: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="glass-panel px-4 py-2 flex items-center gap-2 hover:border-primary transition-all duration-300 hover:scale-105"
                >
                  <span>{social.icon}</span>
                  <span className="font-orbitron text-xs">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Decorative scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-full" style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.03) 3px, rgba(0,255,255,0.03) 6px)'
            }} />
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-6 text-center text-muted-foreground text-xs font-orbitron animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <span>END OF JOURNEY • AWAITING RESPONSE</span>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
