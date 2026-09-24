import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, ArrowUp, RotateCcw } from 'lucide-react';
import { renderInline } from '../lib/inline';
import { useDialog } from '../hooks/useDialog';

/**
 * "Ask the Editor" — a small chat that answers questions about Suraj's work,
 * grounded in the site's own content (see api/chat.ts). The launcher only
 * appears once the API reports it's configured.
 */

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'press-editor-chat';

const suggestions = [
  'What has Suraj built with AI?',
  'Summarise his professional experience',
  'Which project best shows his backend skills?',
  'Is he open to internships?',
];

const loadHistory = (): Message[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch {
    return [];
  }
};

const AskEditor = () => {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const panelRef = useDialog(open, () => setOpen(false));

  // Only show the desk once the server says the Editor is on duty
  useEffect(() => {
    fetch('/api/chat')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setReady(Boolean(d?.ready)))
      .catch(() => setReady(false));
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      /* storage unavailable */
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || busy) return;
    const history: Message[] = [...messages, { role: 'user', content: text }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const write = (content: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => null);
        write(err?.error ?? 'The Editor is unavailable right now. Try email instead.');
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        write(answer);
      }
      if (!answer.trim()) write('No answer came back — try rephrasing the question.');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') write('Connection lost. Try again.');
    } finally {
      setBusy(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setBusy(false);
  };

  if (!ready) return null;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 left-5 z-50 flex items-center gap-2 border-2 border-ink bg-paper px-4 py-3 font-monopress text-[10px] uppercase tracking-[0.16em] text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-all hover:-translate-y-1 hover:bg-ink hover:text-paper sm:left-8"
          >
            <MessageSquareText size={15} />
            Ask the Editor
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Ask the Editor"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-[70] flex max-h-[min(640px,calc(100dvh-1.5rem))] flex-col border-2 border-ink bg-paper shadow-2xl sm:inset-x-auto sm:bottom-8 sm:left-8 sm:w-[400px]"
          >
            {/* Masthead */}
            <div className="flex items-center justify-between border-b-4 border-double border-ink px-4 py-2.5">
              <div>
                <span className="block font-editorial text-lg italic leading-none">The Letters Desk</span>
                <span className="mt-1 block font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                  Ask the Editor about Suraj's work
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Start over"
                    className="border border-ink/30 p-1.5 text-ink-mute transition-colors hover:border-ink hover:text-ink"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="border border-ink/40 p-1.5 text-ink transition-colors hover:border-oxblood hover:text-oxblood"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Correspondence */}
            <div ref={listRef} aria-live="polite" className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
              {messages.length === 0 ? (
                <div>
                  <p className="font-editorial text-[15px] italic leading-relaxed text-ink-mute">
                    Dear reader — ask anything about Suraj's projects, experience, or skills. Answers come
                    straight from this paper's own pages.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="border border-ink/30 px-3 py-2 text-left font-editorial text-[14px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) =>
                  m.role === 'user' ? (
                    <div key={i} className="ml-8 border-l-2 border-oxblood pl-3">
                      <span className="block font-monopress text-[9px] uppercase tracking-[0.16em] text-oxblood">
                        You wrote
                      </span>
                      <p className="mt-1 font-editorial text-[14.5px] leading-relaxed text-ink">{m.content}</p>
                    </div>
                  ) : (
                    <div key={i}>
                      <span className="block font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                        The Editor replies
                      </span>
                      {m.content ? (
                        <div className="mt-1 space-y-2.5 font-editorial text-[14.5px] leading-relaxed text-ink">
                          {m.content.split(/\n\s*\n/).map((para, j) => (
                            <p key={j}>{renderInline(para)}</p>
                          ))}
                        </div>
                      ) : (
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="mt-1 block font-monopress text-[10px] uppercase tracking-[0.2em] text-ink-faint"
                        >
                          Setting type…
                        </motion.span>
                      )}
                    </div>
                  )
                )
              )}
            </div>

            {/* Compose */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-end gap-2 border-t border-ink p-3"
            >
              <label htmlFor="ask-editor-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="ask-editor-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 1500))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                rows={1}
                placeholder="Ask about a project, a role, a skill…"
                className="max-h-28 min-h-[42px] flex-1 resize-none border border-ink/40 bg-paper-bright px-3 py-2.5 font-editorial text-[14.5px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send question"
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center bg-ink text-paper transition-colors hover:bg-oxblood disabled:opacity-40"
              >
                <ArrowUp size={17} />
              </button>
            </form>
            <p className="px-3 pb-2 font-monopress text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">
              AI-generated from this site's content — verify details with Suraj.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskEditor;
