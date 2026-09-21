import { pool, toVectorLiteral } from "./db";

export interface NewChunk {
  page: number;
  content: string;
  embedding: number[];
}

export interface RetrievedChunk {
  content: string;
  page: number | null;
  source: string;
  score: number;
}

export async function getStoredHash(source: string): Promise<string | null> {
  const { rows } = await pool.query<{ content_hash: string | null }>(
    "SELECT content_hash FROM documents WHERE source = $1",
    [source],
  );
  return rows[0]?.content_hash ?? null;
}

/** Atomically replaces a document and all of its chunks. */
export async function replaceDocument(
  source: string,
  hash: string,
  chunks: NewChunk[],
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM documents WHERE source = $1", [source]);
    const { rows } = await client.query<{ id: number }>(
      "INSERT INTO documents (source, content_hash) VALUES ($1, $2) RETURNING id",
      [source, hash],
    );
    const documentId = rows[0].id;

    for (const [index, chunk] of chunks.entries()) {
      await client.query(
        `INSERT INTO chunks (document_id, chunk_index, page, content, embedding)
         VALUES ($1, $2, $3, $4, $5::vector)`,
        [documentId, index, chunk.page, chunk.content, toVectorLiteral(chunk.embedding)],
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function searchChunks(
  queryEmbedding: number[],
  limit: number,
): Promise<RetrievedChunk[]> {
  const { rows } = await pool.query<RetrievedChunk>(
    `SELECT c.content, c.page, d.source,
            1 - (c.embedding <=> $1::vector) AS score
     FROM chunks c
     JOIN documents d ON d.id = c.document_id
     ORDER BY c.embedding <=> $1::vector
     LIMIT $2`,
    [toVectorLiteral(queryEmbedding), limit],
  );
  return rows;
}