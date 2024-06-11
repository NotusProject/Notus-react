import { type Models } from "node-appwrite";

export interface Friends extends Models.Document {
	user: string;
	friend: string;
	status: "ACCEPTED" | "PENDING";
}
