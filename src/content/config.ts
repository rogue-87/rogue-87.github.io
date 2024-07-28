import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    desc: z.string(),
    author: reference("authors"),
    tags: z.array(z.string()),
    relatedPosts: z.array(reference("blogs")).optional(),
  }),
});

const authorCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string().default("Anonymous"),
    alias: z.string().optional(),
  }),
});

export const collections = {
  blogs: blogCollection,
  authors: authorCollection,
};
