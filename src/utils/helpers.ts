import { Friends } from "../types/appwrite/friends";

export class UserRelationships {
	userId: string;
	documents: Friends[];

	constructor(userId: string, documents: Friends[]) {
		this.userId = userId;
		this.documents = documents;
	}

	getFriendOrUser(doc: Friends) {
		return doc.friend !== this.userId ? doc.friend : doc.user;
	}

	getPendingRequests() {
		return this.documents
			.filter((doc) => doc.status === "PENDING")
			.map((doc) => this.getFriendOrUser(doc));
	}

	getAcceptedFriends() {
		return this.documents
			.filter((doc) => doc.status === "ACCEPTED")
			.map((doc) => this.getFriendOrUser(doc));
	}
}
