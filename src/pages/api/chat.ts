import type { APIRoute } from "astro";
import { retrieveForQuery } from "@rag-library/retrieval";
import { buildSystemPrompt, buildUserPrompt } from "@rag-library/prompts";
import { streamChat } from "@rag-library/llm";
import { checkRateLimit } from "@rag-library/rateLimit";
import { MESSAGES } from "@rag-library/messages";
import { config } from "@rag-library/config";

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const startedAt = performance.now();
  console.info("[chat] request received");
  if (!checkRateLimit(clientAddress)) {
    console.info("[chat] rate limited");
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

  console.info(`[chat] retrieving context for "${question.trim()}"`);
  const chunks = await retrieveForQuery(question.trim(), { logEmbedding: true });
  console.info(`[chat] retrieved ${chunks.length} context chunks in ${Math.round(performance.now() - startedAt)}ms`);

  if (chunks.length === 0) {
    return new Response(MESSAGES.noContext, { status: 200 });
  }

  const systemPrompt = buildSystemPrompt(chunks);
  const userPrompt = buildUserPrompt(question, chunks);
  const sources = chunks.map(c => `${c.sourcePath}#p${c.pageNumber}`).join(",");

  const stream = new ReadableStream({
    async start(controller) {
      try {
        console.info(`[chat] starting ${config.CHAT_MODEL} response`);
        let tokenCount = 0;
        for await (const token of streamChat(systemPrompt, userPrompt, request.signal)) {
          tokenCount += 1;
          controller.enqueue(new TextEncoder().encode(token));
        }
        console.info(`[chat] response complete (${tokenCount} chunks, ${Math.round(performance.now() - startedAt)}ms)`);
        controller.close();
      } catch (error) {
        console.error("[chat] response failed", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Sources": sources },
  });
};