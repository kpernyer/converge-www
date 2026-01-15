import styles from './Ledger.module.css';
import { CONVERGE_LEDGER_VERSION } from '../../versions';

const features = [
  {
    name: 'Append-Only Context',
    description: 'Entries are immutable and ordered. No updates, no deletes, no rewrites.',
  },
  {
    name: 'Merkle Tree Integrity',
    description: 'Tamper-evident snapshots and proofs with compact root hashes.',
  },
  {
    name: 'Lamport Clock Ordering',
    description: 'Causal ordering across distributed contexts without relying on wall clocks.',
  },
  {
    name: 'Watch Streams',
    description: 'Stream new entries for real-time observation and tooling.',
  },
  {
    name: 'Snapshot & Restore',
    description: 'Serialize and load contexts for fast restart and recovery.',
  },
  {
    name: 'OTP Fault Isolation',
    description: 'Supervision trees, process isolation, and self-healing nodes.',
  },
];

const useCases = [
  {
    name: 'Distributed Observation',
    description: 'Multiple observers watch the same convergence in real time.',
  },
  {
    name: 'Fast Restart',
    description: 'Resume long-running jobs without recomputing context from scratch.',
  },
  {
    name: 'Audit Proofs',
    description: 'Merkle roots provide tamper-evident proofs of history.',
  },
  {
    name: 'HITL Pauses',
    description: 'Human-in-the-loop pauses with reliable context recovery.',
  },
];

export function Ledger() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-ledger</p>
        <h1 className={styles.title}>Audit Trail</h1>
        <p className={styles.subtitle}>
          Optional, append-only runtime substrate for Converge systems.
          Remembers what happened; never decides what is true.
        </p>
      </header>

      <section className={styles.install}>
        <div className={styles.codeGroup}>
          <span className={styles.codeLabel}>mix.exs</span>
          <pre className={styles.code}>
            <code>{`{:converge_ledger, "~> ${CONVERGE_LEDGER_VERSION}"}`}</code>
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
          <code>{`alias ConvergeLedger.Storage.Store
alias ConvergeLedger.Entry

# Append an entry (Lamport clock assigned automatically)
{:ok, entry} = Store.append("ctx-001", "facts", "payload")

entry.lamport_clock  # => 1
entry.content_hash   # => <<32 bytes SHA-256>>

# Verify integrity
{:ok, :verified} = Entry.verify_integrity(entry)

# Snapshot with Merkle root
{:ok, blob, _seq, meta} = Store.snapshot("ctx-001")
meta.merkle_root     # => "a1b2c3..."
`}</code>
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
