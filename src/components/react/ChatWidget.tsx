import { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input }];
    setMessages(next);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: next }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let assistantMsg = '';
    setMessages([...next, { role: 'assistant', content: '' }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantMsg += decoder.decode(value);
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: assistantMsg }]);
    }
    setLoading(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-full bg-navy text-cream p-4 shadow-lg"
        aria-label="Open chat"
      >
        💬
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed bottom-6 right-6 w-80 h-96 bg-cream border border-navy rounded-lg shadow-xl flex flex-col"
    >
      <div className="flex justify-between items-center p-3 border-b border-navy/20">
        <span className="font-semibold text-navy">Pamana Assistant</span>
        <button onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <p key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className="inline-block px-3 py-2 rounded-lg bg-navy/10">{m.content}</span>
          </p>
        ))}
        {loading && <p className="text-navy/50 text-sm">thinking…</p>}
      </div>

      <div className="p-3 border-t border-navy/20 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Ask something…"
        />
        <button onClick={send} className="text-navy">Send</button>
      </div>
    </div>
  );
}