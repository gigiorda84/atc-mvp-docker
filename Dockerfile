# ATC MVP - Dockerfile
# Multi-stage build per ottimizzazione

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Metadata
LABEL maintainer="ATC Development Team"
LABEL description="ATC Housing Management MVP - Frontend Application"
LABEL version="1.0.0"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application files
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S atc && \
    adduser -S atc -u 1001

# Change ownership of app directory
RUN chown -R atc:atc /app

# Stage 2: Production stage
FROM nginx:alpine AS production

# Install Node.js per http-server (alternativa leggera)
RUN apk add --no-cache nodejs npm

# Copy application from builder stage
COPY --from=builder --chown=atc:atc /app /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]