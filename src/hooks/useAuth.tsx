// useAuth.tsx
import { useRecoilState } from "recoil";
import { account } from "../services/appwrite/appwrite.ts";
import { useEffect } from "react";
import { loadingAtom, userAtom } from "../utils/atoms.ts";

export function useAuth() {
	const [user, setUser] = useRecoilState(userAtom);
	const [loading, setLoading] = useRecoilState(loadingAtom);

	useEffect(() => {
		async function checkUserStatus() {
			try {
				const accountDetails = await account.get();
				console.log("Account details:", accountDetails);
				setUser(accountDetails);
			} catch (error) {
				console.error("Error checking user status:", error);
				setUser(null); // Set user to null if there's an error
				console.error("Error checking user status:", error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		}

		checkUserStatus();
	}, [setUser, setLoading]);

	return { user, loading };
	return { user, loading };
}
