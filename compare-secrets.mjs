import { readFileSync } from "fs";
import { createHash } from "crypto";

function hash(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}

const envText = readFileSync(".env", "utf-8");

// Extract DB_PASSWORD as written, raw
const dbPasswordMatch = envText.match(/^DB_PASSWORD=(.*)$/m);
const dbPassword = dbPasswordMatch ? dbPasswordMatch[1].trim() : null;

// Extract DATABASE_URL and pull the password segment out of it
const dbUrlMatch = envText.match(/^DATABASE_URL=(.*)$/m);
const dbUrlRaw = dbUrlMatch ? dbUrlMatch[1].trim() : null;
let urlPassword = null;
if (dbUrlRaw) {
  const parsed = new URL(dbUrlRaw.replace(/^["']|["']$/g, ""));
  urlPassword = decodeURIComponent(parsed.password);
}

console.log("--- DB_PASSWORD ---");
console.log("length:", dbPassword?.length ?? "NOT FOUND");
console.log("hash:  ", dbPassword ? hash(dbPassword) : "n/a");
console.log("has trailing/leading whitespace:", dbPassword !== dbPassword?.trim());

console.log("\n--- password inside DATABASE_URL ---");
console.log("length:", urlPassword?.length ?? "NOT FOUND");
console.log("hash:  ", urlPassword ? hash(urlPassword) : "n/a");

console.log("\n--- verdict ---");
if (dbPassword && urlPassword) {
  console.log(dbPassword === urlPassword ? "✅ MATCH" : "❌ MISMATCH — these are different strings");
} else {
  console.log("Could not extract one or both values — check the var names in .env");
}