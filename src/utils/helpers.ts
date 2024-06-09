export class UserRelationships {
	userId: string;
	documents: any[];
	
	constructor(userId: string, documents: any[]) {
		this.userId = userId;
		this.documents = documents;
	}
	
	getFriendOrUser(doc: any) {
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
