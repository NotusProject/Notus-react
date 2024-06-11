import { Models } from "appwrite";
import { Users } from "./users";
//TODO: remove all shit code please, friends atom useless for messages thanks pal.
export interface Messages extends Models.Document {
	content: string;
	sender: Users;
	pinned: boolean;
	edited: string;
	chat: string;
	type: "TEXT" | "AUDIO";
}
