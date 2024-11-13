<script>
	let { children } = $props();
</script>

<div class="layout">
	{@render children()}
</div>

<style>
	.layout {
		display: grid;
		justify-content: center;
		align-items: center;
		grid-template-rows: calc(100dvh - var(--header-height));
		grid-template-columns: 40vw 35vw;
		grid-template-areas: "form socials";
		gap: 24px;
	}

	@media screen and (240px <= width <= 980px) {
		.layout {
			grid-template-columns: 90vw;
			align-items: unset;
			grid-template-rows: 500px 400px;
			padding: 24px 0;

			grid-template-areas:
				"form"
				"socials";
		}
	}
</style>
