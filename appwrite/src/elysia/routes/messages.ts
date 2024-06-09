import Elysia, { t } from "elysia";
import { createMessage } from "../../appwrite/chats/messages";
export const message = new Elysia({ prefix: "messages" }).post(
	"/send",
	async ({ body, set, request }) => {
		const executor = request.headers.get("x-appwrite-user-id");
		if (!executor) {
			set.status = "Unauthorized";
			return { message: "Not logged in" };
		}
		const message = await createMessage(body.chatId, body.content, executor);
		return { message };
	},
	{
		body: t.Object({
			chatId: t.String(),
			content: t.String(),
		}),
	}
);
