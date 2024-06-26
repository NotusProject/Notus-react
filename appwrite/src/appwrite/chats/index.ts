import { ID, Permission, Query, Role, Users, type Models } from "node-appwrite";
import { database, logger, users as appwriteUsers } from "../index";
import type { Chats } from "../types/chats";
import type { Friends } from "../types/friends";

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
export async function getFriendChat(executorId: string, friendID: string) {
	const chat = await database.listDocuments<Chats>("default", "chats", [
		Query.contains("users", [executorId, friendID]),
	]);
	const docs = chat.documents;
	const doc = docs.find((doc) => doc.users.length === 2);
	return doc;
}

export async function createChat(
	requestorId: string,
	users: string[],
	title?: string,
	type: "DIRECT" | "GROUP" = "DIRECT"
) {
	users = [...new Set([...users, requestorId])];

	const chatId = ID.unique();

	const isFriendQuery = (id: string) =>
		Query.or([Query.equal("user", id), Query.equal("friend", id)]);

	const ors: string[] = users.map(isFriendQuery);

	const friend = await database.listDocuments<Friends>("default", "friends", [
		Query.equal("status", "ACCEPTED"),
		Query.or(ors),
	]);
	logger.log("Friend found");
	logger.log(users);
	const lablesPromises = users.map((user) =>
		appwriteUsers.updateLabels(user, [chatId])
	);

	if (friend.documents.length !== users.length - 1) return false;
	logger.log("Creating chat Promise");
	await Promise.all(lablesPromises);
	logger.log("Creating chat Promise done");
	return await database.createDocument<Chats>(
		"default",
		"chats",
		chatId,
		{
			users,
			title,
			type,
		},
		[Permission.write(Role.label(chatId)), Permission.read(Role.user(chatId))]
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
