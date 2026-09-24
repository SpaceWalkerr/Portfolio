import { renderInline } from '../lib/inline';

/**
 * Block markdown for the experience reports: "### " headings and paragraphs
 * separated by blank lines. Deliberately tiny — the data files stay plain
 * text so the Ask-the-Editor assistant can read them too.
 */
const RichText = ({ content }: { content: string }) => (
  <div className="space-y-4">
    {content.split(/\n\s*\n/).map((block, i) =>
      block.startsWith('### ') ? (
        <h4 key={i} className="mt-6 border-b border-ink/10 pb-1 font-bold text-oxblood first:mt-0">
          {block.slice(4)}
        </h4>
      ) : (
        <p key={i}>{renderInline(block)}</p>
      )
    )}
  </div>
);

export default RichText;
