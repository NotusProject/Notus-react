import { Models } from "appwrite";

export interface User extends Models.Document {
	avatar: string;
	username: string;
	bio: string;
	status: "ONLINE" | "OFFLINE";
}
