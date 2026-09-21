import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";
import { extractText, getDocumentProxy } from "unpdf";

const PDF_DIR = "./pdfs";
const OLLAMA = "http://localhost:11434";
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // connectionString: "postgresql://myuser:mypassword@localhost:5432/mydb",
});

// Simple paragraph-aware chunker with overlap (~1500 chars ≈ 350-400 tokens)
function chunk(text: string, size = 1500, overlap = 200): string[] {
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  let cur = "";
  for (const p of paras) {
    if ((cur + "\n\n" + p).length > size && cur) {
      out.push(cur);
      cur = cur.slice(-overlap) + "\n\n" + p;
    } else {
      cur = cur ? cur + "\n\n" + p : p;
    }
  }
  if (cur.trim()) out.push(cur);
  return out;
}

async function embed(texts: string[]): Promise<number[][]> {
  const res = await fetch(`${OLLAMA}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "nomic-embed-text",
      // nomic expects a task prefix
      input: texts.map((t) => `search_document: ${t}`),
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).embeddings;
}

async function main() {
  const files = (await readdir(PDF_DIR)).filter((f) => f.endsWith(".pdf"));
  for (const file of files) {
    const exists = await pool.query("SELECT 1 FROM documents WHERE filename=$1", [file]);
    if (exists.rowCount) { console.log("skip", file); continue; }

    const pdf = await getDocumentProxy(new Uint8Array(await readFile(path.join(PDF_DIR, file))));
    const { text: pages } = await extractText(pdf, { mergePages: false });

    const items: { page: number; content: string }[] = [];
    pages.forEach((t, i) => chunk(t).forEach((c) => items.push({ page: i + 1, content: c })));

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const doc = await client.query(
        "INSERT INTO documents (filename) VALUES ($1) RETURNING id", [file]);
      const docId = doc.rows[0].id;

      for (let i = 0; i < items.length; i += 16) {
        const batch = items.slice(i, i + 16);
        const vecs = await embed(batch.map((b) => b.content));
        for (let j = 0; j < batch.length; j++) {
          await client.query(
            `INSERT INTO chunks (document_id, chunk_index, page, content, embedding)
             VALUES ($1,$2,$3,$4,$5::vector)`,
            [docId, i + j, batch[j].page, batch[j].content, JSON.stringify(vecs[j])]
          );
        }
      }
      await client.query("COMMIT");
      console.log("ingested", file, items.length, "chunks");
    } catch (e) {
      await client.query("ROLLBACK");
      console.error("failed", file, e);
    } finally {
      client.release();
    }
  }
  await pool.end();
}
main();