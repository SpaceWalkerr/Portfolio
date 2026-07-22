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
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Footer = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t-4 border-double border-ink bg-paper-bright text-ink">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          {/* Colophon */}
          <div>
            <span className="font-editorial text-xl italic">The Nandan Review</span>
            <p className="mt-3 max-w-sm font-editorial text-[14px] leading-relaxed text-ink-mute">
              Full-Stack Developer passionate about building high-performance web applications,
              AI-powered systems, and user-focused platforms.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="border border-ink/30 p-2.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Index */}
          <div>
            <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              The Index
            </span>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="font-editorial text-[15px] italic text-ink hover:text-oxblood"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Correspondence */}
          <div>
            <span className="font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              Correspondence
            </span>
            <ul className="mt-4 space-y-2 font-editorial text-[15px] italic">
              <li>
                <a href="mailto:surajnandan78@gmail.com" className="text-ink hover:text-oxblood">
                  surajnandan78@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+916203484989" className="text-ink hover:text-oxblood">
                  +91 6203484989
                </a>
              </li>
              <li className="text-ink-mute">Kishanganj, Bihar, India</li>
            </ul>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="mt-4 border border-ink px-4 py-2 font-monopress text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              The Résumé
            </button>
          </div>
        </div>

        {/* Masthead bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink pt-6 font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute sm:flex-row">
          <p>© {currentYear} The Nandan Review — All Rights Reserved</p>
          <p>Set in Archivo, Newsreader &amp; Space Mono</p>
        </div>
      </div>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </footer>
  );
};

export default Footer;
