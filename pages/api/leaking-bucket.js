import { LeakingBucket } from '../../rateLimiters/LeakingBucket';
import apiKeyValidation from '../../src/middleware/auth';

// Initialize the LeakingBucket with a bucket size of 100 and a leak rate of 10 requests per second
const leakingBucket = new LeakingBucket(100, 10);

/**
 * API handler for the Leaking Bucket rate limiting algorithm.
 *
 * POST /api/leaking-bucket
 *
 * Request headers:
 * - Authorization: Bearer YOUR_API_KEY
 *
 * Response:
 * - 200 OK: { "count": number, "remaining": number, "resetTime": string } indicating the current request count, remaining requests, and reset time
 * - 403 Forbidden: { "message": "Forbidden" } if the API key is invalid
 * - 405 Method Not Allowed: { "message": "Method Not Allowed" } if the request method is not POST
 */
export default function handler(req, res) {
  apiKeyValidation(req, res, () => {
    if (req.method === 'POST') {
      const { count, remaining, resetTime } = leakingBucket.addRequest();
      res.status(200).json({ count, remaining, resetTime });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}
