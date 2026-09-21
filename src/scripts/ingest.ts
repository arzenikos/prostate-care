import { pool } from "@library/rag/db";
import { ingestDirectory } from "@library/rag/ingestion";

const FORCE_FLAG = "--force";

async function main() {
  const force = process.argv.includes(FORCE_FLAG);
  const summary = await ingestDirectory({ force });
  console.log("done:", summary);
  process.exitCode = summary.failed > 0 ? 1 : 0;
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());