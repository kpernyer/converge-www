# Changelog

All notable changes to the Converge website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.3.1] - 2026-01-11

### Fixed
- **Email delivery**: Changed notification recipient to Resend account email (kpernyer@gmail.com) until custom domain is verified
- **Debug logging**: Removed verbose Resend API response logging from production

### Changed
- **Justfile**: Added Firebase commands (deploy-functions, deploy-hosting, logs, emulate, build-functions) and GitHub commands (release, releases, browse, prs, ci)

## [1.3.0] - 2026-01-11

### Security
- **XSS Protection**: Added DOMPurify to sanitize markdown HTML output
- **Rate Limiting**: API endpoint now limits to 5 requests per hour per IP
- **CORS Restriction**: API only accepts requests from converge.zone domains
- **Input Validation**: RFC 5322 compliant email validation, length limits on name (100 chars) and email (254 chars)
- **HTML Sanitization**: User input escaped in notification emails
- **Security Headers**: Added X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- **PII Protection**: Removed email addresses from server logs

### Changed
- **Environment Config**: Moved API endpoint URL and notification email to environment configuration
- **Email Regex**: Improved email validation to be RFC 5322 compliant

## [1.2.1] - 2026-01-11

### Added
- **Email notifications**: Demo requests now send email notifications via Resend
  - Notifications sent to kenneth@aprio.one
  - Includes name, email, and request ID
  - Link to Firebase Console for viewing all requests

## [1.2.0] - 2026-01-11

### Added
- **Demo Request API**: Firebase Functions endpoint for demo requests
  - `POST /demoRequest` stores requests in Firestore
  - Input validation for name and email
  - CORS enabled for cross-origin requests
- **Firestore integration**: Database for storing demo requests

### Infrastructure
- Firebase Functions (Node.js 20, 2nd Gen)
- Firestore rules and indexes

## [1.1.1] - 2026-01-11

### Changed
- **Navigation**: Added Demo link to header navigation
- **Landing page**: Inline demo request form as primary CTA
- **Hero**: Simplified CTAs (demo request form now inline below)

## [1.1.0] - 2026-01-11

### Added
- **New landing page tagline**: "Stop agent drift. Converge to an explainable result."
- **Demo request flow**: Interactive terminal-style form for scheduling demos
  - Posts to `api.converge.zone/demo-request`
  - Animated agent initialization sequence
- **SDR Funnel demo**: New primary demo showcasing lead qualification with invariants
  - HITL barriers, consent rules, cost-aware routing
  - Full provenance tracking on routing decisions

### Changed
- **Hero CTAs**: Replaced "Read the Docs" and "View Source" with:
  - "Read the Manifesto" (primary)
  - "See it in action" (secondary)
  - "Set up a demo" (tertiary/accent)
- **Demo page**: SDR Funnel now default demo, integrated demo request component

## [1.0.1] - 2026-01-11

### Fixed
- **CLS on Signals page**: Eliminated layout shift by initializing with static data
  - CLS reduced from 0.35 to 0.001
  - Performance score improved from 67 to 92

### Changed
- `useArticleIndex` and `useArticle` hooks now initialize with static data immediately
- Remote fetching is opt-in via `{ fetchRemote: true }` option

## [1.0.0] - 2026-01-11

### Added
- **Navigation redesign**: Cleaner header with subsystems dropdown menu
- **Subsystem pages**: Dedicated pages for converge-core, converge-provider, converge-domain, converge-tool, and converge-ledger
- **Signals blog section**: Technical articles with RSS feed support
- **Featured Signal**: Latest article displayed on landing page
- **Mobile hamburger menu**: Slide-out navigation for mobile devices
- **Footer reorganization**: Three-column layout with Subsystems, Resources, and Packages
- **Lighthouse CI**: Automated performance regression tracking in GitHub Actions
- **SEO improvements**: Added robots.txt and sitemap.xml

### Changed
- **Mobile responsiveness**: All pages now optimized for 640px breakpoint
  - Header with hamburger menu
  - Footer with stacked columns
  - Article pages with edge-to-edge code blocks
  - Home page hero, features, and axioms sections
  - All subsystem pages
  - Signals listing page
  - Manifesto page
  - Demo page

### Performance
- Current Lighthouse scores (mobile):
  - Performance: 90
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 91

## [0.1.0] - 2026-01-04

### Added
- Initial website launch
- Landing page with hero, features, and installation sections
- Manifesto page
- Demo page with interactive terminal
- Module pages (Provider, Domain, Tools)
- Firebase Hosting deployment
- GCS integration for article storage
