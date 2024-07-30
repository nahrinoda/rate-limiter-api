/**
 * SlidingWindowCounter class implements the Sliding Window Counter rate limiting algorithm.
 *
 * Properties:
 * - windowSize: Size of the time window in seconds.
 * - bucketCount: Number of buckets within the window.
 * - buckets: Array to store the count of requests per bucket.
 * - bucketDuration: Duration of each bucket in milliseconds.
 * - lastBucket: Timestamp of the last bucket.
 * - maxRequests: Maximum number of requests allowed in the window.
 *
 * Methods:
 * - addRequest(): Adds a request to the current bucket. Returns the total request count, remaining requests, and reset time within the window.
 */
export class SlidingWindowCounter {
  constructor(windowSize, bucketCount, maxRequests) {
    this.windowSize = windowSize;
    this.bucketCount = bucketCount;
    this.buckets = new Array(bucketCount).fill(0);
    this.bucketDuration = windowSize / bucketCount;
    this.lastBucket = Math.floor(Date.now() / this.bucketDuration);
    this.maxRequests = maxRequests;
  }

  addRequest() {
    const now = Math.floor(Date.now() / this.bucketDuration);
    if (now !== this.lastBucket) {
      const bucketsToClear = now - this.lastBucket;
      for (let i = 0; i < Math.min(bucketsToClear, this.bucketCount); i++) {
        this.buckets[(this.lastBucket + i) % this.bucketCount] = 0;
      }
      this.lastBucket = now;
    }
    this.buckets[now % this.bucketCount]++;
    const count = this.buckets.reduce((a, b) => a + b, 0);
    const remaining = this.maxRequests - count;
    const resetTime = new Date((now * this.bucketDuration + this.bucketDuration) * 1000).toISOString();
    return { count, remaining, resetTime };
  }
}
