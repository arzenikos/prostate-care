// src/pages/api/chat.ts
import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';
import Anthropic from '@anthropic-ai/sdk';

const prisma = new PrismaClient();
const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from env

interface RetrievedChunk {
  slug: string;
  title: string;
  heading: string;
  content: string;
  similarity: number;
}

async function embed(text: string): Promise<number[]> {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VOYAGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: text, model: 'voyage-3-lite' }),
  });
  if (!res.ok) throw new Error(`Voyage embedding failed (${res.status})`);
  const data = await res.json();
  return data.data[0].embedding;
}

async function retrieve(query: string, persona: string): Promise<RetrievedChunk[]> {
  const queryVector = await embed(query);
  // pgvector cosine distance via $queryRaw — Prisma has no native vector type
  return prisma.$queryRaw<RetrievedChunk[]>`
    SELECT
      "articleSlug" AS slug,
      "articleTitle" AS title,
      heading,
      content,
      1 - (embedding <=> ${queryVector}::vector) AS similarity
    FROM "ArticleChunk"
    WHERE persona = ${persona}
    ORDER BY embedding <=> ${queryVector}::vector
    LIMIT 5
  `;
}

function buildSystemPrompt(chunks: RetrievedChunk[]): string {
  const context = chunks
    .map((c, i) => `[${i + 1}] ${c.title} — ${c.heading}\n${c.content}`)
    .join('\n\n');

  return `You are Prometheus, a health-information assistant for Pamana.
Answer ONLY using the source material below. If the sources don't cover
the question, say so plainly rather than answering from general knowledge.

Format your answer as:
- A "## Heading" line for the main topic
- Short paragraphs
- "- " bullet lines where a list is genuinely clearer than prose

Sources:
${context}`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages, persona = 'patient' } = await request.json();
    const question = messages[messages.length - 1]?.content ?? '';

    const chunks = await retrieve(question, persona);

    const sourcesHeader = encodeURIComponent(
      JSON.stringify(
        chunks.map((c) => ({ slug: c.slug, title: c.title, heading: c.heading }))
      )
    );

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: buildSystemPrompt(chunks),
      messages: [{ role: 'user', content: question }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        stream.on('text', (delta) => controller.enqueue(encoder.encode(delta)));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Sources': sourcesHeader,
      },
    });
  } catch (err) {
    console.error('chat route error', err);
    return new Response('Something went wrong.', { status: 500 });
  }
};