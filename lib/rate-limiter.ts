/**
 * Sliding window rate limiter.
 * Tracks request timestamps per key (IP) and enforces
 * a maximum number of requests within a rolling time window.
 */
export class RateLimiter {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly requests: Map<string, number[]>;

  constructor(windowMs = 60_000, maxRequests = 20) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = new Map();
  }

  /**
   * Check if a request from the given key is allowed.
   * Returns true if within rate limit, false if exceeded.
   */
  check(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get timestamps within the current window
    const timestamps = (this.requests.get(key) || []).filter(
      (t) => t > windowStart
    );

    if (timestamps.length >= this.maxRequests) {
      this.requests.set(key, timestamps);
      return false;
    }

    timestamps.push(now);
    this.requests.set(key, timestamps);

    // Periodic cleanup: remove stale IPs to prevent memory leaks
    if (this.requests.size > 1000) {
      this.cleanup(windowStart);
    }

    return true;
  }

  private cleanup(windowStart: number): void {
    this.requests.forEach((timestamps, key) => {
      const active = timestamps.filter((t: number) => t > windowStart);
      if (active.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, active);
      }
    });
  }
}

/** Singleton rate limiter: 20 requests per minute per IP */
export const rateLimiter = new RateLimiter();
