import { atom } from "recoil";
import { Models } from "appwrite";
import { Users } from "../types/index.ts";

export const userAtom = atom<Models.User<Models.Preferences> | null>({
	key: "user",
	default: null,
});

export const loadingAtom = atom<boolean>({
	key: "loading",
	default: true,
});

export const friendsAtom = atom<Users[]>({
	key: "friends",
	default: [],
});

export const requestsAtom = atom<Users[]>({
	key: "requests",
	default: [],
});

// export const friendsAtom1 = selector({
// 	key: "friends",
// 	get: async ({ get }) => {
// 		const user = get(userAtom);
// 		if (!user) {
// 			return { friends: [], requests: [] };
// 		}

// 		const friendDocuments = await database.listDocuments<Friends>(
// 			"default",
// 			"friends"
// 		);

// 		const userFriend = new UserRelationships(
// 			user.$id,
// 			friendDocuments.documents
// 		);
// 		const ids = friendDocuments.documents.map((doc) =>
// 			userFriend.getFriendOrUser(doc)
// 		);

// 		const pending = userFriend.getPendingRequests();
// 		const accepted = userFriend.getAcceptedFriends();

// 		if (ids.length === 0) {
// 			return { friends: [], requests: [] };
// 		}

// 		const userQuery = Query.equal("$id", ids);
// 		const all = await database.listDocuments<Users>("default", "users", [
// 			userQuery,
// 		]);

// 		const friends = all.documents.filter((doc) => accepted.includes(doc.$id));
// 		const requests = all.documents.filter((doc) => pending.includes(doc.$id));

// 		return { friends, requests };
// 	},
// });
