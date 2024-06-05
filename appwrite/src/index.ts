import {
	type Context,
	toRequest,
	toResponse,
	type Response,
} from "@vynxc/appwrite-utils";

import app from "./elysia";
import eventHandler from "./events";

export default async function server(ctx: Context): Promise<Response> {
	const eventrsp = await eventHandler.pipe(ctx);
	if (eventrsp) {
		return eventrsp;
	}
	const request = toRequest(ctx.req);
	const honoResposne = await app.handle(request);
	return await toResponse(honoResposne);
}
