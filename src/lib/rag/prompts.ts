import type { RetrievedChunk } from "./repository";
import type { ChatMessage } from "./llm";

const SYSTEM_PROMPT = `You answer questions using ONLY the numbered context passages provided.
- If the context does not contain the answer, say so plainly. Do not guess.
- Cite passages inline using their numbers, e.g. [1] or [2][3].
- Be concise and use plain language.`;

export function buildContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map((c, i) => `[${i + 1}] (${c.source}, p.${c.page ?? "?"})\n${c.content}`)
    .join("\n\n---\n\n");
}

export function buildMessages(question: string, chunks: RetrievedChunk[]): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Context:\n${buildContext(chunks)}\n\nQuestion: ${question}`,
    },
  ];
}