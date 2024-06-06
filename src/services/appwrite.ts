import { Client, Account, Functions, ExecutionMethod } from "appwrite";
import { treaty } from "@elysiajs/eden";
import { App } from "../../appwrite/src/elysia";

const client = new Client()
	.setEndpoint("https://appwrite.wasimhub.dev/v1")
	.setProject("notus");

export const api = treaty<App>("https://6660df2bc1f22b396b2a.wasimhub.dev", {
	async fetcher(input, init) {
		return callClient(input, init);
	},
});

const functions = new Functions(client);
async function callClient(input: RequestInfo | URL, init?: RequestInit) {
	let url: URL;
	if (typeof input === "string") {
		url = new URL(input);
	} else {
		url = input as URL;
	}

	const path = url.pathname + url.search + url.hash;
	const body = init?.body;
	const method = init?.method as ExecutionMethod;
	let bodyString: string | undefined = undefined;
	if (body) {
		bodyString = await convertBodyToString(body);
	}
	const headers = init?.headers;

	const execution = await functions.createExecution(
		"6660df2a00211037c8c4", // functionId
		bodyString, // body (optional)
		false, // async (optional)
		path, // path (optional)
		method, // method (optional)
		headers // headers (optional)
	);
	const resHeaders: Record<string, string> = {};
	execution.responseHeaders.forEach((header) => {
		resHeaders[header.name] = header.value;
	});
	const response = new Response(execution.responseBody, {
		headers: resHeaders,
		status: execution.responseStatusCode,
		statusText: execution.responseStatusCode.toString(),
	});
	return response;
}
//@ts-ignore
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
	init.headers = headers;
	console.log(init.headers);

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

async function convertBodyToString(body: BodyInit): Promise<string> {
	if (typeof body === "string") {
		return body;
	} else if (body instanceof Blob) {
		return await body.text();
	} else if (body instanceof FormData) {
		return new URLSearchParams(body as any).toString();
	} else if (body instanceof URLSearchParams) {
		return body.toString();
	} else {
		// Handle other types of BodyInit if needed
		throw new Error("Unsupported body type");
	}
}
