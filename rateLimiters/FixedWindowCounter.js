/**
 * FixedWindowCounter class implements the Fixed Window Counter rate limiting algorithm.
 *
 * Properties:
 * - windowSize: Size of the time window in seconds.
 * - maxRequests: Maximum number of requests allowed per window.
 * - requests: Object to store the count of requests in the current window.
 *
 * Methods:
 * - addRequest(ip): Adds a request from the specified IP address. Returns the current request count, remaining requests, and reset time for the window.
 */
export class FixedWindowCounter {
  constructor(windowSize, maxRequests) {
    this.windowSize = windowSize;
    this.maxRequests = maxRequests;
    this.requests = {};
  }

  addRequest(ip) {
    const now = Math.floor(Date.now() / 1000 / this.windowSize) * this.windowSize;
    if (!this.requests[now]) {
      this.requests = {};
      this.requests[now] = 0;
    }
    this.requests[now]++;
    const count = this.requests[now];
    const remaining = this.maxRequests - count;
    const resetTime = new Date((now + this.windowSize) * 1000).toISOString();
    return { count, remaining, resetTime };
  }
}
