import { config } from "./config";
import { chunkText } from "./chunking";
import { embedMany } from "./embeddings";
import { extractPages, listPdfs, readPdf } from "./pdf";
import { getStoredHash, replaceDocument, type NewChunk } from "./repository";

export interface IngestOptions {
  force?: boolean;
}

export interface IngestSummary {
  ingested: number;
  skipped: number;
  failed: number;
}

type FileResult = "ingested" | "skipped";

async function ingestFile(source: string, force: boolean): Promise<FileResult> {
  const { hash, bytes } = await readPdf(config.PDF_SOURCE_DIR, source);
  if (!force && (await getStoredHash(source)) === hash) return "skipped";

  const pages = await extractPages(bytes);
  const items = pages.flatMap((text, i) =>
    chunkText(text, { size: config.CHUNK_SIZE, overlap: config.CHUNK_OVERLAP }).map(
      (content) => ({ page: i + 1, content }),
    ),
  );
  if (items.length === 0) {
    throw new Error("No extractable text (scanned PDF? run OCR first)");
  }

  const embeddings = await embedMany(items.map((i) => i.content), "document");
  const chunks: NewChunk[] = items.map((item, i) => ({ ...item, embedding: embeddings[i] }));

  await replaceDocument(source, hash, chunks);
  console.log(`ingested ${source} (${chunks.length} chunks)`);
  return "ingested";
}

export async function ingestDirectory({ force = false }: IngestOptions = {}): Promise<IngestSummary> {
  const sources = await listPdfs(config.PDF_SOURCE_DIR);
  const summary: IngestSummary = { ingested: 0, skipped: 0, failed: 0 };

  for (const source of sources) {
    try {
      const result = await ingestFile(source, force);
      summary[result === "ingested" ? "ingested" : "skipped"]++;
      if (result === "skipped") console.log(`skipped ${source} (unchanged)`);
    } catch (err) {
      summary.failed++;
      console.error(`failed ${source}:`, err instanceof Error ? err.message : err);
    }
  }
  return summary;
}