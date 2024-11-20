<script lang="ts">
	import { browser } from "$app/environment";
	import { enhance } from "$app/forms";

	$effect(() => {
		if (browser) {
			window.hcaptcha.render("hcaptcha", {
				sitekey: "e7f00e3c-8cfc-48dc-805e-971812ca4fd4",
				theme: "dark",
				callback() {
					const captchaElement = document.getElementById("hcaptcha");
					captchaElement?.setAttribute("hidden", "");
				}
			});
		}
	});
</script>

<form action="/contact" method="POST" use:enhance>
	<input type="text" name="name" placeholder="name" value="" required />
	<input type="email" name="email" placeholder="email" value="" required />
	<textarea name="message" placeholder="message" value="" required></textarea>
	<button type="submit">send</button>
	<div class="h-captcha" id="hcaptcha"></div>
</form>

<style>
	form {
		grid-area: form;
		display: flex;
		flex-direction: column;
		gap: 16px;
		background-color: var(--bg-primary-dark);
		padding: 16px;
		border-radius: 16px;
		min-height: 75%;
		height: auto;
	}

	form input,
	form textarea {
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
		color: var(--fg-primary);
		background-color: var(--bg-primary-light);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		padding: 8px;
		font-size: 1.25rem;
		box-sizing: border-box;
		transition: background-color 200ms ease-in-out;
		cursor: pointer;

		&:hover {
			background-color: var(--bg-primary);
		}
	}
</style>
