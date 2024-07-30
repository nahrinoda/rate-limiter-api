import { SlidingWindowCounter } from '../../rateLimiters/SlidingWindowCounter';
import apiKeyValidation from '../../src/middleware/auth';

// Initialize the SlidingWindowCounter with a window size of 60 seconds, 10 buckets, and a maximum of 100 requests per window
const slidingWindowCounter = new SlidingWindowCounter(60, 10, 100);

/**
 * API handler for the Sliding Window Counter rate limiting algorithm.
 *
 * POST /api/sliding-window-counter
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
      const { count, remaining, resetTime } = slidingWindowCounter.addRequest();
      res.status(200).json({ count, remaining, resetTime });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}
