#!/bin/bash

# ATC MVP - Deployment Script
# Usage: ./scripts/deploy.sh [production|development]

set -e  # Exit on any error

# Configuration
PROJECT_NAME="atc-mvp"
VERSION="1.0.0"
REGISTRY="ghcr.io"  # GitHub Container Registry
IMAGE_NAME="${REGISTRY}/${PROJECT_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Build the Docker image
build_image() {
    local env=$1
    log_info "Building Docker image for ${env} environment..."

    if [ "$env" = "production" ]; then
        docker build -t ${IMAGE_NAME}:${VERSION} -t ${IMAGE_NAME}:latest .
    else
        docker build -f Dockerfile.dev -t ${IMAGE_NAME}:dev .
    fi

    log_success "Docker image built successfully"
}

# Deploy production
deploy_production() {
    log_info "Deploying ATC MVP in production mode..."

    # Stop existing containers
    docker-compose down 2>/dev/null || true

    # Start production service
    docker-compose up -d atc-frontend

    # Wait for health check
    log_info "Waiting for application to be healthy..."
    sleep 10

    # Check if container is running
    if docker ps | grep -q "atc-mvp-frontend"; then
        log_success "ATC MVP deployed successfully!"
        log_info "Application is running at http://localhost:8080"
        log_info "Health check: http://localhost:8080/health"
    else
        log_error "Deployment failed. Check logs with: docker-compose logs atc-frontend"
        exit 1
    fi
}

# Deploy development
deploy_development() {
    log_info "Deploying ATC MVP in development mode..."

    # Stop existing containers
    docker-compose --profile dev down 2>/dev/null || true

    # Start development service
    docker-compose --profile dev up -d atc-dev

    # Wait for service to be ready
    sleep 5

    if docker ps | grep -q "atc-mvp-dev"; then
        log_success "ATC MVP development environment deployed successfully!"
        log_info "Application is running at http://localhost:3000"
        log_info "Hot reload enabled - changes will be reflected automatically"
    else
        log_error "Development deployment failed. Check logs with: docker-compose --profile dev logs atc-dev"
        exit 1
    fi
}

# Clean up old images and containers
cleanup() {
    log_info "Cleaning up old Docker images and containers..."

    # Remove stopped containers
    docker container prune -f

    # Remove unused images
    docker image prune -f

    log_success "Cleanup completed"
}

# Show help
show_help() {
    echo "ATC MVP Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  production    Deploy in production mode (port 8080)"
    echo "  development   Deploy in development mode (port 3000)"
    echo "  build         Build Docker images only"
    echo "  stop          Stop all running containers"
    echo "  logs          Show application logs"
    echo "  cleanup       Clean up old images and containers"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 production     # Deploy for production"
    echo "  $0 development    # Deploy for development"
    echo "  $0 logs           # Show logs"
}

# Stop all containers
stop_all() {
    log_info "Stopping all ATC MVP containers..."
    docker-compose down
    docker-compose --profile dev down
    log_success "All containers stopped"
}

# Show logs
show_logs() {
    if docker ps | grep -q "atc-mvp-frontend"; then
        log_info "Showing production logs..."
        docker-compose logs -f atc-frontend
    elif docker ps | grep -q "atc-mvp-dev"; then
        log_info "Showing development logs..."
        docker-compose --profile dev logs -f atc-dev
    else
        log_warning "No ATC MVP containers are running"
    fi
}

# Main script logic
main() {
    local command=${1:-help}

    log_info "ATC MVP Deployment Script v${VERSION}"
    echo ""

    check_docker

    case $command in
        "production")
            build_image "production"
            deploy_production
            ;;
        "development"|"dev")
            build_image "development"
            deploy_development
            ;;
        "build")
            build_image "production"
            build_image "development"
            ;;
        "stop")
            stop_all
            ;;
        "logs")
            show_logs
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            log_error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"