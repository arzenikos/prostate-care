import { config } from "./config";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/** Streams plain-text tokens from Ollama's NDJSON chat stream. */
export async function streamChat(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch(`${config.OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: config.CHAT_MODEL, messages, stream: true }),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`Chat request failed (${res.status})`);

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return res.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const token = (JSON.parse(line) as { message?: { content?: string } }).message?.content;
          if (token) controller.enqueue(encoder.encode(token));
        }
      },
    }),
  );
}