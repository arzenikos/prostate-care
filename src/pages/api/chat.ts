import type { APIRoute } from "astro";
import pg from "pg";

const pool = new pg.Pool({ connectionString: import.meta.env.DATABASE_URL });

export const POST: APIRoute = async ({ request }) => {
  const { question } = await request.json();

  const r = await fetch("http://localhost:11434/api/embed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "nomic-embed-text", input: `search_query: ${question}` }),
  });
  const [qvec] = (await r.json()).embeddings;

  const { rows } = await pool.query(
    `SELECT c.content, c.page, d.filename,
            1 - (c.embedding <=> $1::vector) AS score
     FROM chunks c JOIN documents d ON d.id = c.document_id
     ORDER BY c.embedding <=> $1::vector
     LIMIT 5`,
    [JSON.stringify(qvec)]
  );

  const context = rows.map((x) => `[${x.filename} p.${x.page}]\n${x.content}`).join("\n\n---\n\n");
  // ...send `context` + `question` to your LLM (Ollama /api/chat or Anthropic) and return the answer
  return new Response(JSON.stringify({ sources: rows }), { status: 200 });
};