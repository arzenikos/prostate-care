import type { RetrievedChunk } from "./repository";

export function buildSystemPrompt(chunks: RetrievedChunk[]): string {
  const isWeb = chunks.length > 0 && chunks[0].source === "web";

  const base = [
    "You are a warm, clear health-information assistant helping people understand prostate cancer.",
    "Use the provided context when it is relevant, but you may also give general medically responsible information when the context does not fully answer the question.",
    "Never invent facts, diagnoses, citations, or links. Be transparent: say when an answer is general information rather than drawn from the provided sources.",
    "Cite provided sources inline like [1], [2], and include the source link when one is available.",
    "Encourage the reader to confirm personal medical decisions with a qualified healthcare professional.",
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