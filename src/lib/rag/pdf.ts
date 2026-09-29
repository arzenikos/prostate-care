import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { config } from "./config";

import { extractText, getDocumentProxy } from "unpdf";

export interface DiscoveredPdf {
  sourcePath: string;
  contentHash: string;
}

export function discoverPdfs(): DiscoveredPdf[] {
  const dir = config.PDF_SOURCE_DIR;
  const sourcePaths: string[] = [];

  function visit(currentDir: string) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const sourcePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        visit(sourcePath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) {
        sourcePaths.push(sourcePath);
      }
    }
  }

  visit(dir);

  return sourcePaths.map(sourcePath => {
      const bytes = fs.readFileSync(sourcePath);
      const contentHash = crypto.createHash("sha256").update(bytes).digest("hex");
      return { sourcePath, contentHash };
  });
}

export interface PageText {
  pageNumber: number;
  text: string;
}

// Postgres' text type cannot store 0x00 at all — some PDFs (scanned docs, odd
// font encodings, corrupted text layers) yield stray null bytes from pdf.js.
// Strip them here, at the source, so nothing downstream has to think about it.
function sanitizeText(text: string): string {
  return text.replace(/\u0000/g, "");
}

export async function extractPages(sourcePath: string): Promise<PageText[]> {
  const buffer = fs.readFileSync(sourcePath);
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { totalPages } = await extractText(pdf, { mergePages: false });
  const pages: PageText[] = [];
  for (let i = 0; i < totalPages; i++) {
    const { text } = await extractText(pdf, { mergePages: false, page: i + 1 } as any);
    const raw = Array.isArray(text) ? text[0] : text;
    pages.push({ pageNumber: i + 1, text: sanitizeText(raw) });
  }
  return pages;
}

export async function extractPage(sourcePath: string, pageNumber = 1): Promise<PageText> {
  const buffer = fs.readFileSync(sourcePath);
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: false, page: pageNumber } as any);
  const raw = Array.isArray(text) ? text[0] : text;
  return { pageNumber, text: sanitizeText(raw) };
}