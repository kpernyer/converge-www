// Static articles data (will be replaced with GCS fetch)

import type { Article } from '@/api/signals';

export const articles: Article[] = [
  {
    slug: 'agent-system-operating-system',
    title: 'What Makes an Agent System an Operating System',
    subtitle: 'Why Converge is an OS, not a framework',
    author: 'Karl Pernyer',
    publishedAt: '2026-01-10T18:00:00Z',
    tags: ['operating-system', 'architecture', 'agents'],
    readingTime: 10,
    featured: true,
    content: `*This article is part of the Converge Manifesto series.
If you haven't read the [Manifesto](/manifesto) yet, start there.
This piece explains why those principles inevitably lead to an OS-level system.*

---

## The word "OS" is overused — and mostly wrong

Today, almost every serious software product claims to be an "operating system":
- AI OS
- Business OS
- Agent OS
- Decision OS

Most of them are not operating systems.
They are applications with ambition.

An operating system is not defined by UI, workflows, or features.
It is defined by what it controls and what it refuses to control.

To understand why Converge qualifies — and most agent frameworks do not — we need to be precise.

---

## What an operating system actually does

Strip away GUIs, kernels, and hardware for a moment.

At its core, an operating system provides:
1. A single source of authority
2. A shared memory model
3. Process isolation
4. Scheduling and execution guarantees
5. A bounded lifecycle (start, halt, resume)
6. Observability and accountability

Everything else is implementation detail.

The Manifesto states this plainly:

> "There is one semantic authority per root intent."

That sentence alone disqualifies most agent systems from being OS-like.

---

## Agent frameworks coordinate behavior. Operating systems coordinate truth.

Most agent frameworks optimize for activity:
- tool calls
- message passing
- reactive loops
- background execution

They feel alive — until something goes wrong.

An operating system does something more subtle:

**It decides what is allowed to happen, when execution must stop, and what state is authoritative.**

Converge inherits this philosophy directly from the Manifesto:

> "The engine halts explicitly. Silence is never success."

This is OS behavior, not application behavior.

---

## Root Intent = Process

In Converge, everything starts with a Root Intent.

Not a task.
Not a workflow.
Not a job.

An intent.

This maps cleanly to an OS concept:

| OS Concept | Converge Concept |
|------------|------------------|
| Process | Root Intent |
| Address Space | Shared Context |
| Syscalls | Agent Effects |
| Kernel Authority | Convergence Engine |
| Halt State | Explicit Engine Halt |

Each root intent is a process boundary:
- isolated
- restartable
- explainable
- convergent

Nothing leaks across it unless explicitly serialized.

---

## Context is shared memory — not messaging

The Manifesto is unambiguous:

> "Agents do not communicate with each other."

This is the most OS-like decision in Converge.

In traditional agent systems:
- agents send messages
- ordering matters
- causality becomes implicit
- debugging becomes archaeology

In Converge:
- agents read from shared context
- agents write append-only effects
- causality is explicit
- order emerges from data, not timing

This mirrors shared memory in operating systems:
- processes don't message the kernel
- they read and write state
- the kernel arbitrates consistency

---

## Scheduling without orchestration

An OS scheduler doesn't ask processes what they want to do.

It asks:
- Are you eligible to run?
- Do you have the required resources?
- Have you already completed this work?

Converge applies the same logic:
- Eligibility is data-driven
- Idempotency is derived from context
- No agent has hidden lifecycle state

As proven in the engine axioms:

> "Whether an agent runs or not is a pure function of context evolution."

That is not a workflow engine.

**That is a scheduler.**

---

## Halt states are not failures — they are contracts

Most agent systems fear stopping.

They retry.
They loop.
They escalate silently.

Operating systems do the opposite:
- they halt explicitly
- they surface why
- they wait for authority

Converge adopts this stance fully:
- \`Converged\`
- \`AwaitingAuthority\`
- \`InvariantViolation\`
- \`BudgetExhausted\`

These are kernel states, not errors.

As the Manifesto puts it:

> "Stopping is a feature. Restarting is safe."

This is why Human-in-the-Loop fits naturally: humans are authorities, not interrupts.

---

## Determinism is not optional at the OS layer

Applications can be probabilistic.
Operating systems cannot.

Converge enforces:
- deterministic convergence
- monotonic context growth
- replayable execution
- provable starvation conditions

This enables something rare in agent systems:

**You can audit reality.**

You don't inspect logs hoping to infer intent.
You inspect the context and see why the system believes what it believes.

That is an OS guarantee.

---

## Why this matters for business systems

The Manifesto makes a bold claim:

> "Software is no longer the bottleneck. Trust is."

CRMs, ERPs, and campaign tools failed not because they were too rigid — but because they became uninspectable.

Converge doesn't replace them by copying features.
It replaces them by offering a new operating model:
- intent-driven
- agent-executed
- human-governed
- explainable by construction

This is only possible because Converge is built as an OS, not a framework.

---

## The final test

Here's the simplest way to tell if something is an operating system:

> Can it safely halt, explain itself, and resume without losing truth?

If the answer is no, it's an application.

**Converge passes this test.**

That's why it deserves the name.

---

## Closing

Converge is the zone where agents stop drifting and systems become explainable.

Not because agents are smarter.
Not because prompts are better.

But because the system finally behaves like what it is:

**An operating system for intent.**`,
  },
  {
    slug: 'vibe-coding-to-verified-systems',
    title: 'From Vibe Coding to Verified Systems',
    subtitle: 'How to build on bedrock instead of Jell-O',
    author: 'Karl Pernyer',
    publishedAt: '2026-01-10T16:00:00Z',
    tags: ['vibe-coding', 'verification', 'architecture'],
    readingTime: 5,
    featured: false,
    content: `## Vibe coding isn't the problem

Let's say this clearly:

**Vibe coding is not the enemy.**

The ability to describe intent in natural language and watch software emerge is one of the most powerful shifts in computing we've ever seen.

The problem isn't creativity.
The problem is what happens after the vibe fades.

---

## The Jell-O problem

Most AI-assisted systems today feel amazing at first.

You prompt.
Things happen.
The demo works.

But underneath, the foundation looks like this:
- mutable state
- implicit retries
- hidden heuristics
- agents that "kind of" coordinate

It's fast.
It's flexible.
And it wobbles.

You can't reason about it.
You can't audit it.
You can't restart it safely.

**You're building on Jell-O.**

---

## Why traditional SaaS doesn't help anymore

The old answer was configuration-heavy software:

CRM.
ERP.
Campaign tools.
Workflow engines.

They promised flexibility, but delivered:
- months of setup
- consultants translating your business into someone else's abstractions
- rigid systems that fit nobody perfectly

That era is ending.

APIs are everywhere.
LLMs can generate logic on demand.

The bottleneck is no longer implementation.
**It's trust.**

---

## Verified systems change the game

A verified system is not one that never fails.

It is one that:
- halts instead of spiraling
- explains instead of guessing
- resumes instead of restarting from scratch

In Converge:
- every process has a root intent
- execution proceeds in bounded convergence cycles
- stopping is a feature
- restarting is safe
- correctness is observable

This is what allows creativity without fragility.

---

## Vibe coding needs bedrock

Here's the key idea:

> You don't eliminate vibe coding.
> You lift it onto a foundation that can support it.

With a convergent core:
- agents can explore freely
- multiple strategies can coexist
- humans can intervene safely
- evals can judge outcomes instead of steps

You can vibe code business systems, not just demos.

---

## The zone

Converge is the zone where agents stop drifting and systems become explainable.

Being "in the zone" isn't a vibe — it's a mental state.

It's what happens when you stop fighting the system because you trust its foundations.

Like watching code scroll past in The Matrix, you don't need to read every instruction —
not because it's opaque, but because you understand the rules that govern it.

You trust the ride not because it feels fast,
but because you know it will halt, explain itself, and restart safely if needed.

**That's the difference between spectacle and system.**

---

## The future isn't less creative — it's more accountable

The next generation of software won't be built by hand.

But it also won't be built on hope.

It will be built on:
- explicit intent
- shared context
- convergent execution
- and systems that know when to stop

**That's how vibe coding grows up.**`,
  },
  {
    slug: 'context-is-the-api',
    title: 'Context Is the API: Why Agents Should Never Talk to Each Other',
    subtitle: 'The architectural foundation of convergent multi-agent systems',
    author: 'Karl Pernyer',
    publishedAt: '2026-01-10T14:00:00Z',
    tags: ['context', 'agents', 'architecture'],
    readingTime: 6,
    featured: true,
    content: `## The intuition trap

When people first build multi-agent systems, they almost always start the same way:

*"Agents should just talk to each other."*

One agent sends a message.
Another agent responds.
A third agent reacts.

It feels natural. Humans communicate this way. Distributed systems have been doing message passing for decades.

And yet—this instinct is the single biggest architectural mistake in agent systems.

Not because it doesn't work.
But because it works just well enough to fail later, quietly, and expensively.

---

## The hidden cost of agent-to-agent communication

When agents talk directly to each other, three things happen immediately:

1. **Hidden coupling is introduced**
   An agent's behavior now depends on who talked to it, in what order, and with what phrasing.

2. **Explainability collapses**
   When something goes wrong, you no longer ask:
   *"What facts led to this decision?"*

   You ask:
   *"Which agent said what, to whom, and when?"*

3. **Evaluation becomes brittle**
   You are forced to evaluate paths ("did the agent call the right tool in the right order?") instead of outcomes.

This is how systems drift.

Not loudly.
Not with crashes.
But with subtle, compounding inconsistency.

---

## Context is not a message bus

In Converge, agents never talk to each other.

They don't send messages.
They don't call peers.
They don't coordinate.

Instead, they observe and evolve a shared context.

Context is not a queue.
Context is not pub/sub.
Context is not workflow state.

**Context is an append-only semantic ledger.**

Agents:
- read from context
- propose changes to context
- never mutate existing facts
- never depend on who else is running

This is not a stylistic choice.
It is a systems guarantee.

---

## Context as the API surface

When context becomes the API, everything changes.

### 1. Eligibility becomes data-driven

An agent runs only when:
- the context contains the data it depends on
- it has not already contributed (idempotency via facts)

No polling.
No pending queues.
No hidden lifecycle state.

Whether an agent runs is a pure function of context.

### 2. Causality becomes explicit

Every fact in context can answer:
- Who produced this?
- Based on what inputs?
- In which convergence cycle?

This makes provenance a first-class property, not a debugging artifact.

### 3. Humans fit naturally into the system

Humans don't interrupt workflows.
They don't "pause agents".

They act as explicit authorities that:
- inspect context
- validate or reject proposals
- inject authoritative facts

Human-in-the-loop becomes a typed state, not an exception.

---

## Why this scales when message passing doesn't

Direct communication scales poorly because it creates N² coordination paths.

Context scales because:
- all agents read from the same surface
- no agent depends on another agent's timing
- evaluation happens against outcomes, not interactions

You can:
- add agents
- remove agents
- upgrade agents
- restart agents

…and the system still converges.

Because the truth lives in the context — not in transit.

---

## The core rule

> Agents should not coordinate with each other.
> They should coordinate with reality.

**Context is that reality.**

Everything else is noise.`,
  },
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
