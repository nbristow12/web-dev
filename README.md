# Web Development App

A full-stack web application with separate frontend and backend services for user registration with PostgreSQL database integration, designed for deployment on Aptible.

## Features

- User registration form with name, birthday, and email
- PostgreSQL database integration
- Responsive and modern UI design with React/Next.js
- Real-time user list display
- Input validation and error handling
- Separate frontend and backend services
- Ready for Aptible deployment with container orchestration

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js with CORS support
- **Database**: PostgreSQL
- **Deployment**: Aptible (Docker containers)
- **Development**: Concurrent development servers

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd web-dev
npm run install:all
```

### 2. Database Setup

1. Set up a PostgreSQL database (locally or hosted service)
2. Copy the connection string for your database

### 3. Environment Configuration

1. Backend Configuration:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edit `backend/.env` with your database configuration:
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

2. Frontend Configuration:
   ```bash
   cd frontend
   cp .env.example .env.local
   ```
   
   Edit `frontend/.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NODE_ENV=development
   PORT=3000
   ```

### 4. Run Locally

#### Development Mode (Both Services)
```bash
npm run dev
```

#### Individual Services
```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend
```

- Backend API: `http://localhost:3001`
- Frontend App: `http://localhost:3000`

## Deployment on Aptible

### Prerequisites

1. Install Aptible CLI:
   ```bash
   gem install aptible-cli
   ```

2. Login to Aptible:
   ```bash
   aptible login
   ```

### Option 1: Using aptible.yml (Recommended)

1. Configure your environment variables in Aptible dashboard:
   - `DATABASE_URL`: Your PostgreSQL database URL
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

2. Deploy both services:
   ```bash
   aptible deploy
   ```

### Option 2: Manual Deployment

1. Create and deploy backend:
   ```bash
   aptible apps:create web-dev-backend
   aptible config:set DATABASE_URL=... NODE_ENV=production
   aptible deploy --app web-dev-backend --docker-image ./backend
   ```

2. Create and deploy frontend:
   ```bash
   aptible apps:create web-dev-frontend  
   aptible config:set NODE_ENV=production NEXT_PUBLIC_API_URL=https://web-dev-backend.aptible.in
   aptible deploy --app web-dev-frontend --docker-image ./frontend
   ```

### Database Setup

Create a PostgreSQL database in Aptible:
```bash
aptible db:create web-dev-database --type postgresql
```

Update your backend environment with the database URL from Aptible.

## Project Structure

```
web-dev/
├── backend/                    # Node.js/Express API server
│   ├── server.js              # Main backend server
│   ├── package.json           # Backend dependencies
│   ├── Dockerfile             # Backend container build
│   └── .env.example           # Backend environment template
├── frontend/                   # Next.js React application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       # Main page component
│   │   │   ├── layout.tsx     # App layout
│   │   │   └── globals.css    # Global styles
│   │   ├── components/
│   │   │   ├── UserRegistrationForm.tsx
│   │   │   └── UsersList.tsx
│   │   ├── lib/
│   │   │   └── api.ts         # API client functions
│   │   └── types/
│   │       └── user.ts        # TypeScript definitions
│   ├── package.json           # Frontend dependencies
│   ├── Dockerfile             # Frontend container build
│   └── .env.example           # Frontend environment template
├── package.json               # Root project management
├── Procfile                   # Process definitions for deployment
├── aptible.yml               # Aptible deployment configuration
├── Dockerfile                # Multi-service container build
├── .gitignore                # Git ignore patterns
└── README.md                 # This file
```

## API Endpoints

### Backend API (Port 3001)
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users  
- `GET /api/health` - Health check endpoint

### Frontend (Port 3000)
- `/` - Main user registration interface
- Communicates with backend API via configured API URL

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