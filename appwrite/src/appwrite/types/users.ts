import { type Models } from "node-appwrite";

export interface Users extends Models.Document {
	avatar: string;
	username: string;
	bio: string;
	status: "ONLINE" | "OFFLINE";
}
