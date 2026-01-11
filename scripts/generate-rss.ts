// Generate RSS feed for Signals blog
// Run with: bun run scripts/generate-rss.ts

import { articles } from '../src/app/data/articles';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'https://converge.zone';
const FEED_TITLE = 'Converge Signals';
const FEED_DESCRIPTION =
  'Dispatches from the convergence frontier — architecture, agents, and the systems that make them trustworthy.';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRFC822Date(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toUTCString();
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '') // headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/`([^`]+)`/g, '$1') // code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/^[-*]\s+/gm, '') // list items
    .replace(/^>\s+/gm, '') // blockquotes
    .replace(/---/g, '') // horizontal rules
    .replace(/\n{3,}/g, '\n\n') // multiple newlines
    .trim();
}

function getExcerpt(content: string, maxLength = 300): string {
  const stripped = stripMarkdown(content);
  const firstParagraphs = stripped.split('\n\n').slice(0, 2).join(' ');
  if (firstParagraphs.length <= maxLength) {
    return firstParagraphs;
  }
  return firstParagraphs.substring(0, maxLength - 3) + '...';
}

function generateRss(): string {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const items = sortedArticles
    .map((article) => {
      const url = `${SITE_URL}/signals/${article.slug}`;
      const excerpt = getExcerpt(article.content);

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${formatRFC822Date(article.publishedAt)}</pubDate>
      <author>${escapeXml(article.author)}</author>
      <description>${escapeXml(excerpt)}</description>
      ${article.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const lastBuildDate = sortedArticles.length > 0
    ? formatRFC822Date(sortedArticles[0].publishedAt)
    : formatRFC822Date(new Date().toISOString());

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/signals</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/signals/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

// Generate and write the RSS feed
const rss = generateRss();
const distDir = join(import.meta.dir, '..', 'dist');
const publicDir = join(import.meta.dir, '..', 'public');

// Write to public folder (for dev) and dist folder (for production)
try {
  mkdirSync(join(publicDir, 'signals'), { recursive: true });
  writeFileSync(join(publicDir, 'signals', 'feed.xml'), rss);
  console.log('✓ RSS feed written to public/signals/feed.xml');
} catch {
  // public dir might not exist yet
}

try {
  mkdirSync(join(distDir, 'signals'), { recursive: true });
  writeFileSync(join(distDir, 'signals', 'feed.xml'), rss);
  console.log('✓ RSS feed written to dist/signals/feed.xml');
} catch {
  // dist dir might not exist yet
}

console.log(`Generated RSS feed with ${articles.length} articles`);
