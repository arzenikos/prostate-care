import type { RetrievedChunk } from "./repository";

export function buildSystemPrompt(): string {
  return [
    "You are a health-information assistant answering questions using ONLY the provided context.",
    "If the context does not contain the answer, say you don't have that information — never guess or use outside knowledge.",
    "Cite sources inline like [1], [2] matching the numbered context blocks.",
  ].join(" ");
}

export function buildContextBlock(chunks: RetrievedChunk[]): string {
  return chunks
    .map((c, i) => `[${i + 1}] (${c.sourcePath}, p.${c.pageNumber ?? "?"})\n${c.content}`)
    .join("\n\n");
}

export function buildUserPrompt(query: string, chunks: RetrievedChunk[]): string {
  return `Context:\n${buildContextBlock(chunks)}\n\nQuestion: ${query}`;
}