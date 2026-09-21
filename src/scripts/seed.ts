import "dotenv/config";
import { Client } from "pg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

console.log("user:", process.env.DB_USERNAME, "pw set:", !!process.env.DB_PASSWORD);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Client({
    host: "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function embed(text: string): Promise<number[]> {
    const res = await fetch("http://localhost:57037/api/embeddings", {
        method: "POST",
        body: JSON.stringify({ model: "nomic-embed-text", prompt: text }),
    });
    const data = await res.json();
    return data.embedding;
}

function chunkText(text: string, chunkWords = 500, overlapWords = 50): string[] {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    let start = 0;
    while (start < words.length) {
        const end = start + chunkWords;
        chunks.push(words.slice(start, end).join(" "));
        start = end - overlapWords; // step forward, but overlap with the previous chunk
    }
    return chunks;
}

async function main() {
    await client.connect();

    const dir = path.join(__dirname, "..", "content", "seed-pdfs");
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".pdf"));

    for (const file of files) {
        const buffer = fs.readFileSync(path.join(dir, file));
        const parser = new PDFParse({ data: buffer });
        const parsed = await parser.getText();
        const chunks = chunkText(parsed.text);
        await parser.destroy();

        for (const [i, chunk] of chunks.entries()) {
        const vector = await embed(chunk);
        await client.query(
            `INSERT INTO documents (content, metadata, embedding) VALUES ($1, $2, $3::vector)`,
            [chunk, JSON.stringify({ source: file, chunk_index: i }), JSON.stringify(vector)]
        );
        }
        console.log(`seeded ${file} — ${chunks.length} chunks`);
    }

    await client.end();
}


main();
