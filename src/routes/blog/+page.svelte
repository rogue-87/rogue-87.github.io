<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte";
	let { data } = $props();
</script>

<h1>blogs</h1>
<section>
	<ul>
		{#each data.posts as post}
			<BlogCard {post} />
		{/each}
	</ul>
</section>
