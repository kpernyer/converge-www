// Signals (blog) article types and schemas

import { z } from 'zod';

// Article metadata schema
export const ArticleMetaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  author: z.string(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([]),
  readingTime: z.number().int().positive(), // minutes
  featured: z.boolean().default(false),
});

// Full article with content
export const ArticleSchema = ArticleMetaSchema.extend({
  content: z.string(), // Markdown content
});

// Inferred types
export type ArticleMeta = z.infer<typeof ArticleMetaSchema>;
export type Article = z.infer<typeof ArticleSchema>;

// Article index (list of metadata for all articles)
export const ArticleIndexSchema = z.array(ArticleMetaSchema);
export type ArticleIndex = z.infer<typeof ArticleIndexSchema>;
