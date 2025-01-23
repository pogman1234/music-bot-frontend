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

# Set the environment variable during build using ARG
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the application
RUN npm run build

# Stage 2: Serve the application with a lightweight webserver
FROM nginx:alpine

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration
COPY music-bot-frontend/nginx.conf /etc/nginx/conf.d

# Copy built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port the application uses
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]