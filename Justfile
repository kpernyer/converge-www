# converge.hey.sh website

# Default: list available commands
default:
    @just --list

# Start development server
dev:
    bun run dev

# Build for production
build:
    bun run build

# Preview production build locally
preview:
    bun run preview

# Format code with Prettier
fmt:
    bun run fmt

# Lint with ESLint
lint:
    bun run lint

# Type check
typecheck:
    bun run typecheck

# Run all checks (lint, typecheck, build)
check: lint typecheck build
    @echo "✓ All checks passed"

# Deploy to Firebase production
deploy:
    bun run deploy

# Deploy to Firebase preview channel
deploy-preview:
    bun run deploy:preview

# Install dependencies
install:
    bun install

# Clean build artifacts
clean:
    rm -rf dist .firebase
