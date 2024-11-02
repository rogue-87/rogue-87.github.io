<script lang="ts">
	import { page } from "$app/stores";
</script>

<header>
	<ul>
		<li>
			<a href="/" class:selected={$page.url.pathname === "/"}>home</a>
		</li>
		<li>
			<a href="/whoami" class:selected={$page.url.pathname === "/whoami"}>whoami</a>
		</li>
		<li>
			<a href="/blog" class:selected={$page.url.pathname === "/blog"}>blog</a>
		</li>
		<li>
			<a href="/contact" class:selected={$page.url.pathname === "/contact"}>contact</a>
		</li>
	</ul>
</header>

<style>
	header {
		position: fixed;
		width: 100%;
		top: 0;
		background-color: var(--bg-primary-dark);
		border-bottom: 1px solid var(--fg-accent);
	}

	ul {
		padding: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 65px;
	}

	li {
		list-style-type: none;
	}

	a {
		color: var(--fg-primary);
		text-decoration: none;
		font-size: 1rem;
		padding: 12px;
		transition:
			color 200ms,
			background-color 200ms;

		border-radius: 8px;

		&:hover {
			color: var(--fg-primary-light);
			background-color: var(--bg-primary);
		}
	}

	.selected {
		background-color: var(--bg-primary-light);
	}
</style>
