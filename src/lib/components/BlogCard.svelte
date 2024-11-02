<script lang="ts">
	import { formatDate } from "$lib/utils";
	import { title, desc, url } from "$lib/config";
  import type { Post } from "$lib/types"

	let { post }: { post: Post } = $props();
</script>

<svelte:head>
	<meta name="description" content={desc} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}/blog`} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content="/blog-banner.webp" />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content="/blog-banner.webp" />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

{#key post.slug}
	<a href={`/blog/${post.slug}`}>
		<header>
			{#if post.image}
				<img src={post.image} alt="blog banner" />
			{/if}
		</header>

		<div>
			<h3 data-toc-ignore>{post.title}</h3>
			<article><p>{post.desc}</p></article>
		</div>

		<hr />

		<footer>
			<div>
				<h6 data-toc-ignore>By Rogue</h6>
				<small>Posted on {formatDate(post.date)}</small>
			</div>
		</footer>
	</a>
{/key}
