// Static articles data (will be replaced with GCS fetch)

import type { Article } from '@/api/signals.types';

export const articles: Article[] = [
  {
    slug: 'converge-llm-contract-driven-rust',
    title: 'Converge-LLM: Why I Built a Contract-Driven LLM Module in Pure Rust',
    subtitle: 'Deterministic reasoning infrastructure for convergent agents',
    author: 'Kenneth Pernyer',
    publishedAt: '2026-01-16T10:00:00Z',
    tags: ['llm', 'rust', 'agents', 'architecture', 'contracts'],
    readingTime: 12,
    featured: false,
    content: `Most LLM integrations start with an API call and a prompt. That works until you try to build an agent framework where multiple models collaborate, decisions must be reproducible, outputs must be constrained and latency and uncertainty are engineering constraints, not "model vibes".

This article is the story of how converge-llm evolved into a contract-driven, Rust-native LLM subsystem designed for a broader agent framework focused on convergence: collaborating components that align on outcomes through structure, not spectacle.

The short version: a lot of reasoning does not need a giant foundation model. It needs deterministic control surfaces, structured state and tight output contracts so that small and medium models can reliably do real work.

## The motivation: collaboration, not charisma

In most LLM setups, you treat the model like a charismatic oracle. You feed it a narrative prompt and hope it returns something useful. That is fine for chat.

But in an agent framework, you want something else:
- multiple agents (sometimes multiple models) collaborate
- decisions must be debuggable
- failures must be attributable
- outputs must be safe to consume by software
- latency matters, especially when you chain steps
- uncertainty is normal and must be handled explicitly

If your agent runtime depends on a single large model behaving perfectly, you have not built an agent framework. You have built a brittle dependency.

So I took a different approach: design the intelligence layer like infrastructure.

## The Rust constraint: this is an engineering system

I have a strong bias toward pure Rust for core infrastructure. Not because Rust is fashionable, but because the benefits are concrete:
- explicit types and invariants
- early failure instead of late surprises
- deterministic behavior
- predictable performance
- code that can be audited and evolved

This influenced the entire stack:
- SurrealDB for storage (multi-model, flexible schemas)
- LanceDB for vector search (fast retrieval on structured embeddings)
- Polars for compute (feature engineering, metrics, state extraction)
- Burn for ML (embedded inference, Rust-native control)

This is not "Rust for Rust's sake". It is Rust to keep the system honest.

## The key insight: decision quality is mostly about structure

Large models provide broad capability. They also come with:
- higher latency
- higher cost (even locally, in compute and memory)
- more variable behavior
- a bigger "uncertainty surface"
- more reliance on prompt tricks

For many agent tasks, you do not need that. You need:
- structured input state
- clear task framing
- explicit output constraints
- predictable inference envelopes
- reproducibility for debugging

So the architecture became decision-first.

Behavior emerges from contracts, not training.

This decision-first posture is what makes small and medium models viable in practice.

## The evolution: from "LLM wrapper" to "reasoning kernel"

The module did not start as a grand design. It evolved through successive constraints.

### Phase 1: separating responsibilities

The first milestone was refusing to lump "LLM integration" into one file.

The module split into clear surfaces:
- config.rs: configuration as a contract, not convenience
- tokenizer.rs: tokenization as a correctness surface
- prompt.rs: structured prompts as a versioned stack
- inference.rs: deterministic inference envelopes
- agent.rs: integration with the agent framework

This separation mattered because every later capability, validation, tracing and chain execution, depends on not having a ball of mud.

### Phase 2: making it real

Architecture is cheap until you run real inference.

So I introduced the "engine boundary":
- engine.rs: real inference via llama-burn
- golden_test.rs: deterministic verification ("same input -> same output")

This is the moment the system became engineering-grade. If you cannot reproduce model behavior, you cannot debug an agent system.

### Phase 3: building a real decision chain

Agents rarely do one thing. They chain:
- infer signals
- evaluate options
- produce a plan

So the system gained:
- DecisionChain and DecisionTrace
- a ChainExecutor that runs a real topology
- Reasoning to Evaluation to Planning
- no retries
- no self-reflection
- no tool calling
- fail-fast behavior
- full observability

Now it behaved like infrastructure: predictable, inspectable, composable.

### Phase 4A: stress testing contracts until they break

At this point, the question was no longer "does it compile?"

It was: are the contracts sufficient to constrain behavior under adversarial inputs?

So we added output-side stress tests and tightened contracts where they were weak:
- Reasoning required at least one explicit reasoning step before conclusion
- Evaluation required meaningful justifications when configured

The result: the system became robust in the one way that matters. It fails clearly when it should fail.

## The contract stack: the "five invariants" that changed everything

The most important design element is the set of explicit contracts that govern behavior.

### 1) PromptStack: a five-layer cognitive API

Instead of a single monolithic "system prompt", the system uses a stack:
- Priming: identity and invariants (small, stable)
- Policy: versioned constraints
- Task frame: per capability framing
- State injection: structured data (from Polars)
- Intent: minimal user ask (intent + criteria)

This prevents prompt entropy and makes cognition testable.

### 2) PromptVersion: prompts co-versioned with models

Prompts are part of the runtime contract. They are versioned explicitly:
- \`reasoning:v1:llama3\`
- \`deployment:v1:...\`

This makes upgrades and regressions traceable.

### 3) Config validation: fail fast on incompatibility

Config is validated at startup:
- tokenizer/model mismatches
- precision/LoRA incompatibilities
- invalid context budgets
- special token errors

This avoids "it runs but the output is garbage" failure modes.

### 4) InferenceEnvelope: determinism as a first-class concept

Inference is not "just generate tokens". It is a reproducible envelope:
- tokenizer snapshot
- generation params
- seed policy
- stopping criteria

This enables golden tests and debugging.

### 5) OutputContract: output shape is explicit

Outputs are validated against contracts, not "vibes":
- reasoning must include steps and conclusion
- evaluation must include scores, confidence, justification
- planning must include ordered steps and capability references

This is the key that makes small models useful. They are not asked to be brilliant. They are asked to be bounded and consistent.

### 6) DecisionTrace: provenance for every step

Each chain step produces a trace:
- inputs
- prompt version
- envelope
- raw output
- validation result

This creates a pipeline that is:
- debuggable
- auditable
- training-ready (later)

This is how you build an agent system that can improve over time without guessing.

## Why this enables convergence of collaborating models

The word "converge" matters.

In a collaborative agent framework, you may have:
- a fast small model for classification or scoring
- a medium model for planning
- a retrieval layer for grounding
- a database for state and memory

Convergence happens when each component has:
- a well-defined role
- a controlled interface
- explicit success criteria
- observable failure modes

Contracts are how you get that.

Without contracts, collaboration becomes:
- prompt spaghetti
- ad-hoc retries
- brittle "model whispering"

With contracts, collaboration becomes:
- predictable
- improvable
- composable

## Why small and medium models are enough for many reasoning tasks

"Reasoning" is overloaded.

Many tasks we call reasoning are actually:
- structured decision-making
- constraint satisfaction
- prioritization
- scoring
- drafting a plan from computed state

These tasks are not primarily limited by model IQ. They are limited by:
- unclear inputs
- unclear outputs
- unclear policies

Once you fix those, the model's job becomes easier. Smaller models suddenly become viable:
- lower latency
- lower memory footprint
- more predictable behavior
- easier scaling across many agent steps

In other words:

You do not need a bigger brain.
You need a better nervous system.

Polars gives you the compute substrate. Burn gives you embedded inference. Contracts give you the nervous system.

## The long-term payoff: training becomes justified, not speculative

This is the part most systems miss.

Because every decision step is traced and validated, you automatically accumulate:
- successful chains (training candidates)
- failures with explicit reasons
- boundary cases that expose ambiguity

So when you eventually do LoRA, it is not "let's see if training helps".

It is:
- "Evaluation confidence is miscalibrated in these scenarios"
- "Planning consistently invents capabilities when state is underspecified"
- "Reasoning reaches confident conclusions under contradictory metrics"

Training becomes targeted correction on measured deficiencies.

That is how learning should be introduced.

## Closing: the real goal is engineering intelligence, not calling it

The point of converge-llm is not to prove that Rust can run an LLM. It can.

The point is to prove a system design thesis:
- structure beats scale for many agent decisions
- contracts beat prompt artistry
- reproducibility beats intuition
- pure Rust makes the system honest
- Polars + Burn turn "LLM work" into a compute-first pipeline
- convergence emerges when collaborating components share explicit interfaces

The result is a module that behaves less like a chatbot and more like a dependable subsystem in a larger agent runtime.

That is the kind of intelligence infrastructure I want to build.

## Appendix: the stack (practical summary)
- SurrealDB: state and memory storage (flexible, multi-model)
- LanceDB: vector retrieval (fast embedding search)
- Polars: compute substrate (metrics, feature extraction, state injection)
- Burn: embedded inference and future learning (pure Rust control)
- converge-llm: prompt contracts, inference envelopes, validation, decision chains`,
  },
  {
    slug: 'same-ai-prompt-ships-faster-android-than-ios',
    title: 'Why the same AI prompt ships faster on Android than on iOS (what I observed building both in parallel)',
    subtitle: 'Claude-assisted mobile development across two ecosystems',
    author: 'Kenneth Pernyer',
    publishedAt: '2026-01-14T10:00:00Z',
    tags: ['ai', 'mobile', 'android', 'ios', 'prompting'],
    readingTime: 7,
    featured: false,
    content: `I’ll start with a confession: **I’m not a front-end or mobile programmer by trade.**

For years I’ve been drawn to “one tool to rule them all” approaches—frameworks that hide the sharp edges and let you ship with a single abstraction layer: **React Native, Flutter**, that whole category. And that instinct makes sense when you’re optimizing for speed, staffing, and predictability.

But lately, something has shifted.

With AI-assisted programming, I’m increasingly tempted to do the opposite:

- **reduce indirections**
- **avoid extra virtual machines and thick runtimes**
- **get closer to the metal**
- and let AI guide me through the platform-native details

So I decided to build **both an Android app and an iOS app in parallel**, using the same AI workflow (Claude) and, intentionally, almost identical instructions.

And a pattern kept repeating.

---

## The observation

When I ask for a feature with the same intent—say:

- set up a foundation
- add testing and quality signals
- wire a streaming client
- add an ML layer (some on-device)
- establish a clean architecture

…the Android side typically comes back:

- more directly
- more consistently
- with fewer “choose your own adventure” forks
- and with fewer environment-specific traps

Whereas iOS often comes back:

- longer
- more conditional
- more “it depends”
- and more likely to include steps that require manual Xcode/UI work

This post isn’t a platform war take. It’s an observation from the builder’s seat — and a useful lesson in how to prompt, plan, and ship when AI is part of your team.

---

## First principle: AI ships fastest when the ecosystem has fewer “degrees of freedom”

A big part of this is not Kotlin vs Swift.

It’s *paths*.

Android, today, has a fairly dominant “modern default”:

- Kotlin
- Gradle
- Jetpack Compose
- coroutines
- well-worn dependency patterns

You can deviate, but the gravity is strong.

On iOS, the number of “valid paths” is higher:

- SwiftUI vs UIKit (or a hybrid)
- SPM vs CocoaPods vs Carthage (SPM is winning, but legacy remains)
- MVVM vs TCA vs “Apple-ish minimalism” vs custom architectures
- Combine vs async/await
- multiple lifecycle models and app targets (especially across iOS/macOS/watchOS)

When you say “build me a clean foundation,” the Android answer is often one clear route.

The iOS answer often contains a *decision tree*.

And every decision tree costs time.

---

## Case 1: iOS has more configuration hidden inside project files

Android’s project configuration is mostly text-first:

- Gradle files
- manifest
- predictable directory structures

iOS development carries more “state” in places that don’t translate cleanly into prompts:

- .xcodeproj and .xcworkspace
- .pbxproj internals
- scheme settings
- signing settings
- entitlements
- Info.plist
- build phases
- and the general “Xcode is a UI configuration surface” reality

AI is great at generating code.  
It’s weaker at safely editing *opaque build configuration artifacts*.

So the model compensates: it writes more explanation, suggests alternatives, and creates extra guardrails.

That makes iOS output slower and more verbose even when you didn’t ask for verbosity.

---

## Case 2: iOS builds have more environment friction

Even if you don’t explicitly ask for it, iOS features often touch:

- provisioning profiles / code signing
- capabilities
- privacy permission strings
- ATS rules
- background modes
- device provisioning quirks

Android has similar concepts (permissions, manifests, keystores), but the baseline developer loop tends to be less brittle.

So on iOS, the AI tends to pre-emptively include steps like:

- “enable this capability”
- “update entitlements”
- “add Info.plist entry”
- “check your signing settings”
- “make sure the scheme is correct”

Again: more branches, more steps, slower completion.

---

## Case 3: there are more consistent copyable patterns for Android in public text

This matters more than most people admit.

A lot of iOS knowledge lives in:

- videos
- screenshots
- “click this in Xcode”
- Apple docs that assume UI interaction
- code that depends on project settings the code snippet doesn’t show

Android has an abundance of:

- complete GitHub examples
- consistent Compose patterns
- reproducible Gradle-based setups

That means AI is more likely to have absorbed:

- a *single dominant Android way* to do things  
- but *multiple competing iOS ways* — plus incomplete context from text-only examples

So Android outputs look more decisive.

iOS outputs look more cautious.

---

## Case 4: prompts that are good enough for Android are often under-specified for iOS

This is the practical takeaway.

If you give the same prompt to both platforms, iOS usually needs *more constraints* to converge quickly.

For example, this prompt is “fine” for Android:

> “Create a modern foundation with streaming, on-device ML, and testing.”

But for iOS, you often need to force a lane:

- SwiftUI only
- SPM only
- async/await only
- MVVM only
- iOS 17+ target
- no UIKit interop unless explicitly required
- no Combine unless explicitly required

In other words: **prompting iOS needs stricter boundaries because there are more paths to walk down.**

---

## A meta-lesson: software is drifting — so we need stronger truths

This experience also reinforces a broader point I care about:

Modern systems drift because we don’t specify what must be true.

We specify *interfaces* and *tickets*.  
We don’t specify *truths*.

When you bring AI into the loop, ambiguity doesn’t just cause human debate.  
It causes the model to explore multiple implementation worlds.

So I’ve become increasingly convinced that the future is:

- start from outcomes (Jobs To Be Done)
- encode constraints (“truths” / invariants)
- then let implementation converge inside those rules

Not “more prompting.”  
More *specification*.

---

## Practical advice if you’re building both platforms with AI

Here’s what I’m doing now:

### 1) Write a platform contract per mobile OS

One page each, stating:

- architecture
- dependencies policy
- testing setup
- streaming approach
- ML approach
- never do this list

### 2) Make iOS prompts more explicit than Android prompts

Even if you want parity, you need to limit iOS branching.

### 3) Split work into vertical slices

Instead of “build the foundation,” ask for:

- one streaming client
- one screen
- one local inference
- one test harness

### 4) Expect more friction in Xcode-land

Budget time for project settings, signing, entitlements, and environment setup.

It’s not about Swift being worse.  
It’s about Xcode being a thicker layer of hidden state.

---

## Closing thought

My takeaway isn’t “Android is better.”

It’s:

**Android is more text-first reproducible, so AI converges faster.  
iOS has more configuration and more valid paths, so you must constrain the system harder.**

And that’s actually a useful gift:  
it pushes us to build better specs, tighter contracts, and more predictable development loops.

If you’ve observed the same pattern—or disagree—I’d love to hear how you structure your cross-platform AI workflow.`,
  },
  {
    slug: 'agent-system-operating-system',
    title: 'What Makes an Agent System an Operating System',
    subtitle: 'Why Converge is an OS, not a framework',
    author: 'Kenneth Pernyer',
    publishedAt: '2026-01-11T10:00:00Z',
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
    author: 'Kenneth Pernyer',
    publishedAt: '2026-01-08T10:00:00Z',
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
    author: 'Kenneth Pernyer',
    publishedAt: '2026-01-06T10:00:00Z',
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
    author: 'Kenneth Pernyer',
    publishedAt: '2026-01-10T10:00:00Z',
    tags: ['evals', 'agents', 'architecture'],
    readingTime: 8,
    featured: false,
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
  {
    slug: 'autonomous-agents-wrong-abstraction',
    title: "Why 'Autonomous Agents' Are the Wrong Abstraction for Business Logic",
    subtitle: 'Building business systems that can justify decisions, enforce constraints, and halt safely',
    author: 'Kenneth Pernyer',
    publishedAt: '2026-01-04T10:00:00Z',
    tags: ['agents', 'business-logic', 'architecture'],
    readingTime: 4,
    featured: false,
    content: `Correct me if I am wrong, but aren't we trying to build business systems on top of tools that were never designed to carry business authority? Agent frameworks are getting better at generating behaviour.

But...

**Businesses need systems that can justify decisions, enforce constraints and halt safely under ambiguity.**

---

Over the last months, I've been exploring how to build relevant agent-driven business systems for:

- strategic alignment
- CRM and growth decision logic
- campaign orchestration
- long-running business reasoning

The kind of systems that need to be correct, auditable and stable under scale. I assumed existing agent frameworks would be a good starting point. They weren't! Optimised for prompt choreography, emergent behaviour and convenience. That's fine if you're exploring behaviour. It's not fine if you're building business infrastructure.

---

## The Systems Thinking Mindset

My background leans heavily toward systems thinking and hard optimisation problems (think scheduling, routing, constraint solving). If you've worked with tools like Google's OR-Tools, you'll recognise the mental model:

1. define state
2. define constraints
3. let the system converge
4. inspect why it converged

That mindset turns out to matter a lot when "agents" start influencing real business outcomes. I also didn't want to compromise on fundamentals: So I started building something from first principles, in Rust, where the type system is part of the semantic model.

---

## Introducing Converge

The internal project I'm working on is called **Converge**. It's not an agent framework. It's a semantic engine:

- Agents never talk to each other — they observe and propose changes to shared context
- The engine enforces invariants, authority and convergence
- LLMs suggest. They never decide
- Humans are explicit authorities

Everything either reaches a fixed point or halts explicitly. No queues. No hidden workflows. No "vibes" on Jell-O.

---

## The Problem Space

I'm not sharing code yet, but if you're building serious GenAI products at fast-growing companies and you've felt the gap between reasoning demos and reliable systems...

**...this is the problem space I'm spending most of my spare time in.**`,
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
