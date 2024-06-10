import { Models } from "appwrite";

export interface Chats extends Models.Document {
	last_message: string;
	users: string[];
	title: string;
	type: "DIRECT" | "GROUP";
}
