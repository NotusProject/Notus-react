// App.tsx
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import Titlebar from './components/layout/TitleBar';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./components/layout/Layout.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import {Chat} from "./pages/Chat.tsx";
import React, {Suspense} from "react";
import FriendsPage from "./pages/Friends.tsx";
import {api} from "./services/appwrite.ts";
import {database} from "./utils/atoms.ts";
import {Query} from "appwrite";


function App() {
	return (
		 <RecoilRoot>
			 <Titlebar/>
			 <RouterProvider router={router}/>
		 </RecoilRoot>
	);
}


export default App;
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
		return null;
	}
};

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


const router = createBrowserRouter(
	 createRoutesFromElements(
			<>
				<Route path="login" element={<Login/>}/>
				<Route path="register" element={<Register/>}/>
				<Route element={<Layout/>}>
					<Route element={<ProtectedRoute/>}>
						<Route path="/" element={<Home/>}/>
						<Route
							 path="/chat/:username"
							 element={<Chat/>}
							 loader={async ({params}) => {
								 return fetchChat(params.username!);
							 }}
						/>
						<Route
							 path="/friends"
							 element={
								 <Suspense fallback={<div>Loading...</div>}>
									 <FriendsPage/>
								 </Suspense>
							 }
						/>
					</Route>
				</Route>
			</>
	 )
);
