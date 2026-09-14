import type { APIRoute } from 'astro';
import ollama from 'ollama';

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();

  const stream = await ollama.chat({
    model: 'gemma2',
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(encoder.encode(chunk.message.content));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};