import type { PageLoadEvent } from "./$types";
import type { Post } from "$lib/types";

export async function load({ fetch }: PageLoadEvent) {
	const res = await fetch("/api/posts");
	const posts: Post[] = await res.json();
	return { posts };
}
