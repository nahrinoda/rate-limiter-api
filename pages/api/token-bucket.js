import { TokenBucket } from '../../rateLimiters/TokenBucket';
import apiKeyValidation from '../../src/middleware/auth';

// Initialize the TokenBucket with a bucket size of 100 and a refill rate of 10 tokens per second
const tokenBucket = new TokenBucket(100, 10);

/**
 * API handler for the Token Bucket rate limiting algorithm.
 *
 * POST /api/token-bucket
 *
 * Request headers:
 * - Authorization: Bearer YOUR_API_KEY
 *
 * Response:
 * - 200 OK: { "allowed": true } if the request is allowed
 * - 200 OK: { "allowed": false } if the request is denied due to rate limiting
 * - 403 Forbidden: { "message": "Forbidden" } if the API key is invalid
 * - 405 Method Not Allowed: { "message": "Method Not Allowed" } if the request method is not POST
 */
export default function handler(req, res) {
  apiKeyValidation(req, res, () => {
    if (req.method === 'POST') {
      const allowed = tokenBucket.tryRemoveTokens(1);
      res.status(200).json({ allowed });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}
