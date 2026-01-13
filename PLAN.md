# Converge WWW — Plan

## Current State

- 8 presentations in `/public/decks/`
- Consistent styling (cream paper, green accent, Inter/IBM Plex Mono fonts)
- Deployed to converge.zone

## Future Work: Pack/Blueprint Presentation Series

### Concept

Create domain-specific presentations for each Pack/Blueprint that:

1. **Generic Converge story** — Reuse content from Customer Pitch
2. **Domain-specific context** — Pain points, current state, why it matters
3. **Real Gherkin files** — Show actual Truths from converge-domain
4. **How convergence happens** — Step-by-step in that domain
5. **Before/after comparison** — Manual vs Converge

### Planned Decks

| Deck | Blueprint | Packs |
|------|-----------|-------|
| `converge.zone-lead-to-cash.pdf` | Lead-to-Cash | Customers, Delivery, Legal, Money |
| `converge.zone-hire-to-retire.pdf` | Hire-to-Retire | People, Legal, Money, Trust |
| `converge.zone-procure-to-pay.pdf` | Procure-to-Pay | Procurement Assets, Legal, Money |
| `converge.zone-idea-to-launch.pdf` | Idea-to-Launch | Knowledge, Product Engineering, Delivery, Growth Marketing |
| `converge.zone-issue-to-resolution.pdf` | Issue-to-Resolution | Ops Support, Product Engineering, Knowledge, Data Metrics |
| `converge.zone-campaign-to-revenue.pdf` | Campaign-to-Revenue | Growth Marketing, Customers, Delivery, Money |
| `converge.zone-partner-to-value.pdf` | Partner-to-Value | Partnerships Vendors, Legal, Delivery, Money |

### Structure (per deck)

1. **Title slide** — Blueprint name, subtitle
2. **The Problem** — Domain-specific pain (3-4 slides)
3. **Converge Overview** — Generic story (2-3 slides from Customer Pitch)
4. **Domain Truths** — Real Gherkin examples (3-5 slides)
5. **How It Converges** — Step-by-step flow (2-3 slides)
6. **Before/After** — Comparison table
7. **Summary + CTA**

### Source Material

- Gherkin files: `converge-domain/tests/*.feature` (when created)
- Customer Pitch: `public/decks/converge.zone-customer-pitch.md`
- Theme: Match existing deck styling exactly

### Priority

Start with **Lead-to-Cash** — most common SMB workflow.
