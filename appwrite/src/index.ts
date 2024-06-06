import {
	type Context,
	toRequest,
	toResponse,
	type Response,
} from "@vynxc/appwrite-utils";

import app from "./elysia";
import eventHandler from "./events";
import { logger } from "./appwrite";

export default async function server(ctx: Context): Promise<Response> {
	logger.log = ctx.log;
	logger.error = ctx.log;
	try {
		const eventrsp = await eventHandler.pipe(ctx);
		if (eventrsp) {
			return eventrsp;
		}
		const request = toRequest(ctx.req);
		const honoResposne = await app.handle(request);
		return await toResponse(honoResposne);
	} catch (e) {
		if (e instanceof Error) {
			logger.error(e.message);
		}
		logger.error("Unhandled error");

		return await toResponse(Response.error());
	}
}
