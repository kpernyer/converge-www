import styles from './Manifesto.module.css';

export function Manifesto() {
  return (
    <article className={styles.manifesto}>
      <header className={styles.header}>
        <h1 className={styles.title}>Why We Built Converge</h1>
        <p className={styles.subtitle}>A Founder's Manifesto</p>
      </header>

      <section className={styles.section}>
        <p className={styles.lead}>
          We didn't start by trying to build an AI product.
          <br />
          We started by trying to build something we could trust.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The problem we kept running into</h2>
        <p>
          Every serious attempt to build agent-based business systems eventually hits
          the same wall.
        </p>
        <p>
          You can prototype fast. You can "vibe code" workflows. You can wire together
          APIs, SaaS tools, prompts, and models.
        </p>
        <p>
          But the moment the system starts to matter—when decisions affect revenue,
          customers, inventory, cash, or compliance—everything becomes fragile.
        </p>
        <ul className={styles.list}>
          <li>Agents talk to each other in ways you can't fully explain.</li>
          <li>State lives in too many places.</li>
          <li>Retries, background jobs, and workflows hide failure modes.</li>
          <li>You can't answer why a decision was made, only that it was made.</li>
        </ul>
        <p>
          At that point, velocity turns into risk.
        </p>
        <p className={styles.emphasis}>
          We've seen this before. This is exactly how large business systems became
          brittle, expensive, and consultant-driven.
        </p>
        <p>
          Only now, the stakes are higher—because the systems are autonomous.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Software has changed. But foundations still matter.</h2>
        <p>The old world assumed:</p>
        <ul className={styles.list}>
          <li>fixed workflows,</li>
          <li>predefined objects,</li>
          <li>"best practice" schemas,</li>
          <li>and vendors telling you how your business should work.</li>
        </ul>
        <p>That model is breaking down.</p>
        <p>
          APIs are everywhere. Data is fragmented. Business logic is no longer static.
          And AI has made decision-making itself programmable.
        </p>
        <p className={styles.emphasis}>
          But one thing hasn't changed: If you don't control the foundations,
          you don't control the system.
        </p>
        <p>
          We didn't want to build another layer of abstraction on top of chaos.
          We wanted to build something that could converge.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why we started with a mathematically grounded core</h2>
        <p>
          Converge begins where most systems end: with guarantees.
        </p>
        <p>
          Not promises. Not heuristics. Not "it usually works."
        </p>
        <p className={styles.emphasis}>Guarantees.</p>
        <ul className={styles.list}>
          <li>Deterministic convergence</li>
          <li>Explicit authority</li>
          <li>No hidden state</li>
          <li>Explainable decisions</li>
          <li>Idempotency derived from data, not flags</li>
          <li>The same inputs always produce the same outcome</li>
        </ul>
        <p>This is not accidental.</p>
        <p>We deliberately chose:</p>
        <ul className={styles.list}>
          <li>Rust, not for performance alone, but for semantic precision</li>
          <li>Types as authority boundaries</li>
          <li>An append-only, monotonic view of truth</li>
          <li>A model where agents suggest, but the system decides</li>
        </ul>
        <p className={styles.emphasis}>
          Before building features, we proved axioms.
          <br />
          Before layering ambition, we tested the bones.
        </p>
        <p>
          Because once you allow ambiguity into the core, it never leaves.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Agents are not the product. Alignment is.</h2>
        <p>Agents are easy to add. Alignment is not.</p>
        <p>Most agent frameworks optimize for:</p>
        <ul className={styles.list}>
          <li>autonomy,</li>
          <li>cleverness,</li>
          <li>speed to demo.</li>
        </ul>
        <p>Converge optimizes for:</p>
        <ul className={styles.list}>
          <li>correctness,</li>
          <li>traceability,</li>
          <li>long-term system integrity.</li>
        </ul>
        <p>In Converge:</p>
        <ul className={styles.list}>
          <li>agents never talk to each other directly,</li>
          <li>agents never mutate shared state,</li>
          <li>agents never become authorities by accident.</li>
        </ul>
        <p>
          They operate inside a convergence engine that enforces invariants
          and makes every decision explainable.
        </p>
        <p className={styles.emphasis}>
          This is how you scale agents without scaling chaos.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>From engine to ambition</h2>
        <p>
          We are under no illusion that a core engine alone changes the world.
        </p>
        <p>The ambition is larger.</p>
        <p>Growing companies today live in a fragmented landscape:</p>
        <ul className={styles.list}>
          <li>CRM over here</li>
          <li>billing over there</li>
          <li>inventory somewhere else</li>
          <li>spreadsheets everywhere</li>
          <li>consultants stitching it together at enormous cost</li>
        </ul>
        <p>
          These systems weren't built for your business.
          They were built to be sold to everyone.
        </p>
        <p>Converge takes a different path.</p>
        <p>
          We start with a rock-solid engine. Then we layer opinionated domains on top:
        </p>
        <ul className={styles.list}>
          <li>sales alignment,</li>
          <li>revenue protection,</li>
          <li>cash-flow integrity,</li>
          <li>inventory and sourcing,</li>
          <li>operational guardrails.</li>
        </ul>
        <p className={styles.emphasis}>
          Not as disconnected tools. As one converging system.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Vibe coding—on solid ground</h2>
        <p>
          We believe in fast iteration. We believe in direct expression.
          We believe you should be able to shape systems to your reality.
        </p>
        <p className={styles.emphasis}>
          But vibe coding on unstable foundations is just improvising on Jell-O.
        </p>
        <p>Converge is built so you can:</p>
        <ul className={styles.list}>
          <li>express intent freely,</li>
          <li>evolve behavior continuously,</li>
          <li>experiment safely,</li>
        </ul>
        <p>
          without sacrificing correctness, trust, or explainability.
        </p>
        <p>
          You don't need armies of consultants.
          You don't need million-dollar implementations.
          You don't need to contort your business to fit a tool.
        </p>
        <p className={styles.emphasis}>
          You build your system—on a foundation that converges.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What we're really building</h2>
        <p>
          Converge is not a chatbot. Not a workflow engine.
          Not a replacement for every SaaS tool overnight.
        </p>
        <p>
          It is a semantic convergence engine—and, over time,
          an agent-native business operating system.
        </p>
        <p>One where:</p>
        <ul className={styles.list}>
          <li>decisions are first-class,</li>
          <li>authority is explicit,</li>
          <li>humans remain in the loop by design,</li>
          <li>and systems grow more coherent over time, not less.</li>
        </ul>
        <p>This is a long journey. We're building it deliberately.</p>
        <p className={styles.closing}>
          Because the future of software isn't about smarter agents.
          <br />
          <strong>It's about systems you can trust.</strong>
        </p>
      </section>
    </article>
  );
}
