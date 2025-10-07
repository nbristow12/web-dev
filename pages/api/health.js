export default function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}