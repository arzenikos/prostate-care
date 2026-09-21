import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { extractText, getDocumentProxy } from "unpdf";

const PDF_EXTENSION = ".pdf";

/** Returns PDF paths relative to `root`, recursively, sorted. */
export async function listPdfs(root: string): Promise<string[]> {
  const entries = await readdir(root, { recursive: true });
  return entries
    .filter((e) => e.toLowerCase().endsWith(PDF_EXTENSION))
    .map((e) => e.split(path.sep).join("/"))
    .sort();
}

export async function readPdf(root: string, relativePath: string) {
  const buffer = await readFile(path.join(root, relativePath));
  return {
    hash: createHash("sha256").update(buffer).digest("hex"),
    bytes: new Uint8Array(buffer),
  };
}

/** One string per page. */
export async function extractPages(bytes: Uint8Array): Promise<string[]> {
  const pdf = await getDocumentProxy(bytes);
  const { text } = await extractText(pdf, { mergePages: false });
  return text;
}