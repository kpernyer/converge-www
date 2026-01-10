import { Link } from 'react-router-dom';
import { getArticleIndex } from '../data/articles';
import styles from './Signals.module.css';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function Signals() {
  const articles = getArticleIndex();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Signals</h1>
        <p className={styles.subtitle}>
          Dispatches from the convergence frontier — architecture, agents, and the
          systems that make them trustworthy.
        </p>
      </header>

      <section className={styles.articles}>
        {articles.map((article) => (
          <article key={article.slug} className={styles.card}>
            <Link to={`/signals/${article.slug}`} className={styles.cardLink}>
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                  <span className={styles.dot}>·</span>
                  <span>{article.readingTime} min read</span>
                </div>
                <h2 className={styles.cardTitle}>{article.title}</h2>
                {article.subtitle && (
                  <p className={styles.cardSubtitle}>{article.subtitle}</p>
                )}
                <div className={styles.tags}>
                  {article.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className={styles.arrow}>→</span>
            </Link>
          </article>
        ))}
      </section>

      {articles.length === 0 && (
        <p className={styles.empty}>No signals yet. Check back soon.</p>
      )}
    </div>
  );
}
