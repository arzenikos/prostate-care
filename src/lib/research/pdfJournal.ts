import fs from "node:fs";
import path from "node:path";
import { extractPage } from "@rag-library/pdf";

export interface PdfJournalEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  journal: string;
  tags: string[];
  pdfUrl: string;
}

export interface PdfJournalPage {
  entries: PdfJournalEntry[];
  page: number;
  pageSize: number;
  totalEntries: number;
  totalPages: number;
  filter?: string;
}

const root = path.resolve(process.cwd(), "public", "assets", "website-knowledge");
const metadataPath = path.resolve(process.cwd(), "src", "data", "research-journal.json");

function displayName(value: string): string {
  return value
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findPdfs(currentDir: string): string[] {
  return fs.readdirSync(currentDir, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) return findPdfs(filePath);
    return entry.isFile() && entry.name.toLowerCase().endsWith(".pdf") ? [filePath] : [];
  });
}

const pdfFiles = findPdfs(root).sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

function extractDate(text: string): string {
  const match = text.match(
    /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b|\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b|\b(?:19|20)\d{2}\b/i
  );
  return match?.[0] ?? "Date";
}

function extractAuthor(text: string): string {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const authorLine = lines.find((line) =>
    /\b(?:et al\.?|authors?|by)\b/i.test(line) ||
    (line.includes(",") && line.length < 180 && !/\b(?:abstract|journal|university)\b/i.test(line))
  );
  return authorLine?.replace(/\s+/g, " ").slice(0, 180) ?? "Author";
}

function extractJournal(text: string): string {
  const match = text.match(/\b(?:The\s+)?[A-Z][A-Za-z&' -]{2,80}\s+(?:Journal|Review|Medicine|Research|Oncology|Health|Cancer)\b/);
  return match?.[0]?.replace(/\s+/g, " ") ?? "Journal";
}

function makeDescription(text: string, title: string): string {
  const sentence = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .find((part) => part.length >= 45 && !/^(?:abstract|keywords?):/i.test(part));
  if (sentence) return sentence.slice(0, 220).replace(/\s+\S*$/, "") + (sentence.length > 220 ? "…" : "");
  return `This journal resource explores ${title.toLowerCase()}.`;
}

function makeTags(text: string): string[] {
  const keywords = ["prostate cancer"];
  const keywordTags = keywords.filter((keyword) => text.toLowerCase().includes(keyword));
  return keywordTags;
}

function pdfUrl(filePath: string): string {
  return `/assets/website-knowledge/${path.relative(root, filePath)
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function loadJournalMetadata(): PdfJournalEntry[] {
  if (!fs.existsSync(metadataPath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(metadataPath, "utf8")) as {
      version?: number;
      entries?: PdfJournalEntry[];
    };
    if (!Array.isArray(parsed.entries)) {
      throw new Error("research-journal.json must contain an entries array");
    }
    return parsed.entries;
  } catch (error) {
    throw new Error(`Unable to load journal metadata from ${metadataPath}`, { cause: error });
  }
}

const journalMetadata = loadJournalMetadata();
const metadataByPdfUrl = new Map(journalMetadata.map((entry) => [entry.pdfUrl, entry]));
let journalEntriesPromise: Promise<PdfJournalEntry[]> | undefined;

function getJournalEntries(): Promise<PdfJournalEntry[]> {
  if (!journalEntriesPromise) {
    journalEntriesPromise = Promise.all(pdfFiles.map(async (filePath) => {
      const metadata = metadataByPdfUrl.get(pdfUrl(filePath));
      if (metadata) return metadata;

      const relativePath = path.relative(root, filePath);
      const title = displayName(path.basename(filePath));
      let text = "";
      try {
        text = (await extractPage(filePath)).text.trim();
      } catch (error) {
        console.error(`[research-hub] failed to extract PDF metadata from ${relativePath}`, error);
      }

      const id = relativePath.replace(/\.pdf$/i, "").replace(/[^\w-]+/g, "-").replace(/-+/g, "-").toLowerCase();
      return {
        id,
        title,
        description: makeDescription(text, title),
        date: extractDate(text),
        author: extractAuthor(text),
        journal: extractJournal(text),
        tags: makeTags(text),
        pdfUrl: pdfUrl(filePath),
      };
    }));
  }
  return journalEntriesPromise;
}

export async function getPdfJournalEntries(page = 1, pageSize = 10): Promise<PdfJournalPage> {
  return getPdfJournalEntriesFiltered(page, pageSize);
}

export async function getPdfJournalFilters(): Promise<string[]> {
  const entries = await getJournalEntries();
  const filters = new Map<string, string>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      const normalizedTag = tag.trim().toLowerCase();
      if (normalizedTag && !filters.has(normalizedTag)) filters.set(normalizedTag, tag.trim());
    }
  }
  return [...filters.values()].sort((a, b) => a.localeCompare(b));
}

export async function getPdfJournalEntriesFiltered(
  page = 1,
  pageSize = 10,
  filter = "",
): Promise<PdfJournalPage> {
  const normalizedFilter = filter.trim().toLowerCase();
  const allEntries = await getJournalEntries();
  const filteredEntries = normalizedFilter
    ? allEntries.filter((entry) =>
        entry.tags.some((tag) => tag.trim().toLowerCase() === normalizedFilter)
      )
    : allEntries;
  const totalEntries = filteredEntries.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const entries = filteredEntries.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return { entries, page: currentPage, pageSize, totalEntries, totalPages, filter: normalizedFilter };
}
