import { ID, Permission, Query, Role } from "node-appwrite";
import { database } from "../index";

export async function getChats(requestorId: string) {
	const chats = await database.listDocuments("default", "chats", [
		Query.contains("users", requestorId),
	]);
	return [];
}
//client
export async function getChat(chatId: string) {
	const chat = await database.getDocument("default", "chats", chatId);
	return chat;
}

export async function createChat(
	requestorId: string,
	users: string[],
	title?: string
) {
	users = [...new Set([...users, requestorId])];
	const isFriendQuery = (id: string) =>
		Query.or([Query.equal("user", id), Query.equal("friend", id)]);

	const ors: string[] = users.map(isFriendQuery);

	const friend = await database.listDocuments("default", "friends", [
		Query.equal("status", "ACCEPTED"),
		Query.and(ors),
	]);

	if (friend.documents.length !== users.length - 1) return false;

	const read = users.map((user) => [
		Permission.read(Role.user(user)),
		Permission.write(Role.user(user)),
	]);

	const permissions = [...read.flat()];

	return await database.createDocument(
		"default",
		"chats",
		ID.unique(),
		{
			users,
			title,
		},
		permissions
	);
}

export async function deleteChat(requestorId: string, chatId: string) {
	const chat = await database.getDocument("default", "chats", chatId);

	if (!chat || !chat.users.includes(requestorId)) return false;

	const type = chat.type;
	if (type === "group")
		await database.deleteDocument("default", "chats", chatId);

	return true;
}
