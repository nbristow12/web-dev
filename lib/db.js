import { Pool } from 'pg';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database table
async function initializeDatabase() {
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
    console.log('Database table initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize database on module load (only in development)
if (process.env.NODE_ENV === 'development') {
  initializeDatabase();
}

export { pool };