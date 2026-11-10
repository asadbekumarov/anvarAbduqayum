interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Default: 5 requests per 10 minutes (600,000 ms), bounded against memory growth
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_STORE_ENTRIES = 2000;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

function pruneStoreIfNeeded(now: number): void {
  if (rateLimitStore.size < MAX_STORE_ENTRIES) return;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }

  // If still at capacity, evict the oldest inserted keys
  while (rateLimitStore.size >= MAX_STORE_ENTRIES) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (!oldestKey) break;
    rateLimitStore.delete(oldestKey);
  }
}

/**
 * Clears in-memory rate-limit counters (intended strictly for automated tests).
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}

/**
 * Checks bounded process-local fixed-window rate limit for the supplied bucket key.
 * Note: single-instance memory limit only; horizontal multi-instance production scaling
 * requires an external atomic store such as Redis/Upstash.
 */
export function checkRateLimit(
  bucketKey: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(bucketKey);

  // Clean up expired entry or create a new window
  if (!entry || now > entry.resetAt) {
    pruneStoreIfNeeded(now);
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(bucketKey, newEntry);
    return {
      success: true,
      remaining: Math.max(0, maxRequests - 1),
      resetAt: newEntry.resetAt,
    };
  }

  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  return {
    success: true,
    remaining: Math.max(0, maxRequests - entry.count),
    resetAt: entry.resetAt,
  };
}
