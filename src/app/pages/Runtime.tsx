import styles from './Runtime.module.css';

const features = [
  {
    name: 'gRPC Bidirectional Streaming',
    description: 'Primary transport for live convergence, facts, and control messages.',
  },
  {
    name: 'SSE Fallback',
    description: 'Server-Sent Events mirror the gRPC stream for constrained clients.',
  },
  {
    name: 'REST APIs',
    description: 'Job submission and health endpoints for simple integrations.',
  },
  {
    name: 'Streaming Observability',
    description: 'Cycle events, facts, and convergence signals emitted in real time.',
  },
  {
    name: 'Metrics + Tracing',
    description: 'OpenTelemetry metrics and structured traces for runtime visibility.',
  },
];

const remoteCommands = [
  'converge-remote run --template growth-strategy --server grpc://localhost:50051',
  'converge-remote run --template growth-strategy --stream',
  `converge-remote inject --run-id <id> --fact '{"key":"Seeds","id":"user","content":"More context"}'`,
  'converge-remote pause <run_id>',
  'converge-remote resume <run_id>',
];

export function Runtime() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>converge-runtime</p>
        <h1 className={styles.title}>Runtime Server</h1>
        <p className={styles.subtitle}>
          HTTP + gRPC server for Converge. Stream-first execution with gRPC
          bidirectional streaming; SSE is fallback.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Capabilities</h2>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.name} className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.name}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Remote CLI (converge-remote)</h2>
        <p className={styles.sectionDescription}>
          The remote client connects to the runtime over gRPC for multi-actor
          collaboration, HITL approvals, and streaming facts.
        </p>
        <pre className={styles.codeBlock}>
          <code>{remoteCommands.join('\n')}</code>
        </pre>
      </section>
    </div>
  );
}
