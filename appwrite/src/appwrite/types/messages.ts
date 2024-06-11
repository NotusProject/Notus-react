import { type Models } from "node-appwrite";

export interface Messages extends Models.Document {
	content: string;
	sender: string;
	pinned: boolean;
	edited: string;
	chat: string;
	type: "TEXT" | "AUDIO";
}
