<script lang="ts">
	import { formatDate } from "$lib/utils";
	import { url, title } from "$lib/config";

	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>

	<link rel="canonical" href={`${url}`} />
	<meta name="description" content={data.meta.desc} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}`} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={data.meta.image} />

	<!-- <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" /> -->
	<!-- <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" /> -->
</svelte:head>

<article>
	<!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
		<img src={data.meta.image} alt="blog banner" />
		<p>
			Published at {formatDate(data.meta.date)}
		</p>
	</hgroup>

	<!-- Tags -->
	<div>
		{#each data.meta.categories as category}
			<a href={`/blog/categories/${category}`}>&num;{category}</a>
		{/each}
	</div>

	<!-- Post -->
	<svelte:component this={data.content} />
</article>
