/**
 * FixedWindowCounter class implements the Fixed Window Counter rate limiting algorithm.
 *
 * Properties:
 * - windowSize: Size of the time window in seconds.
 * - requests: Object to store the count of requests in the current window.
 *
 * Methods:
 * - addRequest(ip): Adds a request from the specified IP address. Returns the current request count for the window.
 */
export class FixedWindowCounter {
  constructor(windowSize) {
    this.windowSize = windowSize;
    this.requests = {};
  }

  addRequest(ip) {
    const now = Math.floor(Date.now() / 1000 / this.windowSize) * this.windowSize;
    if (!this.requests[now]) {
      this.requests = {};
      this.requests[now] = 0;
    }
    this.requests[now]++;
    return this.requests[now];
  }
}
