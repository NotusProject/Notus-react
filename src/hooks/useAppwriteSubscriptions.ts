// useAppwriteSubscriptions.ts
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {friendsAtom, requestsAtom, userAtom} from "../utils/atoms.ts";
import {FriendsService} from "../services/appwrite/friendsService.ts";

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
	const friendsService = new FriendsService();
	const [friends, setFriends] = useRecoilState(friendsAtom);
	const [request, setRequest] = useRecoilState(requestsAtom);

	const [user, setUser] = useRecoilState(userAtom);
	useEffect(() => {
		friendsService.refresh(user!.$id).then(() => {
			console.log(friendsService)
			setFriends(friendsService.friends);
			setRequest(friendsService.requests);
			console.log("Friends", friendsService.friends);
			console.log("Requests", friendsService.requests);
		});
	}, []);

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

	// useEffect(() => {
	// 	const channels = [
	// 		"databases.default.collections.friends.documents",
	// 		"databases.*",
	// 		"databases.default.collections.messages.documents",
	// 	];

	// 	const unsubscribe = client.subscribe(
	// 		channels,
	// 		(response: RealtimeResponseEvent<RealtimeEventPayload>) => {
	// 			const { events, payload } = response;
	// 			events.forEach((event) => {
	// 				const handler = eventHandlers.get(event);
	// 				if (handler) {
	// 					handler(payload);
	// 				}
	// 			});
	// 		}
	// 	);

	// 	return () => {
	// 		unsubscribe();
	// 	};
	// }, []);
	return [user, setUser];
};
