import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log(
  `[DEBUG at config.ts] dotenv loaded from ${path.resolve(process.cwd(), ".env")} — ` +
  (result.error ? `FAILED: ${result.error.message}` : "OK")
);

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

function numEnv(key: string, fallback?: number): number {
  const raw = process.env[key];
  if (raw === undefined) {
    if (fallback === undefined) throw new Error(`Missing required env var: ${key}`);
    return fallback;
  }
  const n = Number(raw);
  if (Number.isNaN(n)) throw new Error(`Env var ${key} is not a valid number: "${raw}"`);
  return n;
}

export const config = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  PDF_SOURCE_DIR: requireEnv("PDF_SOURCE_DIR"),
  OLLAMA_BASE_URL: requireEnv("OLLAMA_BASE_URL"),

  EMBEDDING_MODEL: requireEnv("EMBEDDING_MODEL"),
  EMBEDDING_DIMENSIONS: numEnv("EMBEDDING_DIMENSIONS"),
  EMBEDDING_DOCUMENT_PREFIX: process.env.EMBEDDING_DOCUMENT_PREFIX ?? "",
  EMBEDDING_QUERY_PREFIX: process.env.EMBEDDING_QUERY_PREFIX ?? "",
  EMBEDDING_BATCH_SIZE: numEnv("EMBEDDING_BATCH_SIZE", 16),

  CHUNK_SIZE_TOKENS: numEnv("CHUNK_SIZE_TOKENS", 1500),
  CHUNK_OVERLAP_TOKENS: numEnv("CHUNK_OVERLAP_TOKENS", 200),

  CHAT_MODEL: requireEnv("CHAT_MODEL"),
  RETRIEVAL_TOP_K: numEnv("RETRIEVAL_TOP_K", 5),
  RETRIEVAL_MIN_SCORE: numEnv("RETRIEVAL_MIN_SCORE", 0.3),
  MAX_QUESTION_LENGTH: numEnv("MAX_QUESTION_LENGTH", 1000),
};

export type Config = typeof config;