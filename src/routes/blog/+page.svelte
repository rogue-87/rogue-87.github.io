<script lang="ts">
	import BlogPost from "$lib/components/BlogPost.svelte";
	let { data } = $props();
</script>

<svelte:head>
	<title>blog</title>
</svelte:head>

<section style:padding="24px 0">
	<ul>
		{#each data.posts as post}
			<BlogPost {post} />
		{/each}
	</ul>
</section>
