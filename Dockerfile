# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY music-bot-frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source
COPY music-bot-frontend/ ./

# Build the application
RUN npm run build

# Stage 2: Serve the application with a lightweight webserver
FROM nginx:alpine


# Copy built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port the application uses
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]