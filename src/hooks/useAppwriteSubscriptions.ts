// useAppwriteSubscriptions.ts
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { friendsAtom, userAtom } from "../utils/atoms.ts";
import { RealtimeResponseEvent } from "appwrite";
import { client } from "../services/appwrite/appwrite.ts";
import { FriendsService } from "../services/appwrite/friendsService.ts";

// dummy type for now
interface RealtimeEventPayload {
	$collection: string;
	$id: string;
	payload: any;
}

// TODO: refactor atoms, selectors might not be needed in some cases
// TODO: fetch friends and friend requests on mount anyway
//TODO: seems like recoil caches stuff for us so we good
export const useAppwriteSubscriptions = () => {
	const friends = useRecoilValue(friendsAtom);
	const user = useRecoilValue(userAtom);
	console.log("friends", friends);
	const handleCreateAndUpdateEvent = async (payload: RealtimeEventPayload) => {
		//handle create and update event
	};
	const handleDeleteEvent = (payload: RealtimeEventPayload) => {
		//handle delete event
	};

	const eventHandlers = new Map<
		string,
		(payload: RealtimeEventPayload) => void
	>([
		[
			"databases.default.collections.friends.documents.*.create",
			handleCreateAndUpdateEvent,
		],
		[
			"databases.default.collections.friends.documents.*.update",
			handleCreateAndUpdateEvent,
		],
		["database.documents.delete", handleDeleteEvent],
	]);
	useEffect(() => {
		console.log("user", user);

		if (!user) return;
		const friendsService = new FriendsService(user.$id);
		friendsService.refresh().then(() => {
			console.log("friends refreshed");
		});
	}, [user]);

	useEffect(() => {
		const channels = ["databases.default.collections.friends.documents"];

		const unsubscribe = client.subscribe(
			channels,
			(response: RealtimeResponseEvent<RealtimeEventPayload>) => {
				const { events, payload } = response;
				events.forEach((event) => {
					const handler = eventHandlers.get(event);
					if (handler) {
						handler(payload);
					}
				});
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);
};
