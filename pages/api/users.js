import { pool } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create user
    const { name, birthday, email } = req.body;

    // Basic validation
    if (!name || !birthday || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, birthday, and email are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO users (name, birthday, email) VALUES ($1, $2, $3) RETURNING *',
        [name, birthday, email]
      );
      client.release();

      res.status(201).json({
        message: 'User created successfully',
        user: result.rows[0]
      });
    } catch (error) {
      console.error('Database error:', error);
      
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Email already exists' });
      }
      
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    // Get all users
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users ORDER BY created_at DESC');
      client.release();

      res.json(result.rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}