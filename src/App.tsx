// App.tsx
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import {RecoilRoot} from "recoil";
import Titlebar from "./components/layout/TitleBar";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./components/layout/Layout.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import {Chat} from "./pages/Chat.tsx";
import FriendsPage from "./pages/Friends.tsx";
import {Query} from "appwrite";
import {api, database} from "./services/appwrite/appwrite.ts";
import {Suspense} from "react";
import {Messages} from "./types/appwrite/messages.ts";
import {Toaster} from "sonner";

function App() {
	return (
		<RecoilRoot>
			<Toaster
				 theme={"dark"}
			/>
			<Titlebar/>
			{/* @ts-ignore */}
			{window["__TAURI__"] ? <Titlebar /> : null}
			<RouterProvider router={router} />
		</RecoilRoot>
	);
}

export default App;
const fetchChat = async (username: string) => {
	try {
		console.log("Fetching chat");

		const { data } = await api.chats.user({ username: username! }).get();
		console.log("Fetched data done", data);
		if (!data) return null;
		if ("message" in data) {
			console.log("Error fetching chat:", data.message);
			return null;
		}
		const chatId = data.$id;

		const messagesResponse = await database.listDocuments<Messages>(
			"default",
			"messages",
			[
				Query.equal("chat", chatId),
				Query.orderDesc("$createdAt"),
				Query.limit(100),
			]
		);

		console.log("messagesResponse", messagesResponse);
		return { messages: messagesResponse.documents.reverse(), data };
	} catch (error) {
		console.error("Error fetching chat:", error);
		return null;
	}
};

function Home() {
	return (
		<div className={"h-[97vh]"}>
			<div className={"h-96"}>dd</div>
			<div className={"h-96"}>dd</div>
			<div className={"h-96"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-green-500"}>dd</div>d
		</div>
	);
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route
						path="/chat/:username"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<Chat />
							</Suspense>
						}
						loader={async ({ params }) => {
							return fetchChat(params.username!);
						}}
					/>
					<Route
						path="/friends"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<FriendsPage />
							</Suspense>
						}
					/>
				</Route>
			</Route>
		</>
	)
);
