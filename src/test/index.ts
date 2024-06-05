import { edenFetch } from "@elysiajs/eden";
import { App } from "../../appwrite/src/elysia";

const fetch = edenFetch<App>("http://localhost:3000");
fetch("/friends/add/:username", { params: { username: "vynxc" } }).then(
	console.log
);
