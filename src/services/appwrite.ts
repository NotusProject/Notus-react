import { Client, Account } from "appwrite";
import { treaty } from "@elysiajs/eden";
import { App } from "../../appwrite/src/elysia";

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("665cdeb50027cdbdd34f");

export const api = treaty<App>("https://6660df2bc1f22b396b2a.wasimhub.dev", {
	async fetcher(input, init) {
		return call(input, init);
	},
});
async function call(input: RequestInfo | URL, init?: RequestInit) {
	init = init ?? {};
	init.headers = init.headers ?? {};
	const headers = Object.assign({}, client.headers, init.headers);
	init.credentials = "include";

	if (typeof window !== "undefined" && window.localStorage) {
		const cookieFallback = window.localStorage.getItem("cookieFallback");
		if (cookieFallback) {
			headers["X-Fallback-Cookies"] = cookieFallback;
		}
	}
	const response = await fetch(input, init);
	if (response.headers.get("X-Fallback-Cookies")) {
		window.localStorage.setItem(
			"cookieFallback",
			response.headers.get("X-Fallback-Cookies") as string
		);
	}
	return response;
}
const account = new Account(client);

export { client, account };
