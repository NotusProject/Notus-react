import { Hono } from "hono";

const friends = new Hono().basePath("/friends");

friends.get("/add/:username", (event) => {
	const username = event.req.param("username");
	return new Response();
});

export default friends;
