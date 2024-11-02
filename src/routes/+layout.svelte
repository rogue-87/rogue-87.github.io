<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import "$lib/style/abstracts/_index.css";
	let { children } = $props();
</script>

<Header />

<main>
	{@render children()}
</main>

<Footer />

<style>
	main {
		min-height: 100dvh;
		height: auto;
		width: 60vw;
		margin: 0 auto;
	}

	@media screen and (320px <= width <= 480px) and (orientation: portrait) {
		main {
			width: 85vw;
		}
	}

	@media screen and (320px <= width <= 480px) and (orientation: landscape) {
	}
</style>
