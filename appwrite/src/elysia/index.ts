import Elysia from "elysia";
import { swagger } from "@elysiajs/swagger";
const app = new Elysia()
	.use(swagger({ path: "/" }))
	.get("/friends/add/:username", ({ params }) => {
		const username = params.username;
		return `Hello ${username}`;
	});

export default app;
export type App = typeof app;
