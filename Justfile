# converge.hey.sh website

# Default: list available commands
default:
    @just --list

# Start development server
dev:
    bun run dev

# Build for production
build: install
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

# Run tests (lint + typecheck)
test: lint typecheck
    @echo "✓ All tests passed"

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

# === Git ===

# View git status
status:
    git status

# View recent commits
log:
    git log --oneline -10

# Push to origin
push:
    git push

# Create and push a tag (usage: just tag v1.3.2 "Description")
tag version message:
    git tag -a {{version}} -m "{{message}}"
    git push origin {{version}}

# Publish to production (auto-increments patch version, pushes, deploys via CI)
publish message="Release":
    #!/usr/bin/env bash
    set -euo pipefail
    latest=$(git tag -l 'v*' --sort=-version:refname | head -1)
    if [[ -z "$latest" ]]; then
        next="v1.0.0"
    else
        IFS='.' read -r major minor patch <<< "${latest#v}"
        next="v${major}.${minor}.$((patch + 1))"
    fi
    echo "Publishing $next..."
    git add -A
    git diff --cached --quiet || git commit -m "{{message}}"
    git push
    git tag -a "$next" -m "{{message}}"
    git push origin "$next"
    echo "✓ Tagged $next - deploy workflow triggered"

# List tags
tags:
    git tag -l --sort=-version:refname | head -10

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
