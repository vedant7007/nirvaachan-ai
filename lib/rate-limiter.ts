export class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private requests: Map<string, number[]>;

  constructor(windowMs = 60000, maxRequests = 20) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = new Map();
  }

  check(ip: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get existing timestamps for this IP
    let timestamps = this.requests.get(ip) || [];

    // Filter out timestamps older than the window
    timestamps = timestamps.filter(timestamp => timestamp > windowStart);

    // Check if within limit
    if (timestamps.length >= this.maxRequests) {
      this.requests.set(ip, timestamps);
      return false; // Rate limit exceeded
    }

    // Add new timestamp
    timestamps.push(now);
    this.requests.set(ip, timestamps);

    return true; // Allowed
  }
}

// Global instance for the application
export const rateLimiter = new RateLimiter();
