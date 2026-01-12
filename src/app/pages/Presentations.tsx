import styles from './Presentations.module.css';

const presentations = [
  {
    title: 'Investor Pitch',
    description: 'The Converge story for investors. Covers the 9 axioms, partner strategy, and community-led growth.',
    audience: 'Investors',
    slides: 22,
    pdf: '/decks/converge.zone-investor-pitch.pdf',
    html: '/decks/converge.zone-investor-pitch.html',
  },
  {
    title: 'Builder Pitch',
    description: 'For startups who want to own their platform. Stop shopping SaaS, start declaring Truths.',
    audience: 'Builders & Startups',
    slides: 18,
    pdf: '/decks/converge.zone-builder-pitch.pdf',
    html: '/decks/converge.zone-builder-pitch.html',
  },
];

export function Presentations() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.tagline}>resources</p>
        <h1 className={styles.title}>Presentations</h1>
        <p className={styles.subtitle}>
          Decks, talks, and demos about Converge.
          Download PDFs or view in browser.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.grid}>
          {presentations.map((deck) => (
            <div key={deck.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{deck.title}</h2>
                <span className={styles.cardMeta}>{deck.slides} slides</span>
              </div>
              <p className={styles.cardDescription}>{deck.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.audience}>{deck.audience}</span>
                <div className={styles.actions}>
                  <a href={deck.html} className={styles.viewBtn} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                  <a href={deck.pdf} className={styles.downloadBtn} download>
                    PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About Converge Truths</h2>
        <p className={styles.sectionDescription}>
          Converge uses <strong>Truths</strong> — declarative specifications that define what must be true
          about your business. Instead of wiring tools together, you declare your business reality
          and let the engine make it so.
        </p>
        <pre className={styles.codeBlock}>
          <code>{`Truth: Get paid for delivered work
  Given work is marked complete
  And contract terms exist
  When the system converges
  Then invoice is issued
  And payment is tracked`}</code>
        </pre>
      </section>
    </div>
  );
}
