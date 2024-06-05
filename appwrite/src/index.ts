import { type Context, toRequest, toResponse } from "@vynxc/appwrite-utils";
import { Hono } from "hono";
import friends from "./routes/friends";

const routes = [friends];

const app = new Hono();
app.get("/", (event) => new Response("Hello World!"));

routes.forEach((route) => app.route("/", route));

export default async function server(ctx: Context) {
	const request = toRequest(ctx.req);
	const honoResposne = await app.fetch(request);
	return await toResponse(honoResposne);
}
