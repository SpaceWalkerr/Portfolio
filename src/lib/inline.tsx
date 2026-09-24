import { Fragment, type ReactNode } from 'react';

/** Inline markdown: [text](url) links and `code`. */
export const renderInline = (text: string): ReactNode[] =>
  text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline decoration-ink/30 underline-offset-2 hover:text-oxblood hover:decoration-oxblood"
        >
          {link[1]}
        </a>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={i} className="bg-ink/[0.06] px-1 font-monopress text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
