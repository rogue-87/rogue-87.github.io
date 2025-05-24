import { json } from "@sveltejs/kit";
import type { PostMetadata } from "$lib/types";

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}

async function getPosts() {
	let posts: PostMetadata[] = [];

	const paths = import.meta.glob("/src/posts/*.md", { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".md", "");

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<PostMetadata, "slug">;
			const post = { ...metadata, slug } satisfies PostMetadata;
			if (post.published) posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}
