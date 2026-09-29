import { config } from "./config";

export async function* streamChat(
  systemPrompt: string,
  userPrompt: string,
  signal?: AbortSignal,
) {
  const res = await fetch(`${config.OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: config.CHAT_MODEL,
      stream: true,
      keep_alive: "10m",
      options: { temperature: 0.2, num_predict: 512 },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`Ollama chat failed: ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.trim()) continue;
      const parsed = JSON.parse(line);
      if (parsed.message?.content) yield parsed.message.content as string;
      if (parsed.done) return;
    }
  }

  if (buffer.trim()) {
    const parsed = JSON.parse(buffer);
    if (parsed.message?.content) yield parsed.message.content as string;
  }
}