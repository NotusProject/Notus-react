import { ID, Permission, Query, Role, Users, type Models } from "node-appwrite";
import { database, logger, users as appwriteUsers } from "../index";

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
	const chat = await database.listDocuments("default", "chats", [
		Query.contains("users", [executorId, friendID]),
	]);
	const docs = chat.documents as User[];
	const doc = docs.find((doc) => doc.users.length === 2);
	return doc;
}
interface User extends Models.Document {
	users: string[];
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

	const friend = await database.listDocuments("default", "friends", [
		Query.equal("status", "ACCEPTED"),
		Query.or(ors),
	]);
	const lablesPromises = users.map((user) =>
		appwriteUsers.updateLabels(user, [chatId])
	);
	if (friend.documents.length !== users.length - 1) return false;

	await Promise.all(lablesPromises);

	return await database.createDocument(
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
