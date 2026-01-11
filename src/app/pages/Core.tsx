import styles from './Core.module.css';
import { CONVERGE_CORE_VERSION } from '../../versions';

const axioms = [
  { number: 1, name: 'Context Immutability', description: 'Context is append-only. No mutation, no surprises.' },
  { number: 2, name: 'Agent Isolation', description: 'Agents cannot communicate directly. Context is the only interface.' },
  { number: 3, name: 'Deterministic Ordering', description: 'Given the same context, agents always execute in the same order.' },
  { number: 4, name: 'Convergence Guarantee', description: 'Every run terminates in finite steps with a stable state.' },
  { number: 5, name: 'No Hidden State', description: 'All state is in the context. Period.' },
  { number: 6, name: 'Monotonic Progress', description: 'Each cycle adds facts or reaches quiescence. Never regresses.' },
  { number: 7, name: 'Bounded Execution', description: 'Maximum cycles and timeouts are configurable and enforced.' },
  { number: 8, name: 'Full Observability', description: 'Every decision, every fact, every transition is logged.' },
  { number: 9, name: 'Composability', description: 'Engines can nest. Sub-convergence is still convergence.' },
];

const concepts = [
  {
    name: 'Engine',
    description: 'The runtime that orchestrates agent execution until convergence.',
    code: `let mut engine = Engine::new();
engine.register(MyAgent);
let result = engine.run(context)?;`,
  },
  {
    name: 'Context',
    description: 'The shared, immutable state that agents read from and write to.',
    code: `let mut ctx = Context::new();
ctx.add_fact(Fact::new(ContextKey::Seeds, "id", "data"))?;`,
  },
  {
    name: 'Agent',
    description: 'A unit of computation that reacts to context and produces facts.',
    code: `impl Agent for MyAgent {
    fn execute(&self, ctx: &Context) -> Result<Vec<Fact>> {
        // Read context, produce facts
    }
}`,
  },
  {
    name: 'Fact',
    description: 'An immutable piece of data added to the context.',
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
          A formally proven multi-agent runtime with deterministic convergence guarantees.
          9 axioms. No hidden state. No starvation.
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
          These aren't guidelines. They're guarantees enforced by the type system and runtime.
        </p>
        <div className={styles.axiomGrid}>
          {axioms.map((axiom) => (
            <div key={axiom.number} className={styles.axiom}>
              <span className={styles.axiomNumber}>{axiom.number}</span>
              <div className={styles.axiomContent}>
                <h3 className={styles.axiomName}>{axiom.name}</h3>
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
          <code>{`use converge_core::{Engine, Context, ContextKey, Fact, Agent};

// Define an agent
struct AnalysisAgent;

impl Agent for AnalysisAgent {
    fn name(&self) -> &str { "AnalysisAgent" }

    fn can_run(&self, ctx: &Context) -> bool {
        ctx.has_key(ContextKey::Seeds) && !ctx.has_key(ContextKey::Signals)
    }

    fn execute(&self, ctx: &Context) -> Result<Vec<Fact>> {
        let seeds = ctx.get(ContextKey::Seeds);
        // Analyze seeds, produce signals
        Ok(vec![Fact::new(ContextKey::Signals, "analysis", "result")])
    }
}

// Run to convergence
fn main() -> Result<()> {
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
