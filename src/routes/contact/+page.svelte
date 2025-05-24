<script>
	import Socials from "./Socials.svelte";
</script>

<svelte:head>
	<title>contact</title>
</svelte:head>

<div class="layout">
	<Socials />
</div>

<style>
	.layout {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100dvh - var(--header-height));
		width: var(--global-width);
	}

	@media screen and (240px <= width <= 980px) {
		.layout {
			align-items: unset;
			padding: 24px 0;
			height: max-content;
		}
	}
</style>
