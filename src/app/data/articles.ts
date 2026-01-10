// Static articles data (will be replaced with GCS fetch)

import type { Article } from '@/api/signals';

export const articles: Article[] = [
  {
    slug: 'evals-hidden-moat',
    title: 'Evals: The Hidden Moat of Convergent Systems',
    subtitle: 'Why evaluation frameworks are central to trustworthy agent systems',
    author: 'Karl Pernyer',
    publishedAt: '2026-01-10T12:00:00Z',
    tags: ['evals', 'agents', 'architecture'],
    readingTime: 8,
    featured: true,
    content: `In the early days of machine learning and autonomous agents, most teams focused on *getting models to output something plausible*. A thousand papers later, the real bottleneck isn't generating output — it's making sense of it.

It's one thing for an agent to say *"This looks like a good strategy"*.
It's another thing entirely to prove *why* that strategy is defensible given all available evidence, policies, and business constraints.

That is where **evals** become not just useful, but vital.

In traditional systems, evals are often treated as optional or secondary — a layer of tests you write after building features. But in a system built around **Converge's deterministic convergence architecture**, evals are central. They are not tests of agents; they are **formal definitions of what acceptable outcomes look like**.

---

## Why Evals Matter More Than You Think

In a distributed multi-agent system, you don't just need answers — you need *trustworthy answers*. When systems act autonomously or semi-autonomously, humans can no longer simply inspect the output and hope it makes sense. They need evidence.

### Three Common Failure Modes in Agent Systems

1. **Reactive loops**
   Fix one failure, introduce another. Teams chase symptoms without knowing whether they've improved the system.

2. **Model upgrades that break logic**
   A new model sounds better — but subtly violates business constraints or safety assumptions.

3. **Opaque decisions**
   You can see *what* happened, but not *why*.

Strong evals prevent all three.

Teams with robust eval pipelines can distinguish real regressions from noise, upgrade models confidently, and reason about system behavior across time. Teams without evals are stuck in reactive mode.

But evals are hard — especially for agents.

---

## Converge Meets Evals: A Better Contract

Converge is built on a simple but strict idea:

> **Context is the API.**

Agents observe a shared, append-only context and propose changes. The engine — not the agents — is the semantic authority. It applies changes only if they satisfy explicit invariants.

This makes evals **first-class system artifacts**, not external tests.

In Converge, an eval is *not*:

- A unit test for a prompt
- A check that an agent followed a specific tool sequence
- A judgment of internal reasoning steps

An eval *is*:

- A declarative assertion about the **resulting context**
- A rule that must hold for convergence to be accepted
- A semantic contract independent of model choice
- A human-explainable statement of correctness

This distinction is critical.

---

## Evaluate Outcomes, Not Processes

Many agent evaluation approaches try to verify *how* an agent reasoned — the order of tool calls, the chain of thought, or the internal plan.

This is brittle.

Different agents — or different models — can arrive at equally valid outcomes via entirely different paths.

Converge follows a stricter and more scalable principle:

> **Evaluate what the system produced, not how it got there.**

For example, an eval might look like this:

\`\`\`gherkin
Scenario: Growth Strategy Acceptance
Given a completed convergence
Then the context must contain:
  - at least three distinct strategies
  - no strategies violating brand safety rules
  - at least one strategy per primary market segment
\`\`\`

This eval doesn't care whether the agent used chain-of-thought, tool use, or retrieval. It only cares about the result.

---

## Evals as Competitive Advantage

Here's the counterintuitive insight:

> **The team with the best evals will win — not the team with the best models.**

Models are commoditizing. Prompts leak. Architectures get copied.

But a well-structured eval suite is:

- Hard to replicate without deep domain knowledge
- Continuously refined through real-world feedback
- A forcing function for system clarity

Evals encode what "good" means for your business. That's not something you can download from Hugging Face.

---

## The Converge Eval Philosophy

In Converge, evals are not bolted on. They are woven into the execution model:

1. **Convergence requires satisfaction** — the system doesn't halt until all declared invariants are met
2. **Evals are versioned** — you can trace which eval suite was active for any given run
3. **Evals are composable** — combine business rules, safety constraints, and domain logic in layers
4. **Evals are debuggable** — when something fails, you see exactly which assertion broke and why

This transforms evals from "testing infrastructure" into "system specification."

---

## Conclusion

If you're building agent systems and treating evals as an afterthought, you're building on sand.

Converge treats evals as the contract between human intent and machine action. They are the reason you can trust the system — not because it's clever, but because it's accountable.

**Evals are the moat.**

And in a world of commoditized models, that moat is deeper than it looks.`,
  },
];

// Helper to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

// Get all article metadata (for listing)
export function getArticleIndex(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
