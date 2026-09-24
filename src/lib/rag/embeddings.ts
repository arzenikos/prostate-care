import { config } from "./config";

interface EmbedOptions {
  logEmbedding?: boolean;
}

export async function embed(text: string, options: EmbedOptions = {}): Promise<number[]> {
  const res = await fetch(`${config.OLLAMA_BASE_URL}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: config.EMBEDDING_MODEL, prompt: text }),
  });
  if (!res.ok) throw new Error(`Ollama embeddings failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const embedding = data.embedding as number[];

  if (options.logEmbedding) {
    console.log(`[chat embedding] "${text}"`, embedding);
  }

  return embedding;
}

// Ollama's embeddings endpoint is single-prompt; batch by concurrency, not by one HTTP call
export async function embedBatch(texts: string[], concurrency = 4): Promise<number[][]> {
  const results: number[][] = new Array(texts.length);
  let cursor = 0;
  async function worker() {
    while (cursor < texts.length) {
      const i = cursor++;
      results[i] = await embed(texts[i]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}