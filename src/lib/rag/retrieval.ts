import { config } from "./config";
import { embed } from "./embeddings";
import { retrieveSimilarChunks, type RetrievedChunk } from "./repository";

const MIN_SIMILARITY = 0.3; // below this, the chunk probably isn't relevant — tune against your own docs

export async function retrieveForQuery(query: string): Promise<RetrievedChunk[]> {
  console.log(`[DEBUG at retrieval.ts] Retrieving for query: ${query}`);
  const queryEmbedding = await embed(query);
  const results = await retrieveSimilarChunks(queryEmbedding, config.RETRIEVAL_TOP_K);
  console.log(`[DEBUG at retrieval.ts] Retrieved ${results.length} chunks for query: ${query}`);
  console.log(`[DEBUG at retrieval.ts] Similarity scores: ${results.map(r => r.similarity).join(", ")}`);
  return results.filter(r => r.similarity >= MIN_SIMILARITY);
}