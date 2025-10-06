import { pool } from '../../lib/db';

// Initialize database on first API call
let dbInitialized = false;

// Mock data for development when database is not available
let mockUsers = [];
let mockIdCounter = 1;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    // Check if DATABASE_URL is configured properly
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost')) {
      console.log('Using mock data for development (no real database configured)');
      dbInitialized = true;
      return;
    }
    
    try {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          birthday DATE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      client.release();
      dbInitialized = true;
      console.log('Database table initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }
}

export default async function handler(req, res) {
  // Initialize database on first request
  try {
    await ensureDbInitialized();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return res.status(500).json({ 
      error: 'Database connection failed. Please check your DATABASE_URL configuration.' 
    });
  }
  const usingMockData = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost');

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

    if (usingMockData) {
      // Use mock data for development
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      const newUser = {
        id: mockIdCounter++,
        name,
        birthday,
        email,
        created_at: new Date().toISOString()
      };
      mockUsers.unshift(newUser);

      res.status(201).json({
        message: 'User created successfully',
        user: newUser
      });
    } else {
      // Use real database
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
    }
  } else if (req.method === 'GET') {
    // Get all users
    if (usingMockData) {
      res.json(mockUsers);
    } else {
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users ORDER BY created_at DESC');
        client.release();

        res.json(result.rows);
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}