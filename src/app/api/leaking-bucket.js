import { LeakingBucket } from '../../../rateLimiters/LeakingBucket';

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
 * - 200 OK: { "allowed": true } if the request is allowed
 * - 200 OK: { "allowed": false } if the request is denied due to rate limiting
 * - 405 Method Not Allowed: { "message": "Method Not Allowed" } if the request method is not POST
 */
export default function handler(req, res) {
  if (req.method === 'POST') {
    const allowed = leakingBucket.addRequest();
    res.status(200).json({ allowed });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
