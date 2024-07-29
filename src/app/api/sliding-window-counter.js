import { SlidingWindowCounter } from '../../../rateLimiters/SlidingWindowCounter';

// Initialize the SlidingWindowCounter with a window size of 60 seconds and 10 buckets
const slidingWindowCounter = new SlidingWindowCounter(60, 10);

/**
 * API handler for the Sliding Window Counter rate limiting algorithm.
 *
 * POST /api/sliding-window-counter
 *
 * Request headers:
 * - Authorization: Bearer YOUR_API_KEY
 *
 * Response:
 * - 200 OK: { "count": number } indicating the current request count within the window
 * - 405 Method Not Allowed: { "message": "Method Not Allowed" } if the request method is not POST
 */
export default function handler(req, res) {
  if (req.method === 'POST') {
    const count = slidingWindowCounter.addRequest();
    res.status(200).json({ count });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
