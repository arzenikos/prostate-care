import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { config } from "./config";

// npm i unpdf   (lightweight, no native deps, works well in Node + edge runtimes)
import { extractText, getDocumentProxy } from "unpdf";

export interface DiscoveredPdf {
  sourcePath: string;
  contentHash: string;
}

export function discoverPdfs(): DiscoveredPdf[] {
  const dir = config.PDF_SOURCE_DIR;
  return fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith(".pdf"))
    .map(file => {
      const sourcePath = path.join(dir, file);
      const bytes = fs.readFileSync(sourcePath);
      const contentHash = crypto.createHash("sha256").update(bytes).digest("hex");
      return { sourcePath, contentHash };
    });
}

export interface PageText {
  pageNumber: number;
  text: string;
}

export async function extractPages(sourcePath: string): Promise<PageText[]> {
  const buffer = fs.readFileSync(sourcePath);
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { totalPages } = await extractText(pdf, { mergePages: false });
  const pages: PageText[] = [];
  for (let i = 0; i < totalPages; i++) {
    const { text } = await extractText(pdf, { mergePages: false, page: i + 1 } as any);
    pages.push({ pageNumber: i + 1, text: Array.isArray(text) ? text[0] : text });
  }
  return pages;
}