<script>
	let { form } = $props();
</script>

<svelte:head>
	<title>contact</title>
</svelte:head>

<div class="container">
	<!-- prettier-ignore -->
	<form action="/contact" method="POST">
		<input type="text"  name="name"     placeholder="name"      value="" required />
		<input type="email" name="email"    placeholder="email"     value="" required />
		<textarea           name="message"  placeholder="message"   value="" required></textarea>
		<button type="submit">send</button>
	</form>
	<p>{form?.success}</p>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100dvh;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		background-color: var(--bg-primary-dark);
		padding: 20px;
		border-radius: 16px;
	}

	form input,
	form textarea,
	form button {
		color: var(--fg-primary);
		background-color: var(--bg-primary-dark);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 8px;
		font-size: 1.25rem;
		box-sizing: border-box;
	}

	form textarea {
		resize: vertical;
		height: 150px;
	}

	form button {
		background-color: var(--bg-primary-light);
	}
</style>
