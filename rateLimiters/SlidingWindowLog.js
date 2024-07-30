/**
 * SlidingWindowLog class implements the Sliding Window Log rate limiting algorithm.
 *
 * Properties:
 * - windowSize: Size of the time window in seconds.
 * - requests: Array to store the timestamps of requests.
 * - maxRequests: Maximum number of requests allowed in the window.
 *
 * Methods:
 * - addRequest(): Adds a request with the current timestamp. Returns the current request count, remaining requests, and reset time within the window.
 * - cleanUp(now): Removes requests that are outside the current time window.
 */
export class SlidingWindowLog {
  constructor(windowSize, maxRequests) {
    this.windowSize = windowSize;
    this.maxRequests = maxRequests;
    this.requests = [];
  }

  addRequest() {
    const now = Date.now();
    this.requests.push(now);
    this.cleanUp(now);
    const count = this.requests.length;
    const remaining = Math.max(0, this.maxRequests - count);
    const resetTime = new Date(now + this.windowSize * 1000).toISOString();
    return { count, remaining, resetTime };
  }

  cleanUp(now) {
    this.requests = this.requests.filter(timestamp => now - timestamp <= this.windowSize * 1000);
  }
}
