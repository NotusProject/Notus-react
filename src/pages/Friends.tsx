import {useState, useEffect} from 'react';
import {Client, Account, Databases, Query} from 'appwrite';
import {account, client} from "../services/appwrite.ts";


const databases = new Databases(client);

// Assuming you have a "friends" collection with the required properties

export default function FriendRequests() {
    const [userId, setUserId] = useState('');
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        // Get the currently logged-in user's ID
        const fetchUserId = async () => {
            try {
                const user = await account.get();
                setUserId(user.$id);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        // Fetch the user's friend requests
        const fetchFriendRequests = async () => {
            try {
                const response = await databases.listDocuments(
                    '665dfe690003e3e84331',
                    '665dfe8e001ffbf0b9f3',
                    [
                        Query.equal('friendId', userId),
                        Query.equal('Status', 'pending'),
                    ]
                );
                console.log(response, userId)
                setFriendRequests(response.documents);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        };

        if (userId) {
            fetchFriendRequests();
        }
    }, [userId]);

    const acceptFriendRequest = async (requestId) => {
        try {
            await databases.updateDocument(
                '665dfe690003e3e84331',
                '665dfe8e001ffbf0b9f3',
                requestId,
                {Status: 'accepted'}
            );
            // Refresh the friend requests list after accepting
            setFriendRequests(prevRequests =>
                prevRequests.filter(request => request.$id !== requestId)
            );
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const rejectFriendRequest = async (requestId) => {
        try {
            await databases.updateDocument(
                '665dfe690003e3e84331',
                '665dfe8e001ffbf0b9f3',
                requestId,
                {status: 'rejected'}
            );
            // Refresh the friend requests list after rejecting
            setFriendRequests(prevRequests =>
                prevRequests.filter(request => request.$id !== requestId)
            );
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    return (
        <div>
            <h2>Friend Requests</h2>
            {friendRequests.length === 0 ? (
                <p>No pending friend requests.</p>
            ) : (
                <ul>
                    {friendRequests.map(request => (
                        <li key={request.$id}>
                            {request.userName}
                            <button onClick={() => acceptFriendRequest(request.$id)}>
                                Accept
                            </button>
                            <button onClick={() => rejectFriendRequest(request.$id)}>
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
