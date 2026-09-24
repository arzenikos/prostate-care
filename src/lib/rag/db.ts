import { Pool } from "pg";
import { config } from "./config";

const u = new URL(config.DATABASE_URL);
const dbConfig = {
  host: u.hostname,
  port: Number(u.port || 5432),
  user: decodeURIComponent(u.username),
  password: decodeURIComponent(u.password),
  database: u.pathname.replace(/^\//, ""),
};

console.log(
  `[DEBUG at db.ts] Pool config resolved to: user=${dbConfig.user} host=${dbConfig.host}:${dbConfig.port} db=${dbConfig.database} password_length=${dbConfig.password.length}`
);

// Passing discrete fields instead of connectionString: `pg` only falls
// back to PGUSER/PGPASSWORD/PGHOST/PGPORT/PGDATABASE env vars for
// whichever fields are left undefined. Since every field is explicitly
// set here from parsing DATABASE_URL ourselves, there is no field left
// for those env vars to fill in — this closes off the one path where
// a leftover PGPASSWORD in your shell/OS environment could silently
// override what .env says.
export const pool = new Pool(dbConfig);
const poolClient = await pool.connect();
console.log(
  `[DEBUG at db.ts] Connected to database ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port} as user ${dbConfig.user}`
);
poolClient.release();

export function toVectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}