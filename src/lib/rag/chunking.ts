export interface ChunkOptions {
  size: number;
  overlap: number;
}

const PARAGRAPH_BREAK = /\n\s*\n/;

function splitOversized(text: string, size: number): string[] {
  if (text.length <= size) return [text];
  const parts: string[] = [];
  for (let i = 0; i < text.length; i += size) parts.push(text.slice(i, i + size));
  return parts;
}

/** Paragraph-aware chunking with character overlap. Pure and easy to unit test. */
export function chunkText(text: string, { size, overlap }: ChunkOptions): string[] {
  const pieces = text
    .split(PARAGRAPH_BREAK)
    .map((p) => p.trim())
    .filter(Boolean)
    .flatMap((p) => splitOversized(p, size));

  const chunks: string[] = [];
  let current = "";
  for (const piece of pieces) {
    if (current && current.length + piece.length + 2 > size) {
      chunks.push(current);
      current = `${current.slice(-overlap)}\n\n${piece}`;
    } else {
      current = current ? `${current}\n\n${piece}` : piece;
    }
  }
  if (current.trim()) chunks.push(current);
  return chunks;
}