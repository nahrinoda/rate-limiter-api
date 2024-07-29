/**
 * SlidingWindowLog class implements the Sliding Window Log rate limiting algorithm.
 *
 * Properties:
 * - windowSize: Size of the time window in seconds.
 * - requests: Array to store the timestamps of requests.
 *
 * Methods:
 * - addRequest(): Adds a request with the current timestamp. Returns the current request count within the window.
 * - cleanUp(now): Removes requests that are outside the current time window.
 */
export class SlidingWindowLog {
  constructor(windowSize) {
    this.windowSize = windowSize;
    this.requests = [];
  }

  addRequest() {
    const now = Date.now();
    this.requests.push(now);
    this.cleanUp(now);
    return this.requests.length;
  }

  cleanUp(now) {
    this.requests = this.requests.filter(timestamp => now - timestamp <= this.windowSize * 1000);
  }
}
