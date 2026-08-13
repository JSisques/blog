import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // ids come out as "<lang>/<slug>", e.g. "es/bienvenida-al-blog" — see
  // src/i18n/utils.ts#splitLocalizedId. The same slug in both the es/ and
  // en/ folders is what pairs a post with its translation.
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

export const collections = { blog };
