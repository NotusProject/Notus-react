import React, {Suspense} from "react";
import {createBrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import FriendsPage from "./pages/Friends.tsx";
import {Chat} from "./pages/Chat.tsx";
import {api} from "./services/appwrite.ts";
import {database} from "./utils/atoms.ts";
import {Query} from "appwrite";

function Home() {
	return (
		<div className={"h-[999px]"}>
			<div className={"h-96"}>dd</div>
			<div className={"h-96"}>dd</div>
			<div className={"h-96"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
		</div>
	);
}

const fetchChat = async (username: string) => {
	try {
		const chatResponse = await api.chats.user({username: username!}).get();
		const chatId = chatResponse.data.$id;
		
		const messagesResponse = await database.listDocuments('default', 'messages', [
			Query.equal('chat', chatId),
		]);
		return messagesResponse.documents;
	} catch (error) {
		console.error('Error fetching chat:', error);
	}
};
const router = createBrowserRouter([
	
	{
		path: '/chat/:username',
		element: <Chat/>,
		loader: async ({params}) => {
			return await fetchChat(params.username);
		},
	}
]);
const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<Home />} />
				<Route
					 element={<Chat/>}
					 
					 path="/chat/:username"
					 loader={async ({params}) => {
						 return await fetchChat(params.username);
					 }}
				
				/>
				
				<Route path="/friends" element={
					<Suspense fallback={<div>Loading...</div>}>
						
						<FriendsPage/>
					</Suspense>
				}/>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
