import Elysia, { t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { friends } from "./routes/friends";
import { chats } from "./routes/chats";

const app = new Elysia()
	.use(swagger())
	.use(
		cors({
			credentials: true,
			origin: "localhost:1420",
		})
	)
	.use(friends)
	.use(chats)
	.get("/", () => "Hello World");

export default app;
export type App = typeof app;
