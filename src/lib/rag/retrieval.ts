import { config } from "./config";
import { embed } from "./embeddings";
import { retrieveSimilarChunks, type RetrievedChunk } from "./repository";
import { searchWeb } from "./webSearch";

const MIN_SIMILARITY = 0.3;

export async function retrieveForQuery(query: string): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embed(query);
  const results = await retrieveSimilarChunks(queryEmbedding, config.RETRIEVAL_TOP_K);
  const relevant = results.filter(r => r.similarity >= MIN_SIMILARITY);

  if (relevant.length > 0) {
    return relevant;
  }

  // Nothing in the PDFs cleared the bar — fall back to the web, clearly labeled.
  const webResults = await searchWeb(query);
  return webResults.map(w => ({
    content: w.snippet,
    pageNumber: null,
    sourcePath: w.title,
    similarity: 0, // not a real similarity score; web results aren't ranked the same way
    source: "web" as const,
    url: w.url,
  }));
}