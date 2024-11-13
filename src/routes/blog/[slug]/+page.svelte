<script lang="ts">
	import { formatDate } from "$lib/utils";
	import { url, title } from "$lib/config";

	let { data } = $props();
	import "$lib/style/abstracts/util.css";
</script>

<svelte:head>
	<title>{data.meta.title}</title>

	<link rel="canonical" href={`${url}`} />
	<meta name="description" content={data.meta.desc} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={data.meta.image} />
</svelte:head>

<div>
	<article style:padding="24px 0">
		<hgroup>
			<h1>{data.meta.title}</h1>
			<!-- <img src={data.meta.image} alt="blog banner" /> -->
			<p class="post-date">Published at {formatDate(data.meta.date)}</p>
		</hgroup>

		<div>
			{#each data.meta.tags as tag}
				<span>&num;{tag}</span>
			{/each}
		</div>

		<div class="content">
			{@render data.content()}
		</div>
	</article>
</div>

<style>
	hgroup,
	.content {
		padding: 16px;
		border-radius: 16px;
		border: 1px solid var(--border-primary);
	}

	hgroup {
		background-color: var(--bg-primary-dark);
		margin-bottom: 16px;
	}

	.content {
		background-color: var(--bg-primary-light);
	}

	.post-date {
		text-align: end;
		color: var(--fg-primary-dark);
	}
</style>
