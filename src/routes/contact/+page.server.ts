import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get("name");
		const email = data.get("email");
		const message = data.get("message");

		console.log(name, email, message);
	}
} satisfies Actions;
