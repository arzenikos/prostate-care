import { config } from "./config";

export type EmbedKind = "document" | "query";

const PREFIX: Record<EmbedKind, string> = {
  document: config.EMBEDDING_DOCUMENT_PREFIX,
  query: config.EMBEDDING_QUERY_PREFIX,
};

async function embedRequest(inputs: string[]): Promise<number[][]> {
  const res = await fetch(`${config.OLLAMA_BASE_URL}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: config.EMBEDDING_MODEL, input: inputs }),
  });
  if (!res.ok) throw new Error(`Embedding request failed (${res.status}): ${await res.text()}`);

  const { embeddings } = (await res.json()) as { embeddings: number[][] };
  for (const e of embeddings) {
    if (e.length !== config.EMBEDDING_DIMENSIONS) {
      throw new Error(
        `Embedding has ${e.length} dimensions, expected ${config.EMBEDDING_DIMENSIONS}. ` +
          "Check EMBEDDING_MODEL / EMBEDDING_DIMENSIONS and the vector(N) column.",
      );
    }
  }
  return embeddings;
}

export async function embedMany(texts: string[], kind: EmbedKind): Promise<number[][]> {
  const prefixed = texts.map((t) => `${PREFIX[kind]}${t}`);
  const results: number[][] = [];
  for (let i = 0; i < prefixed.length; i += config.EMBEDDING_BATCH_SIZE) {
    results.push(...(await embedRequest(prefixed.slice(i, i + config.EMBEDDING_BATCH_SIZE))));
  }
  return results;
}

export async function embedOne(text: string, kind: EmbedKind): Promise<number[]> {
  return (await embedMany([text], kind))[0];
}