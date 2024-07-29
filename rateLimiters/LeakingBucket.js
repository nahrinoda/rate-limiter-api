/**
 * LeakingBucket class implements the Leaking Bucket rate limiting algorithm.
 *
 * Properties:
 * - bucketSize: Maximum number of tokens the bucket can hold.
 * - tokens: Current number of tokens in the bucket.
 * - leakRate: Number of tokens removed from the bucket per second.
 * - lastLeak: Timestamp of the last leak operation.
 *
 * Methods:
 * - addRequest(): Adds a request to the bucket. Returns true if the request is allowed, false otherwise.
 * - leak(): Removes tokens from the bucket based on the time elapsed since the last leak.
 */
export class LeakingBucket {
  constructor(bucketSize, leakRate) {
    this.bucketSize = bucketSize;
    this.tokens = 0;
    this.leakRate = leakRate;
    this.lastLeak = Date.now();
  }

  addRequest() {
    this.leak();
    if (this.tokens < this.bucketSize) {
      this.tokens++;
      return true;
    }
    return false;
  }

  leak() {
    const now = Date.now();
    const tokensToRemove = Math.floor((now - this.lastLeak) / 1000 * this.leakRate);
    this.tokens = Math.max(0, this.tokens - tokensToRemove);
    this.lastLeak = now;
  }
}
