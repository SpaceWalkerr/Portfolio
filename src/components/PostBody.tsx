/**
 * Renders a Post's plain-text body with light markdown-ish formatting.
 * Shared by the Blog modal (Blog.tsx) and the standalone /blog/:slug page.
 */
const PostBody = ({ content }: { content: string }) => (
  <div className="prose-custom font-editorial text-[16px] leading-relaxed text-ink">
    {content.split('\n').map((line, i) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} className="mt-8 mb-3 font-display text-lg font-bold uppercase tracking-[-0.01em]">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="mt-10 mb-4 font-display text-xl font-black uppercase tracking-[-0.01em]">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
        if (match) {
          return (
            <li key={i} className="ml-5 mb-2 list-disc font-editorial text-[15px] leading-relaxed">
              <strong className="font-bold text-ink">{match[1]}:</strong>{' '}
              <span className="text-ink-mute">{match[2]}</span>
            </li>
          );
        }
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-5 mb-1.5 list-disc font-editorial text-[15px] leading-relaxed text-ink-mute">
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="ml-5 mb-1.5 list-decimal font-editorial text-[15px] leading-relaxed text-ink-mute">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={i} className="h-4" />;
      }
      return (
        <p key={i} className="mb-4 font-editorial text-[15px] leading-relaxed text-ink last:mb-0">
          {line}
        </p>
      );
    })}
  </div>
);

export default PostBody;
