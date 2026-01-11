# Changelog

All notable changes to the Converge website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
