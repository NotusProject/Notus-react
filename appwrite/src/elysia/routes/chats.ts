import Elysia from "elysia";
import { getIdFromUsername, logger } from "../../appwrite";
import { createChat, getFriendChat } from "../../appwrite/chats";
import { message } from "./messages";

export const chats = new Elysia({ prefix: "chats" })
	.onError((error) => {
		logger.error(error);
		return { message: "Internal server error" };
	})
	.use(message)
	.get("/user/:username", async ({ params, request, set }) => {
		const executor = request.headers.get("x-appwrite-user-id");
		const friend = await getIdFromUsername(params.username);

		if (friend === executor || friend === null || executor === null) {
			set.status = "Bad Request";
			return {
				message: "friend === executor || friend === null || executor === null",
			};
		}
		const friendChat = await getFriendChat(executor, friend);

		if (friendChat === undefined) {
			const chat = await createChat(executor, [executor, friend]);
			if (chat === false) {
				return { message: "failed to create chat" };
			}
			return chat;
		}
		return friendChat;
	})
	.get("/group/:id", () => {
		return { message: "Hello" };
	})
	.get("/all", () => {
		return { message: "Hello" };
	});
