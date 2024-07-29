/**
 * SlidingWindowCounter class implements the Sliding Window Counter rate limiting algorithm.
 *
 * Properties:
 * - windowSize: Size of the time window in seconds.
 * - bucketCount: Number of buckets within the window.
 * - buckets: Array to store the count of requests per bucket.
 * - bucketDuration: Duration of each bucket in milliseconds.
 * - lastBucket: Timestamp of the last bucket.
 *
 * Methods:
 * - addRequest(): Adds a request to the current bucket. Returns the total request count within the window.
 */
export class SlidingWindowCounter {
  constructor(windowSize, bucketCount) {
    this.windowSize = windowSize;
    this.bucketCount = bucketCount;
    this.buckets = new Array(bucketCount).fill(0);
    this.bucketDuration = windowSize / bucketCount;
    this.lastBucket = Math.floor(Date.now() / this.bucketDuration);
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
    return this.buckets.reduce((a, b) => a + b, 0);
  }
}
