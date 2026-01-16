import styles from './Core.module.css';
import { CONVERGE_CORE_VERSION } from '../../versions';

const axioms = [
  { number: 1, name: 'Monotonicity', formula: 'ctx ⊆ step(ctx)', description: 'Context only grows. Each step adds facts, never removes.' },
  { number: 2, name: 'Determinism', formula: 'step(ctx) = step(ctx)', description: 'Same context always produces the same result.' },
  { number: 3, name: 'Idempotency', formula: 'agent(ctx) = agent(agent(ctx))', description: 'Running an agent twice yields the same outcome.' },
  { number: 4, name: 'Commutativity', formula: 'a(b(ctx)) = b(a(ctx))', description: 'Agent order doesn\'t affect the final result.' },
  { number: 5, name: 'Termination', formula: '∃n: stepⁿ(ctx) = stepⁿ⁺¹(ctx)', description: 'Every run converges in finite steps.' },
  { number: 6, name: 'Consistency', formula: '¬∃(f, ¬f) ∈ ctx', description: 'No contradictory facts can coexist in context.' },
  { number: 7, name: 'Starvation Freedom', formula: 'enabled(a) ⇒ ◇runs(a)', description: 'Every enabled agent eventually executes.' },
  { number: 8, name: 'Confluence', formula: 'ctx₁ ∪ ctx₂ → ctx*', description: 'Parallel branches merge to a single truth.' },
  { number: 9, name: 'Observability', formula: '∀effect: logged(effect)', description: 'Every effect is recorded in the ledger.' },
];

const concepts = [
  {
    name: 'Engine',
    description: 'The convergence loop that validates effects and decides what becomes Fact.',
    code: `let mut engine = Engine::new();
engine.register(MyAgent);
let result = engine.run(context)?;`,
  },
  {
    name: 'Context',
    description: 'The shared, typed, append-only job state. Context is the API.',
    code: `let mut ctx = Context::new();
ctx.add_fact(Fact::new(ContextKey::Seeds, "id", "data"))?;`,
  },
  {
    name: 'Agent',
    description: 'A capability that reads context and emits buffered effects.',
    code: `impl Agent for MyAgent {
    fn dependencies(&self) -> &[ContextKey] { &[ContextKey::Seeds] }

    fn accepts(&self, ctx: &Context) -> bool {
        ctx.has(ContextKey::Seeds)
    }

    fn execute(&self, _ctx: &Context) -> AgentEffect {
        AgentEffect::with_fact(Fact::new(
            ContextKey::Signals,
            "analysis",
            "result",
        ))
    }
}`,
  },
  {
    name: 'Fact',
    description: 'An authoritative, immutable entry in context (proposals must be validated).',
    code: `Fact::new(
    ContextKey::Signals,
    "market-trend",
    "bullish on tech sector"
)`,
  },
];

export function Core() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-core</p>
        <h1 className={styles.title}>The Runtime Engine</h1>
        <p className={styles.subtitle}>
          The semantic engine that decides what becomes a Fact.
          Deterministic convergence, append-only context, and explicit authority.
        </p>
      </header>

      <section className={styles.install}>
        <pre className={styles.code}>
          <code>{`converge-core = "${CONVERGE_CORE_VERSION}"`}</code>
        </pre>
        <div className={styles.links}>
          <a href="https://docs.rs/converge-core" className={styles.externalLink}>
            docs.rs
          </a>
          <a href="https://crates.io/crates/converge-core" className={styles.externalLink}>
            crates.io
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The 9 Axioms</h2>
        <p className={styles.sectionDescription}>
          Mathematical guarantees that make multi-agent systems predictable.
          Only these 9 are axioms; design tenets are principles.
        </p>
        <div className={styles.axiomGrid}>
          {axioms.map((axiom) => (
            <div key={axiom.number} className={styles.axiom}>
              <span className={styles.axiomNumber}>{axiom.number}</span>
              <div className={styles.axiomContent}>
                <h3 className={styles.axiomName}>{axiom.name}</h3>
                <code className={styles.axiomFormula}>{axiom.formula}</code>
                <p className={styles.axiomDescription}>{axiom.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Concepts</h2>
        <div className={styles.conceptGrid}>
          {concepts.map((concept) => (
            <div key={concept.name} className={styles.concept}>
              <h3 className={styles.conceptName}>{concept.name}</h3>
              <p className={styles.conceptDescription}>{concept.description}</p>
              <pre className={styles.conceptCode}>
                <code>{concept.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Minimal Example</h2>
        <pre className={styles.codeBlock}>
          <code>{`use converge_core::{Agent, AgentEffect, Context, ContextKey, Engine, Fact};

// Define an agent
struct AnalysisAgent;

impl Agent for AnalysisAgent {
    fn name(&self) -> &str { "analysis" }

    fn dependencies(&self) -> &[ContextKey] { &[ContextKey::Seeds] }

    fn accepts(&self, ctx: &Context) -> bool {
        ctx.has(ContextKey::Seeds) && ctx.get(ContextKey::Signals).is_empty()
    }

    fn execute(&self, _ctx: &Context) -> AgentEffect {
        AgentEffect::with_fact(Fact::new(
            ContextKey::Signals,
            "analysis",
            "result",
        ))
    }
}

// Run to convergence
fn main() -> Result<(), converge_core::ConvergeError> {
    let mut engine = Engine::new();
    engine.register(AnalysisAgent);

    let mut ctx = Context::new();
    ctx.add_fact(Fact::new(ContextKey::Seeds, "input", "data"))?;

    let result = engine.run(ctx)?;
    println!("Converged in {} cycles", result.cycles);
    Ok(())
}`}</code>
        </pre>
      </section>
    </div>
  );
}
