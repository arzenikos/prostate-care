import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().url(),
  PDF_SOURCE_DIR: z.string().min(1),
  OLLAMA_BASE_URL: z.string().url(),

  EMBEDDING_MODEL: z.string().min(1),
  EMBEDDING_DIMENSIONS: z.coerce.number().int().positive(),
  EMBEDDING_DOCUMENT_PREFIX: z.string().default(""),
  EMBEDDING_QUERY_PREFIX: z.string().default(""),
  EMBEDDING_BATCH_SIZE: z.coerce.number().int().positive().default(16),

  CHUNK_SIZE: z.coerce.number().int().positive().default(1500),
  CHUNK_OVERLAP: z.coerce.number().int().nonnegative().default(200),

  CHAT_MODEL: z.string().min(1),
  RETRIEVAL_TOP_K: z.coerce.number().int().positive().default(5),
  RETRIEVAL_MIN_SCORE: z.coerce.number().min(0).max(1).default(0.3),
  MAX_QUESTION_LENGTH: z.coerce.number().int().positive().default(1000),
});

// Works in both contexts: tsx (process.env via --env-file) and Astro
// (import.meta.env in dev, process.env in the built server).
const viteEnv = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};

export const config = schema.parse({ ...process.env, ...viteEnv });
export type Config = typeof config;