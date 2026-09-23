import { config } from "./config";
import type { PageText } from "./pdf";

export interface Chunk {
  chunkIndex: number;
  pageNumber: number | null;
  content: string;
}

// crude but effective token estimate: ~4 chars/token for English
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function chunkPages(pages: PageText[]): Chunk[] {
  const maxTokens = config.CHUNK_SIZE_TOKENS;
  const overlapTokens = config.CHUNK_OVERLAP_TOKENS;
  const chunks: Chunk[] = [];
  let index = 0;

  for (const page of pages) {
    const words = page.text.split(/\s+/).filter(Boolean);
    let start = 0;
    while (start < words.length) {
      let end = start;
      let tokenCount = 0;
      while (end < words.length && tokenCount < maxTokens) {
        tokenCount += estimateTokens(words[end]) + 1; // +1 for the space
        end++;
      }
      const content = words.slice(start, end).join(" ");
      if (content.trim().length > 0) {
        chunks.push({ chunkIndex: index++, pageNumber: page.pageNumber, content });
      }
      if (end >= words.length) break;
      // step back by overlap so context isn't sliced mid-thought at chunk boundaries
      const overlapWords = Math.floor((overlapTokens / maxTokens) * (end - start));
      start = end - overlapWords;
    }
  }
  return chunks;
}