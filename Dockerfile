# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port (default for many Node.js apps)
EXPOSE 3000

# Start the app (edit if your entry point is different)
CMD ["node", "index.js"]
