/**
 * TokenBucket class implements the Token Bucket rate limiting algorithm.
 *
 * Properties:
 * - bucketSize: Maximum number of tokens the bucket can hold.
 * - refillRate: Number of tokens added to the bucket per second.
 * - tokens: Current number of tokens in the bucket.
 * - lastRefill: Timestamp of the last refill operation.
 *
 * Methods:
 * - tryRemoveTokens(count): Attempts to remove 'count' tokens from the bucket. Returns an object containing count, remaining, and resetTime.
 * - refill(): Adds tokens to the bucket based on the time elapsed since the last refill.
 */
export class TokenBucket {
  constructor(bucketSize, refillRate) {
    this.bucketSize = bucketSize;
    this.tokens = bucketSize;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  tryRemoveTokens(count) {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
    }
    const remaining = this.tokens;
    const resetTime = new Date(this.lastRefill + (1000 / this.refillRate) * (this.bucketSize - this.tokens)).toISOString();
    return { count: this.tokens, remaining, resetTime };
  }

  refill() {
    const now = Date.now();
    const tokensToAdd = Math.floor(((now - this.lastRefill) / 1000) * this.refillRate);
    this.tokens = Math.min(this.bucketSize, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
}
