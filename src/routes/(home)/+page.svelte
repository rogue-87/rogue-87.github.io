<script>
	import { LanyardSocket } from "../../stores/websocket.svelte";
	import Spotify from "./Spotify.svelte";
	import gideon from "$lib/assets/images/gideon-animated.webp";
	import { title, author, url, desc } from "$lib/site-config";
	const socket = new LanyardSocket("369982847496355841");

	$effect(() => {
		socket.connect();
		return socket.disconnect;
	});
</script>

<svelte:head>
	<title>home</title>

	<meta property="author" content={author} />
	<meta name="description" content={desc} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content={author} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="/images/gideon-graves.png" />
</svelte:head>

<section class="hero">
	<div class="pfp">
		<img src={gideon} alt="gideon" width="125px" height="125px" />
	</div>

	<h1>Hi there 👋, my name is Rogue.</h1>

	<p class="intro">
		yet another cs student. trying to make something out of himself. will he succeed? probably not.
		does he know? probably not. will he try? maybe...
	</p>

	<Spotify />
</section>

<style>
	h1 {
		font-weight: bold;
		text-align: center;
	}

	p {
		font-size: 1.25rem;
	}

	.hero {
		min-height: calc(100dvh - var(--header-height));
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 32px;
	}

	.pfp {
		display: flex;
		justify-content: center;
	}

	.pfp img {
		border-radius: 16px;
		border: 2px solid var(--border-primary);
	}

	@media screen and (600px <= width <= 915px) and (orientation: landscape) {
		.hero {
			padding: 24px 0;
		}
	}
</style>
