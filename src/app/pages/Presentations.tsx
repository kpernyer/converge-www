import styles from './Presentations.module.css';

const presentations = [
  {
    title: 'Investor Pitch',
    description: 'The Converge story for investors. Covers the 9 axioms, partner strategy, and community-led growth.',
    audience: 'Investors',
    slides: 21,
    pdf: '/decks/converge.zone-investor-pitch.pdf',
    html: '/decks/converge.zone-investor-pitch.html',
  },
  {
    title: 'Builder Pitch',
    description: 'For startups who want to own their platform. The 9 axioms, business value, and path to ownership.',
    audience: 'Builders & Startups',
    slides: 20,
    pdf: '/decks/converge.zone-builder-pitch.pdf',
    html: '/decks/converge.zone-builder-pitch.html',
  },
  {
    title: 'Partner Pitch',
    description: 'For regional and vertical partners. Localize Converge for your market or domain.',
    audience: 'Partners & Integrators',
    slides: 21,
    pdf: '/decks/converge.zone-partner-pitch.pdf',
    html: '/decks/converge.zone-partner-pitch.html',
  },
  {
    title: 'Customer Pitch',
    description: 'For businesses who want operations that run themselves. Stop babysitting tools.',
    audience: 'Customers & SMBs',
    slides: 19,
    pdf: '/decks/converge.zone-customer-pitch.pdf',
    html: '/decks/converge.zone-customer-pitch.html',
  },
  {
    title: 'Tech Deep Dive',
    description: 'Architecture and implementation of converge-core. For engineers evaluating the platform.',
    audience: 'Engineers',
    slides: 26,
    pdf: '/decks/converge.zone-tech-pitch.pdf',
    html: '/decks/converge.zone-tech-pitch.html',
  },
  {
    title: 'Conference Talk',
    description: 'Stop Agent Drift: Building Trustworthy Multi-Agent Systems. For meetups and events.',
    audience: 'Conference',
    slides: 22,
    pdf: '/decks/converge.zone-conference-pitch.pdf',
    html: '/decks/converge.zone-conference-pitch.html',
  },
  {
    title: 'Join the Team',
    description: 'Build the future of business automation. Open roles and why Converge.',
    audience: 'Recruiting',
    slides: 20,
    pdf: '/decks/converge.zone-recruiting-pitch.pdf',
    html: '/decks/converge.zone-recruiting-pitch.html',
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
