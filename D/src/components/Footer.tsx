import { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Braces } from 'lucide-react';
import { ResumeModal } from './ResumeModal';

const socialLinks = [
  { icon: <Github size={16} />, url: 'https://github.com/SpaceWalkerr', label: 'GitHub' },
  { icon: <Linkedin size={16} />, url: 'https://www.linkedin.com/in/surajnandan/', label: 'LinkedIn' },
  { icon: <Braces size={16} />, url: 'https://leetcode.com/u/SurajNandan/', label: 'LeetCode' },
  { icon: <Twitter size={16} />, url: 'https://x.com/SurajNandan1625', label: 'Twitter' },
  { icon: <Mail size={16} />, url: 'mailto:surajnandan78@gmail.com', label: 'Email' },
];

const quickLinks = [
  { href: '#home', label: './boot' },
  { href: '#about', label: './whoami' },
  { href: '#skills', label: './stack' },
  { href: '#experience', label: './log' },
  { href: '#projects', label: './ls_projects' },
  { href: '#contact', label: './connect' },
];

const Footer = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neon-cyan/20 bg-void-deep text-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan-bright">
          process exited with code 0
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          <div>
            <span className="neon-text-glow font-display text-xl font-black uppercase tracking-wide text-ink">
              suraj_nandan
            </span>
            <p className="mt-3 max-w-sm font-mono text-[13px] leading-relaxed text-ink-mute">
              Full-Stack Developer passionate about building high-performance web applications, AI-powered systems,
              and user-focused platforms.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="border border-neon-cyan/25 p-2.5 text-ink transition-colors hover:border-neon-pink hover:text-neon-pink"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan-bright">index</span>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="font-mono text-[13px] text-ink hover:text-neon-pink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan-bright">connect</span>
            <ul className="mt-4 space-y-2 font-mono text-[13px]">
              <li>
                <a href="mailto:surajnandan78@gmail.com" className="text-ink hover:text-neon-pink">
                  surajnandan78@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+916203484989" className="text-ink hover:text-neon-pink">
                  +91 6203484989
                </a>
              </li>
              <li className="text-ink-mute">Kishanganj, Bihar, India</li>
            </ul>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="mt-4 border border-neon-cyan/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-neon-pink hover:text-neon-pink"
            >
              resume.pdf
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute sm:flex-row">
          <p>&copy; {currentYear} suraj_nandan &mdash; session terminated cleanly</p>
          <p>set in JetBrains Mono &amp; Orbitron</p>
        </div>
      </div>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </footer>
  );
};

export default Footer;
