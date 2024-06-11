// useAuth.tsx
import {useRecoilState} from "recoil";
import {account, database} from "../services/appwrite/appwrite.ts";
import {useEffect} from "react";
import {loadingAtom, userAtom} from "../utils/atoms.ts";

export function useAuth() {
	const [user, setUser] = useRecoilState(userAtom);
	const [loading, setLoading] = useRecoilState(loadingAtom);

	useEffect(() => {
		async function checkUserStatus() {
			try {
				const accountDetails = await account.get();
				const user = await database.getDocument("default", "users", accountDetails.$id);
				accountDetails.prefs.avatar = user.avatar;
				setUser(accountDetails);
			} catch (error) {
				console.error("Error checking user status:", error);
				setUser(null);
			} finally {
				setLoading(false);
				console.log("User:", user);
				console.log("Loading:", loading);
			}
		}

		checkUserStatus();
	}, [setUser, setLoading]);

	return { user, loading };
}
