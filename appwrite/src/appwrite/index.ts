import { Client, Databases, Permission, Query, Role } from "node-appwrite";

export const apiKey = Bun.env["APPWRITE_API_KEY"]!;
export const client = new Client()
	.setEndpoint("https://appwrite.wasimhub.dev/v1")
	.setProject("notus")
	.setKey(apiKey);

export const database = new Databases(client);

export async function getIdFromUsername(username: string) {
	const users = await database.listDocuments("default", "users", [
		Query.equal("username", username),
	]);
	if (users.documents.length === 0) {
		return null;
	}
	return users.documents[0].$id;
}

export const logger = {
	log: (message: Object | any[] | string | number) => {},
	error: (message: Object | any[] | string | number) => {},
};
