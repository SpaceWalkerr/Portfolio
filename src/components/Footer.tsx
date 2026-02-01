import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={18} />, url: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail size={18} />, url: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5 py-8 sm:py-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/[0.03] rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* Name */}
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Suraj
            </h3>
            <p className="text-slate-400 text-sm">
              Full Stack Developer
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 backdrop-blur-sm bg-white/[0.03] rounded-lg text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-400/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              © {currentYear} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
