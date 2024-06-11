import { type Models } from "node-appwrite";

export interface Chats extends Models.Document {
	last_message: string;
	users: string[];
	title: string;
	type: "DIRECT" | "GROUP";
}
