import { FixedWindowCounter } from '../../rateLimiters/FixedWindowCounter';
import apiKeyValidation from '../../src/middleware/auth';

// Initialize the FixedWindowCounter with a window size of 60 seconds and a maximum of 100 requests per window
const fixedWindowCounter = new FixedWindowCounter(60, 100);

/**
 * API handler for the Fixed Window Counter rate limiting algorithm.
 *
 * POST /api/fixed-window-counter
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
      const { count, remaining, resetTime } = fixedWindowCounter.addRequest(req.ip);
      res.status(200).json({ count, remaining, resetTime });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
}
