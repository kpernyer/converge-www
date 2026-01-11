import { Link } from 'react-router-dom';
import { articles } from './data/articles';
import styles from './FeaturedSignal.module.css';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function FeaturedSignal() {
  // Get the most recent article
  const featured = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0];

  if (!featured) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Latest Signal</h2>
        <Link to="/signals" className={styles.viewAll}>
          View all
        </Link>
      </div>
      <article className={styles.card}>
        <Link to={`/signals/${featured.slug}`} className={styles.cardLink}>
          <div className={styles.meta}>
            <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
            <span className={styles.dot}>·</span>
            <span>{featured.readingTime} min read</span>
          </div>
          <h3 className={styles.title}>{featured.title}</h3>
          {featured.subtitle && <p className={styles.subtitle}>{featured.subtitle}</p>}
          <div className={styles.tags}>
            {featured.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <span className={styles.readMore}>Read article →</span>
        </Link>
      </article>
    </section>
  );
}
