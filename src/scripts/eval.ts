import { retrieveForQuery } from "@rag-library/retrieval";

const testCases = [
  { query: "What is a PSA test?", expectSourceContains: "psa" },
  // add real questions you know the answer to from your own PDFs
];

async function run() {
  for (const tc of testCases) {
    const results = await retrieveForQuery(tc.query);
    const pass = results.some(r => r.sourcePath.toLowerCase().includes(tc.expectSourceContains));
    console.log(`${pass ? "PASS" : "FAIL"}: "${tc.query}" -> top source: ${results[0]?.sourcePath}`);
  }
}
run();