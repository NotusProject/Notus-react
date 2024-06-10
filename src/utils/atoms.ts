import { atom, selector } from "recoil";
import { Client, Databases, Models, Query } from "appwrite";
import { UserRelationships } from "./helpers.ts";
import { User } from "../types/index.ts";

export const client = new Client()
	.setEndpoint("https://appwrite.wasimhub.dev/v1")
	.setProject("notus");

export const database = new Databases(client);

export const userAtom = atom<Models.User<Models.Preferences> | null>({
	key: "user",
	default: null,
});

export const loadingAtom = atom<boolean>({
	key: "loading",
	default: true,
});

export const friendsAtom = selector({
	key: "friends",
	get: async ({ get }) => {
		const user = get(userAtom);
		if (!user) {
			return { friends: [], requests: [] };
		}

		const friendDocuments = await database.listDocuments("default", "friends");

		const userFriend = new UserRelationships(
			user.$id,
			friendDocuments.documents
		);
		const ids = friendDocuments.documents.map((doc) =>
			userFriend.getFriendOrUser(doc)
		) as string[];

		const pending = userFriend.getPendingRequests();
		const accepted = userFriend.getAcceptedFriends();

		if (ids.length === 0) {
			return { friends: [], requests: [] };
		}

		const userQuery = Query.equal("$id", ids);
		const all = await database.listDocuments("default", "users", [userQuery]);

		const friends = all.documents.filter((doc) =>
			accepted.includes(doc.$id)
		) as User[];
		const requests = all.documents.filter((doc) => pending.includes(doc.$id));

		return { friends, requests };
	},
});
