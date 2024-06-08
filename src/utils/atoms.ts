// atoms.ts
import {atom, selector} from 'recoil';
import {Client, Databases, Models, Query} from 'appwrite';

export const client = new Client()
	 .setEndpoint("https://appwrite.wasimhub.dev/v1")
	 .setProject("notus")

export const database = new Databases(client);

export const userAtom = atom<Models.User<Models.Preferences> | null>({
	key: 'user',
	default: null,
});

export const loadingAtom = atom<boolean>({
	key: 'loading',
	default: true,
});
// todo maybe split it for cleaner look
export const friendsAtom = selector({
	key: 'friends',
	get: async ({get}) => {
		const user = get(userAtom);
		if (!user) {
			console.log('No user found');
			return {friends: [], requests: []};
		}
		
		const friendDocuments = await database.listDocuments('default', 'friends');
		const friendRequests = friendDocuments.documents.filter(
			 (doc) => doc.status === 'PENDING'
		);
		const acceptedFriends = friendDocuments.documents.filter(
			 (doc) => doc.status === 'ACCEPTED'
		);
		const friendIds = acceptedFriends.map((doc) => {
			return doc.friend !== user.$id ? doc.friend : doc.user;
		});
		let userQuery = '';
		if (friendIds.length === 0) {
			return {friends: [], requests: friendRequests};
		}
		
		if (friendIds.length === 1) {
			userQuery = Query.equal('$id', friendIds[0]);
		} else {
			const equalQueries = friendIds.map((id) => Query.equal('$id', id));
			userQuery = Query.or(equalQueries);
		}
		
		const friends = await database.listDocuments('default', 'users', [
			userQuery,
		]);
		console.log(friends);
		console.log(friendRequests);
		return {friends: friends.documents, requests: friendRequests};
	},
});
