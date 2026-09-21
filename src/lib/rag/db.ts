import pg from "pg";
import { config } from "./config";

declare global {
  // Survives Vite HMR so dev doesn't leak connection pools
  // eslint-disable-next-line no-var
  var __ragPool: pg.Pool | undefined;
}

export const pool = (globalThis.__ragPool ??= new pg.Pool({
  connectionString: config.DATABASE_URL,
}));

export const toVectorLiteral = (v: number[]): string => `[${v.join(",")}]`;