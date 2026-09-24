import type { RetrievedChunk } from "./repository";

export function buildSystemPrompt(chunks: RetrievedChunk[]): string {
  const isWeb = chunks.length > 0 && chunks[0].source === "web";

  const base = [
    "You are a health-information assistant answering questions using ONLY the provided context.",
    "If the context does not contain the answer, say you don't have that information — never guess or use outside knowledge.",
    "Cite sources inline like [1], [2] matching the numbered context blocks.",
  ];

  if (isWeb) {
    base.push(
      "These sources are from the open web, not our own vetted materials — say so explicitly in your answer, and remind the reader to confirm anything important with a healthcare provider."
    );
  }

  return base.join(" ");
}

export function buildContextBlock(chunks: RetrievedChunk[]): string {
  return chunks
    .map((c, i) => {
      const label =
        c.source === "web"
          ? `${c.sourcePath} (${c.url})`
          : `${c.sourcePath}, p.${c.pageNumber ?? "?"}`;
      return `[${i + 1}] (${label})\n${c.content}`;
    })
    .join("\n\n");
}

export function buildUserPrompt(query: string, chunks: RetrievedChunk[]): string {
  return `Context:\n${buildContextBlock(chunks)}\n\nQuestion: ${query}`;
}