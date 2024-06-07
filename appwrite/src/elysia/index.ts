import Elysia, { t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { friends } from "./routes/friends";

const app = new Elysia()
	.use(swagger())
	.use(
		cors({
			credentials: true,
			origin: "localhost:1420",
		})
	)
	.use(friends)
	.get("/", () => "Hello World");

export default app;
export type App = typeof app;
