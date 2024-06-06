import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
const app = new Elysia()
	.use(swagger())
	.use(cors())
	.get("/friends/add/:username", ({ params }) => {
		const username = params.username;
		return `Hello ${username}`;
	});

export default app;
export type App = typeof app;
