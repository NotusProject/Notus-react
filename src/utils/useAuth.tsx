import {createContext, useState, useEffect, useContext, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {Models} from "appwrite";
import {account} from "../services/appwrite";

interface AuthContextValue {
   user: Models.User<Models.Preferences> | null;
   loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
   children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
   
   useEffect(() => {
	  async function checkUserStatus() {
		 try {
			const accountDetails = await account.get();
			setUser(accountDetails);
		 } catch (error) {
			console.error("Error checking user status:", error);
		 } finally {
			setLoading(false);
		 }
	  }
	  
	  checkUserStatus();
	  console.log(user)
   }, []);
   
   const contextData: AuthContextValue = {
	  user,
	  loading,
   };
   
   return (
	 <AuthContext.Provider value={contextData}>
		<div className={'fixed top-10 left-5 text-red-500 font-bold'}>
		   {loading ? "Loading..." : 'Logged in as ' + user?.name ? 'Logged in as ' + user?.email : 'Not logged in'}
		</div>
		{children}
	 </AuthContext.Provider>
   );
}

// Custom Hook
export function useAuth(): AuthContextValue {
   const context = useContext(AuthContext);
   
   if (!context) {
	  throw new Error("useAuth must be used within an AuthProvider");
   }
   
   return context;
}

export default AuthContext;