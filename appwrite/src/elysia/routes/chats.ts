import Elysia from "elysia";
import { getIdFromUsername, logger } from "../../appwrite";
import { createChat } from "../../appwrite/chats";

const chats = new Elysia({ prefix: "chats" })
	.onError((error) => {
		logger.error(error);
		return { message: "Internal server error" };
	})
	.get("/user/:username", async ({ params, request, set }) => {
		const executor = request.headers.get("x-appwrite-user-id");
		const friend = await getIdFromUsername(params.username);

		if (friend === executor || friend === null || executor === null) {
			set.status = "Bad Request";
			return {
				message: "friend === executor || friend === null || executor === null",
			};
		}
		const chat = await createChat(executor, [executor, friend]);
		return { message: chat };
	})
	.get("/group/:id", () => {
		return { message: "Hello" };
	})
	.get("/all", () => {
		return { message: "Hello" };
	});
