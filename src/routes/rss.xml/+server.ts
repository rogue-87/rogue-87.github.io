import * as config from "$lib/config";
import type { Post } from "$lib/types";
import type { ServerLoadEvent } from "@sveltejs/kit";

export async function GET({ fetch }: ServerLoadEvent) {
	const res = await fetch("api/posts");
	const posts: Post[] = await res.json();

	const headers = { "Content-Type": "application/xml" };

	const xml = `
        <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${config.title}</title>
				<description>${config.desc}</description>
				<link>${config.url}</link>
				<atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.desc}</description>
							<link>${config.url}/${post.slug}</link>
							<guid isPermaLink="true">${config.url}/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
					)
					.join("")}
			</channel>
		</rss>
    `.trim();

	return new Response(xml, { headers });
}

// NOTE: Page Settings 󰒓
export const prerender = true;
