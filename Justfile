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
    rm -rf dist .firebase functions/lib

# === Firebase ===

# Deploy only Firebase Functions
deploy-functions:
    firebase deploy --only functions

# Deploy only Firebase Hosting
deploy-hosting:
    firebase deploy --only hosting

# View Firebase Functions logs
logs:
    firebase functions:log

# Start Firebase emulators locally
emulate:
    firebase emulators:start

# Build functions
build-functions:
    cd functions && bun run build

# === GitHub ===

# Create a new release (usage: just release v1.3.0)
release version:
    gh release create {{version}} --generate-notes

# View recent releases
releases:
    gh release list

# Open repo in browser
browse:
    gh repo view --web

# View open PRs
prs:
    gh pr list

# Check CI status
ci:
    gh run list --limit 5
