import { Client, Databases, Query, Users } from "node-appwrite";
import type { Users as UsersModel } from "./types/users";

export const apiKey = Bun.env["APPWRITE_API_KEY"]!;
export const client = new Client()
	.setEndpoint("https://appwrite.wasimhub.dev/v1")
	.setProject("notus")
	.setKey(apiKey);

export const database = new Databases(client);

export async function getIdFromUsername(username: string) {
	const users = await database.listDocuments<UsersModel>("default", "users", [
		Query.equal("username", username),
	]);
	if (users.documents.length === 0) {
		return null;
	}
	return users.documents[0].$id;
}
export const users = new Users(client);
export const logger = {
	log: (message: Object | any[] | string | number) => {
		if (message instanceof Object || typeof message === "object") {
			logger.log_internal(JSON.stringify(message));
			return;
		} else if (typeof message === "string" || typeof message === "number") {
			logger.log_internal(message);
		}
	},
	error: (message: Object | any[] | string | number) => {
		if (message instanceof Object || typeof message === "object") {
			logger.error_internal(JSON.stringify(message));
			return;
		} else if (typeof message === "string" || typeof message === "number") {
			logger.error_internal(message);
		}
	},
	log_internal: (message: Object | any[] | string | number) => {},
	error_internal: (message: Object | any[] | string | number) => {},
};
