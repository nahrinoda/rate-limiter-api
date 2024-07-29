import { FixedWindowCounter } from '../../rateLimiters/FixedWindowCounter';

// Initialize the FixedWindowCounter with a window size of 60 seconds
const fixedWindowCounter = new FixedWindowCounter(60);

/**
 * API handler for the Fixed Window Counter rate limiting algorithm.
 *
 * POST /api/fixed-window-counter
 *
 * Request headers:
 * - Authorization: Bearer YOUR_API_KEY
 *
 * Response:
 * - 200 OK: { "count": number } indicating the current request count for the window
 * - 405 Method Not Allowed: { "message": "Method Not Allowed" } if the request method is not POST
 */
export default function handler(req, res) {
  if (req.method === 'POST') {
    const count = fixedWindowCounter.addRequest(req.ip);
    res.status(200).json({ count });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
