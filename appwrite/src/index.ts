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
	logger.log_internal = ctx.log;
	logger.error_internal = ctx.error;

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
			ctx.error(e.message);
		}
		ctx.error("Unhandled error");

		return ctx.res.json({ message: "Unhandled error" }, 500);
	}
}
