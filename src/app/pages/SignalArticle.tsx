import { useParams, Link, Navigate } from 'react-router-dom';
import { marked } from 'marked';
import { getArticleBySlug } from '../data/articles';
import styles from './SignalArticle.module.css';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Configure marked for security and styling
marked.setOptions({
  gfm: true,
  breaks: false,
});

export function SignalArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/signals" replace />;
  }

  const htmlContent = marked(article.content);

  return (
    <article className={styles.article}>
      <nav className={styles.breadcrumb}>
        <Link to="/signals" className={styles.backLink}>
          ← Signals
        </Link>
      </nav>

      <header className={styles.header}>
        <div className={styles.meta}>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span className={styles.dot}>·</span>
          <span>{article.readingTime} min read</span>
          <span className={styles.dot}>·</span>
          <span>{article.author}</span>
        </div>
        <h1 className={styles.title}>{article.title}</h1>
        {article.subtitle && <p className={styles.subtitle}>{article.subtitle}</p>}
        <div className={styles.tags}>
          {article.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <footer className={styles.footer}>
        <Link to="/signals" className={styles.backLink}>
          ← Back to Signals
        </Link>
      </footer>
    </article>
  );
}
