import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function embed(text: string): Promise<number[]> {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: text, model: 'voyage-3-lite' }),
  });
  const data = await res.json();
  return data.data[0].embedding;
}

for (const chunk of chunks) {
  const vector = await embed(chunk.content);
  await prisma.$executeRaw`
    INSERT INTO "ArticleChunk" (id, "articleSlug", heading, content, embedding, persona)
    VALUES (${crypto.randomUUID()}, ${chunk.articleSlug}, ${chunk.heading}, ${chunk.content}, ${vector}::vector, ${chunk.persona})
  `;
}