import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
const baseUrl = import.meta.env.BASE_URL;

export async function GET() {
  const posts = await getCollection("blogs");
  const authors = await getCollection("authors");
  const authorMap = new Map(authors.map((author) => [author.id, author.data]));
  return rss({
    title: "Rogue's Den",
    description: "Latest blog posts from my site",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      categories: post.data.tags,
      author: authorMap.get(post.data.author.id)?.name,
      description: post.data.desc,
      pubDate: post.data.date,
      link: `${baseUrl}/blogs/${post.slug}`,
    })),
  });
}
