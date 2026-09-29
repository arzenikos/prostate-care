import { ingestAll } from "@rag-library/ingestion";

ingestAll()
  .then(() => { console.log("done"); process.exit(0); })
  .catch(err => { console.error(err); process.exit(1); });