import { atom, selector } from "recoil";
import { Client, Databases, Models, Query } from "appwrite";

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
			console.log("No user found");
			return { friends: [], requests: [] };
		}

		const friendDocuments = await database.listDocuments("default", "friends");
		console.log(friendDocuments.documents);

		const ids = friendDocuments.documents.map((doc) => {
			return doc.friend !== user.$id ? doc.friend : doc.user;
		}) as string[];
		console.log(user);
		const pending: string[] = friendDocuments.documents
			.filter((doc) => doc.status === "PENDING")
			.map((doc) => (doc.friend !== user.$id ? doc.friend : doc.user));

		const accepted: string[] = friendDocuments.documents
			.filter((doc) => doc.status === "ACCEPTED")
			.map((doc) => (doc.friend !== user.$id ? doc.friend : doc.user));

		if (ids.length === 0) {
			return { friends: [], requests: [] };
		}
		let userQuery = Query.equal("$id", ids);

		const all = await database.listDocuments("default", "users", [userQuery]);
		console.log(all);

		const friends = all.documents.filter((doc) => accepted.includes(doc.$id));
		const requests = all.documents.filter((doc) => pending.includes(doc.$id));

		return { friends, requests };
	},
});
