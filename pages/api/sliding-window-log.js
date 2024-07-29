import { SlidingWindowLog } from '../../rateLimiters/SlidingWindowLog';

// Initialize the SlidingWindowLog with a window size of 60 seconds
const slidingWindowLog = new SlidingWindowLog(60);

/**
 * API handler for the Sliding Window Log rate limiting algorithm.
 *
 * POST /api/sliding-window-log
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
    const count = slidingWindowLog.addRequest();
    res.status(200).json({ count });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
