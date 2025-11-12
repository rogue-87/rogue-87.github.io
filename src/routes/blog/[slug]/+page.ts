import type { ServerLoadEvent } from "@sveltejs/kit";
import type { PostMetadata } from "$lib/types";
import { error } from "@sveltejs/kit";

type Post = { default: () => any; metadata: PostMetadata };

export async function load({ params }: ServerLoadEvent) {
    try {
        const post: Post = await import(`../../../posts/${params.slug}.md`);

        return {
            content: post.default,
            meta: post.metadata,
        };
    } catch (e) {
        throw error(404, `Could not find ${params.slug}.\nError: ${e}`);
    }
}
