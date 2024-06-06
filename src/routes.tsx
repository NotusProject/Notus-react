import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import FriendsPage from "./pages/Friends.tsx";
import { api } from "./services/appwrite.ts";

function Home() {
	const [response, setResponse] = React.useState("No response yet");
	async function handleClick() {
		const treaty = await api.friends.add({ username: "wasim" }).get();
		const data = await treaty.response.text();
		setResponse(data);
	}

	return (
		<div className={"h-[999px]"}>
			<div className={"h-96"}>
				<p>{response}</p>
				<button onClick={handleClick}>Click me</button>
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
