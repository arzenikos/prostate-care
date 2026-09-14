import { useState } from 'react';

export default function ChatWidget() {
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState('');

  async function send() {
    const next = [...messages, { role: 'user', content: input }];
    setMessages(next);
    setInput('');

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
      setMessages([...next, { role: 'assistant', content: assistantMsg }]);
    }
  }

  return (
    <div>
      {messages.map((m, i) => <p key={i}><b>{m.role}:</b> {m.content}</p>)}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}