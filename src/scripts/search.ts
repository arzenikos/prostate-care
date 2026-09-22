import { embedOne } from "@rag-library/embeddings";
import { pool } from "@rag-library/db";
import { searchChunks } from "@rag-library/repository";
import { config } from "@rag-library/config";

const query = process.argv.slice(2).join(" ");
if (!query) throw new Error("Usage: npm run search -- <question>");

const results = await searchChunks(await embedOne(query, "query"), config.RETRIEVAL_TOP_K);
for (const r of results) {
  console.log(`${r.score.toFixed(3)}  ${r.source} p.${r.page}\n   ${r.content.slice(0, 200).replace(/\s+/g, " ")}\n`);
}
await pool.end();