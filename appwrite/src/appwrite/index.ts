import { Client, Databases } from "node-appwrite";

export const apiKey = Bun.env["APPWRITE_API_KEY"]!;
export const client = new Client()
	.setEndpoint("https://appwrite.wasimhub.dev/v1")
	.setProject("notus")
	.setKey(apiKey);

export const database = new Databases(client);
