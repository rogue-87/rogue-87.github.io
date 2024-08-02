import { defineCollection } from "astro:content";
import { blogSchema, authorSchema } from "./schemas";

const blogCollection = defineCollection({
  type: "content",
  schema: blogSchema,
});

const authorCollection = defineCollection({
  type: "data",
  schema: authorSchema,
});

export const collections = {
  blogs: blogCollection,
  authors: authorCollection,
};
