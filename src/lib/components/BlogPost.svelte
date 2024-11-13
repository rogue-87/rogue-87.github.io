<script lang="ts">
	import { formatDate } from "$lib/utils";
	import { title, desc, url } from "$lib/site-config";
	import type { Post } from "$lib/types";

	let { post }: { post: Post } = $props();
</script>

<svelte:head>
	<meta name="description" content={desc} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}/blog`} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:site_name" content={title} />
	<!-- <meta property="og:image" content="/blog-banner.webp" /> -->
</svelte:head>

{#key post.slug}
	<a href={`/blog/${post.slug}`}>
		<div class="banner">
			{#if post.image}
				<img src={post.image} alt="blog banner" />
			{/if}
		</div>

		<div class="info">
			<h3>{post.title}</h3>
			<article><p>{post.desc}</p></article>
		</div>

		<!-- <hr /> -->

		<div class="date"><h4>Posted on {formatDate(post.date)}</h4></div>
	</a>
{/key}

<style>
	a {
		display: block;
		color: var(--fg-primary);
		background-color: var(--bg-primary-dark);
		border-radius: 16px;
		padding: 32px;
		text-decoration: none;
		border: 1px solid var(--border-primary);

		&:not(a:first-child) {
			margin-top: 16px;
		}

		transition:
			color 200ms,
			background-color 200ms;

		&:hover {
			color: var(--fg-primary-light);
			background-color: var(--bg-primary-light);
		}
	}

	.date {
		color: var(--fg-primary-dark);
		text-align: right;
	}
</style>
