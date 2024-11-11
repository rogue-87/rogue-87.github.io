<!-- prettier-ignore -->
<form action="/contact" method="POST">
    <input type="text"  name="name"     placeholder="name"      value="" required />
    <input type="email" name="email"    placeholder="email"     value="" required />
    <textarea           name="message"  placeholder="message"   value="" required></textarea>
    <button type="submit">send</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		background-color: var(--bg-primary-dark);
		padding: 16px;
		border-radius: 16px;
		min-height: 55vh;
		height: auto;
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
		flex-grow: 1;
	}

	form button {
		background-color: var(--bg-primary-light);
	}

	@media screen and (320px <= width <= 980px) {
		form {
			min-height: 75vh;
		}
	}
</style>
