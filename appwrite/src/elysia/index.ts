import Elysia, { t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
const app = new Elysia()
	.use(swagger())
	.use(
		cors({
			credentials: true,
			origin: "localhost:1420",
		})
	)
	.get("/friends/add/:username", ({ params }) => `Hello ${params.username}`, {
		response: t.String(),
	});
export default app;
export type App = typeof app;
