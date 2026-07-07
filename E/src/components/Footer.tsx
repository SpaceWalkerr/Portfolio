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
  { href: '#home', label: 'Cover' },
  { href: '#about', label: 'Subject' },
  { href: '#skills', label: 'Methods' },
  { href: '#experience', label: 'Timeline' },
  { href: '#projects', label: 'Evidence' },
  { href: '#contact', label: 'File a Tip' },
];

const Footer = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t-4 border-double border-ink bg-paper-deep text-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-blood">Case Closed &middot; SN-2026</div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          <div>
            <span className="font-display text-xl uppercase tracking-tight text-ink">Suraj Nandan</span>
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
                  className="border-2 border-ink/30 p-2.5 text-ink transition-colors hover:border-blood hover:text-blood"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">Index</span>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="font-mono text-[13px] text-ink hover:text-blood">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">Correspondence</span>
            <ul className="mt-4 space-y-2 font-mono text-[13px]">
              <li>
                <a href="mailto:surajnandan78@gmail.com" className="text-ink hover:text-blood">
                  surajnandan78@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+916203484989" className="text-ink hover:text-blood">
                  +91 6203484989
                </a>
              </li>
              <li className="text-ink-mute">Kishanganj, Bihar, India</li>
            </ul>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="mt-4 border-2 border-ink/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-blood hover:text-blood"
            >
              Full Dossier
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-ink/40 pt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute sm:flex-row">
          <p>&copy; {currentYear} Suraj Nandan &mdash; Case Closed, File 8 of 8</p>
          <p>Set in Special Elite &amp; Courier Prime</p>
        </div>
      </div>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </footer>
  );
};

export default Footer;
