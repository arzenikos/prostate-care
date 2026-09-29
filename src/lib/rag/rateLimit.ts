const buckets = new Map<string, { tokens: number; last: number }>();
const CAPACITY = 20;
const REFILL_PER_SEC = 0.5;

export function checkRateLimit(key: string): boolean {
  const now = Date.now() / 1000;
  const bucket = buckets.get(key) ?? { tokens: CAPACITY, last: now };
  const elapsed = now - bucket.last;
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + elapsed * REFILL_PER_SEC);
  bucket.last = now;
  if (bucket.tokens < 1) { buckets.set(key, bucket); return false; }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return true;
}