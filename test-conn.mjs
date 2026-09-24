import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("Testing with DATABASE_URL:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":***@"));

const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  const res = await client.query("SELECT current_user, current_database();");
  console.log("SUCCESS:", res.rows[0]);
} catch (err) {
  console.error("FAILED:", err.code, err.message);
} finally {
  await client.end();
}