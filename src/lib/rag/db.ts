import { Pool } from "pg";
import { config } from "./config";

export const pool = new Pool({ connectionString: config.DATABASE_URL });

// pgvector needs arrays passed as its literal string form
export function toVectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}