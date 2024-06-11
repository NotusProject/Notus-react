import { Query } from "appwrite";
import { Friends } from "../../types/appwrite/friends";
import { Users } from "../../types/appwrite/users";
import { UserRelationships } from "../../utils/helpers";
import { database } from "./appwrite";

export class FriendsService {
	private pending: string[] = [];
	private accepted: string[] = [];
	private all: Users[] = [];
	friends: Users[] = [];
	requests: Users[] = [];

	public async refresh(id: string): Promise<void> {
		const friendDocuments = await database.listDocuments<Friends>(
			"default",
			"friends"
		);

		const userFriend = new UserRelationships(id, friendDocuments.documents);
		const ids = friendDocuments.documents.map((doc) =>
			userFriend.getFriendOrUser(doc)
		);

		this.pending = userFriend.getPendingRequests();
		this.accepted = userFriend.getAcceptedFriends();

		if (ids.length === 0) {
			return;
		}

		const userQuery = Query.equal("$id", ids);
		const response = await database.listDocuments<Users>("default", "users", [
			userQuery,
		]);
		this.all = response.documents;
		this.friends = this.all.filter((doc) => this.accepted.includes(doc.$id));
		this.requests = this.all.filter((doc) => this.pending.includes(doc.$id));
	}
}
