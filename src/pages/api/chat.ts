import type { APIRoute } from "astro";
import { z } from "zod";
import { config } from "@rag-library/config";
import { streamChat } from "@rag-library/llm";
import { MESSAGES } from "@rag-library/messages";
import { buildMessages } from "@rag-library/prompts";
import { retrieveContext, toCitations } from "@rag-library/retrieval";

export const prerender = false;

const SOURCES_HEADER = "X-Sources";
const TEXT_CONTENT_TYPE = "text/plain; charset=utf-8";

const requestSchema = z.object({
  question: z.string().trim().min(1).max(config.MAX_QUESTION_LENGTH),
});

export const POST: APIRoute = async ({ request }) => {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: MESSAGES.invalidRequest }, { status: 400 });
  }
  const { question } = parsed.data;

  try {
    const chunks = await retrieveContext(question);
    if (chunks.length === 0) {
      return new Response(MESSAGES.noContext, {
        headers: { "Content-Type": TEXT_CONTENT_TYPE },
      });
    }

    const stream = await streamChat(buildMessages(question, chunks), request.signal);
    return new Response(stream, {
      headers: {
        "Content-Type": TEXT_CONTENT_TYPE,
        // URL-encoded because header values must be ASCII; decode client-side
        [SOURCES_HEADER]: encodeURIComponent(JSON.stringify(toCitations(chunks))),
      },
    });
  } catch (err) {
    console.error("[api/chat]", err);
    return Response.json({ error: MESSAGES.serverError }, { status: 500 });
  }
};