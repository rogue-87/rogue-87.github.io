import type { PageLoadEvent } from "./$types";
import type { PostMetadata } from "$lib/types";

export async function load({ fetch }: PageLoadEvent) {
	const res = await fetch("/api/posts.json");
	const posts: PostMetadata[] = await res.json();
	return { posts };
}
