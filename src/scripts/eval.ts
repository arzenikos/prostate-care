import { readFile } from "node:fs/promises";
import { embedOne } from "@rag-library/embeddings";
import { pool } from "@rag-library/db";
import { searchChunks } from "@rag-library/repository";
import { config } from "@rag-library/config";

const cases: { question: string; expectedSource: string }[] =
  JSON.parse(await readFile(process.argv[2] ?? "eval/cases.json", "utf8"));

let hits = 0;
for (const c of cases) {
  const results = await searchChunks(await embedOne(c.question, "query"), config.RETRIEVAL_TOP_K);
  const hit = results.some((r) => r.source === c.expectedSource);
  if (hit) hits++;
  else console.log(`MISS: ${c.question}\n   got: ${results.map((r) => r.source).join(", ")}`);
}
console.log(`hit@${config.RETRIEVAL_TOP_K}: ${hits}/${cases.length}`);
await pool.end();