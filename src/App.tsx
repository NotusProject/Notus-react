// App.tsx
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import Titlebar from "./components/layout/TitleBar";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./components/layout/Layout.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import { Chat } from "./pages/Chat.tsx";
import FriendsPage from "./pages/Friends.tsx";
import { Query } from "appwrite";
import { api, database } from "./services/appwrite/appwrite.ts";

function App() {
	return (
		<RecoilRoot>
			<Titlebar />
			<RouterProvider router={router} />
		</RecoilRoot>
	);
}

export default App;
const fetchChat = async (username: string) => {
	try {
		const { data } = await api.chats.user({ username: username! }).get();
		if (!data) return null;
		if ("message" in data) {
			console.log("Error fetching chat:", data.message);
			return null;
		}
		const chatId = data.$id;

		const messagesResponse = await database.listDocuments(
			"default",
			"messages",
			[Query.equal("chat", chatId)]
		);

		return { documents: messagesResponse.documents, data };
	} catch (error) {
		console.error("Error fetching chat:", error);
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
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route element={<Layout />}>
				<Route element={<ProtectedRoute />}>
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
