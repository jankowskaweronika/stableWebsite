import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const todoOr = <T extends z.ZodType>(schema: T) => z.union([z.literal('TODO'), schema]);

const imageRef = z.object({ image: z.string(), alt: z.string() });

const priceItem = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().nonnegative().optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
});

const settings = defineCollection({
  loader: file('src/content/settings.yaml'),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    url: z.url(),
    email: z.email(),
    phone: z.object({ number: z.string(), display: z.string() }),
    company: z.object({ legalName: z.string(), registeredAddress: z.string(), nip: z.string() }),
    address: z.object({
      street: z.string(),
      locality: z.string(),
      postalCode: z.string(),
      postTown: z.string(),
      region: z.string(),
      country: z.string(),
    }),
    geo: z.object({ latitude: z.number(), longitude: z.number() }),
    maps: z.object({ embedUrl: z.url(), directionsUrl: z.url() }),
    socials: z.object({ facebook: z.url(), instagram: z.url() }),
  }),
});

const home = defineCollection({
  loader: file('src/content/home.yaml'),
  schema: z.object({
    hero: z.object({ eyebrow: z.string(), lead: z.string(), image: z.string(), imageAlt: z.string() }),
    about: z.object({
      title: z.string(),
      items: z.array(
        z.object({ title: z.string(), description: z.string(), image: z.string(), imageAlt: z.string() }),
      ),
    }),
    gallery: z.array(imageRef),
  }),
});

const offers = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/offers' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    href: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    order: z.number(),
    included: z.array(z.string()).default([]),
    infrastructure: z.array(z.string()).default([]),
    extraServices: z.array(z.string()).default([]),
    gallery: z.array(imageRef).default([]),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    link: z.object({ label: z.string(), url: z.url() }).optional(),
    draft: z.boolean().default(false),
  }),
});

const horses = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/horses' }),
  schema: z.object({
    name: z.string(),
    breed: z.string(),
    sex: z.enum(['ogier', 'klacz']),
    born: todoOr(z.number().int()),
    sire: z.string(),
    dam: z.string(),
    damSire: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imagePosition: z.string().optional(),
    imageFit: z.enum(['cover', 'contain']).default('cover'),
    order: z.number().default(100),
  }),
});

const achievements = defineCollection({
  loader: file('src/content/achievements.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    horse: z.string(),
    event: z.string(),
    classNumber: z.string().optional(),
    category: z.string(),
    result: z.string(),
    title: z.string().optional(),
    featured: z.boolean().default(false),
    scores: z
      .array(
        z.object({
          group: z.string(),
          total: z.string(),
          items: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
        }),
      )
      .default([]),
    sourceLabel: z.string().default('LZHK'),
    url: z.url().optional(),
    protocolUrl: z.url().optional(),
  }),
});

const prices = defineCollection({
  loader: file('src/content/prices.yaml'),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    intro: z.string().optional(),
    items: z.array(priceItem),
    extras: z.array(priceItem).default([]),
  }),
});

export const collections = { settings, home, offers, news, horses, achievements, prices };
