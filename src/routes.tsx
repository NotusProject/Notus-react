import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import FriendsPage from "./pages/Friends.tsx";
import { api } from "./services/appwrite.ts";

function Home() {
	const [response, setResponse] = React.useState<string | null>(null);
	async function fetchApi() {
		const treaty = await api.friends.add({ username: "test" }).get();
		const text = await treaty.data?.text();
		setResponse(text ?? "No response from body");
	}
	return (
		<div className={"h-[999px]"}>
			<div className={"h-96"}>
				<p>Type safe example</p>
				<p>{response ?? "No response"}</p>
				<button onClick={fetchApi}>Click to Fetch API</button>
			</div>
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

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<Home />} />
				<Route path="/friends" element={<FriendsPage />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
