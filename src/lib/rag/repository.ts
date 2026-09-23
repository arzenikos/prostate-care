import { pool, toVectorLiteral } from "./db";
import type { Chunk } from "./chunking";

export async function findDocumentByPath(sourcePath: string) {
  const { rows } = await pool.query(
    `SELECT id, content_hash FROM documents WHERE source_path = $1`,
    [sourcePath]
  );
  return rows[0] as { id: string; content_hash: string } | undefined;
}

export async function upsertDocument(sourcePath: string, contentHash: string, title: string) {
  const { rows } = await pool.query(
    `INSERT INTO documents (source_path, content_hash, title)
     VALUES ($1, $2, $3)
     ON CONFLICT (source_path) DO UPDATE SET content_hash = EXCLUDED.content_hash
     RETURNING id`,
    [sourcePath, contentHash, title]
  );
  return rows[0].id as string;
}

export async function deleteChunksForDocument(documentId: string) {
  await pool.query(`DELETE FROM chunks WHERE document_id = $1`, [documentId]);
}

export async function insertChunk(
  documentId: string,
  chunk: Chunk,
  embedding: number[]
) {
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
}

export async function retrieveSimilarChunks(
  queryEmbedding: number[],
  topK: number
): Promise<RetrievedChunk[]> {
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
  }));
}