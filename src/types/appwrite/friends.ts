import {Models} from "appwrite";
import {Users} from "./users.ts";

export interface Friends extends Models.Document {
	user: Users;
	friend: Users;
	status: "ACCEPTED" | "PENDING";
}
