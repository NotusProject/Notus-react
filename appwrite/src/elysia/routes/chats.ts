import Elysia from "elysia";
import { logger } from "../../appwrite";

const chats = new Elysia({ prefix: "chats" })
	.onError((error) => {
		logger.error(error);
		return { message: "Internal server error" };
	})
	.get("/user/:username", () => {
		return { message: "Hello" };
	})
	.get("/group/:id", () => {
		return { message: "Hello" };
	})
	.get("/all", () => {
		return { message: "Hello" };
	});
