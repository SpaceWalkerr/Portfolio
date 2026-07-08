import { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, Braces } from 'lucide-react';
import { ResumeModal } from './ResumeModal';

const Footer = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={18} />, url: 'https://github.com/SpaceWalkerr', label: 'GitHub' },
    { icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/surajnandan/', label: 'LinkedIn' },
    { icon: <Braces size={18} />, url: 'https://leetcode.com/u/SurajNandan/', label: 'LeetCode' },
    { icon: <Twitter size={18} />, url: 'https://x.com/SurajNandan1625', label: 'Twitter' },
    { icon: <Mail size={18} />, url: 'mailto:surajnandan78@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/[0.03] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-purple-500/[0.03] rounded-full blur-3xl"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 mb-10 sm:mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Suraj Nandan
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-5">
              Full Stack Developer passionate about building high-performance web applications, AI-powered systems, and user-focused platforms.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
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
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-slate-400 text-sm hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:surajnandan78@gmail.com"
                  className="text-slate-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                >
                  surajnandan78@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+916203484989"
                  className="text-slate-400 text-sm hover:text-cyan-400 transition-colors duration-300"
                >
                  +91 6203484989
                </a>
              </li>
              <li>
                <span className="text-slate-400 text-sm">Kishanganj, Bihar, India</span>
              </li>
            </ul>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/50 transition-all duration-300"
              >
                View Resume
                <ArrowUp className="w-3 h-3 rotate-45" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">
              © {currentYear} Suraj Nandan. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs flex items-center gap-1.5">
              Built with <Heart size={12} className="text-red-400 fill-red-400" /> by Suraj Nandan
            </p>
          </div>
        </div>
      </div>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </footer>
  );
};

export default Footer;
