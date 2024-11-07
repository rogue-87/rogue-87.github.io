<script>
</script>

<form action="/contact" method="POST" enctype="multipart/form-data" name="EmailForm">
	<input type="text" name="name" placeholder="name" required />
	<input type="email" name="email" placeholder="email" required />
	<textarea name="message" placeholder="message" required></textarea>
	<button type="submit">send</button>
</form>

<style>
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
