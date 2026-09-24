import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const patientStage = z.enum(['stage-0', 'stage-1', 'stage-2', 'stage-3', 'stage-4']);

const patient = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/patients' }),
  schema: z.object({
    title: z.string(),
    heading: z.string().optional(),
    description: z.string(),
    stage: patientStage.optional(),
    tags: z.array(z.string()).default([]),
    /** Other article slugs (filename without folder or extension). */
    related: z.array(z.string()).default([]),
    illustration: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});


const family = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/family' }),
  schema: z.object({
    title: z.string(),
    heading: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    /** Other article slugs (filename without folder or extension). */
    related: z.array(z.string()).default([]),
    illustration: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});


const researchers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/researchers' }),
  schema: z.object({
    title: z.string(),
    heading: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    /** Other article slugs (filename without folder or extension). */
    related: z.array(z.string()).default([]),
    illustration: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  patient,
  family,
  researchers
};