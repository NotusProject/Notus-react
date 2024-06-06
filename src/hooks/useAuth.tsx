// useAuth.tsx
import {useRecoilState} from 'recoil';
import {account} from '../services/appwrite';
import {useEffect} from 'react';
import {loadingAtom, userAtom} from "../utils/atoms.ts";

export function useAuth() {
	const [user, setUser] = useRecoilState(userAtom);
	const [loading, setLoading] = useRecoilState(loadingAtom);
	
	useEffect(() => {
		async function checkUserStatus() {
			try {
				const accountDetails = await account.get();
				setUser(accountDetails);
			} catch (error) {
				console.error('Error checking user status:', error);
				setUser(null); // Set user to null if there's an error
			} finally {
				setLoading(false);
			}
		}
		
		checkUserStatus();
	}, [setUser, setLoading]);
	
	return {user, loading};
}
