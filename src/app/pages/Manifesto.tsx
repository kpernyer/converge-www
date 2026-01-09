import styles from './Manifesto.module.css';

export function Manifesto() {
  return (
    <article className={styles.manifesto}>
      <header className={styles.header}>
        <h1 className={styles.title}>Converge — A Founder Manifesto</h1>
        <p className={styles.subtitle}>Why Converge Exists</p>
      </header>

      <section className={styles.section}>
        <p className={styles.lead}>
          Modern companies don't fail because they lack software.
          <br />
          They fail because their software doesn't agree with itself.
        </p>
        <p>
          CRM, billing, marketing, analytics, support, ops — all optimized in isolation.
          Glued together with APIs, automations, and dashboards that look integrated but behave like separate worlds.
        </p>
        <p>
          We added "AI agents" on top of this stack and called it progress.
          What we got instead was drift:
        </p>
        <ul className={styles.list}>
          <li>systems that act, but cannot explain;</li>
          <li>automation that moves fast, but cannot halt safely;</li>
          <li>intelligence that produces output, but no shared truth.</li>
        </ul>
        <p className={styles.emphasis}>
          Converge exists because business systems need alignment, not more motion.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Core Belief</h2>
        <p className={styles.emphasis}>
          Converge starts from a simple, non-negotiable premise:
        </p>
        <p className={styles.emphasis}>
          If a system cannot explain why it did something, it cannot be trusted to do it again.
        </p>
        <p>So we didn't start with workflows.</p>
        <p>We didn't start with UIs.</p>
        <p>We didn't start with "agents talking to agents."</p>
        <p>We started with a mathematically grounded core:</p>
        <ul className={styles.list}>
          <li>A single semantic authority per intent</li>
          <li>Explicit convergence toward a fixed point</li>
          <li>Shared context as the only source of truth</li>
          <li>No hidden state, no background magic</li>
          <li>Deterministic execution that can halt, explain itself, and resume safely</li>
        </ul>
        <p>
          Agents are allowed to propose.
          Only the system is allowed to decide.
        </p>
        <p className={styles.emphasis}>
          That is not a limitation — it is the foundation.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Converge Is the Zone</h2>
        <p>
          Converge is the zone where agents stop drifting and systems become explainable.
        </p>
        <p>
          Being in the zone isn't a vibe — it's a mental state.
          It's what happens when you stop fighting the system because you trust its foundations.
        </p>
        <p>
          Like watching code scroll past in The Matrix, you don't need to read every instruction —
          not because it's opaque, but because you understand the rules that govern it.
        </p>
        <p>
          You trust the ride not because it feels fast,
          but because you know it will halt, explain itself, and restart safely if needed.
        </p>
        <p className={styles.emphasis}>
          That's the difference between spectacle and system.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why the Old Model Is Breaking</h2>
        <p>Enterprise software was built for a world where:</p>
        <ul className={styles.list}>
          <li>Business processes were static</li>
          <li>Customization happened once, then froze</li>
          <li>Consultants translated "how your business works" into brittle configuration</li>
        </ul>
        <p>That world is gone.</p>
        <p>
          APIs are everywhere.
          Business models change quarterly.
          And software is no longer written once — it is continuously shaped.
        </p>
        <p>
          Yet companies are still sold systems that claim to fit everyone
          and then require months (or millions) to be bent into place.
        </p>
        <p className={styles.emphasis}>
          This is not a tooling problem.
          It's an architectural one.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Changes with Converge</h2>
        <p>
          Converge treats software as a living system, not a configured product.
        </p>
        <ul className={styles.list}>
          <li>You don't adapt your business to the system</li>
          <li>You don't hard-code rules you'll regret later</li>
          <li>You don't accept black-box automation</li>
        </ul>
        <p>Instead:</p>
        <ul className={styles.list}>
          <li>You express intent</li>
          <li>Agents explore possibilities (LLMs, optimization solvers, pure Rust logic — all first-class)</li>
          <li>The system converges on outcomes that are:</li>
        </ul>
        <ul className={styles.list}>
          <li>explainable</li>
          <li>auditable</li>
          <li>reproducible</li>
          <li>aligned with explicit constraints</li>
        </ul>
        <p className={styles.emphasis}>
          This is not "vibe coding on jelly."
        </p>
        <p className={styles.emphasis}>
          It's vibe coding on bedrock — where experimentation is safe because the foundation does not move.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Long Game</h2>
        <p>
          Converge begins as a semantic engine — an Agent OS for people who care about correctness.
        </p>
        <p className={styles.emphasis}>But the ambition is larger.</p>
        <p>Over time, this foundation can absorb what today is fragmented across:</p>
        <ul className={styles.list}>
          <li>CRM</li>
          <li>ERP</li>
          <li>Campaign tools</li>
          <li>RevOps systems</li>
          <li>Inventory and sourcing</li>
          <li>Financial coordination</li>
        </ul>
        <p>
          Not by replacing them with another monolith —
          but by replacing misalignment with convergence.
        </p>
        <p className={styles.emphasis}>
          One shared context.
          <br />
          One source of truth.
          <br />
          Many agents.
          <br />
          Zero drift.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Point</h2>
        <p className={styles.closing}>
          We don't believe the future belongs to louder AI.
          <br />
          <strong>It belongs to systems that know when to stop.</strong>
          <br />
          <br />
          Converge is how we get there.
        </p>
      </section>
    </article>
  );
}
