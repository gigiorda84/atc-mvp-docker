# Docker Deployment Guide

## Overview
The ATC MVP is fully containerized using Docker for easy deployment and sharing. This guide covers all Docker-related operations.

## Architecture
- **Production**: Multi-stage build with Nginx serving optimized static files
- **Development**: Live-reload environment with source code mounting
- **Images**: Alpine-based for security and performance

## Quick Commands

### NPM Scripts (Recommended)
```bash
# Start development environment
npm run docker:dev

# Start production environment
npm run docker:prod

# View application logs
npm run docker:logs

# Stop all containers
npm run docker:stop

# Clean up old images/containers
npm run docker:cleanup

# Build images only
npm run docker:build
```

### Direct Script Usage
```bash
# All deployment operations
./scripts/deploy.sh [command]

# Available commands:
./scripts/deploy.sh production    # Deploy production (port 8080)
./scripts/deploy.sh development   # Deploy development (port 3000)
./scripts/deploy.sh build         # Build both images
./scripts/deploy.sh stop          # Stop all containers
./scripts/deploy.sh logs          # Show logs
./scripts/deploy.sh cleanup       # Clean up resources
./scripts/deploy.sh help          # Show help
```

## Environment Details

### Development Environment
- **Port**: 3000
- **Features**: Hot reload, full source mounting
- **Usage**: `docker-compose --profile dev up -d atc-dev`
- **Dockerfile**: `Dockerfile.dev`

### Production Environment
- **Port**: 8080
- **Features**: Nginx optimization, security headers, gzip
- **Usage**: `docker-compose up -d atc-frontend`
- **Dockerfile**: `Dockerfile` (multi-stage)

## File Structure
```
atc-mvp/
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development with live reload
├── docker-compose.yml      # Services configuration
├── .dockerignore          # Build optimization
├── nginx.conf             # Production web server config
└── scripts/
    └── deploy.sh          # Deployment automation
```

## Health Checks
Both environments include health check endpoints:
- **Development**: http://localhost:3000/
- **Production**: http://localhost:8080/health

## Security Features
- Non-root container execution
- Security headers (XSS, CSRF protection)
- Minimal Alpine base images
- No sensitive files in build context

## Troubleshooting

### View Container Status
```bash
docker ps                           # Running containers
docker-compose logs atc-frontend    # Production logs
docker-compose --profile dev logs atc-dev  # Development logs
```

### Container Not Starting
```bash
./scripts/deploy.sh logs   # Check application logs
docker system prune -f    # Clean up resources if needed
```

### Port Conflicts
Ensure ports 3000 and 8080 are available, or modify `docker-compose.yml` port mappings.

## Sharing with Colleagues

### GitHub Repository Setup
1. Initialize git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial ATC MVP setup"`
4. Push to GitHub

### Colleague Onboarding
```bash
# Clone repository
git clone [repository-url]
cd atc-mvp

# Start development environment
npm run docker:dev
# or
./scripts/deploy.sh development

# Access application at http://localhost:3000
```

No additional setup required - Docker handles all dependencies!