export default function apiKeyValidation(req, res, next) {
  const apiKey = req.headers['authorization']?.split(' ')[1];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}