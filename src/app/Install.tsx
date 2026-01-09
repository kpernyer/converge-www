import styles from './Install.module.css';

export function Install() {
  return (
    <section className={styles.install}>
      <h2 className={styles.title}>Get Started</h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <span className={styles.stepNumber}>1</span>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Add to Cargo.toml</h3>
            <pre className={styles.code}>
              <code>{`[dependencies]
converge-core = "0.5"`}</code>
            </pre>
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNumber}>2</span>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Define an Agent</h3>
            <pre className={styles.code}>
              <code>{`use converge_core::prelude::*;

struct MyAgent;

impl Agent for MyAgent {
    fn enabled(&self, ctx: &Context) -> bool {
        ctx.query::<MyTrigger>().is_some()
    }

    fn run(&self, ctx: &Context) -> AgentEffect {
        AgentEffect::new()
            .add(Fact::new("result", "done"))
    }
}`}</code>
            </pre>
          </div>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNumber}>3</span>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Run the Engine</h3>
            <pre className={styles.code}>
              <code>{`let engine = Engine::new()
    .with_agent(MyAgent);

let result = engine.run_to_fixpoint(ctx)?;`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
