<script lang="ts">
	import BlogPost from "$lib/components/BlogPost.svelte";
	let { data } = $props();
</script>

<section style:padding-top="80px">
	<ul>
		{#each data.posts as post}
			<BlogPost {post} />
		{/each}
	</ul>
</section>
