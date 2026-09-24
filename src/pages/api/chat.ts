import type { APIRoute } from "astro";
import { retrieveForQuery } from "@rag-library/retrieval";
import { buildSystemPrompt, buildUserPrompt } from "@rag-library/prompts";
import { streamChat } from "@rag-library/llm";
import { checkRateLimit } from "@rag-library/rateLimit";
import { MESSAGES } from "@rag-library/messages";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!checkRateLimit(clientAddress)) {
    return new Response(MESSAGES.rateLimited, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const lastUserMessage = [...messages]
    .reverse()
    .find(message => message?.role === "user" && typeof message.content === "string");
  const question =
    typeof body?.question === "string" ? body.question : lastUserMessage?.content;

  if (!question?.trim()) {
    return new Response(MESSAGES.invalidRequest, { status: 400 });
  }

  const chunks = await retrieveForQuery(question.trim(), { logEmbedding: true });

  if (chunks.length === 0) {
    return new Response(MESSAGES.noContext, { status: 200 });
  }

  const systemPrompt = buildSystemPrompt(chunks);
  const userPrompt = buildUserPrompt(question, chunks);
  const sources = chunks.map(c => `${c.sourcePath}#p${c.pageNumber}`).join(",");

  const stream = new ReadableStream({
    async start(controller) {
      for await (const token of streamChat(systemPrompt, userPrompt)) {
        controller.enqueue(new TextEncoder().encode(token));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Sources": sources },
  });
};