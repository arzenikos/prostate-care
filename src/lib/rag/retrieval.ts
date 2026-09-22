import { config } from "./config";
import { embed } from "./embeddings";
import { retrieveSimilarChunks, type RetrievedChunk } from "./repository";

const MIN_SIMILARITY = 0.3; // below this, the chunk probably isn't relevant — tune against your own docs

export async function retrieveForQuery(query: string): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embed(query);
  const results = await retrieveSimilarChunks(queryEmbedding, config.RETRIEVAL_TOP_K);
  return results.filter(r => r.similarity >= MIN_SIMILARITY);
}