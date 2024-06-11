import { ID, Query, Permission, Role } from "node-appwrite";
import { database } from "../index";
import type { Chats } from "../types/chats";

export async function createMessage(
	chatId: string,
	message: string,
	senderId: string
) {
	const chat = await database.getDocument<Chats>("default", "chats", chatId);
	if (!chat) throw new Error("Chat not found");
	const messageId = ID.unique();
	await database.createDocument(
		"default",
		"messages",
		messageId,
		{
			chat: chatId,
			content: message,
			sender: senderId,
		},
		[
			Permission.read(Role.label(chatId)),
			Permission.delete(Role.user(senderId)),
			Permission.update(Role.user(senderId)),
		]
	);
	return messageId;
}
