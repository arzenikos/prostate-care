import { config } from "./config";
import { embedOne } from "./embeddings";
import { searchChunks, type RetrievedChunk } from "./repository";

export async function retrieveContext(question: string): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embedOne(question, "query");
  const results = await searchChunks(queryEmbedding, config.RETRIEVAL_TOP_K);
  // Filter in JS so the HNSW index still drives the ordering
  return results.filter((r) => r.score >= config.RETRIEVAL_MIN_SCORE);
}

export function toCitations(chunks: RetrievedChunk[]) {
  return chunks.map((c, i) => ({
    id: i + 1,
    source: c.source,
    page: c.page,
    score: Number(c.score.toFixed(3)),
  }));
}