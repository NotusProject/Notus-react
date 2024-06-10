// useAppwriteSubscriptions.ts
import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {client, friendsAtom, userAtom} from "../utils/atoms.ts";
import {RealtimeResponseEvent} from "appwrite";

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
	const handleCreateAndUpdateEvent = async (payload: RealtimeEventPayload) => {
//handle create and update event
	}
	const handleDeleteEvent = (payload: RealtimeEventPayload) => {
		//handle delete event
	}
	
	const eventHandlers = new Map<string, (payload: RealtimeEventPayload) => void>([
		['databases.default.collections.friends.documents.*.create', handleCreateAndUpdateEvent],
		['databases.default.collections.friends.documents.*.update', handleCreateAndUpdateEvent],
		['database.documents.delete', handleDeleteEvent],
	]);
	
	useEffect(() => {
		const channels = [
			'databases.default.collections.friends.documents',
		];
		
		const unsubscribe = client.subscribe(channels, (response: RealtimeResponseEvent<RealtimeEventPayload>) => {
			const {events, payload} = response;
			events.forEach(event => {
				const handler = eventHandlers.get(event);
				if (handler) {
					handler(payload);
				}
			});
		});
		
		return () => {
			unsubscribe();
		};
	}, []);
};
