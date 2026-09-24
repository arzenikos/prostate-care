import { useState, useRef, useEffect } from "react";
import { Eye, Paperclip, Mic, ArrowUp, X, Loader2 } from "lucide-react";

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
  const [showSource, setShowSource] = useState(false);
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
      setShowSource(false);
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
    setShowSource(false);
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
    const blocks = text.split(/\n{2,}/);
    return blocks.map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h3 key={i} className="text-[15px] font-semibold mb-2 mt-3 first:mt-0" style={{ color: CREAM }}>
            {block.replace(/^## /, "")}
          </h3>
        );
      }
      if (block.split("\n").every((l) => l.trim().startsWith("- ") || l.trim() === "")) {
        const items = block.split("\n").filter((l) => l.trim().startsWith("- "));
        return (
          <ul key={i} className="text-[13px] leading-relaxed mb-3 list-disc pl-4" style={{ color: CREAM_DIM }}>
            {items.map((item, j) => (
              <li key={j}>{item.replace(/^- /, "")}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-[13px] leading-relaxed mb-3" style={{ color: CREAM_DIM }}>
          {block}
        </p>
      );
    });
  }

  return (
    <>
      {messages.length === 0 && !loading && (
        <div className="px-6 pb-3">
          <p className="text-[13px] mb-3 text-center" style={{ color: CREAM_DIM }}>
            Start with a question about prostate cancer, treatment, or support.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {starterQuestions.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => handleSend(starter)}
                className="rounded-full px-3 py-2 text-left text-[12px] transition-colors hover:brightness-110"
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
            <button
              onClick={() => setShowSource((v) => !v)}
              aria-label="Toggle sources"
              className="mb-3 opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1.5"
              style={{ color: CREAM }}
            >
              <Eye size={16} />
              <span className="text-[12px]">
                {sources.length} source{sources.length > 1 ? "s" : ""}
              </span>
            </button>
          )}

          {/* Mobile: inline sheet, not side-docked (no room off-canvas) */}
          {showSource && sources.length > 0 && (
            <div className="md:hidden mb-3 space-y-2">
              {sources.map((s) => (
                <div
                  key={s.slug + s.heading}
                  className="rounded-lg px-3 py-2.5"
                  style={{ background: NAVY_DEEP, border: `1px solid ${HAIRLINE}` }}
                >
                  <p className="text-[11px] leading-snug" style={{ color: CREAM }}>
                    {s.title}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: ACCENT }}>
                    {s.heading}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Input bar */}
      <div className="shrink-0 pb-7 pt-2">
        <div className="flex flex-col rounded-xl px-4 py-5.5" style={{ background: CREAM }}>
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
              onClick={loading ? handleStop : handleSend}
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
      {showSource && sources.length > 0 && (
        <div
          className="hidden md:block absolute top-24 -right-3 translate-x-full w-56 rounded-xl shadow-xl overflow-hidden max-h-[60vh] overflow-y-auto"
          style={{ background: NAVY_DEEP, border: `1px solid ${HAIRLINE}` }}
        >
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <p className="text-[11px] font-medium" style={{ color: CREAM_DIM }}>
              Sources
            </p>
            <button
              onClick={() => setShowSource(false)}
              aria-label="Close sources"
              className="opacity-50 hover:opacity-90 shrink-0"
              style={{ color: CREAM }}
            >
              <X size={12} />
            </button>
          </div>
          {sources.map((s, i) => (
            <div
              key={s.slug + s.heading}
              className="px-3 py-2.5"
              style={{ borderTop: i > 0 ? `1px solid ${HAIRLINE}` : "none" }}
            >
              <p className="text-[11px] leading-snug" style={{ color: CREAM }}>
                {s.title}
              </p>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }}>
                  {s.url}
                </a>
              ) : (
                <p style={{ color: ACCENT }}>{s.heading}</p>
              )}
              
            </div>
          ))}
        </div>
      )}
    </>
  );
}