import "dotenv/config";
import { Client } from "pg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

console.log("user:", process.env.DB_USERNAME, "pw set:", !!process.env.DB_PASSWORD);

const client = new Client({
    host: "localhost",
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function embed(text: string): Promise<number[]> {
    const res = await fetch("http://localhost:11434/api/embeddings", {
        method: "POST",
        body: JSON.stringify({ model: "nomic-embed-text", prompt: text }),
    });
    const data = await res.json();
    return data.embedding;
}

async function main() {
    await client.connect();

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const dir = path.join(__dirname, "..", "content", "seed-docs")
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

    for (const file of files) {
        const content = fs.readFileSync(path.join(dir, file), "utf-8");
        const vector = await embed(content);

        await client.query(
        `INSERT INTO documents (content, embedding) VALUES ($1, $2::vector)`,
        [content, JSON.stringify(vector)] // pgvector accepts a JSON-array-shaped string cast to ::vector
        );
        console.log(`seeded ${file}`);
  }

  await client.end();
}

main();