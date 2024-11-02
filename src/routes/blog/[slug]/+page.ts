import { error } from "@sveltejs/kit";
import type { ServerLoadEvent } from "@sveltejs/kit";

export async function load({ params }: ServerLoadEvent) {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
