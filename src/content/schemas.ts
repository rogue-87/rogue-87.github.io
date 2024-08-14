import { z, reference } from "astro:content";

/* Content */
export const blogSchema = z.object({
  title: z.string(),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  desc: z.string(),
  img: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  draft: z.boolean(),
  author: reference("authors"),
  tags: z.array(z.string()),
  relatedPosts: z.array(reference("blogs")).optional(),
});

export const gallerySchema = z.object({});

export const projectSchema = z.object({});

/* Data */
export const authorSchema = z.object({
  name: z.string().default("Anonymous"),
  email: z.string().optional(),
});
