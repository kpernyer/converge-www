// Signals article fetcher - fetches articles from GCS bucket

import matter from 'gray-matter';
import { z } from 'zod';
import { type Result, ok, err } from './result';
import { ArticleSchema, ArticleIndexSchema } from './signals';
import type { Article, ArticleMeta, ArticleIndex } from './signals.types';
import { getEnv } from '../config/env';

// Error types
export class SignalsFetchError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'SignalsFetchError';
  }
}

export class SignalsParseError extends Error {
  constructor(
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'SignalsParseError';
  }
}

type SignalsError = SignalsFetchError | SignalsParseError;

// Frontmatter schema for parsing markdown files
const FrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  readingTime: z.number().int().positive(),
  featured: z.boolean().default(false),
});

/**
 * Calculate reading time from content (fallback if not in frontmatter)
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Fetch the article index from GCS bucket
 */
export async function fetchArticleIndex(): Promise<Result<ArticleIndex, SignalsError>> {
  const env = getEnv();
  const url = `${env.VITE_SIGNALS_BUCKET_URL}/index.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return err(new SignalsFetchError(`Failed to fetch article index`, response.status));
    }

    const data: unknown = await response.json();
    const parseResult = ArticleIndexSchema.safeParse(data);

    if (!parseResult.success) {
      return err(new SignalsParseError('Invalid article index format', parseResult.error.issues));
    }

    return ok(parseResult.data);
  } catch (error) {
    if (error instanceof SignalsFetchError || error instanceof SignalsParseError) {
      return err(error);
    }
    return err(
      new SignalsFetchError(error instanceof Error ? error.message : 'Unknown network error'),
    );
  }
}

/**
 * Fetch a single article by slug from GCS bucket
 */
export async function fetchArticle(slug: string): Promise<Result<Article, SignalsError>> {
  const env = getEnv();
  const url = `${env.VITE_SIGNALS_BUCKET_URL}/articles/${slug}.md`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return err(new SignalsFetchError(`Article not found: ${slug}`, 404));
      }
      return err(new SignalsFetchError(`Failed to fetch article: ${slug}`, response.status));
    }

    const markdown = await response.text();

    // Parse frontmatter
    const { data: frontmatter, content } = matter(markdown);

    // Validate frontmatter
    const metaParseResult = FrontmatterSchema.safeParse(frontmatter);

    if (!metaParseResult.success) {
      return err(
        new SignalsParseError(
          `Invalid frontmatter in article: ${slug}`,
          metaParseResult.error.issues,
        ),
      );
    }

    const meta = metaParseResult.data;

    // Build article object
    const article: Article = {
      slug,
      title: meta.title,
      subtitle: meta.subtitle,
      author: meta.author,
      publishedAt: meta.publishedAt,
      updatedAt: meta.updatedAt,
      tags: meta.tags,
      readingTime: meta.readingTime || calculateReadingTime(content),
      featured: meta.featured,
      content: content.trim(),
    };

    // Final validation
    const articleParseResult = ArticleSchema.safeParse(article);

    if (!articleParseResult.success) {
      return err(
        new SignalsParseError(`Article validation failed: ${slug}`, articleParseResult.error.issues),
      );
    }

    return ok(articleParseResult.data);
  } catch (error) {
    if (error instanceof SignalsFetchError || error instanceof SignalsParseError) {
      return err(error);
    }
    return err(
      new SignalsFetchError(error instanceof Error ? error.message : 'Unknown network error'),
    );
  }
}

/**
 * Fetch article metadata only (from index)
 */
export async function fetchArticleMeta(
  slug: string,
): Promise<Result<ArticleMeta, SignalsError>> {
  const indexResult = await fetchArticleIndex();

  if (!indexResult.ok) {
    return indexResult;
  }

  const meta = indexResult.value.find((a) => a.slug === slug);

  if (!meta) {
    return err(new SignalsFetchError(`Article not found: ${slug}`, 404));
  }

  return ok(meta);
}

// Type guards
export function isSignalsFetchError(error: unknown): error is SignalsFetchError {
  return error instanceof SignalsFetchError;
}

export function isSignalsParseError(error: unknown): error is SignalsParseError {
  return error instanceof SignalsParseError;
}
