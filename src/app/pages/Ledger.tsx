import styles from './Ledger.module.css';

const features = [
  {
    name: 'Immutable Audit Trail',
    description: 'Every context mutation, agent execution, and decision is recorded permanently.',
  },
  {
    name: 'Cryptographic Integrity',
    description: 'Hash chains ensure tamper-evident history. Detect any modification.',
  },
  {
    name: 'Temporal Queries',
    description: 'Query state at any point in time. Replay decisions with full context.',
  },
  {
    name: 'Event Sourcing',
    description: 'Built on event sourcing principles. Reconstruct state from events.',
  },
  {
    name: 'OTP Integration',
    description: 'Native Elixir/OTP design. Supervision trees, GenServers, fault tolerance.',
  },
  {
    name: 'PostgreSQL Backend',
    description: 'Battle-tested storage with Ecto. JSONB for flexible fact schemas.',
  },
];

const useCases = [
  {
    name: 'Compliance Auditing',
    description: 'Track every decision for regulatory compliance. Prove what happened and why.',
  },
  {
    name: 'Debug & Replay',
    description: 'Reproduce any convergence run. Step through agent decisions.',
  },
  {
    name: 'Rollback & Recovery',
    description: 'Restore context to any prior state. Recover from errors gracefully.',
  },
  {
    name: 'Multi-System Sync',
    description: 'Sync ledger state across distributed systems. Eventual consistency.',
  },
];

export function Ledger() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-ledger</p>
        <h1 className={styles.title}>Audit Trail</h1>
        <p className={styles.subtitle}>
          Immutable, cryptographically-verified audit trail for Converge systems.
          Built in Elixir for fault-tolerant, distributed deployments.
        </p>
      </header>

      <section className={styles.install}>
        <div className={styles.codeGroup}>
          <span className={styles.codeLabel}>mix.exs</span>
          <pre className={styles.code}>
            <code>{`{:converge_ledger, "~> 0.1"}`}</code>
          </pre>
        </div>
        <div className={styles.links}>
          <a href="https://hex.pm/packages/converge_ledger" className={styles.externalLink}>
            hex.pm
          </a>
          <a href="https://hexdocs.pm/converge_ledger" className={styles.externalLink}>
            hexdocs
          </a>
          <a href="https://ghcr.io/kpernyer/converge-ledger" className={styles.externalLink}>
            docker
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <div key={feature.name} className={styles.feature}>
              <h3 className={styles.featureName}>{feature.name}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Use Cases</h2>
        <div className={styles.useCaseGrid}>
          {useCases.map((useCase) => (
            <div key={useCase.name} className={styles.useCase}>
              <h3 className={styles.useCaseName}>{useCase.name}</h3>
              <p className={styles.useCaseDescription}>{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Example</h2>
        <pre className={styles.codeBlock}>
          <code>{`defmodule MyApp.Convergence do
  use ConvergeLedger

  @impl true
  def handle_convergence(context, result) do
    # Record convergence run
    {:ok, entry} = ConvergeLedger.record(context, result)

    # Entry includes:
    # - Hash chain linking to previous entry
    # - All facts added during convergence
    # - Agent execution timeline
    # - Final context state

    Logger.info("Recorded convergence: #{entry.hash}")
    {:ok, entry}
  end
end

# Query historical state
{:ok, context} = ConvergeLedger.at_time(~U[2024-01-15 10:30:00Z])

# Replay a specific convergence run
{:ok, replay} = ConvergeLedger.replay(entry_hash)

# Verify chain integrity
:ok = ConvergeLedger.verify_chain(from: start_hash, to: end_hash)`}</code>
        </pre>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Elixir?</h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <h3 className={styles.whyTitle}>Fault Tolerance</h3>
            <p className={styles.whyDescription}>
              OTP supervision trees ensure the ledger stays up. Process crashes
              don't lose data.
            </p>
          </div>
          <div className={styles.whyCard}>
            <h3 className={styles.whyTitle}>Concurrency</h3>
            <p className={styles.whyDescription}>
              Lightweight processes handle thousands of concurrent writes.
              No locks, no bottlenecks.
            </p>
          </div>
          <div className={styles.whyCard}>
            <h3 className={styles.whyTitle}>Distribution</h3>
            <p className={styles.whyDescription}>
              Built-in distribution primitives. Sync ledger state across nodes
              with minimal configuration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
