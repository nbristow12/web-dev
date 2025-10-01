# Web Development App

A Node.js web application for user registration with PostgreSQL database integration, designed for deployment on Vercel. Features a modern React frontend with state management and responsive design.

## Features

- User registration form with name, birthday, and email
- PostgreSQL database integration (compatible with Neon)
- Responsive and modern UI design
- Real-time user list display
- Input validation and error handling
- Ready for Vercel deployment

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Neon hosted)
- **Frontend**: React, CSS3
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd web-dev
npm install
```

### 2. Database Setup (Neon)

1. Create a free account at [Neon](https://neon.tech/)
2. Create a new database project
3. Copy the connection string from your Neon dashboard

### 3. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace with your Neon database URL:
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database
   PORT=3000
   NODE_ENV=development
   ```

### 4. Run Locally

#### Production Mode (React Build)
```bash
npm run build
npm start
```

#### Development Mode
For React development with hot reload:
```bash
npm run react-start
```

The application will be available at `http://localhost:3000` for the backend or `http://localhost:3000` for React development mode.

## Deployment on Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your Neon database URL
   - `NODE_ENV`: `production`

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy automatically on each push

## Project Structure

```
web-dev/
├── index.js              # Main server file
├── src/                  # React source files
│   ├── components/
│   │   ├── UserRegistrationForm.js
│   │   └── UsersList.js
│   ├── App.js           # Main React component
│   ├── index.js         # React entry point
│   └── index.css        # Global styles
├── public/
│   ├── index.html       # React HTML template
│   └── vanilla-index.html # Original HTML (fallback)
├── build/               # React production build (generated)
├── package.json         # Dependencies and scripts
├── vercel.json          # Vercel deployment configuration
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore patterns
└── README.md            # This file
```

## API Endpoints

- `GET /` - Serve the main UI
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/health` - Health check endpoint

## Database Schema

The application automatically creates a `users` table with the following structure:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.