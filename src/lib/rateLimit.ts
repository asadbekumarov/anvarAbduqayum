interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Default: 5 requests per 10 minutes (600,000 ms)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Checks in-memory sliding window rate limit per client IP.
 * Can be swapped for Upstash Redis in production by updating this file.
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // Clean up expired entry or create new one
  if (!entry || now > entry.resetAt) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(ip, newEntry);
    return {
      success: true,
      remaining: maxRequests - 1,
      resetAt: newEntry.resetAt,
    };
  }

  // If already reached max
  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Increment count
  entry.count += 1;
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}
