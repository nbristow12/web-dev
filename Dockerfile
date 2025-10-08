# Multi-stage build for both frontend and backend
FROM node:18-alpine AS base

# Build frontend
FROM base AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Build backend
FROM base AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Final production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy built frontend
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package*.json ./frontend/
COPY --from=frontend-builder /app/frontend/next.config.ts ./frontend/

# Copy backend
COPY --from=backend-builder /app/backend ./backend

# Install frontend production dependencies
WORKDIR /app/frontend
RUN npm ci --only=production

# Install backend production dependencies (already done in builder)
WORKDIR /app

# Create startup script
COPY Procfile ./
RUN echo '#!/bin/sh\nif [ "$SERVICE" = "web" ]; then\n  cd frontend && npm start\nelif [ "$SERVICE" = "api" ]; then\n  cd backend && npm start\nelse\n  echo "Please set SERVICE environment variable to either web or api"\n  exit 1\nfi' > start.sh && chmod +x start.sh

# Default to backend for compatibility
EXPOSE 3001
ENV SERVICE=api

CMD ["./start.sh"]
