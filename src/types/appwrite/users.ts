import { Models } from "appwrite";

export interface Users extends Models.Document {
	avatar: string;
	username: string;
	bio: string;
	status: "ONLINE" | "OFFLINE";
}
