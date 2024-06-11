import { Friends } from "../types/appwrite/friends";

export class UserRelationships {
	userId: string;
	documents: Friends[];

	constructor(userId: string, documents: Friends[]) {
		this.userId = userId;
		this.documents = documents;
	}

	getFriendOrUser(doc: Friends) {
		return doc.friend.$id !== this.userId ? doc.friend : doc.user;
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
export function replaceItemAtIndex<T>(
	this: T[],
	index: number,
	newValue: T
): T[] {
	return [...this.slice(0, index), newValue, ...this.slice(index + 1)];
}

export function removeItemAtIndex<T>(this: T[], index: number): T[] {
	return [...this.slice(0, index), ...this.slice(index + 1)];
}

// Extend the Array prototype with these methods
declare global {
	interface Array<T> {
		replaceItemAtIndex(index: number, newValue: T): T[];
		removeItemAtIndex(index: number): T[];
	}
}

// Attach the methods to the Array prototype
Array.prototype.replaceItemAtIndex = replaceItemAtIndex;
Array.prototype.removeItemAtIndex = removeItemAtIndex;
