# ATC Housing Management MVP

## Overview
MVP web application for ATC (Social Housing) digital transformation, focusing on tenant services and management efficiency.

## Core Features (MVP Scope)
1. **Maintenance & Assistance** - Ticket creation, tracking, SLA management, reminders
2. **Communication & Transparency** - Announcements, document management, notifications
3. **Payments & Administrative Practices** - PagoPA integration, digital forms, payment tracking
4. **Support & Extra Services** - Chatbot support, local services integration

## Tech Stack
- **Frontend**: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript
- **Design System**: Custom Tailwind config with ATC branding
- **Responsive**: Mobile-first design for tenant app, desktop admin console

## Project Structure
```
atc-mvp/
├── src/           # HTML pages and components
├── assets/        # Static assets (CSS, JS, images)
├── docs/          # Documentation
└── package.json   # Project configuration
```

## Getting Started

### Traditional Development
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Access at: http://localhost:3000

### Docker Development (Recommended)

#### Quick Start with Docker
```bash
# Development environment (port 3000)
npm run docker:dev

# Production environment (port 8080)
npm run docker:prod

# View logs
npm run docker:logs

# Stop containers
npm run docker:stop

# Clean up
npm run docker:cleanup
```

#### Manual Docker Commands
```bash
# Development
./scripts/deploy.sh development

# Production
./scripts/deploy.sh production

# Build only
./scripts/deploy.sh build

# Stop all
./scripts/deploy.sh stop
```

### Available Environments
- **Development**: http://localhost:3000 (hot reload enabled)
- **Production**: http://localhost:8080 (optimized nginx setup)

### Requirements
- Docker & Docker Compose
- Node.js (for traditional development)

## Target Users
- **Tenants** (Mobile users) - Primary interface for services
- **ATC Staff** - Admin console for management
- **Technicians/Suppliers** - Limited access for maintenance tasks

## MVP Timeline: 8-10 weeks
See PRD_MVP_ATC.md for detailed requirements and user stories.