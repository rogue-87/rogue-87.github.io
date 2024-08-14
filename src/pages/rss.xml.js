import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
const baseUrl = import.meta.env.BASE_URL;

export async function GET() {
  const posts = await getCollection("blogs");
  return rss({
    title: "Rogue's Den",
    description: "Latest blog posts from my site",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.desc,
      pubDate: post.data.date,
      link: `${baseUrl}/blogs/${post.slug}`,
    })),
  });
}
