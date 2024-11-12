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
		grid-template-columns: 40vw 35vw;
		grid-template-areas: "form socials";
		gap: 32px;
		min-height: 100dvh;
	}

	@media screen and (240px <= width <= 980px) {
		.layout {
			grid-template-columns: 90vw;
			grid-template-rows: 100vh 40vh;
			place-content: center;
			padding: 80px 0;

			grid-template-areas:
				"form"
				"socials";
		}
	}
</style>
