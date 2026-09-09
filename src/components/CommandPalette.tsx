import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Wrench,
  Briefcase,
  GraduationCap,
  Newspaper,
  Award,
  Mail,
  FileText,
  Github,
  Linkedin,
  Sun,
  Moon,
  Lamp,
  ArrowUpRight,
  CornerDownLeft,
} from 'lucide-react';
import type { Theme } from '../App';
import { projects } from '../data/projects';
import { posts } from '../data/posts';

export const OPEN_COMMAND_PALETTE = 'open-command-palette';
export const openCommandPalette = () => window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE));

interface CommandPaletteProps {
  theme: Theme;
  onSetTheme: (t: Theme) => void;
}

const sections = [
  { id: '#home', label: 'Home', Icon: Home },
  { id: '#about', label: 'About', Icon: User },
  { id: '#skills', label: 'Skills', Icon: Wrench },
  { id: '#experience', label: 'Experience', Icon: Briefcase },
  { id: '#education', label: 'Education', Icon: GraduationCap },
  { id: '#projects', label: 'Projects', Icon: Newspaper },
  { id: '#certifications', label: 'Certifications', Icon: Award },
  { id: '#blog', label: 'Blog', Icon: Newspaper },
  { id: '#contact', label: 'Contact', Icon: Mail },
];

const themes: { key: Theme; label: string; Icon: typeof Sun }[] = [
  { key: 'day', label: 'Day Edition', Icon: Sun },
  { key: 'night', label: 'Night Edition', Icon: Moon },
  { key: 'sepia', label: 'Sepia Edition', Icon: Lamp },
];

const CommandPalette = ({ theme, onSetTheme }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE, onOpen);
    };
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    // let the dialog unmount before navigating / scrolling
    setTimeout(fn, 0);
  }, []);

  const goSection = (id: string) =>
    run(() => {
      if (window.location.pathname !== '/') {
        navigate(`/${id}`);
      } else {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', `/${id}`);
      }
    });

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/60 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl overflow-hidden border-2 border-ink bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              label="Command palette"
              className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-monopress [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-ink-mute"
            >
              <div className="flex items-center gap-2 border-b-2 border-double border-ink px-4">
                <span className="font-editorial text-sm italic text-ink-mute">The Index</span>
                <Command.Input
                  autoFocus
                  placeholder="Jump to a section, project, or article…"
                  className="w-full bg-transparent py-3.5 font-monopress text-[12px] uppercase tracking-[0.1em] text-ink placeholder:text-ink-faint placeholder:normal-case focus:outline-none"
                />
                <kbd className="hidden shrink-0 border border-ink/30 px-1.5 py-0.5 font-monopress text-[9px] text-ink-mute sm:block">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[52vh] overflow-y-auto py-2">
                <Command.Empty className="px-4 py-6 text-center font-editorial text-sm italic text-ink-mute">
                  Nothing filed under that.
                </Command.Empty>

                <Command.Group heading="Navigate">
                  {sections.map(({ id, label, Icon }) => (
                    <Item key={id} onSelect={() => goSection(id)}>
                      <Icon size={14} />
                      {label}
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Edition">
                  {themes.map(({ key, label, Icon }) => (
                    <Item key={key} onSelect={() => run(() => onSetTheme(key))}>
                      <Icon size={14} />
                      {label}
                      {theme === key && (
                        <span className="ml-auto font-monopress text-[9px] uppercase tracking-[0.14em] text-oxblood">
                          Current
                        </span>
                      )}
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Projects">
                  {projects.map((p) => (
                    <Item
                      key={p.slug}
                      value={`project ${p.name} ${p.title} ${p.tags.join(' ')}`}
                      onSelect={() => run(() => navigate(`/projects/${p.slug}`))}
                    >
                      <Newspaper size={14} />
                      <span className="truncate">{p.name}</span>
                      <span className="ml-auto shrink-0 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                        {p.category}
                      </span>
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Articles">
                  {posts.map((post) => (
                    <Item
                      key={post.slug}
                      value={`article ${post.title} ${post.tags.join(' ')}`}
                      onSelect={() => run(() => navigate(`/blog/${post.slug}`))}
                    >
                      <FileText size={14} />
                      <span className="truncate">{post.title}</span>
                    </Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Elsewhere">
                  <Item onSelect={() => run(() => window.open('/Suraj_Resume.pdf', '_blank'))}>
                    <FileText size={14} /> Résumé (full) <ArrowUpRight size={12} className="ml-auto text-ink-faint" />
                  </Item>
                  <Item onSelect={() => run(() => window.open('/Suraj_Resume_1Page.pdf', '_blank'))}>
                    <FileText size={14} /> Résumé (one page) <ArrowUpRight size={12} className="ml-auto text-ink-faint" />
                  </Item>
                  <Item
                    value="github source code"
                    onSelect={() => run(() => window.open('https://github.com/SpaceWalkerr', '_blank'))}
                  >
                    <Github size={14} /> GitHub <ArrowUpRight size={12} className="ml-auto text-ink-faint" />
                  </Item>
                  <Item
                    value="linkedin"
                    onSelect={() => run(() => window.open('https://www.linkedin.com/in/surajnandan/', '_blank'))}
                  >
                    <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} className="ml-auto text-ink-faint" />
                  </Item>
                  <Item
                    value="email contact"
                    onSelect={() => run(() => (window.location.href = 'mailto:surajnandan78@gmail.com'))}
                  >
                    <Mail size={14} /> Email <ArrowUpRight size={12} className="ml-auto text-ink-faint" />
                  </Item>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-ink/20 px-4 py-2 font-monopress text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                <span className="flex items-center gap-1.5">
                  <CornerDownLeft size={11} /> Select
                </span>
                <span>↑↓ Navigate</span>
                <span>⌘K Toggle</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const Item = ({
  children,
  onSelect,
  value,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  value?: string;
}) => (
  <Command.Item
    value={value}
    onSelect={onSelect}
    className="mx-2 flex cursor-pointer items-center gap-3 px-2 py-2.5 font-monopress text-[11px] uppercase tracking-[0.1em] text-ink-mute transition-colors data-[selected=true]:bg-ink data-[selected=true]:text-paper"
  >
    {children}
  </Command.Item>
);

export default CommandPalette;
