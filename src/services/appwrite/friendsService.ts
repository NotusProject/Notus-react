import {Friends} from "../../types/appwrite/friends";
import {Users} from "../../types/appwrite/users";
import {UserRelationships} from "../../utils/helpers";
import {database} from "./appwrite";

export class FriendsService {
	requests: Users[] = [];
	friends: Users[] = [];

	public async refresh(id: string): Promise<void> {
		console.log(id)
		const friendDocuments = await database.listDocuments<Friends>(
			"default",
			"friends"
		);
		console.log(friendDocuments, 'first')
		const userFriend = new UserRelationships(id, friendDocuments.documents);
		const ids = friendDocuments.documents.map((doc) =>
			userFriend.getFriendOrUser(doc)
		);
		console.log(ids, 'second')
		
		this.requests = userFriend.getPendingRequests();
		this.friends = userFriend.getAcceptedFriends();
	}
}
