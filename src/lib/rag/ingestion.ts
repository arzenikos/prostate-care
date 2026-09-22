import { discoverPdfs, extractPages } from "./pdf";
import { chunkPages } from "./chunking";
import { embedBatch } from "./embeddings";
import * as repo from "./repository";
import path from "node:path";

export async function ingestAll() {
  console.log("[DEBUG START ingestAll()] starting ingestion...");
  const pdfs = discoverPdfs();
  console.log(`found ${pdfs.length} PDFs`);

  for (const pdf of pdfs) {
    const existing = await repo.findDocumentByPath(pdf.sourcePath);
    if (existing && existing.content_hash === pdf.contentHash) {
      console.log(`skip (unchanged): ${pdf.sourcePath}`);
      continue;
    }

    console.log(`ingesting: ${pdf.sourcePath}`);
    const title = path.basename(pdf.sourcePath, ".pdf");
    const documentId = await repo.upsertDocument(pdf.sourcePath, pdf.contentHash, title);

    if (existing) await repo.deleteChunksForDocument(documentId); // re-embed on content change

    const pages = await extractPages(pdf.sourcePath);
    const chunks = chunkPages(pages);
    const embeddings = await embedBatch(chunks.map(c => c.content));

    for (let i = 0; i < chunks.length; i++) {
      await repo.insertChunk(documentId, chunks[i], embeddings[i]);
    }
    console.log(`  -> ${chunks.length} chunks embedded`);
    console.log("[DEBUG END ingestAll()] finished ingestion...");
  }
}