import { useState, useRef, useEffect } from "react";
import { Paperclip, Mic, ArrowUp, X, Loader2, ExternalLink } from "lucide-react";

/**
 * PrometheusChatContent — the "action stuff" only.
 *
 * No open/close state here — PrometheusChat.astro owns visibility via
 * plain CSS classes and a <script>. This island just handles: the
 * input, the streaming fetch to /api/chat, the answer body, and the
 * sources card. It resets itself on "prometheus:closed" so reopening
 * the panel doesn't show a stale answer.
 *
 * Expected backend contract — see api-chat-route.ts:
 * - POST /api/chat with { messages, persona }
 * - Response header "X-Sources": URI-encoded JSON array of
 *     { slug: string; title: string; heading: string }
 * - Response body: plain-text token stream of the answer
 */

const NAVY = "#171a2e";
const NAVY_DEEP = "#101226";
const HAIRLINE = "rgba(226,224,216,0.12)";
const CREAM = "#F4F1EA";
const CREAM_DIM = "rgba(244,241,234,0.62)";
const ACCENT = "#8B93F8";

interface Source {
  slug: string;
  title: string;
  heading: string;
  url?: string;
}

interface Props {
  persona?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const starterQuestions = [
  "What are the early signs of prostate cancer?",
  "What questions should I ask my healthcare team?",
  "How can I support my wellbeing during treatment?",
];

export default function PrometheusChatContent({ persona = "patient" }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const streamTextRef = useRef("");

  // Astro dispatches these on the collapsed/expanded toggle
  useEffect(() => {
    function handleOpened() {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    function handleClosed() {
      abortRef.current?.abort();
      setMessages([]);
      setAnswer("");
      setSources([]);
      setSelectedSource(null);
      setError(null);
      setLoading(false);
      setInput("");
    }

    window.addEventListener("prometheus:opened", handleOpened);
    window.addEventListener("prometheus:closed", handleClosed);
    return () => {
      window.removeEventListener("prometheus:opened", handleOpened);
      window.removeEventListener("prometheus:closed", handleClosed);
    };
  }, []);

  async function handleSend(prompt = input) {
    const q = prompt.trim();
    if (!q || loading) return;

    const conversation = [...messages, { role: "user" as const, content: q }];
    setMessages(conversation);
    setInput("");
    setAnswer("");
    setSources([]);
    setSelectedSource(null);
    setError(null);
    setLoading(true);
    console.info("[chat] sending prompt");
    window.dispatchEvent(new CustomEvent("prometheus:generating"));

    const controller = new AbortController();
    abortRef.current = controller;
    streamTextRef.current = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation,
          persona,
        }),
        signal: controller.signal,
      });
      console.info(`[chat] response status ${res.status}`);

      if (!res.ok || !res.body) throw new Error(`Request failed (${res.status})`);

      const rawSources = res.headers.get("X-Sources");
      if (rawSources) {
        try {
          setSources(JSON.parse(decodeURIComponent(rawSources)));
        } catch {
          // malformed header shouldn't break the answer stream
        }
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        streamTextRef.current = acc;
        setAnswer(acc);
      }
      if (acc) {
        setMessages((previous) => [...previous, { role: "assistant", content: acc }]);
        setAnswer("");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("[chat] request failed", err);
        setError("Something went wrong reaching the assistant. Try again.");
      } else if (streamTextRef.current) {
        setMessages((previous) => [...previous, { role: "assistant", content: streamTextRef.current }]);
        setAnswer("");
      }
    } finally {
      console.info("[chat] request finished");
      setLoading(false);
      window.dispatchEvent(new CustomEvent("prometheus:generated"));
    }
  }

  function handleStop() {
    console.info("[chat] stopping response");
    abortRef.current?.abort();
    setLoading(false);
    window.dispatchEvent(new CustomEvent("prometheus:generated"));
  }

  function renderAnswer(text: string) {
    function renderInline(value: string) {
      const parts = value.split(/(\*\*[^*]+\*\*|\[[0-9]+\])/g);
      return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={index}
              className="font-semibold"
              style={{ color: CREAM, fontFamily: "inherit" }}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (/^\[[0-9]+\]$/.test(part)) {
          return <span key={index} className="font-semibold" style={{ color: ACCENT }}>{part}</span>;
        }
        return part;
      });
    }

    const blocks = text.split(/\n{2,}/);
    return blocks.map((block, i) => {
      if (/^### /.test(block)) {
        return (
          <h4 key={i} className="text-[12px] font-semibold uppercase tracking-[0.08em] mb-1.5 mt-3 first:mt-0" style={{ color: ACCENT }}>
            {renderInline(block.replace(/^### /, ""))}
          </h4>
        );
      }
      if (/^## /.test(block)) {
        return (
          <h3 key={i} className="text-[15px] font-semibold mb-2 mt-3 first:mt-0" style={{ color: CREAM }}>
            {renderInline(block.replace(/^## /, ""))}
          </h3>
        );
      }
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length > 0 && lines.every((line) => /^[-*] /.test(line))) {
        return (
          <ul key={i} className="text-[13px] leading-relaxed mb-3 list-disc pl-4 space-y-1" style={{ color: CREAM_DIM }}>
            {lines.map((item, j) => (
              <li key={j}>{renderInline(item.replace(/^[-*] /, ""))}</li>
            ))}
          </ul>
        );
      }
      if (lines.length > 0 && lines.every((line) => /^\d+[.)] /.test(line))) {
        return (
          <ol key={i} className="text-[13px] leading-relaxed mb-3 list-decimal pl-4 space-y-1" style={{ color: CREAM_DIM }}>
            {lines.map((item, j) => (
              <li key={j}>{renderInline(item.replace(/^\d+[.)] /, ""))}</li>
            ))}
          </ol>
        );
      }
      if (lines.length === 1 && /^> /.test(lines[0])) {
        return (
          <blockquote key={i} className="mb-3 border-l-2 pl-3 text-[12px] italic leading-relaxed" style={{ borderColor: ACCENT, color: CREAM_DIM }}>
            {renderInline(lines[0].replace(/^> /, ""))}
          </blockquote>
        );
      }
      return (
        <p key={i} className="text-[13px] leading-relaxed mb-3" style={{ color: CREAM_DIM }}>
          {renderInline(block)}
        </p>
      );
    });
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col"
      style={{ fontFamily: "var(--font-sans)", fontSize: "13px" }}
    >
      {messages.length === 0 && !loading && (
        <div className="mt-auto shrink-0 px-6 pb-3">
          <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>
            Start a conversation
          </p>
          <p className="text-[13px] mb-3 text-center" style={{ color: CREAM_DIM }}>
            Choose a question about prostate cancer, treatment, or support.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {starterQuestions.map((starter) => (
              <button
                key={starter}
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => void handleSend(starter)}
                className="pointer-events-auto rounded-xl px-3 py-2.5 text-left text-[12px] leading-snug transition-colors hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#8B93F8]"
                style={{ background: NAVY, color: CREAM, border: `1px solid ${HAIRLINE}` }}
              >
                {starter}
              </button>
            ))}
          </div>
        </div>
      )}

      {(messages.length > 0 || loading) && (
        <div className="prometheus-conversation min-h-0 flex-1 px-6 pb-2 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-3`}>
              <div
                className="max-w-[78%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed"
                style={{
                  background: message.role === "user" ? ACCENT : NAVY,
                  color: message.role === "user" ? NAVY_DEEP : CREAM,
                  borderBottomRightRadius: message.role === "user" ? "0.25rem" : undefined,
                  borderBottomLeftRadius: message.role === "assistant" ? "0.25rem" : undefined,
                }}
              >
                {message.role === "assistant" ? renderAnswer(message.content) : message.content}
              </div>
            </div>
          ))}

          {loading && !answer && (
            <div className="flex justify-start mb-3">
              <div className="max-w-[78%] rounded-2xl rounded-bl-md px-4 py-2.5 flex items-center gap-2" style={{ background: NAVY, color: CREAM_DIM }}>
              <Loader2 size={14} className="animate-spin" />
              <span className="text-[13px]">Thinking…</span>
              </div>
            </div>
          )}

          {error && (
            <p className="text-[13px] mb-3" style={{ color: "#E8A0A0" }}>
              {error}
            </p>
          )}

          {answer && (
            <div className="flex justify-start mb-3">
              <div className="max-w-[78%] rounded-2xl rounded-bl-md px-4 py-2.5" style={{ background: NAVY, color: CREAM }}>
                {renderAnswer(answer)}
              </div>
            </div>
          )}

          {sources.length > 0 && (
            <ul className="mb-3 space-y-1 pl-4 list-disc" aria-label="Sources">
              {sources.map((source) => (
                <li key={source.slug + source.heading}>
                  <a
                    href={source.url}
                    onClick={() => setSelectedSource(source)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left text-[11px] italic opacity-60 hover:opacity-100 transition-opacity underline"
                    style={{ color: CREAM }}
                  >
                    {source.title}
                    {source.heading !== "Web resource" ? ` (${source.heading})` : ""}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile: inline sheet, not side-docked (no room off-canvas) */}
          {selectedSource && (
            <div className="md:hidden mb-3 space-y-2">
              <div className="rounded-lg px-3 py-2.5" style={{ background: NAVY_DEEP, border: `1px solid ${HAIRLINE}` }}>
                <p className="text-[11px] leading-snug" style={{ color: CREAM }}>{selectedSource.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: ACCENT }}>{selectedSource.heading}</p>
                {selectedSource.url && (
                  <a href={selectedSource.url} target="_blank" rel="noopener noreferrer" className="text-[11px] underline" style={{ color: CREAM }}>
                    Open resource
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input bar */}
      <div className="mt-auto shrink-0 px-2 pb-2 pt-3">
        <div className="flex flex-col rounded-xl p-5" style={{ background: CREAM }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Enter your question about prostate health."
            className="bg-transparent outline-none text-[13px] mb-10"
            style={{ color: NAVY_DEEP }}
            disabled={loading}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button aria-label="Attach file" style={{ color: NAVY }} className="opacity-60 hover:opacity-100">
                <Paperclip size={15} />
              </button>
              <button aria-label="Voice input" style={{ color: NAVY }} className="opacity-60 hover:opacity-100">
                <Mic size={15} />
              </button>
            </div>
            <button
              onClick={() => (loading ? handleStop() : handleSend())}
              aria-label={loading ? "Stop generating" : "Send"}
              disabled={!loading && !input.trim()}
              className="w-7 h-7 rounded-full flex items-center justify-center disabled:opacity-40"
              style={{ background: NAVY }}
            >
              {loading ? (
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: CREAM }} />
              ) : (
                <ArrowUp size={14} style={{ color: CREAM }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: docked card to the right edge of the .astro panel
          (positions off the nearest `position: relative` ancestor,
          which lives in PrometheusChat.astro — works fine across the
          Astro/React boundary since it's just CSS) */}
      {selectedSource && (
        <aside
          className="hidden md:flex absolute top-0 right-0 h-full w-1/3 flex-col shadow-xl overflow-hidden"
          style={{ background: NAVY_DEEP, borderLeft: `1px solid ${HAIRLINE}` }}
          aria-label={`Preview of ${selectedSource.title}`}
        >
          <div className="flex items-start justify-between gap-2 px-3 pt-4 pb-3">
            <div>
              <p className="text-[11px] font-medium leading-snug" style={{ color: CREAM }}>{selectedSource.title}</p>
              <p className="text-[10px] mt-1" style={{ color: ACCENT }}>{selectedSource.heading}</p>
            </div>
            <button
              onClick={() => setSelectedSource(null)}
              aria-label="Close source preview"
              className="opacity-60 hover:opacity-100 shrink-0"
              style={{ color: CREAM }}
            >
              <X size={12} />
            </button>
          </div>
          <div className="min-h-0 flex-1 px-3 pb-3">
            {selectedSource.url?.toLowerCase().endsWith(".pdf") ? (
              <iframe
                title={`PDF preview of ${selectedSource.title}`}
                src={selectedSource.url}
                className="h-full w-full rounded border-0 bg-white"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <p className="text-[11px]" style={{ color: CREAM_DIM }}>Preview unavailable for this web resource.</p>
              </div>
            )}
          </div>
          {selectedSource.url && (
            <a
              href={selectedSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 px-3 py-3 text-[11px] underline"
              style={{ color: CREAM }}
            >
              Open resource <ExternalLink size={12} />
            </a>
          )}
        </aside>
      )}
    </div>
  );
}