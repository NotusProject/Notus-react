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

export const friendsAtom = selector({
	key: 'friends',
	get: async ({get}) => {
		const user = get(userAtom);
		if (!user) {
			console.log('No user found');
			return [];
		}
		const friends = await database.listDocuments('default', 'friends', [
			Query.equal('user', user.$id),
			Query.equal('status', 'ACCEPTED'),
		]);
		
		return friends.documents;
	},
});
