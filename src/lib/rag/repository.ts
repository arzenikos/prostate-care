import { pool, toVectorLiteral } from "./db";
import type { Chunk } from "./chunking";

export async function findDocumentByPath(sourcePath: string) {
  console.log(`[DEBUG at repository.ts] Finding document by path: ${sourcePath}`);
  const { rows } = await pool.query(
    `SELECT id, content_hash FROM documents WHERE source_path = $1`,
    [sourcePath]
  );
  console.log(`[DEBUG at repository.ts] Found document:`, rows[0]);
  return rows[0] as { id: string; content_hash: string } | undefined;
}

export async function upsertDocument(sourcePath: string, contentHash: string, title: string) {
  console.log(`[DEBUG at repository.ts] Upserting document: ${sourcePath}`);
  const { rows } = await pool.query(
    `INSERT INTO documents (source_path, content_hash, title)
     VALUES ($1, $2, $3)
     ON CONFLICT (source_path) DO UPDATE SET content_hash = EXCLUDED.content_hash
     RETURNING id`,
    [sourcePath, contentHash, title]
  );
  console.log(`[DEBUG at repository.ts] Upserted document:`, rows[0]);
  return rows[0].id as string;
}

export async function deleteChunksForDocument(documentId: string) {
  console.log(`[DEBUG at repository.ts] Deleting chunks for document: ${documentId}`);
  await pool.query(`DELETE FROM chunks WHERE document_id = $1`, [documentId]);
}

export async function insertChunk(
  documentId: string,
  chunk: Chunk,
  embedding: number[]
) {
  console.log(`[DEBUG at repository.ts] Inserting chunk for document: ${documentId}, chunkIndex: ${chunk.chunkIndex}`);
  await pool.query(
    `INSERT INTO chunks (document_id, chunk_index, page_number, content, embedding)
     VALUES ($1, $2, $3, $4, $5::vector)`,
    [documentId, chunk.chunkIndex, chunk.pageNumber, chunk.content, toVectorLiteral(embedding)]
  );
}

export interface RetrievedChunk {
  content: string;
  pageNumber: number | null;
  sourcePath: string;
  similarity: number;
  source: "pdf" | "web";
  url?: string;
}

export async function retrieveSimilarChunks(
  queryEmbedding: number[],
  topK: number
): Promise<RetrievedChunk[]> {
  if (queryEmbedding.length === 0) {
    throw new Error(
      "retrieveSimilarChunks: embedding must have at least 1 dimension (got an empty array — check the embedding model/prompt upstream)"
    );
  }
  const { rows } = await pool.query(
    `SELECT c.content, c.page_number, d.source_path,
            1 - (c.embedding <=> $1::vector) AS similarity
     FROM chunks c
     JOIN documents d ON d.id = c.document_id
     ORDER BY c.embedding <=> $1::vector
     LIMIT $2`,
    [toVectorLiteral(queryEmbedding), topK]
  );
  return rows.map(r => ({
    content: r.content,
    pageNumber: r.page_number,
    sourcePath: r.source_path,
    similarity: r.similarity,
    source: "pdf" as const,
    url: r.source_path.startsWith("http") ? r.source_path : undefined
  }));
}